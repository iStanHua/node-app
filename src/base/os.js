// base/os.js

import os from 'os'

export default {
  run() {
    console.log('EOL:',os.EOL)
    console.log('arch:',os.arch())
    console.log('cpu:',os.cpus())
    console.log('endianness:',os.endianness())
    console.log('freemem:',os.freemem())
    console.log('homedir:',os.homedir())
    console.log('hostname:',os.hostname())
    console.log('loadavg:',os.loadavg())
    console.log('networkInterfaces:',os.networkInterfaces())
    console.log('platform:',os.platform())
    console.log('release:',os.release())
    console.log('tmpdir:',os.tmpdir())
    console.log('type:',os.type())
    console.log('uptime:',os.uptime())
  }
}