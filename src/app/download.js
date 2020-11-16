// app/download.js

import download from 'download';
import ProgressBar from 'progress';
import decompress from 'decompress';

export default {
  async run() {
    await download('https://nodejs.org/dist/v14.15.0/node-v14.15.0-win-x64.zip', 'assets')
    decompress('./assets/node-v14.15.0-win-x64.zip', 'assets').then(files => {
      const bar = new ProgressBar(':bar', { total: 10, width: 18 });
      let timer = setInterval(function () {
        bar.tick()
        if (bar.complete) {
          console.log('\ncomplete\n')
          clearInterval(timer)
        }
      }, 100)
    });
  }
};
