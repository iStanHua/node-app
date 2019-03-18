// app/ffmpeg.js

import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'

export default {
  run() {
    ffmpeg('./src/sources/th.gif')
      // .input('./src/sources/th-1.gif')
      .output(fs.createReadStream('./src/sources/th.webm'))
      .on('end', function () {
        console.log('Finished processing')
      })
      .run()
  }
}