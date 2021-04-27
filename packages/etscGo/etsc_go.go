package main

import "github.com/evanw/esbuild/pkg/api"
import "os"
import "fmt"

func main() {
  result := api.Build(api.BuildOptions{
    // TODO：获取入口文件
    EntryPoints: []string{"E:\\esmp\\packages\\esmp\\src\\bin\\esmp.ts"},
    Bundle:      true,
    Loader: map[string]api.Loader{
      ".js": api.LoaderJSX,
    },
    Platform:    api.PlatformNode,
    Write: true,
    Outfile:"out.js",
  })

  if len(result.Errors) > 0 {
    fmt.Println(result.Errors)/*  */
    os.Exit(1)
  }
}