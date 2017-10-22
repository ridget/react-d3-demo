import React from 'react';
import PieChart from './PieChart';
import data from './data/spotify.js';

class ChartPage extends React.Component{
  render() {
    return <PieChart nodes={data} />
  }
};

export default ChartPage;
