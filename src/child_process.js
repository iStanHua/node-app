import { spawn, exec } from 'child_process'

console.log('\n-----------start-----------')
console.log('<child_process>子进程</child_process>')

const start = spawn('npm.cmd', ['run', 'app'])

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
  cwd: './src',
  env: null
}

exec('node process', defaults, (err, stdout, stderr) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(stdout)

  console.log('------------end------------')
})

