var minYear = d3.min(birthData, (d) => d.year);
var width = 600;
var height = 600;
var yearData = birthData.filter((d) => d.year === minYear);

var continents = [];

for (let i = 0; i < birthData.length; i++) {
  var continent = birthData[i].continent;
  if (continents.indexOf(continent) === -1) {
    continents.push(continent);
  }
}

var colorScale = d3
  .scaleOrdinal()
  .domain(continents)
  .range(d3.schemeCategory10);

d3.select("svg")
  .attr("height", height)
  .attr("width", width)
  .append("g")
  .attr("transform", `translate(${width / 2}, ${height / 2})`)
  .classed("chart", true);

var arcs = d3.pie().value((d) => d.births)(yearData);
// declaring the `pie` and calling it with your data
// to create `arcs` similar to `bins` with histograms.
var path = d3
  .arc()
  .outerRadius(width / 2 - 10)
  .innerRadius(width / 4); // positive innerradius = donut, negative = circle
// translate the shit to a SVG path command

d3.select(".chart")
  .selectAll(".arc")
  .data(arcs)
  .enter()
  .append("path")
  .classed("arc", true)
  .attr("fill", (d) => colorScale(d.data.continent))
  .attr("stroke", "black")
  .attr("d", path);
