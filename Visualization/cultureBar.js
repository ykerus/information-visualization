var cColors = {"NON-WESTERN":"#B6D7A8", WESTERN:"#DD7D6B", UNKNOWN:"#D9D9D9", SELECTHOVER:"white"};
//var cColors = {"NON-WESTERN":"#ff8896", WESTERN:"#ffa600", UNKNOWN:"#D9D9D9", SELECTHOVER:"white"};
var cSymbols = {"NON-WESTERN":"NW", WESTERN:"W", UNKNOWN:"?"};
var cSelMargin = 6;
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

    var heightScale = d3.scaleLinear()
	                   .domain([0, data.culture.length])
	                   .range([0, height-2*cMargin]);

    var bars = selection.selectAll("rect")
               .data(Object.entries(cultureCounts));

    var labels = selection.selectAll("text")
               .data(Object.entries(cultureCounts));

    bars.enter()
            .append("rect")
//            .on("mouseover", function(){
//                    tooltip_cultureBar.style("display", null);
//            })
//            .on("mouseout", function(){
//                    tooltip_cultureBar.style("display", "none");
//                    tooltip_cultureBar.selectAll("text").remove()
//            })
//            .on("mousemove", function(d){
//                    var xPos= d3.mouse(this)[0]-300;
//                    var yPos = d3.mouse(this)[1]-100;
//                    tooltip_cultureBar.attr("transform", "translate("+xPos+","+yPos+")");
//                    var percentage_nonWestern = Math.round((cultureCounts["NON-WESTERN"]/(cultureCounts["NON-WESTERN"]+cultureCounts["WESTERN"]+cultureCounts["UNKNOWN"]))*100)
//                    var percentage_western = Math.round((cultureCounts["WESTERN"]/(cultureCounts["NON-WESTERN"]+cultureCounts["WESTERN"]+cultureCounts["UNKNOWN"]))*100)
//                    var percentage_unknown = Math.round((cultureCounts["UNKNOWN"]/(cultureCounts["NON-WESTERN"]+cultureCounts["WESTERN"]+cultureCounts["UNKNOWN"]))*100)
//
//                    tooltip_cultureBar.append("text")
//                                     .attr("x", 75)
//                                     .attr("dy", 100)
//                                     .attr("fill", "white")
//                                     .text("Non-western: "+cultureCounts["NON-WESTERN"]+" ("+percentage_nonWestern+"%)")
//                                      .style("font-size", "1em")
//                                      .attr("font-family", "verdana")
//
//                    tooltip_cultureBar.append("text")
//                                     .attr("x", 75)
//                                     .attr("dy", 125)
//                                     .attr("fill", "white")
//                                     .text("Western: "+cultureCounts["WESTERN"]+" ("+percentage_western+"%)")
//                                      .style("font-size", "1em")
//                                      .attr("font-family", "verdana")
//
//                    tooltip_cultureBar.append("text")
//                                     .attr("x", 75)
//                                     .attr("dy", 150)
//                                     .attr("fill", "white")
//                                     .text("Unknown: "+cultureCounts["UNKNOWN"]+" ("+percentage_unknown+"%)")
//                                      .style("font-size", "1em")
//                                      .style("background", "white")
//                                      .attr("font-family", "verdana")
//
//
////                    tooltip_cultureBar.select("text").text("non-western: "+cultureCounts["NON-WESTERN"]+" western: "+cultureCounts["WESTERN"]+" unknown: "+cultureCounts["UNKNOWN"]);
//            });
    labels.enter().append("text");
    
    if (cSelected) {
        cSelectBar.enter().append("rect")
            .attr("x", width - 3*barWidth/2 - cSelMargin)
            .attr("fill", "none")
            .attr("stroke", cColors.SELECTHOVER)
            .attr("rx", 2)
            .attr("ry", 2)
            .attr("width", barWidth + 2 * cSelMargin)
            .attr("y", cMargin - cSelMargin)
            .attr("height", height-2*cMargin + 2*cSelMargin)
    }
    selection.on("mouseover", function() {
        d3.select(this).style("cursor", "pointer");
        var cDarkColors = {"NON-WESTERN":"#9eba91", WESTERN:"#ad6254", UNKNOWN:"#b8b8b8", SELECTHOVER:"white"};
        var percentage_nonWestern = Math.round((cultureCounts["NON-WESTERN"]/(cultureCounts["NON-WESTERN"]+cultureCounts["WESTERN"]+cultureCounts["UNKNOWN"]))*100)
        var percentage_western = Math.round((cultureCounts["WESTERN"]/(cultureCounts["NON-WESTERN"]+cultureCounts["WESTERN"]+cultureCounts["UNKNOWN"]))*100)
        var percentage_unknown = Math.round((cultureCounts["UNKNOWN"]/(cultureCounts["NON-WESTERN"]+cultureCounts["WESTERN"]+cultureCounts["UNKNOWN"]))*100)

        cInfoBox.enter().append("rect")
                .attr("x", width - 3*barWidth/2 - 150 -20 )
                .attr("fill", "white")
                .attr("stroke", "black")
                .attr("width", 150)
                .attr("height", 80)
                .attr("y", height/5)
        cInfoText.enter().append("text")
                .text("Non-western: "+cultureCounts["NON-WESTERN"]+" ("+percentage_nonWestern+"%)")
                .attr("x", width - 3*barWidth/2 - 150 - 20 + 10)
                .attr("y", height/5+15)
                .attr("fill", "black")
                .attr("font-family", "verdana")
                .attr("font-size", "10px")
         cInfoText.enter().append("text")
                .text("Western: "+cultureCounts["WESTERN"]+" ("+percentage_western+"%)")
                .attr("x", width - 3*barWidth/2 - 150 - 20 + 10)
                .attr("y", height/5 + 15 + 25)
                .attr("fill", "black")
                .attr("font-family", "verdana")
                .attr("font-size", "10px")
         cInfoText.enter().append("text")
                .text("Unknown: "+cultureCounts["UNKNOWN"]+" ("+percentage_unknown+"%)")
                .attr("x", width - 3*barWidth/2 - 150 - 20 + 10)
                .attr("y", height/5 + 15 + 25 + 25)
                .attr("fill", "black")
                .attr("font-family", "verdana")
                .attr("font-size", "10px")
        if (!cSelected) {
            selection.selectAll("rect")
                    .attr("fill", function(d) {return cDarkColors[d[0]]})

            console.log(countCultures(data))
            cSelectBar.enter().append("rect")
                .attr("x", width - 3*barWidth/2 - cSelMargin)
                .attr("fill", "none")
                .attr("rx", 2)
                .attr("ry", 2)
                .attr("stroke", cColors.SELECTHOVER)
                .attr("width", barWidth + 2 * cSelMargin)
                .attr("y", cMargin - cSelMargin)
                .attr("height", height-2*cMargin + 2*cSelMargin)
        }
        })
        .on("mouseout", function() {
            cultureInfoGroup.selectAll("rect").remove()
            cultureInfoGroup.selectAll("text").remove()
            d3.select(this).style("cursor", "default");
            if (!cSelected)
                selection.selectAll("rect")
                    .attr("fill", function(d) {return cColors[d[0]]})
                cultureSelectGroup.selectAll("rect").remove();
        })
        .on("click", function() {
            donutChart(donutChartGroup, data, false);
            if (!cSelected) {
                cSelected = true;
                genderSelectGroup.selectAll("rect").remove();
                gSelected = false;
                selection.selectAll("rect")
                    .attr("fill", function(d) {return cColors[d[0]]})
            }
        }); 
    

    //TODO: combine into one group instead of two

    stacked = 0;
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
                    .attr("stroke", "white")
                    .attr("font-size",function(d,i) {
                        if (i==0)
                            return "25px";
                        else
                            return "18px";
                    })
                    .attr("font-weight", "bold")
                    .attr("font-family", "verdana")
                    .attr("text-anchor","middle")
                    .text(function(d) {if (d[1]>0) return cSymbols[d[0]];})
                    .transition()
                    .duration(750)
                    .attr("y", function(d) {
                            stacked += heightScale(d[1]);
                            return height-cMargin - stacked + heightScale(d[1])/2 + 6;
                    });



    var tooltip_cultureBar = selection.append("g")
                    .attr("class", tooltip_cultureBar)
                    .attr("fill", "white")
                    .style("display", "none");




//              tooltip_cultureBar.append("text")
//                     .attr("x", 100)
//                     .attr("dy", 100)
//                      .attr("fill", "white")
//                      .style("font-size", "1em")
//                      .style("background-color", "red")

}//cultureBar
