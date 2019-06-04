// 资源文件加载器；确保 Canvas 在图片资源加载完成后，才进行渲染
import { Resources } from './Resources.js'

export class ResourceLoader {
  constructor() {
    this.map = new Map(Resources)
    for (let [key, value] of this.map) {
      const image = new Image()
      image.src = value
      this.map.set(key, image)
    }
  }
  
  onLoaded(callback) {
    let loadedCount = 0
    // Image的onload方法；以下达到了promise.all的效果
    for (let value of this.map.values()) {
      value.onload = () => {
        loadedCount++
        if (loadedCount >= this.map.size) {
          // 加载完成才执行回调
          callback(this.map)
        }
      }
    }
  }
  
  static create() {
    return new ResourceLoader()
  }
}
