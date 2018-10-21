import React, { Component } from 'react'
import styled from 'styled-components'

import qrImg from './qrcode.jpg';

const Wrapper = styled.div`
  position: fixed;
  z-index: 100;
  width: 128px;
  right: 0;
  bottom: 0;
`

const Img = styled.img`
  width: 128px;
`

const Desc = styled.div`
  font-size: 12px;
  color: slategrey;
`

export class QRCode extends Component {

  render () {
    return (
      <Wrapper>
        <Desc>
          微信扫码查看文章解析
        </Desc>
        <Img 
          src={qrImg}
        />
      </Wrapper>
    )
  }
}