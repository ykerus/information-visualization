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
    var categoryTree = {};
    var categories = []
    categoryTree.categories = categories;
    document.write(JSON.stringify(categoryTree));
    for (var key in dictOfCounts) {
        var object = {
          "category": key,
          "count": dictOfCounts[key]
        }
       categoryTree.categories.push(object);
    }
    document.write(JSON.stringify(categoryTree));

    var manager = "Jane Doe";
    categoryTree.categories[0].manager = manager;
    console.log(sitePersonel);



    return root
}

d3.json("data.json", function(data) {
    var dataTree = createTreeStructure(data, 'artwork_type');

    //createTreeStructure(data, 'artwork_type')
})