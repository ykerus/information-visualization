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

var width = 800,
    height = 600,
    barWidth = 60;

var svgContainer = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

var sliderGroup = svgContainer.append("g");
var genderGroup = svgContainer.append("g");
var cultureGroup = svgContainer.append("g");
var bubbleChartGroup = svgContainer.append("g");
var donutChartGroup = svgContainer.append("g");
var genderSelectGroup = svgContainer.append("g");
var cultureSelectGroup = svgContainer.append("g");
var gSelected = true;
var cSelected = false;

d3.json("data.json").then(function(data) {
    data.creation_year = data.creation_year.map((x)=>parseInt(x));

    timeSlider(sliderGroup, data);
    genderBar(genderGroup, data);
    cultureBar(cultureGroup, data);
//    bubbleChart(bubbleChartGroup, data);
//    donutChart(donutChartGroup, data);
    loadBackground(data);
});
