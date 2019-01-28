// base/buffer.js 缓冲器

const buf = Buffer.from('hello world', 'ascii')
console.log('ascii:' + buf)
console.log('hex:' + buf.toString('hex'))
console.log('base64:' + buf.toString('base64'))
console.log('utf16le:' + buf.toString('utf16le'))
console.log('latin1:' + buf.toString('latin1'))

const buf0 = new Buffer([0x62, 0x75, 0x66, 0x66, 0x65, 0x72])
console.log('new:' + buf0)

const buf1 = Buffer.from('1234')
const buf2 = Buffer.from('0123')
const arr = [buf1, buf2]

console.log(arr.sort(Buffer.compare))

const str = 'http://nodejs.cn/'
const buf3 = Buffer.allocUnsafe(str.length)

for (let i = 0; i < str.length; i++) {
  buf3[i] = str.charCodeAt(i)
}

console.log(buf3.toString('ascii'))