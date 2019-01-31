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
  },

  /**
  * 递归创建目录
  * @param {String} sourcePath  来源路径
  */
  createDir(sourcePath) {
    if (fs.existsSync(sourcePath)) {
      return true
    } else {
      if (this.create(path.dirname(sourcePath))) {
        fs.mkdirSync(sourcePath)
        return true
      }
    }
  },

  /**
  * 删除目录
  * @param {String} sourcePath  来源路径
  */
  deleteDir(sourcePath) {
    if (fs.existsSync(sourcePath)) {
      fs.readdirSync(sourcePath).forEach(file => {
        var curPath = path.join(sourcePath, file)
        if (fs.statSync(curPath).isDirectory()) {
          this.delete(curPath)
        } else {
          fs.unlinkSync(curPath)
        }
      })
      fs.rmdirSync(sourcePath)
    }
  },
  /**
   * 读取目录文件内容
   * @param {String} filePath 文件目录
   * @param {String} ext      扩展名
   */
  context(filePath, ext = '.js') {
    let files = {}
    let list = fs.readdirSync(filePath)
    for (let i = 0; i < list.length; i++) {
      const file = list[i]
      let stat = fs.statSync(path.join(filePath, file))
      if (stat.isDirectory()) {
        this.context(path.join(filePath, file), ext)
      } else {
        if (path.extname(file) === ext) {
          if (file.indexOf('buffer') > -1 || file.indexOf('process') > -1) continue
          files[path.basename(file, ext)] = require(path.join(filePath, file))
        }
      }
    }
    return files
  }
}