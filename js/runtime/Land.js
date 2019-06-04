//不断移动的陆地

import { Sprite } from "../base/Sprite.js"
import { Director } from "../Director.js"

export class Land extends Sprite{
  constructor() {
    const image = Sprite.getImage('land')
    super(image,
      0, 0, image.width, image.height,
      0, window.innerHeight-image.height, image.width, image.height)
    // 地面的水平变化坐标
    this.landX = 0
    // 地面的移动速度
    this.landSpeed = Director.getInstance().moveSpeed // 由导演控制移动的速度
  }
  // 继承
  draw() {
    this.landX = this.landX + this.landSpeed
    if (this.landX > (this.img.width - window.innerWidth)) {
      // 重新画
      this.landX = 0
    }
    super.draw(
      this.img,
      this.srcX,
      this.srcY,
      this.srcW,
      this.srcH,
      - this.landX,
      this.y,
      this.width,
      this.height
    )
  }
}
