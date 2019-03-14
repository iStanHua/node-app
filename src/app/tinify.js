// app/tinify.js

import tinify from 'tinify'

tinify.key = 'ZhXNBBnf5qwJnNPMBXC4Zb27qdYGZVgJ'

export default {
  run() {
    tinify.fromFile('./src/images/panda-happy.png').toFile('./src/images/panda-happy-optimized.png')
  }
}