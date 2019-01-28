// app.js

import readline from 'readline'
import shell from 'shelljs'

shell.ls('*.js').forEach(file=>{
  console.log(file)
})

import childProcess from './src/base/child_process'
import Dns from './src/base/dns'
import Fs from './src/base/fs'
import Http from './src/base/http'
import Net from './src/base/net'
import Path from './src/base/path'
import Readline from './src/base/readline'

import Tinify from './src/app/tinify'
import Shell from './src/app/shell'

let completions = []
Fs.readFiles('./src', completions, '.js')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>>',
  completer: (line) => {
    const hits = completions.filter((c) => c.startsWith(line))
    // 如果没匹配到y则展示全部补全
    return [hits.length ? hits : completions, line]
  }
})

rl.prompt()

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'child_process':
      childProcess.run()
      break
    case 'dns':
      Dns.run()
      break
    case 'fs':
      let files = []
      Fs.readFiles('./src', files)
      console.log(files)
      break
    case 'http':
      Http.run()
      break
    case 'net':
      Net.unOccupiedPort(8899).then(res => console.log(res))
      break
    case 'path':
      Path.run('./app.js')
      break
    case 'readline':
      Readline.run()
      break

    case 'tinify':
      Tinify.run()
      break
    case 'shell':
      Shell.push()
      break
    default:
      console.log(`你输入的是：'${line.trim()}'`)
      break;
  }
  rl.prompt()
}).on('close', () => {
  process.exit(0)
})

// ctrl+C
rl.on('SIGINT', () => {
  rl.question('终止批处理操作吗(Y/N)? ', (answer) => {
    if (answer.match(/^y(es)?$/i)) rl.close()
  })
})