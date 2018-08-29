import React from 'react';
import styled from 'styled-components';
import cls from 'classnames';

export const imageSize = {
  width: 900,
  height: 350
}

const TheWrapper = styled.div`
  position: relative;
  width: ${imageSize.width}px;
  height: ${imageSize.height}px;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const ImageWrapper = props => {
  return (
    <TheWrapper className={cls('image-wrapper', props.className)} >
      { props.children }
    </TheWrapper>
  )
}