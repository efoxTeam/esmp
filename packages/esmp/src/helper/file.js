"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyPublicFolder = void 0;
require("path");
var fs_extra_1 = __importDefault(require("fs-extra"));
function copyPublicFolder(_a) {
    var out = _a.out, dist = _a.dist, template = _a.template, favicon = _a.favicon;
    if (!fs_extra_1.default.existsSync(out)) {
        // console.warn('public not exist!')
        return;
    }
    if (!fs_extra_1.default.existsSync(dist)) {
        // console.warn('dist not exist!')
        return;
    }
    var filters = [template, favicon];
    fs_extra_1.default.copySync(out, dist);
    //   fs.copySync(public, dist, {
    //     dereference: true,
    //     // filter: file => filters.indexOf(file) === -1,
    //     filter: file => {
    //       console.log(file, filters.indexOf(file))
    //       return filters.indexOf(file) === -1
    //     },
    //   })
}
exports.copyPublicFolder = copyPublicFolder;
