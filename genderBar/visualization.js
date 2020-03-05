function getPeriod(d, from, to) {
	newData = {}
    for (var key in d)
    	newData[key] = [];
    for (var i=0; i<d.creation_year.length; i++)
    	if (d.creation_year[i] >= from && d.creation_year[i] <= to)
       		for (var key in d)
            	newData[key].push(d[key][i])
    return newData;
}//getPeriod

var width = 1000,
    height = 500,
    barWidth = 60;

var svgContainer = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

var genderGroup = svgContainer.append("g");
var bubbleChartGroup = svgContainer.append("g");

d3.json("test_data.json").then(function(data) {

  data.creation_year = data.creation_year.map((x)=>parseInt(x));

  var sliderRange = d3
    .sliderBottom()
    .min(d3.min(data.creation_year))
    .max(d3.max(data.creation_year))
    .width(440)
    .tickFormat(d3.format('.0f'))
    .ticks(5)
    .default([d3.min(data.creation_year), d3.max(data.creation_year)])
    .fill('#2196f3')
    .on('onchange', val => {
      d3.select('p#value-range').text(val.map(d3.format('.0f')).join(' - '));
      selection = getPeriod(data, sliderRange.value()[0], sliderRange.value()[1]);
      genderBar(genderGroup, selection);
      bubbleChart(bubbleChartGroup, selection);
    });

  var gRange = d3
    .select('div#slider-range')
    .append('svg')
    .attr('width', width)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gRange.call(sliderRange);

  d3.select('p#value-range').text(
    sliderRange
      .value()
      .map(d3.format('.0f'))
      .join('-')
  );

    genderBar(genderGroup, data);
    bubbleChart(bubbleChartGroup, data);


});
