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

function bubble (selection, data) {

    var genderCounts = countGenders(data);

    console.log(genderCounts); //

    var heightScale = d3.scale.linear()
	                   .domain([0, data.predicted_gender.length])
	                   .range([0, height-2*margin]);


    var bars = selection.selectAll("circle")
               .data(Object.entries(genderCounts));

    // bars.enter().append("circle")
    //                     .attr("fill", function(d) {return gColors[d[0]]})
    //                     .attr("fill-opacity", 0.7)
    //                     .attr("fill", function(d) {return gColors[d[0]]})
    //                     .attr("cx", 580)
    //                     .attr("cy", 280)
    //                     .transition()
    //                     .duration(750)
    //                     .attr("r", function(d) {return heightScale(d[1])/2});   

    bars.enter().append("circle");

    //TODO: combine into one group instead of two

    var stacked = 0;
    var barAttributes = selection.selectAll("circle")
                        .attr("fill", function(d) {return gColors[d[0]]})
                        .attr("fill-opacity", 0.7)
                        .transition()
                        .duration(750)
                        .attr("r", function(d) {return heightScale(d[1])/2})
                        .attr("cx", function(d) {
                            return 880;
                        })
                        .attr("cy", function(d) {
                        return 300;
                        });
}//genderBar
