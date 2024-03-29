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
        .attr("height", height)
				.attr("class", "main")

$(".main").css({
	"display": "block",
	"margin": "0 auto"});

var sliderGroup = svgContainer.append("g");
var genderGroup = svgContainer.append("g");
var cultureGroup = svgContainer.append("g");
var donutChartGroup = svgContainer.append("g");
var genderSelectGroup = svgContainer.append("g");
var cultureSelectGroup = svgContainer.append("g");
var genderInfoGroup = svgContainer.append("g");
var gInfoBox = genderInfoGroup.selectAll("rect").data([0]);
var gInfoText = genderInfoGroup.selectAll("text").data([0]);
var cultureInfoGroup = svgContainer.append("g");
var cInfoBox = cultureInfoGroup.selectAll("rect").data([0]);
var cInfoText = cultureInfoGroup.selectAll("text").data([0]);
var gSelectBar = genderSelectGroup.selectAll("rect").data([0]);
var cSelectBar = cultureSelectGroup.selectAll("rect").data([0]);
var gSelected = true;
var cSelected = false;

d3.json("data.json").then(function(data) {
    data.creation_year = data.creation_year.map((x)=>parseInt(x));

    timeSlider(sliderGroup, data);
    genderBar(genderGroup, data);
    cultureBar(cultureGroup, data);
    donutChart(donutChartGroup, data, gSelected);
    loadBackground(data);
});
