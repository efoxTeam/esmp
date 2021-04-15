const esbuild = require('esbuild')
const fs = require('fs-extra')
const path = require('path')
const rimraf = require('rimraf')
const {cwdroot, outputPath, injectReact, staticPath, template, favicon, cliPath} = require('../helper/paths')
const {copyPublicFolder} = require('../helper/file')
const sassPlugin = require('esbuild-plugin-sass')
const svgrPlugin = require('esbuild-plugin-svgr')
const lessPlugin = require('esbuild-plugin-less')
module.exports = async ({src}) => {
  src = src || 'src/index.ts'
  src = path.join(cwdroot, src)
  // const staticPath = path.join(cwdroot, 'public')

  //
  // console.log('filePath', filePath) // path check
  // let code = await fs.readFile(filePath, 'utf8')
  // console.log('code',code)// code check
  /* const cb = esbuild.transformSync(code, {
    loader: 'tsx',
    treeShaking:true,
  })
  console.log(cb) */

  // code = require('esbuild').transformSync(code, {
  //   format: 'esm',
  //   loader: 'tsx',
  // })
  ///////////////////
  const port = 8000
  const isServer = true
  if (isServer) {
    async function serve() {
      console.log(`running server from: http://localhost:${port}/`)
      const servor = require('servor')
      await servor({
        browser: true,
        reload: true,
        root: outputPath,
        port,
      })
    }

    rimraf.sync(outputPath)
    await esbuild.build({
      entryPoints: [src],
      outdir: outputPath,
      format: 'esm',
      treeShaking: true,
      bundle: true,
      splitting: true,
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
    })

    serve()
    copyPublicFolder({public: path.join(cliPath, 'template', 'public'), dist: outputPath, template, favicon})
  } else {
    require('esbuild')
      .serve(
        {
          servedir: path.join(cliPath, 'template', 'public'),
          port,
        },
        {
          entryPoints: [src],
          outdir: path.join(cliPath, 'template', 'public'),
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
      .then(server => {
        console.log(`Server:${port}`)
        // Call "stop" on the web server when you're done
        // server.stop()
      })
  }
}
