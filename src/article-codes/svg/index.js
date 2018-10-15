import React from 'react';
import { runInRoot } from '../../commons';
import * as examples from './examples'

const All = props => {
  return (
    <div>
      <examples.Path01 />
    </div>
  )
}

runInRoot(() => <All />)