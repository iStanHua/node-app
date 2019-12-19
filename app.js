// app.js

import readline from 'readline';

import childProcess from './src/base/child_process';
import Cluster from './src/base/cluster';
import crypto from './src/base/crypto';
import Dns from './src/base/dns';
import Fs from './src/base/fs';
import Http from './src/base/http';
import Net from './src/base/net';
import Os from './src/base/os';
import Path from './src/base/path';
import Readline from './src/base/readline';
import Url from './src/base/url';
import Vm from './src/base/vm';
import Zlib from './src/base/zlib';

import Potrace from './src/app/potrace';
import Vector from './src/app/vector';
import Ico from './src/app/ico';
import Puppeteer from './src/app/puppeteer';
import Tinify from './src/app/tinify';
import Shell from './src/app/shell';
import FFmpeg from './src/app/ffmpeg';
import Forge from './src/app/forge';
import Pngjs from './src/app/pngjs';
import Officegen from './src/app/officegen';

let completions = [];
Fs.readFiles('./src', completions, '.js');
completions.push('exit');
completions.sort();

const contexts = Fs.context(process.cwd() + '/src');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>',
  completer: line => {
    const hits = completions.filter(c => c.startsWith(line));
    // 如果没匹配到y则展示全部补全
    return [hits.length ? hits : completions, line];
  }
});

rl.prompt();

rl.on('line', line => {
  switch (line.trim()) {
    case 'child_process':
      childProcess.run();
      break;
    case 'cluster':
      Cluster.run();
      break;
    case 'crypto':
      crypto.run();
      break;
    case 'dns':
      Dns.run();
      break;
    case 'fs':
      let files = [];
      Fs.readFiles('./src', files);
      console.log(files);
      break;
    case 'http':
      Http.run();
      break;
    case 'net':
      Net.unOccupiedPort(8899).then(res => console.log(res));
      break;
    case 'os':
      Os.run();
      break;
    case 'path':
      Path.run('/dist/app.js');
      break;
    case 'readline':
      Readline.readLine('trace.json', txt => {
        setTimeout(() => {
          Readline.writeLine('trace.txt', txt);
        }, 1000);
      });
      break;
    case 'url':
      Url.run();
      break;
    case 'vm':
      Vm.run();
      break;
    case 'zlib':
      Zlib.run();
      break;

    case 'potrace':
      Potrace.run();
      break;
    case 'vector':
      Vector.run();
    case 'ico':
      Ico.run();
      break;
    case 'puppeteer':
      Puppeteer.run();
      break;

    case 'tinify':
      Tinify.run();
      break;
    case 'shell':
      Shell.push();
      break;
    case 'ls':
      Shell.ls();
      break;
    case 'ffmpeg':
      FFmpeg.run();
      break;
    case 'forge':
      Forge.run();
      break;
    case 'pngjs':
      Pngjs.run();
      break;
    case 'officegen':
      Officegen.run();
      break;

    case 'exit':
      process.exit(0);
      break;
    default:
      console.log(`你输入的是：'${line.trim()}'`);
      break;
  }
  rl.prompt();
}).on('close', () => {
  process.exit(0);
});

// ctrl+C
rl.on('SIGINT', () => {
  rl.question('终止批处理操作吗(Y/N)? ', answer => {
    if (answer.match(/^y(es)?$/i)) rl.close();
  });
});
