import React from 'react';
import BubbleChart from './BubbleChart';
import data from './data/spotify.js';

class ChartPage extends React.Component{
  render() {
    return <BubbleChart data={data} />
  }
};

export default ChartPage;
