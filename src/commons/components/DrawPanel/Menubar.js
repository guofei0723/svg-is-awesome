import React, { Component } from 'react';
import cls from 'classnames';
import { 
  ButtonGroup,
  AnchorButton,
  Popover
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import styled from 'styled-components';
import tools from './tools';

const Btn = styled(AnchorButton)`
  border-radius: 15px;
`

class Menubar extends Component {
  switchTool (tool) {
    let { onChange } = this.props

    if (tool !== this.props.tool) {
      if (typeof onChange === 'function') {
        onChange.call(null, {tool})
      }
    }
  }

  activePen = () => {
    this.switchTool(tools.PEN)
  }

  activeEraser = () => {
    this.switchTool(tools.ERASER)
  }

  render () {
    let { tool } = this.props
    
    return (
      <ButtonGroup className={cls('draw-panel-menu')}>
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
        <AnchorButton icon={IconNames.TINT} />
        {/* 画笔大小 */}
        <AnchorButton icon={IconNames.CIRCLE} />
      </ButtonGroup>
    )
  }
}

export default function (props) {
  let { className, ...rest } = props
  return (
    <Popover content={<Menubar {...rest} />} className={cls(className)} >
      <Btn icon={IconNames.STYLE} minimal />
    </Popover>
  )
}