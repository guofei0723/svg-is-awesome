import React, { Component } from 'react';
import cls from 'classnames';
import styled from 'styled-components';
import { DraggableCore } from 'react-draggable';
import { AnchorButton, Popover } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { ImageWrapper, imageSize } from '../ImageWrapper';
import Menubar from './Menubar';
import tools from './tools';

const Canvas = styled.canvas`
  position: absolute;
  left: 0;
  top: 0;
`

const MenuBtn = styled(Menubar)`
  position: absolute;
  top: 5px;
  right: 5px;
`

export class DrawPanel extends Component {
  $canvas = React.createRef()

  state = {
    painter: {
      dotSize: 0.5,
      fillColor: 'rgba(0, 0, 0, 0.5)',
      tool: tools.PEN
    }
  }

  // 鼠标按下处理
  mousedownHandler = (e) => {
    // canvas 边框相对视口的位置
    let { left: bx, top: by } = this.$canvas.current.getBoundingClientRect()
    // 鼠标位置
    let { clientX: mx, clientY: my } = e
    // 鼠标相对canvas的位置
    let [x, y] = [mx - bx, my - by]

    this.setState({
      x, y, prevX: x, prevY: y
    })

    console.log('mouse down: ', x, y)
  }

  // 拖动开始，鼠标按下即会解下
  startHandler = (e, d) => {
    this.getAction()(d.x, d.y)
  }

  // 拖动处理器
  dragHandler = (e, d) => {
    // 距离上一个点的距离长度
    let length = Math.sqrt(d.deltaX * d.deltaX + d.deltaY * d.deltaY)
    // 鼠标移动的方向角度
    let rad = Math.atan2(d.deltaY, d.deltaX)

    let action = this.getAction()

    // 在鼠标移动方向上每隔一个像素单位画一个点
    for(let pass = 1; pass < length; pass++) {
      let dx = pass * Math.cos(rad)
      let dy = pass * Math.sin(rad)
      action(d.lastX + dx, d.lastY + dy)
    }
    // 在目标坐标上画一个点
    action(d.x, d.y)
  }

  /**
   * 在给定的坐标处画一个点
   * @param {number} x
   * @param {number} y 
   * @param {string} color
   */
  paintDot (x, y, color) {
    this.ctx.fillStyle = color || this.state.painter.fillColor
    this.ctx.beginPath()
    this.ctx.arc(x, y, this.state.painter.dotSize, 0, 2 * Math.PI)
    this.ctx.fill()
  }

  /**
   * 清除给定坐标上的内容
   * @param {number} x 
   * @param {number} y 
   */
  eraseDot (x, y) {
    this.ctx.save()
    this.ctx.globalCompositeOperation = 'destination-out'
    this.paintDot(x, y, '#000')
    this.ctx.restore()
  }

  /**
   * 获取当前使用什么动作
   */
  getAction = () => {
    switch (this.state.painter.tool) {
      case tools.ERASER:
        return (...args) => this.eraseDot(...args)
      case tools.PEN:
        return (...args) => this.paintDot(...args)
    }
  }

  painterChangeHandler = (change) => {
    this.setState(prev => ({
      painter: {...prev.painter, ...change}
    }))
  }

  componentDidMount () {
    this.ctx = this.$canvas.current.getContext('2d')
  }

  render () {
    return (
      <ImageWrapper className={cls('draw-panel')}>
        {this.props.children}
        <DraggableCore
          // onMouseDown={this.mousedownHandler}
          onStart={this.startHandler}
          onDrag={this.dragHandler}
        >
          <Canvas 
            innerRef={this.$canvas} 
            width={imageSize.width} 
            height={imageSize.height}
          >
          </Canvas>
        </DraggableCore>
        <MenuBtn {...this.state.painter} onChange={this.painterChangeHandler} />
      </ImageWrapper>
    )
  }
}