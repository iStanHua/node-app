// app/shell.js

import shell from 'shelljs'

export default {
  push() {
    shell.echo('git push')
    shell.exec('git add .')
    shell.exec('git commit -am ".."')
    shell.exec('git pull origin master')
    shell.exec('git push origin master')
  }
}