$(document).ready(function(){
var headermarker=$("#trigger");
  $(window).scroll(function(){
    var scroll=$(window).scrollTop();
    var offset=headermarker.offset();
    if(scroll>=offset.top){
      console.log("fired")
      $("h2").addClass("visible");
    } else if(scroll<offset.top){
      $("h2").removeClass("visible");
    }
  })
});

$(document).ready(function(){
  $('#scrollup').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 0);
    return false;
})
});
