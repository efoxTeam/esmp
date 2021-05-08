// import fs from 'fs-extra'
import path from 'path'
// import rimraf from 'rimraf'
import {cwdroot, cliPath,staticPath} from '../helper/paths'
// import {copyPublicFolder} from 'src/helper/file'
import esbuild from 'esbuild'
import sassPlugin from 'esbuild-plugin-sass'
import svgrPlugin from 'esbuild-plugin-svgr'
import lessPlugin from 'esbuild-plugin-less'
import {getHostname} from '../helper/serve'
module.exports = async ({src}:any) => {
  src = src || 'src/index.ts'
  src = path.join(cwdroot, src)
  // const outputPath = path.join(cliPath, 'template', 'public')
  const port = 8000
  const hostname = getHostname()
  // console.log('outputPath',staticPath,hostname)
  esbuild
      .serve(
        {
          host:'0.0.0.0',
          servedir: staticPath,
          port,
        },
        {
          entryPoints: [src],
          // outdir: outputPath,
          format: 'esm',
          treeShaking: true,
          bundle: true,
          splitting: true,
          external:['react','react-dom','canvas-confetti'],
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
        console.log(`http://localhost:${port}`)
        console.log(`http://${hostname}:${port}`)
        // Call "stop" on the web server when you're done
        // server.stop()
      })
  
}
