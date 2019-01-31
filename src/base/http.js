// base/http.js

import http from 'http'
import zlib from 'zlib'
import fs from 'fs'

export default {
  run() {
    const hostname = '127.0.0.1'
    const port = 8899

    http.createServer((request, response) => {
      const raw = fs.createReadStream('index.html')
      let acceptEncoding = request.headers['accept-encoding']
      if (!acceptEncoding) {
        acceptEncoding = ''
      }
      if (/\bdeflate\b/.test(acceptEncoding)) {
        response.writeHead(200, { 'Content-Encoding': 'deflate' })
        raw.pipe(zlib.createDeflate()).pipe(response)
      } else if (/\bgzip\b/.test(acceptEncoding)) {
        response.writeHead(200, { 'Content-Encoding': 'gzip' })
        raw.pipe(zlib.createGzip()).pipe(response)
      } else {
        response.writeHead(200, {})
        raw.pipe(response)
      }
    }).listen(port, hostname, () => {
      console.log(`\n服务器运行在 http://${hostname}:${port}/`)
    })

    this.flush()
  },
  flush() {
    http.createServer((request, response) => {
      // 为了简单起见，省略了对 Accept-Encoding 的检测
      response.writeHead(200, { 'content-encoding': 'gzip' })
      const output = zlib.createGzip()
      output.pipe(response)

      setInterval(() => {
        output.write(`The current time is ${Date()}\n`, () => {
          // 数据已经传递给了 zlib，但压缩算法看能已经决定缓存数据以便得到更高的压缩效率。
          output.flush()
        })
      }, 1000)
    }).listen(1337)
  }
}