import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const StackedBarChart = () => {
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
    const width = 1000;
    const height = 500;
    const margin = { top: 20, right: 150, bottom: 100, left: 60 };

    svg.selectAll("*").remove(); // Clear previous chart

    // Parse data and group by country and sector
    const parsedData = data.map(d => ({
      country: d.country,
      sector: d.sector,
      relevance: d.relevance
    })).filter(d => d.country && d.sector && d.relevance !== null); // Filter out invalid data

    // Group data by country and sector
    const groupedData = d3.rollups(
      parsedData,
      v => d3.sum(v, d => d.relevance),
      d => d.country,
      d => d.sector
    ).map(([country, sectors]) => {
      const total = d3.sum(sectors, ([, relevance]) => relevance);
      const sectorValues = sectors.map(([sector, relevance]) => ({
        sector,
        relevance,
        percentage: relevance / total * 100
      }));
      return { country, sectors: sectorValues };
    });

    // Extract sector keys for stacking
    const sectors = Array.from(new Set(parsedData.map(d => d.sector)));

    // Stack data
    const stack = d3.stack()
      .keys(sectors)
      .value((d, key) => {
        const sector = d.sectors.find(s => s.sector === key);
        return sector ? sector.relevance : 0;
      });

    const stackedData = stack(groupedData);

    // Set scales
    const xScale = d3.scaleBand()
      .domain(groupedData.map(d => d.country))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(stackedData, d => d3.max(d, d => d[1]))])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const colorScale = d3.scaleOrdinal()
      .domain(sectors)
      .range(d3.schemeCategory10);

    // Create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-40)")
      .style("text-anchor", "end");

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);

    // Create bars
    const groups = svg.selectAll("g.layer")
      .data(stackedData)
      .enter().append("g")
      .attr("class", "layer")
      .attr("fill", d => colorScale(d.key));

    groups.selectAll("rect")
      .data(d => d)
      .enter().append("rect")
      .attr("x", d => xScale(d.data.country))
      .attr("y", d => yScale(d[1]))
      .attr("height", d => yScale(d[0]) - yScale(d[1]))
      .attr("width", xScale.bandwidth());

    // Create legend
    const legend = svg.selectAll(".legend")
      .data(sectors)
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(${width - margin.right + 10},${i * 20 + margin.top})`);

    legend.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", d => colorScale(d));

    legend.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", "0.35em")
      .text(d => d);
  }, [data]);

  return (
    <svg ref={svgRef} width="1000" height="500"></svg>
  );
};

export default StackedBarChart;
