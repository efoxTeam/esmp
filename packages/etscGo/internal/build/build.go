package build

import (
	"fmt"
	"os"
	"io/ioutil"
	"path"
	"github.com/evanw/esbuild/pkg/api"
)

// 递归获取指定目录下的所有文件名
func GetAllFile(pathname string) ([]string, error) {
	result := []string{}
	fis, err := ioutil.ReadDir(pathname)
	if err != nil {
		fmt.Printf(pathname, err)
		return result, err
	}
	// 所有文件/文件夹
	for _, fi := range fis {
		fullname := pathname + "/" + fi.Name()
		// 是文件夹则递归进入获取;是文件，则压入数组
		if fi.IsDir() {
			temp, err := GetAllFile(fullname)
			if err != nil {
				return result, err
			}
			result = append(result, temp...)
		} else {
			result = append(result, fullname)
		}
	}
	return result, nil
}

func Dev(src,out string, watch bool)  {
	cwdroot, _ := os.Getwd()
	entryFiles := path.Join(cwdroot,src)
	outputPath := path.Join(cwdroot,out)
	tsconfigPath := path.Join(cwdroot,"tsconfig.json")
	os.RemoveAll(outputPath)
	entryPoints, _:= GetAllFile(entryFiles)

	isWatch := &api.WatchMode{
		OnRebuild: func(result api.BuildResult) {
			if len(result.Errors) > 0 {
				fmt.Printf("watch build failed: %d errors\n", len(result.Errors))
			} else {
				fmt.Printf("watch build succeeded: %d warnings\n", len(result.Warnings))
			}
		},
	}

	if(!watch){
		isWatch = nil
	}

	result := api.Build(api.BuildOptions{
		EntryPoints: entryPoints,
		Outdir:  outputPath,
		Format: api.FormatCommonJS,
		Platform: api.PlatformNode,
		Watch:  isWatch,  
		Bundle: true,
		Tsconfig:tsconfigPath,
		Loader: map[string]api.Loader{
			".js": api.LoaderJSX,
			".node": api.LoaderFile,
		},
		Write:    true,
	})

	if len(result.Errors) > 0 {
    fmt.Println(result.Errors)
  }

	if(watch){
		// 如果是 watch 模式，需要常驻进程
		select{}
	}
}