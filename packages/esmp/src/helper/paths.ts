import path from 'path'
import fs from 'fs-extra'
const cwdroot = process.cwd()
const outputPath = path.join(cwdroot, 'dist')
const staticPath = path.join(cwdroot, 'public')
let favicon = path.join(staticPath, 'favicon.ico')
let template = path.join(staticPath, 'index.html')
const cliPath = path.join(__dirname, '../../')
favicon = fs.existsSync(favicon) ? favicon : path.join(__dirname, '../template/public/favicon.ico')
template = fs.existsSync(template) ? template : path.join(__dirname, '../template/public/index.html')
// injectReact = fs.existsSync(template) ? template : path.join(__dirname, '../template/public/index.html')

export  {cwdroot, favicon, template, outputPath, staticPath, cliPath}
