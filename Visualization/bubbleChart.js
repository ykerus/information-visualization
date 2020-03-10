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

// change this that it is applicable to all settings (not only origins)
function countOrigins(data){
    var originCount = {};
    originCount["Web Gallery of Art '17"] = count(data, "Web Gallery of Art '17");
    originCount["WikiArts 17"] = count(data, "WikiArts 17");
    originCount["DeviantArt"] = count(data, "DeviantArt");
    originCount["MOMA - New York"] = count(data, "MOMA - New York");
    originCount["The Met 17"] = count(data, "The Met 17");
    return originCount
}//countOrigins

// remove duplicates
function removeDuplicates(array) {
  return array.filter((a, b) => array.indexOf(a) === b)
};

// change this that it is applicable to all settings (not only origins)
function selectGenderData(data, variable){
    if (variable == "collection_origins"){
        var dataArray = data.collection_origins
    }
    var genderDataSelected = {};
    var indexesMale = [], i = -1;
    var indexesFemale = [], j = -1;
    var arr = data.predicted_gender;
    var male = "male";
    var female = "female";
    while ((i = arr.indexOf(male, i+1)) !=-1){
        indexesMale.push(i);
    }
    while ((j = arr.indexOf(female, j+1)) !=-1){
        indexesFemale.push(j);
    }
    var resultArrMale = [];
    for (var i = 0; i < indexesMale.length; i++)
        resultArrMale.push(dataArray[indexesMale[i]]);
    var lengthArrMale = resultArrMale.length;
    var resultArrFemale = [];
    for(var i = 0; i<indexesFemale.length; i++)
        resultArrFemale.push(dataArray[indexesFemale[i]]);
    return [resultArrMale, resultArrFemale];
}//selectGenderData

function creatingThreeList(dataMale,dataFemale){
    allData = []
    maleData = []
    femaleData = []
    for (var i = 0; i<Object.keys(dataMale).length; i++){
        allData.push(dataMale[Object.keys(dataMale)[i]] +dataFemale[Object.keys(dataMale)[i]])
        maleData.push(dataMale[Object.keys(dataMale)[i]] )
        femaleData.push(dataFemale[Object.keys(dataMale)[i]] )
    }
    return [allData, maleData, femaleData]
}//creatingThreeList

function getRadius(value){
    radius = []
    for (var i = 0; i<value.length; i ++){
            radius.push(Math.sqrt(value[i]))
    }
    return radius
}//getRadius


function bubbleChart (selection, data) {
    var genderCounts = countGenders(data);
    var results = selectGenderData(data, "collection_origins");
    var originMaleCounts = countOrigins(results[0]);
    var originFemaleCounts = countOrigins(results[1]);
    var threeLists = creatingThreeList(originMaleCounts, originFemaleCounts);
    var allData = threeLists[0];
    var femaleData = threeLists[2];
    console.log('allData', allData)
    console.log('femaleData', femaleData)

    listPercentage = [];
    for (i = 0; i<allData.length; i++){
        listPercentage.push(femaleData[i]/allData[i]*100)
    }

    var listGrads = []
    for (i = 0; i<listPercentage.length; i++){
        percentage = 2*listPercentage[i]
        grad = selection.append("defs").append("linearGradient").attr("id", "grad"+i.toString())
            .attr("x1", "0%").attr("x2", "0%").attr("y1", percentage.toString()+'%').attr("y2", "0%");
        grad.append("stop").attr("offset", "50%").style("stop-color", "A4C2F4");
        grad.append("stop").attr("offset", "50%").style("stop-color", "FCD965");
        listGrads.push(grad)
    }
    var circles = selection.selectAll("circle")
        .data(Object.entries(allData));

    var labels = selection.selectAll("text")
               .data(Object.entries(originMaleCounts));

    var radius = getRadius(allData);

    circles.enter().append("circle");
    labels.enter().append("text");

    Array.prototype.max = function() {
          return Math.max.apply(null, this);
    };

    var radiusScale = d3.scaleLinear()
	                   .domain([0, radius.max()])
	                   .range([0, 60]);

    var circleAttributes = selection.selectAll("circle")
                        .attr("cx", function(d,i) {
                                return (120*i+200);
                        })
                        .attr("cy", 100)
                        .attr("stroke", "black")
                        .transition()
                        .duration(750)
                        .attr("r", function(d, i){
                                return radiusScale(radius[i])
                        })
                       .attr("fill", function(d, i){
                                return "url(#grad"+i.toString()+")"})

    var circleLabels = selection.selectAll("text")
                        .attr("y", 200)
                        .attr("fill", "black")
                        .attr("font-size","0.7em")
                        .attr("font-family", "verdana")
                        .attr("text-anchor","middle")
                        .text(function(d) {return d[0]})
                        .transition()
                        .duration(750)
                        .attr("x", function(d, i) {
                                return (i*120+200);
                        });

}//bubbleChart