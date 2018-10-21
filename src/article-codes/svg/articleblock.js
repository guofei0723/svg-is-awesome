import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const sourcePre = 'https://github.com/guofei0723/svg-is-awesome/tree/master/src/article-codes/svg/examples/'

const Wrapper = styled.div`
  margin: 20px;
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`

const TitleName = styled.a`
  flex: 0 0 auto;
  font-weight: bold;

`

const SourceName = styled.a`
  flex: 0 0 auto;
  color: slateblue;
`

const Content = styled.div`

`

export default function ArticleBlock (props) {
  
  return (
    <Wrapper>
      <Title>
        <TitleName
          id={props.articleId}
          href={'#' + props.articleId}
        >
          {props.title}
        </TitleName>
        <SourceName 
          href={sourcePre + props.source}
          target="_blank"
        >
          {'<View Source />'}
        </SourceName>
      </Title>
      <Content>
        {props.children}
      </Content>
    </Wrapper>
  )
}

ArticleBlock.propTypes = {
  /**
   * 文章id
   */
  articleId: PropTypes.string.isRequired,
  /**
   * 文章标题
   */
  title: PropTypes.string.isRequired,
  /**
   * 源文件
   */
  source: PropTypes.string.isRequired
}