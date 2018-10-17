import React, { Component } from 'react'
import withDrawPanel from './withDrawPanel';

class _Path01 extends Component {
  $path = React.createRef()

  state = {
    pathLength: 0,
    pathDashOffset: 0
  }

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

  componentDidMount () {
    let tl = this.$path.current.getTotalLength()
    this.setState({
      pathLength: tl,
      pathDashOffset: tl
    }, this.dashAnim)
  }

  componentWillUnmount () {

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
      </g>
    )
  }
}

export const Path01 = withDrawPanel(_Path01) 