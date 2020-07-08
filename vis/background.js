
function loadBackground(data){
  var image_count = 100
  var image_urls = []

  for (i = 0; i < image_count; i++){
    image_urls.push(data.image_url[Math.floor(Math.random()*data.image_url.length)])

  }
  console.log("Background set")
  d3.select(".background").selectAll("img")
                            .data(image_urls)
                            .enter()
                            .append("img")
                            .transition()
                            .attr("src", (d) => d)
                            .attr("class", "bgimg")


}
