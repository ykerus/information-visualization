function countElements(data,category){
    var countedElements = {};
    for (var i = 0; i < data[category].length; i++) {
        if (countedElements[data[category][i]] == undefined) {
            countedElements[data[category][i]] = 1;
        } else{
            countedElements[data[category][i]] += 1;
        }
    }
    //document.write(JSON.stringify(countedElements));
    return countedElements
}

function createTreeStructure(data, category) {
    var root = 0;
    dictOfCounts = countElements(data, category);
    var categories = [];
    //document.write(JSON.stringify(categoryTree));
    var maxValue = 0 
    for (var key in dictOfCounts) {
        var object = {
          "name": key,
          "value": dictOfCounts[key]
        }
        if (dictOfCounts[key] > maxValue){
            maxValue = dictOfCounts[key]
        }
       categories.push(object);
    }
    var categoryTree = {
        "name": "All",
        "value": maxValue,
        "children": categories
    };
    //document.write(JSON.stringify(categoryTree));
    return categoryTree;
}
