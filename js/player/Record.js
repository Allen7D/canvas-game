// 分数记录
import { DataStore } from "../base/DataStore.js"

export class Record {
  constructor() {
    this.ctx = DataStore.getInstance().ctx
  }
  set score(value) {
    if (value > localStorage.getItem("score")) localStorage.setItem("score", value)
  }
  get score() {
    return localStorage.getItem("score") || 0
  }
  draw() {
    this.ctx.font = '25px Arial'
    this.ctx.fillStyle = 'black'
    this.ctx.fillText(
      `最高记录:${this.score}`, window.innerWidth / 2 - 70, window.innerHeight / 2.5 + 100, 1000
    )
  }
}
