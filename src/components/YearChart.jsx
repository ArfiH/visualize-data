import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const YearChart = () => {
  const [data, setData] = useState([]);
  const [yearType, setYearType] = useState('start_year');
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
    const margin = { top: 20, right: 30, bottom: 100, left: 50 };

    svg.selectAll("*").remove(); // Clear previous chart

    // Parse data
    const parsedData = data.map(d => ({
      pestle: d.pestle,
      year: d[yearType]
    })).filter(d => d.pestle && d.year); // Filter out invalid data

    // Group data by pestle and calculate mean year
    const groupedData = d3.rollups(
      parsedData,
      v => d3.mean(v, d => d.year),
      d => d.pestle
    ).map(([key, value]) => ({ pestle: key, meanYear: value }));

    // Create scales
    const x = d3.scaleBand()
      .domain(groupedData.map(d => d.pestle))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([d3.min(groupedData, d => d.meanYear), d3.max(groupedData, d => d.meanYear)]).nice()
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

    // Draw line
    const line = d3.line()
      .x(d => x(d.pestle) + x.bandwidth() / 2)
      .y(d => y(d.meanYear));

    svg.append("path")
      .datum(groupedData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    // Add circles with tooltips
    svg.append("g")
      .selectAll("circle")
      .data(groupedData)
      .join("circle")
      .attr("cx", d => x(d.pestle) + x.bandwidth() / 2)
      .attr("cy", d => y(d.meanYear))
      .attr("r", 5)
      .attr("fill", "steelblue")
      .append("title")  // Tooltip
      .text(d => `Pestle: ${d.pestle}\nMean Year: ${d.meanYear.toFixed(0)}`);

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

  }, [data, yearType]);

  return (
    <div>
      <div>
        <h4>Filter:</h4>
        <label>
          <input
            type="radio"
            value="start_year"
            checked={yearType === 'start_year'}
            onChange={() => setYearType('start_year')}
          />
          Start Year    
        </label>
        <label>
          <input
            type="radio"
            value="end_year"
            checked={yearType === 'end_year'}
            onChange={() => setYearType('end_year')}
          />
          End Year
        </label>
      </div>
      <svg ref={svgRef} width="800" height="400"></svg>
    </div>
  );
};

export default YearChart;
