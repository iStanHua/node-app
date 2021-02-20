// app/ico.js

import pngToIco from 'png-to-ico'
import fs from 'fs'

export default {
  run() {
    pngToIco('./src/sources/logo.png', {
      sizes: [16, 24, 32, 48, 64, 128, 256]
    }).then(buf => {
      fs.writeFileSync('./src/sources/logo.ico', buf)
    }).catch(console.error)
  }
}
