var loadviv = new Vivus("loading", {type: "delayed", duration: 200, file: "omniart2.svg"}, function(loadviv){
  loadviv.play(loadviv.getStatus() === 'end' ? -1 : 1)
});

setTimeout(fadeout, 9000);

function fadeout(){
  $("#allload").fadeOut(2000, function(){$("#allload").remove();});
}
// window.addEventListener("load", function(){
//   $("#allload").fadeOut(2000, function(){
//     $(this).remove();
//   });
