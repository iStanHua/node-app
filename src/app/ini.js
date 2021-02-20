// app/ini.js

import Ini from '../utils/ini'

export default {
  run() {
    let ini = new Ini('./assets/config.ini')
    console.log(ini.parse())
  }
}
