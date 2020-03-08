var cColors = {"NON-WESTERN":"#B6D7A8", WESTERN:"#DD7D6B", UNKNOWN:"#D9D9D9"};
var cMargin = 80;

function count(array, item) {
	var count = 0;
	for (var i=0; i < array.length; i++)
    	if (array[i]==item)
        	count++;
    return count;
}//count

function countCultures(data) {
	var cultureCounts = {};
    cultureCounts["UNKNOWN"] = count(data.culture, "unknown");
    cultureCounts["WESTERN"] = count(data.culture, "western");
    cultureCounts["NON-WESTERN"] = count(data.culture, "non-western");
    return cultureCounts;
}//countCultures

function cultureBar (selection, data) {

    var cultureCounts = countCultures(data);

    console.log(cultureCounts); //

    var heightScale = d3.scaleLinear()
	                   .domain([0, data.culture.length])
	                   .range([0, height-2*cMargin]);


    var bars = selection.selectAll("rect")
               .data(Object.entries(cultureCounts));

    var labels = selection.selectAll("text")
               .data(Object.entries(cultureCounts));

    bars.enter().append("rect");
    labels.enter().append("text");

    //TODO: combine into one group instead of two

    var stacked = 0;
    var barAttributes = selection.selectAll("rect")
                        .attr("x", width - 3*barWidth/2)
                        .attr("fill", function(d) {return cColors[d[0]]})
                        .attr("width", barWidth)
                        .attr("stroke","black")
                        .attr("rx", 2)
                        .attr("ry", 2)
                        .transition()
                        .duration(750)
                        .attr("height", function(d) {return heightScale(d[1])})
                        .attr("y", function(d) {
                            stacked += heightScale(d[1]);
                            return height-cMargin-stacked;
                        });

    var stacked = 0;
    var barLabels = selection.selectAll("text")
                    .attr("x", width - barWidth )
                    .attr("fill", "black")
                    .attr("font-size","0.7em")
                    .attr("font-family", "verdana")
                    .attr("text-anchor","middle")
                    .text(function(d) {if (d[1]>0) return d[0];})
                    .transition()
                    .duration(750)
                    .attr("y", function(d) {
                            stacked += heightScale(d[1]);
                            return height-cMargin - stacked + heightScale(d[1])/2 + 5;
                    });

}//cultureBar
