import React, { Component } from 'react';
import cls from 'classnames';
import { 
  ButtonGroup,
  AnchorButton,
  Popover,
  Classes
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';
import tools from './tools';
import { DraggableCore } from 'react-draggable';

const Btns = styled(ButtonGroup)`
  &&.disabled {
    opacity: 0.5;
  }
`

const Btn = styled(AnchorButton)`
  border-radius: 15px;
`

const ColorPicker = styled(AnchorButton)`
  &&.${Classes.ACTIVE} {
    background-color: white;
  }

  .${Classes.ICON} {
    color: inherit;
  }
`

export default class Menubar extends Component {
  state = {
    showSize: false
  }

  callOnChange (...args) {
    let { onChange } = this.props
    if (typeof onChange === 'function') {
      onChange.call(null, ...args)
    }
  }
  switchTool (tool) {
    if (tool !== this.props.tool) {
      this.callOnChange({tool})
    }
  }

  activePen = () => {
    this.switchTool(tools.PEN)
  }

  activeEraser = () => {
    this.switchTool(tools.ERASER)
  }

  changeColor = (color) => {
    let { r, g, b, a } = color.rgb
    this.callOnChange({ fillColor: `rgba(${[r, g, b, a].join()})` })
  }

  changeSize = (e, motion) => {
    let { deltaX } = motion
    this.callOnChange({ dotSize: this.props.dotSize + deltaX / 10})
  }

  changeSizeStart = () => {
    this.setState({ showSize: true })
  }

  changeSizeEnd = () => {
    this.setState({ showSize: false })
  }

  toggleDisabled = () => {
    this.callOnChange({ disabled: !this.props.disabled })
  }

  render () {
    let { tool, fillColor, dotSize, disabled } = this.props
    
    return (
      <Btns className={cls('draw-panel-menu', {disabled}, this.props.className)}>
        {/* 画笔 */}
        <AnchorButton 
          icon={IconNames.EDIT} 
          active={tool === tools.PEN} 
          onClick={this.activePen} 
        />
        {/* 橡皮 */}
        <AnchorButton 
          icon={IconNames.ERASER} 
          active={tool === tools.ERASER} 
          onClick={this.activeEraser} 
        />
        {/* 颜色 */}
        <Popover content={<SketchPicker color={fillColor} onChangeComplete={this.changeColor} />}>
          <ColorPicker icon={IconNames.TINT} style={{color: fillColor}} />
        </Popover>
        {/* 画笔大小 */}
        <DraggableCore
          onDrag={this.changeSize}
          onStart={this.changeSizeStart}
          onStop={this.changeSizeEnd}
        >
          <AnchorButton 
            icon={IconNames.CIRCLE} 
            text={this.state.showSize ? dotSize : undefined}
          />
        </DraggableCore>
        {/* 是否可用 */}
        <AnchorButton 
          icon={disabled ? IconNames.DISABLE : IconNames.CONFIRM}
          onClick={this.toggleDisabled}
        />
      </Btns>
    )
  }
}

// export default function (props) {
//   let { className, ...rest } = props
//   return (
//     <Popover content={<Menubar {...rest} />} className={cls(className)} >
//       <Btn icon={IconNames.STYLE} minimal />
//     </Popover>
//   )
// }