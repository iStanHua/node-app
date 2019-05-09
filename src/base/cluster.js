// base/cluster.js

import cluster from 'cluster'
import http from 'http'
import os from 'os'

const numCPUs = os.cpus().length

export default {
  run() {
    if (cluster.isMaster) {
      console.log(`Master ${process.pid} is running`)

      // Fork workers.
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork().on('disconnect', () => {
          console.log(`Worker has disconnected`)
        })
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
      })
    }
    else {
      http.createServer((req, res) => {
        res.writeHead(200)
        res.end('hello world\n')
      }).listen(8000)

      console.log(`Worker ${process.pid} started`)
    }
  }
}