// base/fs.js 文件系统

import fs from 'fs'
import path from 'path'

export default {
  /**
   * 读取目录文件
   * @param {String} filePath 文件目录
   * @param {Array} files     文件集合
   * @param {String} ext      扩展名
   */
  readFiles(filePath, files, ext) {
    fs.readdirSync(filePath).forEach((file) => {
      var stat = fs.statSync(path.join(filePath, file))
      if (stat.isDirectory()) {
        //递归读取文件
        this.readFiles(path.join(filePath, file), files, ext)
      } else {
        if (ext) {
          if (path.extname(file) === ext) {
            files.push(path.basename(file, ext))
          }
        }
        else {
          files.push(file)
        }
      }
    })
  }
}