import React from 'react';
import { runInRoot } from '../../commons';
import Interval from './Interval';

const All = props => {
  return (
    <div>
      <Interval />
    </div>
  )
}

runInRoot(() => <All />)