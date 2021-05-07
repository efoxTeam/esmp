#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander")); // 命令行工具
var package_json_1 = __importDefault(require("../../package.json"));
commander_1.default.version(package_json_1.default.version, '-v, --version').usage('<command> [options]');
commander_1.default
    .command('dev')
    .description('调试项目')
    .option('-s, --src <src>', '目标文件 默认为 src/index.ts')
    .option('-pc, --public <public>', '目标 默认为 public/')
    .option('-e, --env <env>', '部署环境 dev、test、prod 默认为 dev')
    .option('-h, --hot', '是否使用热更新 默认不启动')
    .action(function (d) {
    require('../scripts/dev')(d);
});
//
commander_1.default
    .command('build')
    .description('构建项目')
    .option('-s, --src <src>', '目标文件 默认为 src/index.ts')
    .option('-d, --dist <dist>', '目标 默认为 dist/')
    .option('-e, --env <env>', '部署环境 dev、test、prod 默认为 prod')
    .action(function (d) {
    require('../scripts/build')(d);
});
commander_1.default.parse(process.argv);
