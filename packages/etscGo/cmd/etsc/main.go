package main

import (
  "fmt"
  "log"
  "os"

  "github.com/urfave/cli/v2"
	"etscGo/internal/build"
)

func main() {
	var src string
	var out string
	var watch bool

  app := &cli.App{
		Commands: []*cli.Command{
			{
        Name:    "build",
        Aliases: []string{"a"},
        Usage:   "Build prod",
        Action:  func(c *cli.Context) error {
          fmt.Println("added task: ", c.Args().First())
          return nil
        },
      },
			{
				Name:  "dev",
				Usage: "development",
				Flags: []cli.Flag {
					&cli.StringFlag{
						Name: "src",
						Aliases: []string{"s"},
						Value: "src",
						Destination: &src,
						Usage: "Target file,default is src/index.ts",
					},
					&cli.StringFlag{
						Name: "out",
						Aliases: []string{"o"},
						Value: "dist",
						Destination: &out,
						Usage: "Target output directory",
					},
					&cli.BoolFlag{
						Name: "watch",
						Aliases: []string{"w"},
						Destination: &watch,
						Usage: "Watch file change",
					},
				},
				Action: func(c *cli.Context) error {
					build.Dev(src,out,watch)
					return nil
				},
			},
		},
	}

  err := app.Run(os.Args)
  if err != nil {
    log.Fatal(err)
  }
}