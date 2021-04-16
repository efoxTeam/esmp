#!/usr/bin/env node
import program from 'commander' // 命令行工具
import pkg from '../../package.json'
program.version(pkg.version, '-v, --version').usage('<command> [options]')
program
  .command('dev')
  .description('调试项目')
  .option('-s, --src <src>', '目标文件 默认为 src/index.ts')
  .option('-pc, --public <public>', '目标 默认为 public/')
  .option('-e, --env <env>', '部署环境 dev、test、prod 默认为 dev')
  .option('-h, --hot', '是否使用热更新 默认不启动')
  .action(d => {
    require('../scripts/dev')(d)
  })

//
program
  .command('build')
  .description('构建项目')
  .option('-s, --src <src>', '目标文件 默认为 src/index.ts')
  .option('-d, --dist <dist>', '目标 默认为 dist/')
  .option('-e, --env <env>', '部署环境 dev、test、prod 默认为 prod')
  .action(d => {
    require('../scripts/build')(d)
  })

program.parse(process.argv)
