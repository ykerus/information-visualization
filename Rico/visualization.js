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

var width = 1500,
    height = 700,
    barWidth = 60;

var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
            .attr("transform", "translate(50, 50)");
console.log("Svg created");
// const svg = d3.create("svg")
//       .attr("viewBox", [0, 0, width, height])
//       .attr("font-size", 10)
//       .attr("font-family", "sans-serif")
//       .attr("text-anchor", "middle");

/*
    var genderCounts = countGenders(data);

    var heightScale = d3.scale.linear()
                       .domain([0, data.predicted_gender.length])
                       .range([0, height-2*margin]);

    console.log(genderCounts); 


    var bars = selection.selectAll("circle")
               .data(Object.entries(genderCounts));
    
    bars.enter().append("circle")
                         .attr("fill", function(d) {return gColors[d[0]]})
                         .attr("height", height);
*/
// var genderGroup = svgContainer.append("g");
console.log("Getting JSON file...");
//d3.json("/data.json", function(data) {
let requestURL = "http://0.0.0.0:8000/data.json"
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  const data = request.response;
  console.log("JSON is received, now processing!");
  console.log("Getting the first selection.");
    // selection1 = getPeriod(data, 0, 1500);
    // selection2 = getPeriod(data, 0, 1700);
    // selection3 = getPeriod(data, 0, 1800);
    // selection4 = getPeriod(data, 0, 1950);
    // selection5 = getPeriod(data, 0, 2020);
    console.log("Now calling bubble.");

    bubble(svg, data);
}    
  /*  setTimeout(() => {
        bubble(svg, selection2);
    }, 1000);
    setTimeout(() => {
        bubble(svg, selection3);
    }, 2000);
    setTimeout(() => {
        bubble(svg, selection4);
    }, 3000);
    setTimeout(() => {
        bubble(svg, selection5);
    }, 4000);
 */  
//}); 
