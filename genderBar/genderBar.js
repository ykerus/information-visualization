var gColors = {FEMALE:"#FCD965", MALE:"#A4C2F4", UNKNOWN:"#D9D9D9"};
var margin = 20;

function count(array, item) {
	var count = 0;
	for (var i=0; i < array.length; i++)
    	if (array[i]==item)
        	count++;
    return count;
}//count

function countGenders(data) {
	var genderCounts = {};
    genderCounts["UNKNOWN"] = count(data.predicted_gender, "unknown");
    genderCounts["MALE"] = count(data.predicted_gender, "male");
    genderCounts["FEMALE"] = count(data.predicted_gender, "female");
    return genderCounts;
}//countGenders

function genderBar (selection, data) {

    var genderCounts = countGenders(data);

    console.log(genderCounts); //

    var heightScale = d3.scale.linear()
	                   .domain([0, data.predicted_gender.length])
	                   .range([0, height-2*margin]);


    var bars = selection.selectAll("rect")
               .data(Object.entries(genderCounts));

    var labels = selection.selectAll("text")
               .data(Object.entries(genderCounts));

    bars.enter().append("rect");
    labels.enter().append("text");

    //TODO: combine into one group instead of two

    var stacked = 0;
    var barAttributes = selection.selectAll("rect")
                        .attr("x", width/2)
                        .attr("fill", function(d) {return gColors[d[0]]})
                        .attr("width", barWidth)
                        .attr("stroke","black")
                        .attr("rx", 2)
                        .attr("ry", 2)
                        .transition()
                        .duration(750)
                        .attr("height", function(d) {return heightScale(d[1])})
                        .attr("y", function(d) {
                            stacked += heightScale(d[1]);
                            return height-margin-stacked;
                        });

    var stacked = 0;
    var barLabels = selection.selectAll("text")
                    .attr("x", (width+barWidth)/2)
                    .attr("fill", "black")
                    .attr("font-size","0.7em")
                    .attr("font-family", "verdana")
                    .attr("text-anchor","middle")
                    .text(function(d) {return d[0]})
                    .transition()
                    .duration(750)
                    .attr("y", function(d) {
                            stacked += heightScale(d[1]);
                            return height-margin - stacked + heightScale(d[1])/2 + 5;
                    });

}//genderBar
