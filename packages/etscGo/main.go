package main

import (
	"fmt"
	"log"
	"os"

	"github.com/evanw/esbuild/pkg/api"
	"github.com/urfave/cli/v2"
)

func main() {
	app := &cli.App{
		Name:  "esmp",
		Usage: "make an explosive entrance",
		Action: func(c *cli.Context) error {
			fmt.Println("esmp! I say!")
			return nil
		},
	}

	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("ESMP Go")
	result := api.Build(api.BuildOptions{
		// TODO：获取入口文件
		// EntryPoints: []string{"E:\\esmp\\packages\\esmp\\src\\bin\\esmp.ts"},
		Bundle: true,
		Loader: map[string]api.Loader{
			".js": api.LoaderJSX,
		},
		Platform: api.PlatformNode,
		Write:    true,
		Outfile:  "out.js",
	})

	if len(result.Errors) > 0 {
		fmt.Println(result.Errors) /*  */
		os.Exit(1)
	}
}
