import React, { Component } from 'react';
import './App.css';

import BarChart from './BarChart'

class App extends Component {
  render() {
    return (
      <BarChart nodes={[100, 250, 175, 200, 120]}/>
    );
  }
}

export default App;
