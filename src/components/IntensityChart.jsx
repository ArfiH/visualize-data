import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const IntensityChart = () => {
  const [data, setData] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    axios.get('http://localhost:5173/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    svg.selectAll("*").remove(); // Clear previous chart

    const x = d3.scaleBand()
      .domain(data.map(d => d.sector))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)]).nice()
      .range([height - margin.bottom, margin.top]);

    svg.append('g')
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(data)
      .enter().append('rect')
      .attr('x', d => x(d.sector))
      .attr('y', d => y(d.intensity))
      .attr('height', d => y(0) - y(d.intensity))
      .attr('width', x.bandwidth())
      // .attr("viewBox", `600 600 ${width} ${height}`)

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, [data]);

  return (
    <svg ref={svgRef} width={600} height={400}></svg>
  );
};

export default IntensityChart;
