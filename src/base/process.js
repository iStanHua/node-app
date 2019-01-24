// base/process.js

console.log('<process>进程</process>')

const unhandledRejections = new Map()

process.on('unhandledRejection', (reason, p) => {
  unhandledRejections.set(p, reason)
})

process.on('rejectionHandled', (p) => {
  unhandledRejections.delete(p)
})

process.on('warning', (warning) => {
  console.warn(warning.name)    // 打印告警名称
  console.warn(warning.message) // 打印告警信息
  console.warn(warning.stack)   // 打印堆栈信息
})

console.log(`进程 ${process.argv&&process.argv[2]} 执行。`)

process.on('exit', (code) => {
  console.log(`即将退出，退出码：${code}`)
})