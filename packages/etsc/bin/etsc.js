#!/usr/bin/env node
const program = require('commander') // 命令行工具
const package = require('../package.json')
program.version(package.version, '-v, --version').usage('<command> [options]')
program
  .command('dev',{isDefault:true})
  .description('调试项目')
  .option('-s, --src <src>', '目标文件 默认为 src/index.ts')
  .option('-o, --out <out>', '目标目录')
  .option('-w, --watch', '驻守进程继续编译')
  .action(d => {
    // console.log(d)
    require('../script/etsc')(d)
  })

program.parse(process.argv)
