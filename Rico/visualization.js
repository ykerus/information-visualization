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

var svgContainer = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

var genderGroup = svgContainer.append("g");

d3.json("test_data.json", function(data) {
     
    selection1 = getPeriod(data, 0, 1500);
    selection2 = getPeriod(data, 0, 1700);
    selection3 = getPeriod(data, 0, 1800);
    selection4 = getPeriod(data, 0, 1950);
    selection5 = getPeriod(data, 0, 2020);
    
    bubble(genderGroup, selection1);
    
    setTimeout(() => {
        bubble(genderGroup, selection2);
    }, 1000);
    setTimeout(() => {
        bubble(genderGroup, selection3);
    }, 2000);
    setTimeout(() => {
        bubble(genderGroup, selection4);
    }, 3000);
    setTimeout(() => {
        bubble(genderGroup, selection5);
    }, 4000);
   
})
