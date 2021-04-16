import esbuild from 'esbuild'
// import fs from 'fs-extra'
import path from 'path'
import rimraf from 'rimraf'
import {cwdroot, outputPath, cliPath, template, favicon} from '../helper/paths'
import {copyPublicFolder} from '../helper/file'
import sassPlugin from 'esbuild-plugin-sass'
import svgrPlugin from 'esbuild-plugin-svgr'
import glob from 'tiny-glob'
export default async function({src}:any) {
  src = src || 'src/index.ts'
  src = path.join(cwdroot, src)
  rimraf.sync(outputPath)
  //
  await esbuild.build({
    entryPoints:[src],
    outdir: outputPath,
    format: 'esm',
    // sourcemap: true,
    treeShaking: true,
    bundle: true,
    splitting: true,
    // minify: true,
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
  copyPublicFolder({out: path.join(cliPath, 'template', 'public'), dist: outputPath, template, favicon})
}
