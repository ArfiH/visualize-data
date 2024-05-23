import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const LikelihoodBarChart = () => {
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
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    svg.selectAll("*").remove(); // Clear previous chart

    // Parse data and group by start_year
    const parsedData = data.map(d => ({
      start_year: +d.start_year,
      likelihood: +d.likelihood
    })).filter(d => d.start_year && d.likelihood); // Filter out invalid data

    // Group data by year
    const groupedData = d3.rollups(
      parsedData,
      v => d3.sum(v, d => d.likelihood),
      d => d.start_year
    ).map(([year, likelihood]) => ({ year, likelihood }));

    // Set up scales
    const x = d3.scaleBand()
      .domain(groupedData.map(d => d.year))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(groupedData, d => d.likelihood)]).nice()
      .range([height - margin.bottom, margin.top]);

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Add bars
    svg.selectAll('.bar')
      .data(groupedData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.year))
      .attr('y', d => y(d.likelihood))
      .attr('width', x.bandwidth())
      .attr('height', d => height - margin.bottom - y(d.likelihood))
      .attr('fill', 'steelblue')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .attr('fill', 'orange');

        // Show tooltip
        const [xPos, yPos] = d3.pointer(event, svg.node());
        d3.select('#tooltip')
          .style('left', `${xPos + 10}px`)
          .style('top', `${yPos - 10}px`)
          .style('display', 'block')
          .text(`Year: ${d.year}, Likelihood: ${d.likelihood}`);
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('fill', 'steelblue');

        // Hide tooltip
        d3.select('#tooltip')
          .style('display', 'none');
      });

    // Add axes labels
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width / 2 + margin.left)
      .attr("y", height - 10)
      .text("Year");

    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", -height / 2 + margin.top)
      .attr("y", margin.left / 2 - 10)
      .attr("transform", "rotate(-90)")
      .text("Likelihood");

  }, [data]);

  return (
    <div>
      <svg ref={svgRef} width={800} height={400}></svg>
      <div id="tooltip" style={{
        position: 'absolute',
        backgroundColor: 'white',
        border: '1px solid black',
        padding: '5px',
        display: 'none',
        pointerEvents: 'none'
      }}></div>
    </div>
  );
};

export default LikelihoodBarChart;
