import React from 'react';
import * as d3 from 'd3';
import BarChart from './BarChart';
import data from './data/spotify.js';

class ChartPage extends React.Component{
  render() {
    return <BarChart nodes={data} />
  }
};

export default ChartPage;
