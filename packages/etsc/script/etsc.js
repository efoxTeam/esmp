const esbuild = require('esbuild')
const fs = require('fs-extra')
const path = require('path')
const rimraf = require('rimraf')
const cwdroot = process.cwd()
const glob = require("tiny-glob");
module.exports = async ({ src, watch, out }) => {
  src = src || 'src'
  out = out || 'dist'
  const tsconfigPath = path.join(cwdroot, 'tsconfig.json')
  src = path.join(cwdroot, src)
  const entryPoints = await glob(path.join(src,'**/**.*'));
  // watch = (watch !== false) ? true : false  
  const outputPath = path.join(cwdroot, out)
  rimraf.sync(outputPath)
  // console.log('entryPoints',entryPoints)
  // esbuild ./src/**/** --format=cjs --platform=node --watch --outdir=./dist --tsconfig=./tsconfig.json
  await esbuild.build({
    entryPoints,
    outdir: outputPath,
    format: 'cjs',
    platform:'node',
    // bundle: true,
    watch: watch,
    // minify:true,
    tsconfig:tsconfigPath,
    loader: {
      '.tsx': 'tsx',
      '.ts': 'ts',
      '.jsx': 'jsx',
      '.js': 'js',
      '.json':'json'
    },
  })
}
