// app/ffmpeg.js

import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'

export default {
  run() {
    ffmpeg('./src/sources/input.avi')
      // .input('./src/sources/logo.png')
      .on('filenames', function (filenames) {
        console.log('Will generate ' + filenames.join(', '))
      })
      .on('start', (res) => {
        console.log(`Spawned Ffmpeg with command: ${res}`)
      })
      .on('progress', (progress) => {
        console.log(`Progressing: ${progress.percent}% done`)
      })
      .on('end', () => {
        console.log('Finished processing')
      })
      .on('error', function (err) {
        console.log(err)
      })
      .addOptions([
        '-vcodec libx264',
        '-c:a aac',
        '-bufsize 3000k'
      ])
      .save('./src/sources/mov.mp4')
      .screenshots({
        count: 4,
        folder: './src/sources',
        filename: 'thumbnail-%s.png',
        size: '320x240'
      })

  }
}