$(document).ready(function(){
  console.log("hello world");
var headermarker=$("#trigger");
$(window).scroll(function(){
  var scroll=$(window).scrollTop();
  var offset=headermarker.offset();
  console.log(offset.top)
  if(scroll>=offset.top){
    $(".info").addClass("smaller");
  } else if(scroll<offset.top){
    $(".info").removeClass("smaller");
  }
})
});
