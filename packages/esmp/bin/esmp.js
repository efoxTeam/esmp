#!/usr/bin/env node

const program = require('commander') // 命令行工具
const package = require('../package.json')
// const chalk = require('chalk') // 支持修改控制台中字符串的样式 字体样式、字体颜色、背景颜色
program.version(package.version, '-v, --version').usage('<command> [options]')
program
  .command('dev')
  .description('调试项目')
  .option('-s, --src <src>', '目标文件 默认为 src/index.ts')
  .option('-pc, --public <public>', '目标 默认为 public/')
  .option('-e, --env <env>', '部署环境 dev、test、prod 默认为 dev')
  .option('-h, --hot', '是否使用热更新 默认不启动')
  .option('-o, --open <open>', '是否打开调试页面 默认true,false禁止自动打开')
  .option('-t, --ts', '生成类型文件 默认为 false')
  .option('-ps, --progress', '显示进度 默认为 true')
  .option('-wl, --wplogger [filename]', '打印webpack配置 默认为 false,filename 为 输出webpack配置文件')
  .option('-rm, --remote', '在执行命令时拉取远程声明文件，远程地址首选package.json里的remoteBaseUrlList')
  .action((d) => {
    require('../scripts/dev')(d)
  })

  program.parse(process.argv)