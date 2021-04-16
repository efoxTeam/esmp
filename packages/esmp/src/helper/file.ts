import path from 'path'
import fs from 'fs-extra'
function copyPublicFolder({out, dist, template, favicon}:any) {
  if (!fs.existsSync(out)) {
    // console.warn('public not exist!')
    return
  }
  if (!fs.existsSync(dist)) {
    // console.warn('dist not exist!')
    return
  }
  const filters = [template, favicon]
  fs.copySync(out, dist)
  //   fs.copySync(public, dist, {
  //     dereference: true,
  //     // filter: file => filters.indexOf(file) === -1,
  //     filter: file => {
  //       console.log(file, filters.indexOf(file))
  //       return filters.indexOf(file) === -1
  //     },
  //   })
}

export {copyPublicFolder}
