import React, { Component } from 'react';
import cls from 'classnames';
import { 
  ButtonGroup,
  AnchorButton
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons'

export default class Menubar extends Component {
  render () {
    return (
      <ButtonGroup className={cls('draw-panel-menu')}>
        <AnchorButton icon={IconNames.WALK} />
        <AnchorButton icon={IconNames.PANEL_STATS} />
        <AnchorButton icon={IconNames.ERASER} />
      </ButtonGroup>
    )
  }
}