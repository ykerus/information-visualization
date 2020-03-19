//var gColors = {FEMALE:"#FCD965", MALE:"#A4C2F4", UNKNOWN:"#D9D9D9", SELECTHOVER:"white"};
var gColors = {FEMALE:"#d95f02", MALE:"#1b9e77", UNKNOWN:"#D9D9D9", SELECTHOVER:"white"};

var gSymbols = {FEMALE:"\u2640", MALE:"\u2642", UNKNOWN:"?"}
var gSelMargin = 6;
var gMargin = 80;

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

    var heightScale = d3.scaleLinear()
	                   .domain([0, data.predicted_gender.length])
	                   .range([0, height-2*gMargin]);
   
    var bars = selection.selectAll("rect")
               .data(Object.entries(genderCounts));

    var labels = selection.selectAll("text")
               .data(Object.entries(genderCounts));

    bars.enter().append("rect");
    labels.enter().append("text");
    
    
    if (gSelected) {
        gSelectBar.enter().append("rect")
            .attr("x",width/20 - gSelMargin)
            .attr("fill", "none")
            .attr("rx", 2)
            .attr("ry", 2)
            .attr("stroke", gColors.SELECTHOVER)
            .attr("width", barWidth + 2 * gSelMargin)
            .attr("y", gMargin - gSelMargin)
            .attr("height", height-2*gMargin + 2*gSelMargin)
    }

    selection.on("mouseover", function() {
        var percentage_female = Math.round((genderCounts["FEMALE"]/ (genderCounts["FEMALE"]+ genderCounts["MALE"]+genderCounts["UNKNOWN"])) *100)
        var percentage_male = Math.round((genderCounts["MALE"]/ (genderCounts["FEMALE"]+ genderCounts["MALE"]+genderCounts["UNKNOWN"])) *100)
        var percentage_unknown = Math.round((genderCounts["UNKNOWN"]/ (genderCounts["FEMALE"]+ genderCounts["MALE"]+genderCounts["UNKNOWN"])) *100)
        gInfoBox.enter().append("rect")
                .attr("x", width/20 + barWidth + 20)
                .attr("fill", "white")
                .attr("stroke", "black")
                .attr("width", 150)
                .attr("height", 80)
                .attr("y", height/5)
        gInfoText.enter().append("text")
                .text("Female: "+genderCounts["FEMALE"]+" ("+percentage_female+"%)")
                .attr("x", width/20 + barWidth + 20 + 10)
                .attr("y", height/5+15)
                .attr("fill", "black")
                .attr("font-family", "verdana")
                .attr("font-size", "10px")
         gInfoText.enter().append("text")
                .text("Male: "+genderCounts["MALE"]+" ("+percentage_male+"%)")
                .attr("x", width/20 + barWidth + 20 + 10)
                .attr("y", height/5 + 15 + 25)
                .attr("fill", "black")
                .attr("font-family", "verdana")
                .attr("font-size", "10px")
         gInfoText.enter().append("text")
                .text("Unknown: "+genderCounts["UNKNOWN"]+" ("+percentage_unknown+"%)")
                .attr("x", width/20 + barWidth + 20 + 10)
                .attr("y", height/5 + 15 + 25 + 25)
                .attr("fill", "black")
                .attr("font-family", "verdana")
                .attr("font-size", "10px")
        d3.select(this).style("cursor", "pointer");
        var gDarkColors = {FEMALE:"#a64902", MALE:"#126b51", UNKNOWN:"#b8b8b8", SELECTHOVER:"white"};
        if (!gSelected) {
            selection.selectAll("rect")
                    .attr("fill", function(d) {return gDarkColors[d[0]]})
            gSelectBar.enter().append("rect")
                .attr("x", width/20 - gSelMargin)
                .attr("fill", "none")
                .attr("rx", 2)
                .attr("ry", 2)
                .attr("stroke", gColors.SELECTHOVER)
                .attr("width", barWidth + 2 * gSelMargin)
                .attr("y", gMargin - gSelMargin)
                .attr("height", height-2*gMargin + 2*gSelMargin)
            }
        })
        .on("mouseout", function() {
            d3.select(this).style("cursor", "default");
            genderInfoGroup.selectAll("rect").remove()
            genderInfoGroup.selectAll("text").remove()
            if (!gSelected)
                selection.selectAll("rect")
                    .attr("fill", function(d) {return gColors[d[0]]})
                genderSelectGroup.selectAll("rect").remove();
            if (gSelected) {
                gSelectBar.enter().append("rect")
                    .attr("x",width/20 - gSelMargin)
                    .attr("fill", "none")
                    .attr("rx", 2)
                    .attr("ry", 2)
                    .attr("stroke", gColors.SELECTHOVER)
                    .attr("width", barWidth + 2 * gSelMargin)
                    .attr("y", gMargin - gSelMargin)
                    .attr("height", height-2*gMargin + 2*gSelMargin)
            }
        })
        .on("click", function() {
            donutChart(donutChartGroup, data, true);
            if (!gSelected) {
                cSelected = false;
                cultureSelectGroup.selectAll("rect").remove();
                gSelected = true;
                selection.selectAll("rect")
                    .attr("fill", function(d) {return gColors[d[0]]})
            }});  

    //TODO: combine into one group instead of two

    var stacked = 0;
    var barAttributes = selection.selectAll("rect")
                        .attr("x", width/20)
                        .attr("fill", function(d) {return gColors[d[0]]})
                        .attr("width", barWidth)
                        .attr("stroke","black")
                        .attr("rx", 2)
                        .attr("ry", 2)
                        .transition()
                        .duration(750)
                        .attr("height", function(d) {
                                return heightScale(d[1])})
                        .attr("y", function(d) {
                            stacked += heightScale(d[1]);
                            return height-gMargin-stacked;
                        });

    stacked = 0;
    var barLabels = selection.selectAll("text")
//                    .attr("x", width/20+barWidth/2)
                    .attr("fill", "black")
                    .attr("stroke", "white")
                    .attr("font-size",function(d,i){
                        if (i==0)
                            return "25px";
                        else  
                            return "30px";          
                    })
                    .attr("font-weight", "bold")
                    .attr("font-family", "verdana")
                    .attr("text-anchor","middle")
                    .text(function(d) {if (d[1]>0) return gSymbols[d[0]];})
                    
                    .transition()
                    .duration(750)
                    .attr("transform", function(d,i) {
                        stacked += heightScale(d[1]);
                        var x = width/20+barWidth/2;
                        var y = height-gMargin - stacked + heightScale(d[1])/2 + 10;
                        if (i==1)
                            return "translate("+(x-5)+","+y+") rotate(45)";
                        else 
                            return "translate("+x+","+y+")";
                    })
}//genderBar
