/**
 * LRU缓存(最近最少使用）
 * 算法实现思路：基于一个双链表的数据结构，在没有满员的情况下，新来的 k-v 放在链表的头部，
 * 以后每次获取缓存中的 k-v 时就将该k-v移到最前面，缓存满的时候优先淘汰末尾的。
 * 双向链表的特点，具有头尾指针，每个节点都有 prev(前驱) 和 next(后继) 指针分别指向他的前一个和后一个节点。
 */
export default class LRUCache {
  /**
   * @param {Number} limit 缓存容量 为0时不限容量
   */
  constructor(limit) {
    this.limit = limit || 100
    //head 指针指向表头元素，即为最常用的元素
    this.head = this.tail = undefined
    this.map = {}
    this.size = 0
  }
  get(key, IfreturnNode) {
    let node = this.map[key]
    // 如果查找不到含有`key`这个属性的缓存对象
    if (node === undefined) return
    // 如果查找到的缓存对象已经是 tail (最近使用过的)
    if (node === this.head) { //判断该节点是不是是第一个节点
      // 是的话，皆大欢喜，不用移动元素，直接返回
      return returnnode ?
        node :
        node.value
    }
    // 不是头结点，铁定要移动元素了
    if (node.prev) { //首先要判断该节点是不是有前驱
      if (node === this.tail) { //有前驱，若是尾节点的话多一步，让尾指针指向当前节点的前驱
        this.tail = node.prev
      }
      //把当前节点的后继交接给当前节点的前驱去指向。
      node.prev.next = node.next
    }
    if (node.next) { //判断该节点是不是有后继
      //有后继的话直接让后继的前驱指向当前节点的前驱
      node.next.prev = node.prev
      //整个一个过程就是把当前节点拿出来，并且保证链表不断，下面开始移动当前节点了
    }
    node.prev = undefined //移动到最前面，所以没了前驱
    node.next = this.head //注意！！！ 这里要先把之前的排头给接到手！！！！让当前节点的后继指向原排头
    if (this.head) {
      this.head.prev = node //让之前的排头的前驱指向现在的节点
    }
    this.head = node //完成了交接，才能执行此步！不然就找不到之前的排头啦！
    return IfreturnNode ?
      node :
      node.value
  }
  set(key, value) {
    // 之前的算法可以直接存k-v但是现在要把简单的 k-v 封装成一个满足双链表的节点
    //1.查看是否已经有了该节点
    let node = this.get(key, true)
    if (!node) {
      if (this.size === this.limit) { //判断缓存是否达到上限
        //达到了，要删最后一个节点了。
        if (this.tail) {
          this.tail = this.tail.prev
          this.tail.prev.next = undefined
          //平滑断链之后，销毁当前节点
          this.tail.prev = this.tail.next = undefined
          this.map[this.tail.key] = undefined
          //当前缓存内存释放一个槽位
          this.size--
        }
        node = {
          key: key
        }
        this.map[key] = node
        if (this.head) {//判断缓存里面是不是有节点
          this.head.prev = node
          node.next = this.head
        } else {
          //缓存里没有值，皆大欢喜，直接让head指向新节点就行了
          this.head = node
          this.tail = node
        }
        this.size++//减少一个缓存槽位
      }
    }
    //节点存不存在都要给他重新赋值啊
    node.value = value
  }
}

/**
 * FIFO队列算法实现缓存
 * 需要一个对象和一个数组作为辅助
 * 数组记录进入顺序
 * 设置缓存上限，当达到了缓存上限的时候，按照先进先出的策略进行淘汰，再增加进新的 k-v 。
 */
export class FIFOCache {
  constructor(limit) {
    this.limit = limit || Number.MAX_VALUE
    this.map = {}
    this.keys = []
  }
  set(key, value) {
    let map = this.map
    let keys = this.keys
    if (!Object.prototype.hasOwnProperty.call(map, key)) {
      if (keys.length === this.limit) {
        // 先进先出，删除队列第一个元素
        delete map[keys.shift()]
      }
      keys.push(key)
    }
    // 无论存在与否都对map中的key赋值
    map[key] = value
  }
  get(key) {
    return this.map[key]
  }
}