// base/net.js 网络

import net from 'net'

export default {
  /**
   * 没有被占用的端口号
   * @param {Number} port 端口号
   */
  unOccupiedPort(port) {
    return new Promise((resolve, reject) => {
      // 创建服务并监听该端口
      let server = net.createServer().listen(port)

      server.on('listening', () => {
        // 关闭服务
        server.close()
        resolve(port)
      })

      // server.listen(() => {
      //   console.log('opened server on', server.address())
      // })

      server.on('error', (e) => {
        console.log(e)
        // 端口已经被使用
        if (e.code === 'EADDRINUSE') {
          port++
          this.portIsOccupied(port)
        }
      })
    })
  }
}