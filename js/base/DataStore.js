//变量缓存器，方便我们在不同的类中访问和修改变量
/*
* DataStore 存了 {ctx: canvas.getContext('2d')}
*               {images: 所有的img的Map}
*               所有Sprite的子类的实力
* */
export class DataStore {
  constructor() {
    this.map = new Map()
  }
  static getInstance() {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore()
    }
    return DataStore.instance
  }
  set(key, value) {
    // 实现链式操作
    if (typeof value === 'function') {
      value = new value()
    }
    this.map.set(key, value)
    return this
  }
  get(key) {
    return this.map.get(key)
  }
  destory() {
    // 不断销毁和创建
    // for (let key of this.map.keys()) {
    //   this.map.delete(key)
    // }
    this.map.clear()
  }
}
