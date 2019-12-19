// app/vector.js

import { bitmap2vector } from 'bitmap2vector';
import fs from 'fs';

export default {
  async run() {
    const out = await bitmap2vector({
      input: fs.readFileSync('./src/sources/logo.png')
    });
    fs.writeFileSync('./src/sources/logo.svg', out.content);
  }
};
