import React, { Component } from 'react';
import { DrawPanel } from '../../commons/components';
import styled from 'styled-components';
import { DraggableCore } from 'react-draggable';


const Container = styled.div`
  flex: 0 0 auto;
  align-self: stretch;
  position: relative;
  width: 800px;
  border: 1px solid;
`

const TimeLine = styled.line`
  stroke-dasharray: 4;
  stroke-width: 1;
  stroke: lightgray;
`

const Step = styled.rect`
  fill: steelblue;
`

export default class Interval extends Component {
  constructor (props) {
    super(props)

    this.height = 350
    this.width = 800

    this.state = {
      steps: Array(10).fill(5).map(s => s + this.randomW())
    }
  }

  raiseStep = (dw, i) => {
    this.setState(prev => ({
      steps: prev.steps.map((step, si) => si === i ? step + dw : step)
    }))
  }

  randomW () {
    return Math.floor(Math.random() * 10)
  }

  render () {
    let { timer='interval', title='setInterval' } = this.props
    let items = this.state.steps
    let sh = 20
    let h = this.height / items.length
    let gap = h > sh ? sh : 1
    let step = this.width / items.length
    let totalW = 0

    return (
      <DrawPanel title={title}>
        <Container>
          <svg width="100%" height="100%">
            {/* {items.map((_, i) => (
            ))} */}
            {items.map((stepW, i) => {
              let w = totalW
              let x = timer === 'timeout' ? w + i * step : i * step
              totalW += stepW

              return (
                <React.Fragment key={i}>
                  <TimeLine x1={x} y1={0} x2={x} y2={this.height} />
                  <DraggableCore onDrag={(e, {deltaX}) => this.raiseStep(deltaX, i)}>
                    <Step x={x} y={i * h} width={stepW} height={h - gap} />
                  </DraggableCore>
                </React.Fragment>
              )
            })}
          </svg>
        </Container>
      </DrawPanel>
    )
  }
}