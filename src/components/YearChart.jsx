import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const YearChart = () => {
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
    const margin = { top: 20, right: 30, bottom: 100, left: 50 };

    svg.selectAll("*").remove(); // Clear previous chart

    // Parse data and calculate year difference
    const parsedData = data.map(d => ({
      pestle: d.pestle,
      yearDifference: d.end_year && d.start_year ? d.end_year - d.start_year : null
    })).filter(d => d.pestle && d.yearDifference !== null); // Filter out invalid data

    // Group data by pestle and calculate mean year difference
    const groupedData = d3.rollups(
      parsedData,
      v => d3.mean(v, d => d.yearDifference),
      d => d.pestle
    ).map(([key, value]) => ({ pestle: key, meanYearDifference: value }));

    // Create scales
    const x = d3.scaleBand()
      .domain(groupedData.map(d => d.pestle))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(groupedData, d => d.meanYearDifference)]).nice()
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
      .y(d => y(d.meanYearDifference));

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
      .attr("cy", d => y(d.meanYearDifference))
      .attr("r", 5)
      .attr("fill", "steelblue")
      .append("title")  // Tooltip
      .text(d => `Pestle: ${d.pestle}\nMean Year Difference: ${d.meanYearDifference.toFixed(2)}`);

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

  }, [data]);

  return <svg ref={svgRef} width="800" height="400"></svg>;
};

export default YearChart;
