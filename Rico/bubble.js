var gColors = {FEMALE:"#FCD965", MALE:"#A4C2F4", UNKNOWN:"#D9D9D9"};
var margin = 20;

function count(array, item) {
	var count = 0;
	for (var i=0; i < array.length; i++)
    	if (array[i]==item)
        	count++;
    return count;
}//countconst


function countGenders(data) {
	var genderCounts = {};
    genderCounts["UNKNOWN"] = count(data.predicted_gender, "unknown");
    genderCounts["MALE"] = count(data.predicted_gender, "male");
    genderCounts["FEMALE"] = count(data.predicted_gender, "female");
    return genderCounts;
}//countGenders


function bubble (svg, data){
    var width = 1500,
    height = 700,
    barWidth = 60;
    var data = createTreeStructure(data, 'artwork_type');
    //document.write(JSON.stringify(data));
    
    maxValue = data.value;
    var heightScale = d3.scale.linear()
                       .domain([0, maxValue])
                       .range([0, height-2*margin]);
    


    console.log(data);
    var pack = d3.layout.pack()
        .size([width, height-50])
        .padding(10);

        
    var nodes = pack.nodes(data);
    console.log(nodes);

    color = d3.scale.linear(nodes.map(d => d.name), d3.schemeCategory10);

    var node = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
            .attr("class","node")
//            .attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")";});
            .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);
    node.append("circle")
        .attr("r", function (d) {return d.r})//heightScale(d.value)/2})
        .attr("fill", function(d){return d.children ? "white" : color(d.name)})
        .attr("opacity", 0.25)
        .attr("stroke", function(d){return d.children ? "white" : color(d.name)})
        .attr("stroke-width", "2");

    node.append("text")
        .text(function(d){return d.children ? "" : d.name});

}

function bubble2 (svg, data){


    data = createTreeStructure(data, 'artwork_type');
    console.log(data);
    pack = data => d3.pack()
    .size([width - 2, height - 2])
    .padding(3)
  (d3.hierarchy({children: data})
    .sum(d => d.Count));
    

    //document.write(JSON.stringify(parsedData));
    const root = pack(data);
    const leaf = svg.selectAll("g")
        .data(root.leaves())
        .join("g")
        .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);
    console.log("Root and leaves are defined");

    leaf.enter().append("circle")
 //     .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
      .attr("r", d => 2)
      .attr("fill-opacity", 0.7)
      .attr("fill", "#69b3a2");

//  leaf.append("clipPath")
//      .attr("id", d => (d.clipUid = DOM.uid("clip")).id)
//    .append("use")
//      .attr("xlink:href", d => d.leafUid.href);

    console.log("Circles are appended...");
    console.log(d => d.categories);
//     leaf.append("text")
// //     .attr("clip-path", d => d.clipUid)
//     .selectAll("tspan")
//     .data(d => d.data.categories.Category)
//     .join("tspan")
//       .attr("x", 0)
//       .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
//  //     .text(d => d);
//     console.log("Text is appended");

//     leaf.append("title")
//         .text(d => `${d.categories.Category}\n${format(d.value)}`);
// //
}



function bubble1 (selection, data) {
//    parsedData = createTreeStructure(data, 'artwork_type')
//    const root = pack(parsedData);
    var genderCounts = countGenders(data);

    console.log(genderCounts); //

    var heightScale = d3.scale.linear()
	                   .domain([0, data.predicted_gender.length])
	                   .range([0, height-2*margin]);


    var bars = selection.selectAll("circle")
               .data(Object.entries(genderCounts));

    bars.enter().append("circle")
                        .attr("fill", function(d) {return gColors[d[0]]})
                        .attr("fill-opacity", 0.7)
                        .attr("fill", function(d) {return gColors[d[0]]})
                        .attr("cx", 580)
                        .attr("cy", 280)
                        .transition()
                        .duration(750)
                        .attr("r", function(d) {return heightScale(d[1])/2});   


    //TODO: combine into one group instead of two

    var stacked = 0;
    // var barAttributes = selection.selectAll("circle")
    //                     .attr("fill", function(d) {return gColors[d[0]]})
    //                     .attr("fill-opacity", 0.7)
    //                     .transition()
    //                     .duration(750)
    //                     .attr("r", function(d) {return heightScale(d[1])/2})
    //                     .attr("cx", function(d) {
    //                         return 880;
    //                     })
    //                     .attr("cy", function(d) {
    //                     return 300;
    //                     });
}//genderBar
