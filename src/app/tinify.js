// app/tinify.js

import tinify from 'tinify'

tinify.key = 'ZhXNBBnf5qwJnNPMBXC4Zb27qdYGZVgJ'

export default {
  run() {
    tinify.fromFile('panda-happy.png').toFile('panda-happy-optimized.png')
  }
}