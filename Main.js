// 初始化整个游戏的精灵，作为游戏开始的入口
/*
* 第1步，加载所有的图片
* 第2步，将图片存入dataStore中
* 第3步，director从dataStore中提取图片，并画出(必须加载完图片，才能画)
* */
import { ResourceLoader } from './js/base/ResourceLoader.js'
import { BackGround } from "./js/runtime/BackGround.js"
import { DataStore } from "./js/base/DataStore.js"
import { Director } from "./js/Director.js"
import { Land } from "./js/runtime/Land.js"
import { Birds } from "./js/player/Birds.js"
import { StartButton } from "./js/player/StartButton.js"
import { Score } from "./js/player/Score.js"
import { Record } from "./js/player/Record.js"

export class Main {
  constructor(domId) {
    this.canvas = document.getElementById(domId)
    this.ctx = this.canvas.getContext('2d')
    this.dataStore = DataStore.getInstance()
    this.director = Director.getInstance()
    
    let loader = ResourceLoader.create()
    loader.onLoaded(map => this.onResourceFirstLoaded(map))
    
/*
// image.onload的作用，并且用onLoaded做了替换
    let image = new Image()
    image.src = '../assets/images/background.png'
    image.onload = () => {
      this.ctx.drawImage(
        image,
        0, // 开始剪裁的位置
        0,
        image.width, // 剪裁的大小
        image.height,
        0, // 放置的位置，数字增大则向右&下偏移
        0,
        image.width, // 使用的图片大小
        image.height
      )
    }
    */
  }
  
  onResourceFirstLoaded(map) {
    this.dataStore.ctx = this.ctx // 存放于类变量中
    this.dataStore.images = map
    this.init()
  }
  
  init() {
    this.director.isGameOver = false
    // this.dataStore.images 代替了 map
    this.dataStore
        .set('pencils', [])
        .set('background', BackGround)
        .set('land', Land)
        .set('birds', Birds)
        .set('score', Score)
        .set('startButton', StartButton)
        .set('record', Record)
  
    this.registerEvent()
    
    // 在游戏逻辑运行之前，创建铅笔
    this.director.createPencil()
    this.director.run()
  }
  
  registerEvent() {
    this.canvas.addEventListener('touchstart', e => {
      // 屏蔽掉JS的事件冒泡
      e.preventDefault()
      if (this.director.isGameOver) {
        this.init()
      } else {
        this.director.birdsEvent()
      }
    })
  }
}
