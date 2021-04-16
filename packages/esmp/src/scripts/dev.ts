// import fs from 'fs-extra'
import path from 'path'
// import rimraf from 'rimraf'
import {cwdroot, cliPath} from '../helper/paths'
// import {copyPublicFolder} from 'src/helper/file'
import esbuild from 'esbuild'
import sassPlugin from 'esbuild-plugin-sass'
import svgrPlugin from 'esbuild-plugin-svgr'
import lessPlugin from 'esbuild-plugin-less'
import glob from 'tiny-glob'
export default async function({src}:any) {
  src = src || 'src/index.ts'
  // const entryPoints = await glob(path.join(cwdroot,src,'**/**.*'));
  // console.log('entryPoints',entryPoints)
  const outputPath = path.join(cliPath, 'template', 'public')
  const port = 8000
  esbuild
      .serve(
        {
          servedir: outputPath,
          port,
        },
        {
          entryPoints: [src],
          outdir: outputPath,
          format: 'esm',
          treeShaking: true,
          bundle: true,
          splitting: true,
          // inject: [injectReact],
          loader: {
            '.tsx': 'tsx',
            '.ts': 'ts',
            '.css': 'css',
            '.js': 'jsx',
            '.svg': 'dataurl',
            '.png': 'dataurl',
          },
          define: {global: 'window'},
          plugins: [sassPlugin(), svgrPlugin()],
        },
      )
      .then((server:any) => {
        console.log(`Server:${port}`)
        // Call "stop" on the web server when you're done
        // server.stop()
      })
  
}
