// utils/ini.js

import fs from 'fs'

export default class Ini {
  /**
   * 读取ini文件
   * @param {String} fileName 文件名
   * @param {String} encoding 编码
   */
  constructor(fileName, encoding = 'utf-8') {
    this.fileName = fileName
    this.encoding = encoding || 'utf-8'

    // 当前位置
    this.currentSection = {}
  }

  // Parse
  parse() {
    return this.parseData(fs.readFileSync(this.fileName, this.encoding))
  }

  /**
   * Parse data
   * @param {Any} data 数据
   */
  parseData(data) {
    let lines = data.split(/\r\n|\r|\n/)
    let regex = {
      section: {
        key: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
        arr: /^\s*\[\s*([^\]]*)\s*\]\[\]\s*$/,
        obj: /^\s*\[\s*([^\]]*)\s*\]\[(\w+)\]\s*$/
      },
      param: {
        key: /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
        arr: /^\s*([\w\.\-\_]+)\[\]\s*=\s*(.*?)\s*$/,
        obj: /^\s*([\w\.\-\_]+)\[(\w+)\]\s*=\s*(.*?)\s*$/
      },
      comment: [/^\s*;.*$/, /^\s*#.*$/, /^\s*\/\/.*$/]
    }

    let cfg = {}
    this.currentSection = {}

    lines.forEach((line) => {
      // Check for comments
      regex.comment.forEach((patt) => {
        if (patt.test(line)) return
      })

      // Check for a section
      Object.keys(regex.section).forEach((type) => {
        if (regex.section[type].test(line)) {
          let match = line.match(regex.section[type])
          this.currentSection.type = type
          this.currentSection.name = match[1]
          switch (type) {
            case 'key':
              if (typeof (cfg[this.currentSection.name]) === 'undefined') cfg[this.currentSection.name] = {}
              break;
            case 'arr':
              if (typeof (cfg[this.currentSection.name]) === 'undefined') {
                cfg[this.currentSection.name] = []
                this.currentSection.index = 0
                cfg[this.currentSection.name][0] = {}
              } else this.currentSection.index++
              break
            case 'obj':
              if (typeof (cfg[this.currentSection.name]) === 'undefined') {
                cfg[this.currentSection.name] = {}
                cfg[this.currentSection.name][match[2]] = {}
              }
              this.currentSection.key = match[2]
              break
          }
        }
      })

      // Check for param
      Object.keys(regex.param).forEach((type) => {
        if (regex.param[type].test(line)) {
          let match = line.match(regex.param[type])
          switch (type) {
            case 'key':
              if (typeof (this.currentSection.name) === 'undefined') cfg[match[1]] = match[2]
              else this.addParam(type, cfg, match)
              break
            default:
              this.addParam(type, cfg, match)
              break
          }
        }
      })
    })
    return cfg
  }

  /**
   * Add param
   * @param {String} pType
   * @param {Object} cfg
   * @param {Object} match
   */
  addParam(pType, cfg, match) {
    switch (this.currentSection.type) {
      case 'key':
        if (pType === 'key') cfg[this.currentSection.name][match[1]] = match[2]
        else if (pType === 'arr') {
          if (typeof (cfg[this.currentSection.name][match[1]]) === 'undefined') {
            cfg[this.currentSection.name][match[1]] = []
            this.currentSection.pIndex = 0
          }
          cfg[this.currentSection.name][match[1]][this.currentSection.pIndex] = match[2]
          this.currentSection.pIndex++
        }
        else if (pType === 'obj') {
          if (typeof (cfg[this.currentSection.name][match[1]]) === 'undefined')
            cfg[this.currentSection.name][match[1]] = {}

          cfg[this.currentSection.name][match[1]][match[2]] = match[3]
        }
        break
      case 'arr':
        if (pType === 'key') {
          if (typeof (cfg[this.currentSection.name][this.currentSection.index]) === 'undefined')
            cfg[this.currentSection.name][this.currentSection.index] = {}

          cfg[this.currentSection.name][this.currentSection.index][match[1]] = match[2]
        }
        else if (pType === 'arr') {
          if (typeof (cfg[this.currentSection.name][this.currentSection.index][match[1]]) === 'undefined') {
            cfg[this.currentSection.name][this.currentSection.index][match[1]] = []
            this.currentSection.pIndex = 0
          }

          cfg[this.currentSection.name][this.currentSection.index][match[1]][this.currentSection.pIndex] = match[2]
          this.currentSection.pIndex++
        }
        else if (pType === 'obj') {
          if (typeof (cfg[this.currentSection.name][this.currentSection.index][match[1]]) === 'undefined')
            cfg[this.currentSection.name][this.currentSection.index][match[1]] = {}

          cfg[this.currentSection.name][this.currentSection.index][match[1]][match[2]] = match[3]
        }
        break
      case 'obj':
        if (pType === 'key') {
          if (typeof (cfg[this.currentSection.name][this.currentSection.key]) === 'undefined')
            cfg[this.currentSection.name][this.currentSection.key] = {}

          cfg[this.currentSection.name][this.currentSection.key][match[1]] = match[2]
        }
        else if (pType === 'arr') {
          if (typeof (cfg[this.currentSection.name][this.currentSection.key][match[1]]) === 'undefined') {
            cfg[this.currentSection.name][this.currentSection.key][match[1]] = []
            this.currentSection.pIndex = 0
          }

          cfg[this.currentSection.name][this.currentSection.key][match[1]][this.currentSection.pIndex] = match[2]
          this.currentSection.pIndex++
        }
        else if (pType === 'obj') {
          if (typeof (cfg[this.currentSection.name][this.currentSection.key][match[1]]) === 'undefined')
            cfg[this.currentSection.name][this.currentSection.key][match[1]] = {}

          cfg[this.currentSection.name][this.currentSection.key][match[1]][match[2]] = match[3]
        }
        break
    }
    return
  }

}