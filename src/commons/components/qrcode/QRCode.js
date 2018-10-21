import React, { Component } from 'react'
import styled, { css, keyframes } from 'styled-components'

import qrImg from './qrcode.jpg';

const Wrapper = styled.div`
  position: fixed;
  z-index: 100;
  width: 128px;
  right: 0;
  bottom: 0;
`

const Img = styled.img`
  flex: 0 0 auto;
  width: 128px;
`

// 翻转动画
const flipAnim = keyframes`
  0% {
    transform: scaleX(1);
  }

  25% {
    transform: scaleX(0);
  }

  50% {
    transform: scaleX(-1);
  }

  75% {
    transform: scaleX(0);
  }

  100% {
    transform: scaleX(1);
  }
`
const shake = 3
const shakeAnim = keyframes`
  0% {
    transform: translateX(0);
  }

  10% {
    transform: translateX(${-shake}px);
  }

  15% {
    transform: translateX(${shake}px);
  }

  20% {
    transform: translateX(${-shake}px);
  }

  25% {
    transform: translateX(${shake}px);
  }

  30% {
    transform: translateX(0);
  }
`

// 缩小时的尺寸样式
const minimalStyle = css`
width: 26px;
height: 26px;
border-radius: 13px;
background-color: rgba(255, 255, 255, 0.1);
animation: ${shakeAnim} 1.2s infinite;
`

// 正常时的尺寸样式
const normalStyle = css`
  width: 128px;
  height: 128px;
  border-radius: 0;
`

const ImgWrapper = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  transition: all .2s ease;
  ${p => p.minimal ? minimalStyle : normalStyle}
`

const QRContent = styled.div`
  display: flex;
  width: 128px;
  height: 128px;
  align-items: center;
  justify-content: center;
`

const Desc = styled.div`
  font-size: 12px;
  color: slategrey;
  text-align: center;
  transition: all .2s ease;
  opacity: ${p => p.minimal ? 0 : 1};
`

export class QRCode extends Component {
  state = {
    minimal: true
  }

  /**
   * 切换最小状态
   */
  toggleMinimal = () => {
    this.setState(prev => ({
      minimal: !prev.minimal
    }))
  }

  render () {
    return (
      <Wrapper>
        <Desc minimal={this.state.minimal}>
          微信扫码查看文章
        </Desc>
        <QRContent>
          <ImgWrapper 
            minimal={this.state.minimal}
            onClick={this.toggleMinimal}
          >
            <Img 
              src={qrImg}
            />
          </ImgWrapper>
        </QRContent>
      </Wrapper>
    )
  }
}