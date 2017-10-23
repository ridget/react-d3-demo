import React from 'react';
import * as d3 from 'd3';
import ReactTooltip from 'react-tooltip';

const BUBBLE_PADDING = 4;

class BubbleChart extends React.Component {
  constructor(props) {
    super(props);
    const { nodes } = this.props;
    this.force = d3.forceSimulation(nodes);
    this.state = {
      nodes
    };
  }
  componentDidMount() {
    // 1. place balls at their ideal starting place
    // 2. keep within bounds
    // 3. balls can only gravity vertically  (force x, *with* max strength) (no force y) - forces are centrifugal
    // 4. balls must not collide             (forceCollide)
    // 5. balls must group in x ranges

    const { height, chartWidth } = this.props;
    const { nodes } = this.state;
    this.force
      .force('x', d3.forceX(d => d.x).strength(1))  // 3. 5.
      .force('collide', d3.forceCollide().radius(d => d.z + BUBBLE_PADDING));  // 4.

    this.force.on('tick', () => {
      // incrementally update position for each tick (about 300 times)
      nodes.forEach(d => {
        d.x = Math.min(chartWidth - d.z, d.x);  // 2. within x limits
        d.y = Math.min(height - d.z, d.y); // 2. within y limits
      });
      this.setState({ nodes: nodes });
    });
  }

  render() {
    const { nodes } = this.state;
    const { height, width, margins } = this.props;
    return (
      <div>
      <svg height={height} width={width} style={{ marginLeft: margins.left }}>
        <g className="nodes" transform={`translate(${margins.left + margins.right}, 0)`}>
          {nodes.map((node, idx) => {
            return (
              <g key={idx} data-tip data-for={`node-${idx}`}>
                <circle r={node.z} cx={node.x} cy={node.y} fill={node.color} />
              </g>
            )
          })}
        </g>
      </svg>

      {nodes.map((node, idx) => (
      <ReactTooltip key={idx} id={`node-${idx}`} effect="solid" position="top" offset={{ top: 8, right: node.z - (node.z * .01) }}>
        {node.name}
      </ReactTooltip>
      ))}
      </div>
    )
  };
};

const Chart = ({ data }) => {
  const margins = { top: 20, right: 20, bottom: 20, left: 20 }
  const width = 800;
  const height = 900;
  const chartWidth = width - margins.left - margins.right;
  // this.radius = (this.width  - 120)/ 2;
  // this.pieData = d3.pie().sort(null).value((d) => d.popularity);
  // this.path = d3.arc().outerRadius(this.radius - 10).innerRadius(0);
  // this.label = d3.arc().outerRadius(this.radius + 40).innerRadius(this.radius - 20);
  // this.yScale = d3.scaleLinear().domain([0, yMax]).range([this.height - this.margins.bottom, this.margins.top]);
  // this.yAxis = d3.axisLeft().scale(this.yScale).ticks(nodes.length);
  // this.heightScale = d3.scaleLinear().domain([0, yMax]).range([0, this.height - this.margins.bottom - this.margins.top])
  const xScale = d3.scaleLinear().domain(d3.extent(data, (d) => d.popularity)).range([0, width]);
  const rScale = d3.scaleLinear().domain(d3.extent(data, (d) => d.duration)).range([10, 60]);
  const colorScale = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  const nodes = data.map((node) => {
    const z = rScale(node.duration);
    return {
      x: xScale(node.popularity),
      y: height - z,
      z,
      color: colorScale(node.duration),
      name: node.name,
      artist: node.artist,
      duration: node.duration
    }
  });

  return <BubbleChart width={width}
    height={height}
    margins={margins}
    nodes={nodes}
    xScale={xScale}
    chartWidth={chartWidth}
  />


};

export default Chart;
