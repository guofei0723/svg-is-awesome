import React from 'react';
import { runInRoot, QRCode } from '../../commons';
import * as examples from './examples'
import ArticleBlock from './articleblock'

const All = props => {
  return (
    <div>
      {Object.entries(examples).map(([_, Example], i) => (
        <ArticleBlock key={i}
          articleId={Example.articleId}
          title={Example.articleTitle}
          source={Example.sourceCode}
        >
          <Example />
        </ArticleBlock>
      ))}

      <QRCode />
    </div>
  )
}

runInRoot(() => <All />)