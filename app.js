var minYear = d3.min(birthData, (d) => d.year);
var maxYear = d3.max(birthData, (d) => d.year);
var width = 600;
var height = 600;
// var yearData = birthData.filter((d) => d.year === minYear);

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

// assign the min/max to input's range
d3.select("input")
  .property("min", minYear)
  .property("max", maxYear)
  .property("value", minYear)
  .on("input", () => {
    makeGraph(+d3.event.target.value);
  });

makeGraph(minYear);

function makeGraph(year) {
  var yearData = birthData.filter((d) => d.year === year);

  var arcs = d3
    .pie()
    .value((d) => d.births)
    .sort((a, b) => {
      if (a.continent < b.continent) {
        return -1;
      } else if (a.continent > b.continent) {
        return +1;
      } else {
        return a.births - b.births;
      }
    })(yearData);

  var path = d3
    .arc()
    .outerRadius(width / 2 - 10)
    .innerRadius(width / 4)
    .padAngle(0.04)
    .cornerRadius(20);

  var update = d3.select(".chart").selectAll(".arc").data(arcs);
  // 1. declare the update selection
  update.exit().remove();
  // 2. take out the trash
  update
    .enter() // enter the selection, append a path, give it the class
    .append("path")
    .classed("arc", true)
    .merge(update) // merge with old data.
    .attr("fill", (d) => colorScale(d.data.continent)) // draw the data
    .attr("stroke", "black")
    .attr("d", path);
}
