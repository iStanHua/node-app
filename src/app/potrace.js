// app/potrace.js

import potrace from 'potrace'
import fs from 'fs'

export default {
  run() {
    potrace.trace('faces.png', {
      // background: '#ffffff',
      // color: 'black',
      threshold: 128
    }, (err, svg) => {
      if (err) console.log(err)
      fs.writeFileSync('faces.svg', svg)
    });
  }
}