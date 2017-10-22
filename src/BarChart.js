import React from 'react';

const rectWidth = 50;
const height = 200;

class BarChart extends React.Component {
    render() {
        const { nodes } = this.props;
        return (
            <svg>
                <g className="nodes">
                    {nodes.map((node, idx) => {
                        return (
                            <rect key={idx} x={idx * rectWidth} y={height - node} width={rectWidth} height={node} fill='blue' stroke='#fff' />
                        )
                    })}
                </g>
            </svg>
        );
    };
};

export default BarChart;