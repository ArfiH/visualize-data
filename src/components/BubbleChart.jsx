import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const BubbleChart = () => {
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
    const height = 600;

    svg.selectAll("*").remove(); // Clear previous chart

    // Process data
    const topics = Array.from(d3.group(data, d => d.topic).entries()).map(([topic, values]) => ({
      topic,
      intensity: d3.mean(values, d => d.intensity)
    }));

    // Create scales
    const xScale = d3.scalePoint()
      .domain(topics.map(d => d.topic))
      .range([50, width - 50])
      .padding(1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(topics, d => d.intensity)])
      .range([height - 50, 50]);

    const sizeScale = d3.scaleSqrt()
      .domain([0, d3.max(topics, d => d.intensity)])
      .range([0, 40]);

    // Create bubbles
    svg.append("g")
      .selectAll("circle")
      .data(topics)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.topic))
      .attr("cy", d => yScale(d.intensity))
      .attr("r", d => sizeScale(d.intensity))
      .attr("fill", "steelblue")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5);

    // Add tooltip
    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "10px");

    svg.selectAll("circle")
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible")
          .html(`<strong>Topic:</strong> ${d.topic}<br/><strong>Intensity:</strong> ${d.intensity.toFixed(2)}`);
      })
      .on("mousemove", (event) => {
        tooltip.style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    // Add x-axis
    svg.append("g")
      .attr("transform", `translate(0, ${height - 50})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // Add y-axis
    svg.append("g")
      .attr("transform", "translate(50, 0)")
      .call(d3.axisLeft(yScale));

  }, [data]);

  return (
    <svg ref={svgRef} width="1000" height="600"></svg>
  );
};

export default BubbleChart;
