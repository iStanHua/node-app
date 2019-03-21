// base/vm.js 虚拟机

import vm from 'vm'
import util from 'util'

export default {
  run() {
    const x = 1
    const sandbox = { x: 2 }
    vm.createContext(sandbox) // Contextify the sandbox.

    const code = 'x += 40; var y = 17;'
    // x and y are global variables in the sandboxed environment.
    // Initially, x has the value 2 because that is the value of sandbox.x.
    vm.runInContext(code, sandbox)

    console.log(sandbox.x) // 42
    console.log(sandbox.y) // 17

    console.log(x) // 1; y is not defined.

    this.script()
  },
  script() {
    const sandbox = {
      animal: 'cat',
      count: 2
    }

    let script = new vm.Script('count += 1; name = "kitty";')

    const context = vm.createContext(sandbox)
    for (let i = 0; i < 10; ++i) {
      script.runInContext(context)
    }

    console.log(util.inspect(sandbox)) // { animal: 'cat', count: 12, name: 'kitty' }

    script = new vm.Script('globalVar = "set"');

    const sandboxes = [{}, {}, {}];
    sandboxes.forEach((sandbox) => {
      script.runInNewContext(sandbox);
    });

    console.log(util.inspect(sandboxes)) // [{ globalVar: 'set' }, { globalVar: 'set' }, { globalVar: 'set' }]

    global.globalVar = 0

    script = new vm.Script('globalVar += 1', { filename: 'myfile.vm' })

    for (let i = 0; i < 1000; ++i) {
      script.runInThisContext()
    }

    console.log(globalVar) // 1000
  }
}