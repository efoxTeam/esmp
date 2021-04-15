const esbuild = require('esbuild')
const fs = require('fs-extra')
const path = require('path')
const { cwdroot } = require('../helper/paths')
module.exports = async({src})=>{
  src = src ||'src/index.ts'
  const filepath = path.join(cwdroot,src)
  const dist = path.join(cwdroot,'dist')
  console.log('filepath',filepath)// path check
  let code = await fs.readFile(filepath, 'utf8')
  // console.log('code',code)// code check
  /* const cb = esbuild.transformSync(code, {
    loader: 'tsx',
    treeShaking:true,
  })
  console.log(cb) */

   code = require('esbuild').transformSync(code, {
    format: 'esm',
    loader:'tsx'
  })
  console.log(code)


  require('esbuild').serve({
    servedir:dist,
    port:8000
  }, {
    entryPoints: [src],
    outdir: dist,
    format: 'esm',
    loader:{
      '.ts':'tsx'
    }
  }).then(server => {
    // Call "stop" on the web server when you're done
    // server.stop()
  })
}