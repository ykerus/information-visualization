var gColors = {FEMALE:"#FCD965", MALE:"#A4C2F4", UNKNOWN:"#D9D9D9"};
var cColors = {"NON-WESTERN":"#B6D7A8", WESTERN:"#DD7D6B", UNKNOWN:"#D9D9D9", SELECTHOVER:"white"};


var margin = 20;
function count(array, item) {
	var count = 0;
	for (var i=0; i < array.length; i++)
    	if (array[i]==item)
        	count++;
    return count;
}//count

function countGenders(data) {
	var countsGender = {};
    countsGender["UNKNOWN"] = count(data.predicted_gender, "unknown");
    countsGender["MALE"] = count(data.predicted_gender, "male");
    countsGender["FEMALE"] = count(data.predicted_gender, "female");
    return countsGender;
}//countGenders

function countCultures(data) {
	var cultureCounts = {};
    cultureCounts["UNKNOWN"] = count(data.culture, "unknown");
    cultureCounts["WESTERN"] = count(data.culture, "western");
    cultureCounts["NON-WESTERN"] = count(data.culture, "non-western");
    return cultureCounts;
}//countCultures

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

// change this that it is applicable to all settings (not only origins)
function countOrigins2(data){
    var originCount=[];
    for (var i = 0; i<data.length-1; i++){
        if (i == 0)
            var gender = "male";
        else
            var gender = "female";
        originCount.push({"Web Gallery of Art '17": "", "value1": count(data[i], "Web Gallery of Art '17").toString() })
        originCount.push({"Web Gallery of Art '17": "", "value1": count(data[i+1], "Web Gallery of Art '17").toString() })
        originCount.push({"WikiArts 17": "", "value": count(data[i], "WikiArts 17").toString() })
        originCount.push({"WikiArts 17": "", "value": count(data[i+1], "WikiArts 17").toString() })
        originCount.push({"DeviantArt": "", "value2": count(data[i], "DeviantArt").toString() })
        originCount.push({"DeviantArt": "", "value2": count(data[i+1], "DeviantArt").toString() })
        originCount.push({"MOMA - New York": count(data[i], "MOMA - New York").toString(), "value4": "33" })
        originCount.push({"MOMA - New York": count(data[i+1], "MOMA - New York").toString(), "value4": "18" })
        originCount.push({"The Met 17": count(data[i], "The Met 17").toString(), "value5": "2" })
        originCount.push({"The Met 17": count(data[i+1], "The Met 17").toString(), "value5": "20" })
    }
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
//    console.log(lengthArrMale)
    var resultArrFemale = [];
    for(var i = 0; i<indexesFemale.length; i++)
        resultArrFemale.push(dataArray[indexesFemale[i]]);
    return [resultArrMale, resultArrFemale];
}//selectGenderData


// change this that it is applicable to all settings (not only origins)
function selectCultureData(data, variable){
    if (variable == "collection_origins"){
        var dataArray = data.collection_origins
    }
    var cultureDataSelected = {};
    var indexesWestern = [], i = -1;
    var indexesNonWestern = [], j = -1;
    var arr = data.culture;
    var western = "western";
    var nonWestern = "non-western";
    while ((i = arr.indexOf(western, i+1)) !=-1){
        indexesWestern.push(i);
    }
    while ((j = arr.indexOf(nonWestern, j+1)) !=-1){
        indexesNonWestern.push(j);
    }
    var resultArrWestern = [];
    for (var i = 0; i < indexesWestern.length; i++)
        resultArrWestern.push(dataArray[indexesWestern[i]]);
    var lengthArrWestern = resultArrWestern.length;
//    console.log(lengthArrMale)
    var resultArrNonWestern = [];
    for(var i = 0; i<indexesNonWestern.length; i++)
        resultArrNonWestern.push(dataArray[indexesNonWestern[i]]);
    return [lengthArrWestern, resultArrNonWestern];
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
            radius.push(value[i]/500)
    }
    return radius
}//getRadius


function donutChart(selection, data, selected){
    if(selected){
        console.log('gender is selected')
        var countsGender = countGenders(data);
        var countsGender = countGenders(data);
        var resultsGender = selectGenderData(data, "collection_origins");
        var originMaleCounts = countOrigins(resultsGender[0]);
        var originFemaleCounts = countOrigins(resultsGender[1]);
        var threeLists = creatingThreeList(originMaleCounts, originFemaleCounts);
        var allData = threeLists[0];
        var maleData = threeLists[1];
        var femaleData = threeLists[2];
        var countOriginData = countOrigins2(resultsGender)

//        console.log('opnieuw in DonutChart',countOriginData)

        var dataList = []
        for (var i=0; i < femaleData.length; i++){
                dataList.push([femaleData[i], maleData[i]])
        }
        var color = d3.scaleOrdinal()
          .range(["#FCD965", "#A4C2F4"])

        selection.selectAll("g").remove()

        var g2Gender = selection.append("g")
            .attr("transform", "translate(200,200)");
    }
    if(! selected){
        console.log('culture is selected')
        var countsCulture = countCultures(data);
        var resultsCulture = selectCultureData(data, "collection_origins");
//        console.log('results culture', resultsCulture)
        var originWesternCounts = countOrigins(resultsCulture[0]);
        var originNonWesternCounts = countOrigins(resultsCulture[1]);
        var threeLists = creatingThreeList(originWesternCounts, originNonWesternCounts);

        var allData = threeLists[0];
        var westernData = threeLists[1];
        var nonWesternData = threeLists[2];
        var countOriginData = countOrigins2(resultsCulture)

        var dataList = []
        for (var i=0; i < nonWesternData.length; i++){
                dataList.push([nonWesternData[i], westernData[i]])
        }
        var color = d3.scaleOrdinal()
          .range(["#DD7D6B", "#B6D7A8"])
        selection.selectAll("g").remove()

        var g2Culture = selection.append("g")
            .attr("transform", "translate(200,200)");
    }

    var radius_all = getRadius(allData);
    Array.prototype.max = function() {
      return Math.max.apply(null, this);
    };


    var arc = d3.arc()
                .innerRadius(10)    //TODO: radius bepalen adhv de data (dit moet ook in de functie komen te staan)
                .outerRadius(30);  //TODO: radius bepalen adhv de data

    var pie = d3.pie()
                .sort(null)
                .value(function(d) {
//                        console.log('dit is in pie function ',d)
                        return d; });


    function functionRadius(data){
//        console.log('wat is dit',data)
//        .function(d){
//            console.log(d[i][0]+data[i][1])
//            return d[i][0]+data[i][1];}}
        for (var i = 0; i<data.length; i++){
//            console.log(data[i][0]+data[i][1])
            return data[i][0]+data[i][1]

        }
        return 10}


    function createChart(data, selected){
        var totalData = []
        for (var i=0; i<data.length; i++){
            totalData.push(data[i][0]+data[i][1])
        }
//        console.log(totalData)

        var radiusScale = d3.scaleLinear()
                           .domain([0, totalData.max()])
                           .range([15, 30]);

        var arc = d3.arc()
                .innerRadius(function(d){
                        console.log('dit is d',d)
                        console.log('this is the radius',radiusScale(functionRadius(d)))
                        return radiusScale(functionRadius(d))*1.3
                }
                )
                .outerRadius(function(d){
                    return 2.7*radiusScale(functionRadius(d))
                });
        console.log('zo ziet arc eruit', arc)

        function create_arc(inner, outer){
//            start = start || 0;
            var res = d3.arc()
                        .innerRadius(inner)
                        .outerRadius(outer)
            return res;
        }

//        var pie = d3.pie()
//                .sort(null)
//                .value(function(d) { console.log(d)
//                        return d; });

//        var color = d3.scaleOrdinal()
//          .range(["#FCD965", "#A4C2F4"])


        if(selected){
            var points = g2Gender.selectAll("g")
                    .data(data)
                    .enter()
                    .append("g")
                    .attr("transform", function(d, i){
                            return "translate("+(100*i)+",50)"
                    })
                    .attr("id", function(d, i) {return "chart"+i; })
                    .append("g").attr("class", "pies");
        }
        if(!selected){
        var points = g2Culture.selectAll("g")
                .data(data)
                .enter()
                .append("g")
                .attr("transform", function(d, i){
                        return "translate("+(100*i)+",50)"
                })
                .attr("id", function(d, i) {return "chart"+i; })
                .append("g").attr("class", "pies");

        }

        // Select each g element we created, and fill it with pie chart:
        var pies = points.selectAll(".pies")
            .data(function(d){
//                    console.log('dit is d',d)
                    var testArray=[]
                    for (var key in d){
//                        console.log(d[key])
                        testArray.push(d[key])
                    }
                    console.log('wat is de test array',testArray)
                    return pie(testArray);
            })
            .enter()
            .append('g')
            .attr('class','arc');

//        console.log('pies',pies)
//        console.log(typeof(data))


        function testFunc(data){
            for(var i = 0; i<data.length; i++){
                    console.log('in test fun', data[i])
            }
        }


//        testFunc(data)
        pies.append("path")
//          .transition().delay()
//          .attr('d',arc)
//          .attr("d", function(d){
//            console.log('path function, d is', d)
//            return create_arc(10,30)
//          })
          .attr("d", create_arc(10,30))
//          .attr("id", function(){
//
//          })
//          .attr('id', function(d){
//                    console.log(typeof(d))
//                    console.log('this is in id',d)
//                    if(d['index'] != 2 ){
//                        console.log('amount is',d['data'])
//                        console.log(d.data)
//                    }
////                    if(d['index'] == 1){
////                        console.log('amount is ',d['data'])
////                    }
//          })
          .attr("fill",function(d,i){
               return color(i);
          });

//svg.append("path")
//    .style("fill", "blue")
//    .attr("d", create_arc(80,100,0)({endAngle: twoPi}));

    };

    createChart(dataList, selected)

}