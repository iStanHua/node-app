// base/readline.js

import readline from 'readline'
import fs from 'fs'

export default {
  run() {
    console.log('<readline>逐行读取</readline>')

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })


    rl.on('line', (input) => {
      console.log(`接收到：${input}`)
    })

    rl.question('你认为 Node.js 中文网怎么样？', (answer) => {
      console.log(`多谢你的反馈：${answer}`)
      // rl.close()
    })

    rl.on('pause', () => {
      console.log('Readline 被暂停。')
    })

    rl.on('resume', () => {
      console.log('Readline 被恢复。')
    })

    rl.on('SIGCONT', () => {
      // `prompt` 会自动恢复流
      rl.prompt()
    })

    // ctrl+C
    rl.on('SIGINT', () => {
      rl.question('确定要退出吗？ ', (answer) => {
        if (answer.match(/^y(es)?$/i)) rl.close()
      })
    })

    // ctrl+Z
    rl.on('SIGTSTP', () => {
      // 这会重写 SIGTSTP，且防止程序进入后台。
      console.log('捕获 SIGTSTP。')
    })

    rl.write('删除这个！')
    // 模拟 Ctrl+u 删除写入的前一行。
    rl.write(null, { ctrl: true, name: 'u' })

    const rl1 = readline.createInterface({
      input: fs.createReadStream('README.md'),
      crlfDelay: Infinity
    });

    rl1.on('line', (line) => {
      console.log(`文件的单行内容：${line}`)
    })
  }
}