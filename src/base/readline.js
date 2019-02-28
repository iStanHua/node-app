// base/readline.js 逐行读取

import readline from 'readline'
import fs from 'fs'

export default {
  run() {
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
  },
  /**
   * 逐行读取
   * @param {String} fileName 文件名
   * @param {Function} cb     回调函数
   */
  readLine(fileName, cb) {
    if (!fileName) {
      console.warn('文件名不能为空')
      return
    }
    let readStream = fs.createReadStream(fileName)

    readStream.on('open', function (fd) {
      console.log('开始读取文件')
    })
    readStream.on('end', function () {
      console.log('文件已全部读取完毕')
    })
    readStream.on('close', function () {
      console.log('文件被关闭')
    })
    readStream.on('error', function (err) {
      console.log('读取文件失败')
    })
    const rl = readline.createInterface({
      input: readStream
    })

    rl.on('line', (input) => {
      if (typeof cb === 'function')
        cb(input)
    })

  },
  /**
   * 逐行写入
   * @param {String} fileName 文件名
   * @param {String} content  写入内容
   */
  writeLine(fileName, content) {
    if (!fileName) {
      console.warn('文件名不能为空')
      return
    }
    if (!content) {
      console.warn('写入内容不能为空')
      return
    }

    fs.appendFileSync(fileName, content+'\t', 'utf8')
  }
}