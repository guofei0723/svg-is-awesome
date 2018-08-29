import React from 'react';
import styled from 'styled-components';
import cls from 'classnames';

const TheWrapper = styled.div`
  position: relative;
  width: 900px;
  height: 350px;

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