const esbuild = require('esbuild')
const fs = require('fs-extra')
const path = require('path')
const rimraf = require('rimraf')
const {cwdroot, outputPath, cliPath, template, favicon} = require('../helper/paths')
const {copyPublicFolder} = require('../helper/file')
const sassPlugin = require('esbuild-plugin-sass')
const svgrPlugin = require('esbuild-plugin-svgr')
module.exports = async ({src}) => {
  src = src || 'src/index.ts'
  src = path.join(cwdroot, src)
  rimraf.sync(outputPath)
  await esbuild.build({
    entryPoints: [src],
    outdir: outputPath,
    format: 'esm',
    treeShaking: true,
    bundle: true,
    splitting: true,
    minify: true,
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
  copyPublicFolder({public: path.join(cliPath, 'template', 'public'), dist: outputPath, template, favicon})
}
