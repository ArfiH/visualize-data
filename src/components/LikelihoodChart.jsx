import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const LikelihoodChart = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState('sector');
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
    const width = 1200;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 100, left: 50 };

    svg.selectAll("*").remove(); // Clear previous chart

    // Parse data and group by selected category (sector or topic)
    const parsedData = data.map(d => ({
      category: d[category],
      likelihood: d.likelihood
    })).filter(d => d.category && d.likelihood !== null); // Filter out invalid data

    // Group data by category and calculate mean likelihood
    const groupedData = d3.rollups(
      parsedData,
      v => d3.mean(v, d => d.likelihood),
      d => d.category
    ).map(([key, value]) => ({ category: key, meanLikelihood: value }));

    // Create scales
    const x = d3.scaleBand()
      .domain(groupedData.map(d => d.category))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(groupedData, d => d.meanLikelihood)]).nice()
      .range([height - margin.bottom, margin.top]);

    // Create axes
    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll("text")
      .attr("transform", "rotate(-40)")
      .style("text-anchor", "end");

    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove());

    // Draw bars
    svg.append("g")
      .selectAll("rect")
      .data(groupedData)
      .join("rect")
      .attr("x", d => x(d.category))
      .attr("y", d => y(d.meanLikelihood))
      .attr("height", d => y(0) - y(d.meanLikelihood))
      .attr("width", x.bandwidth())
      .attr("fill", "steelblue")
      .append("title")  // Tooltip
      .text(d => `${category.charAt(0).toUpperCase() + category.slice(1)}: ${d.category}\nMean Likelihood: ${d.meanLikelihood.toFixed(2)}`);

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

  }, [data, category]);

  return (
    <div>
      <div>
        <h4>Filter: </h4>
        <label>
          <input
            type="radio"
            name="category"
            value="sector"
            checked={category === 'sector'}
            onChange={() => setCategory('sector')}
          />
          Sector
        </label>
        <label>
          <input
            type="radio"
            name="category"
            value="topic"
            checked={category === 'topic'}
            onChange={() => setCategory('topic')}
          />
          Topic
        </label>
      </div>
      <svg ref={svgRef} width="1200" height="400"></svg>
    </div>
  );
};

export default LikelihoodChart;
