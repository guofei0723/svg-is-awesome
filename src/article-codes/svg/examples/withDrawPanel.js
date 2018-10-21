import React, { Component } from 'react';
import styled from 'styled-components';
import { Slider } from '@blueprintjs/core';
import { DrawPanel } from '../../../commons/components';

const Container = styled.div`
  flex: 0 0 auto;
  align-self: stretch;
  position: relative;
  width: 900px;
  box-shadow: inset 0 0 1px gray;
  padding: 20px;
`

Container.displayName = 'Container'

const Scaler = styled(Slider)`
  position: absolute;
  right: -50px;
  top: 50px;
`

export default function (WrappedComponent) {
  return class extends Component {
    state = {
      scale: 1
    }

    scaleHandler = (v) => {
      this.setState({ scale: v })
    }

    render () {
      let { title, ...restProps } = this.props
      let style = {transform: `scale(${this.state.scale})`}

      return (
        <DrawPanel title={title}  canvasScale={this.state.scale}>
          <Container style={style}>
            <WrappedComponent {...restProps} />
          </Container>
          <Scaler 
            max={1.5}
            min={0.5}
            stepSize={0.1}
            labelStepSize={0.5}
            onChange={this.scaleHandler}
            value={this.state.scale}
            vertical
          />
        </DrawPanel>
      )
    }
  }
}