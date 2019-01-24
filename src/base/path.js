// base/path.js  路径

import path from 'path'

export default {
  run(name) {
    console.log(name)
    console.log(`process.env.PATH:${process.env.PATH}`)
    console.log(`基本名:${path.basename(name)}`)
    console.log(`目录名:${path.dirname(name)}`)
    console.log(`扩展名:${path.extname(name)}`)
    console.log(`没有扩展名基本名:${path.extname(name)}`, path.extname(name))
    console.log(`format:${path.format({ root: name, dir: '/home/user/dir', base: 'file.txt' })}`)
    console.log(`isAbsolute:${path.isAbsolute(name)}`)
    console.log(`isAbsolute:${path.isAbsolute('foo/..')}`)
    console.log(`join:${path.join(name, 'src', 'app', '..')}`)
    console.log(`parse:${JSON.stringify(path.parse(name))}`)
    console.log(`resolve:${path.resolve(name, 'app')}`)
  }
}