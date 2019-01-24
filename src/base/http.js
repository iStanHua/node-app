// base/http.js

import http from 'http'

export default {
  run() {
    const hostname = '127.0.0.1'
    const port = 8899

    const server = http.createServer((req, res) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      res.end('Hello World\n')
    })

    server.listen(port, hostname, () => {
      console.log(`\n服务器运行在 http://${hostname}:${port}/`)
    })
  }
}