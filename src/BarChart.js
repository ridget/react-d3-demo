import React from 'react';
import * as d3 from 'd3';

const rectWidth = 50;

class BarChart extends React.Component {
    constructor(props) {
        super(props);
        const { nodes } = this.props;
        this.rectWidth = 50;
        this.margins = { top: 20, right: 20, bottom: 20, left: 20 }
        this.width = (nodes.length * this.rectWidth) + this.margins.left + this.margins.right;
        const yMax = d3.max(nodes, d => d.popularity)
        this.height = 900;
        this.yScale = d3.scaleLinear().domain([0, yMax]).range([this.height - this.margins.bottom, this.margins.top]);
        this.yAxis = d3.axisLeft().scale(this.yScale).ticks(nodes.length);
        this.heightScale = d3.scaleLinear().domain([0, yMax]).range([0, this.height - this.margins.bottom - this.margins.top])
    }
    componentDidMount() { this.renderAxis(); }
    renderAxis() {
        d3.select(".axis").call(this.yAxis);
    }

    render() {
        const { nodes } = this.props;
        return (
            <svg height={this.height} width={this.width} style={{ marginLeft: this.margins.left }}>
                <g className="nodes" transform={`translate(${this.margins.left}, 0)`}>
                    {nodes.map((node, idx) => {
                        return (
                            <rect key={idx} x={idx * rectWidth} y={this.yScale(node.popularity)} width={this.rectWidth} height={this.heightScale(node.popularity)} fill='blue' stroke='#fff' />
                        )
                    })}
                </g>
                <g className="axis" transform={`translate(${this.margins.left}, 0)`}>
                </g>
            </svg>
        );
    };
};

export default BarChart;