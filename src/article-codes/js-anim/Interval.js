import React, { Component } from 'react';
import { DrawPanel } from '../../commons/components';
import styled from 'styled-components';

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
  }

  render () {
    let items = Array(10).fill(0)
    let sh = 20
    let h = this.height / items.length
    let gap = h > sh ? sh : 1
    let step = this.width / items.length

    return (
      <DrawPanel>
        <Container>
          <svg width="100%" height="100%">
            {items.map((_, i) => (
              <TimeLine x1={i * step} y1={0} x2={i * step} y2={this.height} key={i} />
            ))}
            {items.map((_, i) => (
              <Step x={i * step} y={i * h} width={5} height={h - gap} key={i} />
            ))}
          </svg>
        </Container>
      </DrawPanel>
    )
  }
}