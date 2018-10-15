import React, { Component } from 'react';
import { DrawPanel } from '../../../commons/components';
import styled from 'styled-components';

const Container = styled.div`
  flex: 0 0 auto;
  align-self: stretch;
  position: relative;
  width: 900px;
  box-shadow: inset 0 0 1px gray;
  padding: 20px;
`

export default function (WrappedComponent) {
  return class extends Component {
    render () {
      let { title, ...restProps } = this.props

      return (
        <DrawPanel title={title}>
          <Container>
            <svg width="100%" height="100%">
              <WrappedComponent {...restProps} />
            </svg>
          </Container>
        </DrawPanel>
      )
    }
  }
}