//导演类，控制游戏的逻辑
/*
* 单例模式：构造器只会执行一次
* */
import { DataStore } from "./base/DataStore.js";
import { UpPencil } from "./runtime/UpPencil.js"
import { DownPencil } from "./runtime/DownPencil.js"

export class Director {
  constructor() {
    this.dataStore = DataStore.getInstance()
    this.moveSpeed = 2
  }
  
  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director()
    }
    return Director.instance
  }
  createPencil() {
    const maxTop = window.innerHeight / 2
    const minTop = window.innerHeight / 8
    const top = minTop + Math.random() * (maxTop - minTop)
    this.dataStore.get('pencils').push(new UpPencil(top))
    this.dataStore.get('pencils').push(new DownPencil(top))
  }
  
  birdsEvent() {
    this.dataStore.get('birds').y = this.dataStore.get('birds').birdsY
    this.dataStore.get('birds').time = 0
  }
  
  //判断小鸟是否和铅笔撞击
  static isStrike(bird, pencil) {
    let s = false
    if (bird.top > pencil.bottom ||
      bird.bottom < pencil.top ||
      bird.right < pencil.left ||
      bird.left > pencil.right
    ) {
      s = true
    }
    return !s
  }
  
  //判断小鸟是否撞击地板和铅笔
  checkImpact() {
    const birds = this.dataStore.get('birds')
    const land = this.dataStore.get('land')
    const pencils = this.dataStore.get('pencils')
    const score = this.dataStore.get('score')
    
    // 判断是否撞击地面
    if ((birds.birdsY[0] + birds.birdsHeight[0]) >= land.y) {
      this.isGameOver = true
      return
    }
    
    // 小鸟的边框模型
    const birdsBorder = {
      top: birds.y[0],
      bottom: birds.birdsY[0] + birds.birdsHeight[0],
      left: birds.birdsX[0],
      right: birds.birdsX[0] + birds.birdsWidth[0]
    }
    const length = pencils.length;
    for (let i = 0; i < length; i++) {
      const pencil = pencils[i];
      const pencilBorder = {
        top: pencil.y,
        bottom: pencil.y + pencil.height,
        left: pencil.x,
        right: pencil.x + pencil.width
      };
    
      if (Director.isStrike(birdsBorder, pencilBorder)) {
        this.isGameOver = true
        return
      }
    }
    //加分逻辑
    if (birds.birdsX[0] > pencils[0].x + pencils[0].width && score.isScore) {
      score.isScore = false
      score.scoreNumber++
    }
  }
  
  run() {
    this.checkImpact()
    if (!this.isGameOver) {
      this.dataStore.get('background').draw()
  
      const pencils = this.dataStore.get('pencils')
      const firstPencil = pencils[0]
      if (firstPencil.x + firstPencil.width <= 0 && pencils.length === 4) {
        // 如果最前的一对pencils出界，一一推出栈
        pencils.shift()
        pencils.shift()
        this.dataStore.get('score').isScore = true
      }
      if (firstPencil.x <= (window.innerWidth - pencils[0].width) / 2 && pencils.length === 2) {
        this.createPencil()
      }
  
      this.dataStore.get('pencils').forEach(item => {
        item.draw()
      })
      this.dataStore.get('land').draw()
      this.dataStore.get('birds').draw()
      this.dataStore.get('score').draw()
      let timer = requestAnimationFrame(() => this.run()) // 不断自己调用自己
      this.dataStore.set('timer', timer)
    } else {
      this.dataStore.get('startButton').draw()
      // localStorage记录最高分
      this.dataStore.get('record').score = this.dataStore.get('score').scoreNumber
      this.dataStore.get('record').draw()
      cancelAnimationFrame(this.dataStore.get('timer'))
      this.dataStore.destory()
    }
  }
}
