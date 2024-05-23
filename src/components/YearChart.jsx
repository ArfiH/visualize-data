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

    // Group data by pestle
    const groupedData = d3.rollups(
      parsedData,
      v => d3.mean(v, d => d.yearDifference),
      d => d.pestle
    );

    // Create scales
    const x = d3.scaleBand()
      .domain(groupedData.map(d => d[0]))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(groupedData, d => d[1])]).nice()
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

    svg.append("g")
      .selectAll("rect")
      .data(groupedData)
      .join("rect")
      .attr("x", d => x(d[0]))
      .attr("y", d => y(d[1]))
      .attr("height", d => y(0) - y(d[1]))
      .attr("width", x.bandwidth())
      .attr("fill", "steelblue")
      .append("title")  // Tooltip
      .text(d => `Pestle: ${d[0]}\nYear Difference: ${d[1].toFixed(2)}`);

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

  }, [data]);

  return <svg ref={svgRef} width="800" height="400"></svg>;
};

export default YearChart;
