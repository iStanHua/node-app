// app/pngjs.js

import { PNG } from 'pngjs/browser'
import fs from 'fs'

export default {
  run() {
    this.avatarCricle('./src/sources/panda-happy.png', './src/sources/panda-happy-output.png')
    this.fromDocs('./src/sources/faces.png', './src/sources/faces-output.png')
    this.sync('./src/sources/faces.png', './src/sources/faces-sync.png')
    this.newFile()
  },
  avatarCricle(input, output) {
    fs.createReadStream(input)
      .pipe(new PNG({ filterType: 4 }))
      .on('parsed', function () {
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2
            if (Math.pow(x - this.width / 2, 2) + Math.pow(y - this.height / 2, 2) > Math.pow(this.width / 2, 2)) {
              this.data[idx + 3] = 0
            }
          }
        }
        this.pack().pipe(fs.createWriteStream(output))
      })
  },
  fromDocs(input, output) {
    fs.createReadStream(input)
      .pipe(new PNG({ filterType: -1 }))
      .on('parsed', function () {
        // for (var y = 0; y < this.height; y++) {
        //   for (var x = 0; x < this.width; x++) {
        //     var idx = (this.width * y + x) << 2;

        //     // invert color
        //     this.data[idx] = 255 - this.data[idx];
        //     this.data[idx + 1] = 255 - this.data[idx + 1];
        //     this.data[idx + 2] = 255 - this.data[idx + 2];

        //     // and reduce opacity
        //     this.data[idx + 3] = this.data[idx + 3] >> 1;
        //   }
        // }
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;

            if (Math.abs(this.data[idx] - this.data[idx + 1]) <= 1
              && Math.abs(this.data[idx + 1] - this.data[idx + 2]) <= 1)
              this.data[idx] = this.data[idx + 1] = this.data[idx + 2];

          }
        }
        this.pack().pipe(fs.createWriteStream(output))
      })
  },
  newFile() {
    var newfile = new PNG({ width: 100, height: 100 });
    for (var y = 0; y < newfile.height; y++) {
      for (var x = 0; x < newfile.width; x++) {
        var idx = (newfile.width * y + x) << 2;

        var col = x < (newfile.width >> 1) ^ y < (newfile.height >> 1) ? 0xe5 : 0xff;

        newfile.data[idx] = col;
        newfile.data[idx + 1] = col;
        newfile.data[idx + 2] = col;
        newfile.data[idx + 3] = 0xff;
      }
    }

    newfile.pack()
      .pipe(fs.createWriteStream('./src/sources/newfile.png'))
      .on('finish', function () {
        console.log('Written!');
      });
  },
  sync(input, output) {
    var data = fs.readFileSync(input)
    // Parse it
    var png = PNG.sync.read(data, {
      filterType: -1,
      inputHasAlpha: true
    });
    // Pack it back into a PNG data
    var buff = PNG.sync.write(png,{ colorType: 6 });
    // Write a PNG file
    fs.writeFileSync(output, buff);
  }
}