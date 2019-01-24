// base/child_process.js 子进程

import { spawn, exec, fork } from 'child_process'

export default {
  run() {
    // const start = spawn('npm.cmd', ['run', 'app'])
    const start = spawn('node', ['./src/base/process.js', 10])
    start.on('data', (data) => {
      console.log(`输出：${data}`)
    })

    start.on('error', (data) => {
      console.log(`错误：${data}`)
    })

    start.on('close', (code) => {
      console.log(`子进程退出码：${code}`)
    })

    const defaults = {
      encoding: 'utf8',
      timeout: 0,
      maxBuffer: 200 * 1024,
      killSignal: 'SIGTERM',
      cwd: './src/base',
      env: null
    }

    for (var i = 0; i < 3; i++) {
      let worker_process = fork('./src/base/process.js', [i])
      worker_process.on('close', function (code) {
        console.log('子进程已退出，退出码 ' + code)
      })
    }

    exec('node process 100', defaults, (err, stdout, stderr) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(stdout)
    })
  }
}