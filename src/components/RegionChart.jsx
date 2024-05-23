import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const RegionChart = () => {
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

    // Parse data and group by region
    const parsedData = data.map(d => ({
      region: d.region,
      sector: d.sector
    })).filter(d => d.region && d.sector); // Filter out invalid data

    // Group data by region and count sectors
    const groupedData = d3.rollups(
      parsedData,
      v => v.length,
      d => d.region
    ).map(([key, value]) => ({ region: key, sectorCount: value }));

    // Create scales
    const x = d3.scaleBand()
      .domain(groupedData.map(d => d.region))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(groupedData, d => d.sectorCount)]).nice()
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
      .x(d => x(d.region) + x.bandwidth() / 2)
      .y(d => y(d.sectorCount));

    svg.append("path")
      .datum(groupedData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("strokeWidth", 1.5)
      .attr("d", line);

    // Add circles with tooltips
    svg.append("g")
      .selectAll("circle")
      .data(groupedData)
      .join("circle")
      .attr("cx", d => x(d.region) + x.bandwidth() / 2)
      .attr("cy", d => y(d.sectorCount))
      .attr("r", 5)
      .attr("fill", "steelblue")
      .append("title")  // Tooltip
      .text(d => `Region: ${d.region}\nSector Count: ${d.sectorCount}`);

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

  }, [data]);

  return <svg ref={svgRef} width="800" height="400"></svg>;
};

export default RegionChart;
