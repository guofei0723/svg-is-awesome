import React, { Component } from 'react'
import withDrawPanel from './withDrawPanel';

class _Path01 extends Component {
  $path = React.createRef()
  $plain = React.createRef()

  state = {
    pathLength: 0,
    pathDashOffset: 0,
    // 飞机走过的距离
    plainDistance: 0,
  }

  /**
   * 描线动画
   */
  dashAnim = () => {
    if (!this._prevTime) this._prevTime = new Date()
    let now = new Date()
    let diff = (now - this._prevTime) / 1000
    
    this._prevTime = now

    this.setState(prev => {
      let offset = prev.pathDashOffset - diff * 800
      if (offset <= -prev.pathLength) offset = prev.pathLength
      return {
        pathDashOffset: offset
      }
    })

    this._animFrame = requestAnimationFrame(this.dashAnim)
  }

  startDashAnim () {
    this.setState({ pathDashOffset: this.state.pathLength }, this.dashAnim)
  }

  
  /**
   * 沿路径飞行动画
   */
  plainAnim = () => {
    // 初始化上一次时间
    if (!this._prevPlainTime) this._prevPlainTime = new Date()
    // 当前时间
    let now = new Date()
    // 时间差，秒
    let diff = (now - this._prevPlainTime) / 1000
    // 记录本次动画时间
    this._prevPlainTime = now
    
    this.setState(prev => {
      let distance = prev.plainDistance + diff * 400
      if (distance >= prev.pathLength) distance -= prev.pathLength
      return {
        plainDistance: distance
      }
    })
    
    this._plainAnimFrame = requestAnimationFrame(this.plainAnim)
  }
  
  /**
   * 计算飞机transform
   */
  calPlainTransform () {
    if (!this.$path.current) return 

    let { plainDistance } = this.state
    // 当前距离所在的坐标
    let {x, y} = this.$path.current.getPointAtLength(plainDistance)
    // 往后一个单位所在的坐标，用于计算角度
    let {x: xback, y: yback} = this.$path.current.getPointAtLength(plainDistance - 1)
    // 方向角度，度数
    let direction = Math.atan2(y - yback, x - xback) * 180 / Math.PI

    return `translate(${x}, ${y}) rotate(${direction})`
  }

  startPlainAnim () {
    this.setState({ plainDistance: 0 }, this.plainAnim)
  }


  componentDidMount () {
    let tl = this.$path.current.getTotalLength()
    this.setState({
      pathLength: tl
    }, this.plainAnim)
  }

  componentWillUnmount () {
    cancelAnimationFrame(this._animFrame)
    cancelAnimationFrame(this._plainAnimFrame)
  }

  render () {
    
    return (
      <g 
        transform="translate(430, 155)"
      >
        <path 
          d="M -200 -100 C -400 -200, -400 200, -200 100 L 200 -100 C 400 -200, 400 200, 200 100 Z"
          strokeWidth={1} 
          stroke="steelblue" 
          fill="none"
          strokeDasharray={this.state.pathLength}
          strokeDashoffset={this.state.pathDashOffset}
          ref={this.$path}
        />
        <path 
          d="M -5 0 L -20 -10 L20 0 L-20 10 Z"
          fill="red"
          transform={this.calPlainTransform()}
          ref={this.$plain}
        />
      </g>
    )
  }
}

export const Path01 = withDrawPanel(_Path01) 