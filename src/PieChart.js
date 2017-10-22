import React from 'react';
import * as d3 from 'd3';

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    const { nodes } = this.props;
    this.margins = { top: 20, right: 20, bottom: 20, left: 20 }
    this.width = 800;
    this.height = 900;
    this.radius = (this.width  - 120)/ 2;
    this.pieData = d3.pie().sort(null).value((d) => d.popularity);
    this.path = d3.arc().outerRadius(this.radius - 10).innerRadius(0);
    this.label = d3.arc().outerRadius(this.radius + 40).innerRadius(this.radius - 20);
    // this.yScale = d3.scaleLinear().domain([0, yMax]).range([this.height - this.margins.bottom, this.margins.top]);
    // this.yAxis = d3.axisLeft().scale(this.yScale).ticks(nodes.length);
    // this.heightScale = d3.scaleLinear().domain([0, yMax]).range([0, this.height - this.margins.bottom - this.margins.top])
    this.color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  }
  labelTransform(node) {
    return `translate(${this.label.centroid(node)})`;
  }
  render() {
    const { nodes } = this.props;
    return (
      <svg height={this.height} width={this.width} style={{ marginLeft: this.margins.left }}>
        <g transform={`translate(${this.radius}, ${this.height / 2})`}>
          {this.pieData(nodes).map((node, idx) => {
            return (
              <g key={idx} className="arc">
                <path d={this.path(node)} fill={this.color(node.data.duration)} />
                <text transform={this.labelTransform(node)} dy="0.6em">
                  {node.data.name}
                </text>
              </g>
            )
          })}
        </g>
      </svg>
    );
  };
};

export default PieChart;
