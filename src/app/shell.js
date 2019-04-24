// app/shell.js

import shell from 'shelljs'

export default {
  push() {
    shell.exec('npm view stan-cli version')
    shell.echo('git push')
    shell.exec('git add .')
    shell.exec('git commit -am ".."')
    shell.exec('git pull origin master')
    shell.exec('git push origin master')
  },
  cd(p) {
    shell.cd(p)
  },
  ls() {
    shell.ls().forEach(l => console.log(l))
  }
}