import React, { Component } from 'react'
import withDrawPanel from './withDrawPanel';

class _Path01 extends Component {
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
        />
      </g>
    )
  }
}

export const Path01 = withDrawPanel(_Path01) 