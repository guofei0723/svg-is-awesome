import React from 'react';
import { runInRoot } from '../../commons';
import Timer from './timer';

const All = props => {
  return (
    <div>
      <Timer />
      <Timer timer="timeout" title="setTimeout" />
    </div>
  )
}

runInRoot(() => <All />)