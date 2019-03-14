// app/tinify.js

import tinify from 'tinify'

tinify.key = 'ZhXNBBnf5qwJnNPMBXC4Zb27qdYGZVgJ'

export default {
  run() {
    tinify.fromFile('./src/sources/panda-happy.png').toFile('./src/sources/panda-happy-optimized.png')
  }
}