/**
 * Created by 傅令杰
 * 铅笔的基类
 */
import { Sprite } from "../base/Sprite.js"
import { Director } from "../Director.js"

export class Pencil extends Sprite {
  constructor(image, top) {
    // 「铅笔」刚好在视图之外
    super(image,
      0, 0, image.width, image.height,
      window.innerWidth, 0, image.width, image.height)
    this.top = top
  }
  
  draw() {
    this.x = this.x - Director.getInstance().moveSpeed
    // 当铅笔走出「视图」，即铅笔的x点距离「视图」等于自身的宽度
    super.draw(this.img,
      0, 0, this.width, this.height,
      this.x, this.y, this.width, this.height)
  }
}
