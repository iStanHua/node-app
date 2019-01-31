// base/zlib.js

import zlib from 'zlib'
import fs from 'fs'

export default {
  run() {
    this.gzip('app.js')
    this.deflate('hello node.js')
    this.unzip('eJzLSM3JyVfIy09J1csqBgAiyQTm')

  },
  gzip(fileName) {
    const gzip = zlib.createGzip()
    const inp = fs.createReadStream(fileName)
    const out = fs.createWriteStream(`${fileName}.gz`)
    inp.pipe(gzip).pipe(out)
  },
  // 数据压缩
  deflate(input) {
    zlib.deflate(input, (err, buffer) => {
      if (!err) {
        console.log('deflate:' + buffer.toString('base64'))
      } else {
      }
    })
  },
  // 数据解缩
  unzip(buffer) {
    const buffer1 = Buffer.from(buffer, 'base64')
    zlib.unzip(buffer1, (err, buffer) => {
      if (!err) {
        console.log('unzip:' + buffer.toString())
      } else {
        return ''
      }
    })
  }
}