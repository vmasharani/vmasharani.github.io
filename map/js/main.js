
// rem font sizer
$(document).ready( function(){
  root_size = $(window).width() / 76.8;
  $('html').css({ 'font-size': root_size });

  $(window).resize(changeRootFontSize);
})

changeRootFontSize = function() {
  root_size = $(window).width() / 76.8;
  $('html').css({ 'font-size': root_size });
}


// infobox hider
$(function(){
  $("#infobutton").click(function(){
    // toggles hidden class on click
    $('#mybox').toggleClass("infobox-hidden");
  })

});

// resource bulletin toggler
$(function(){
  // has to affect all ids
  $("#showBulletin").click(function(){
    $('#bulletin').toggleClass("resourcefeed resourcefeed show");
    $('#arrowbutton').toggleClass("rotated");
    $('#bulletinheader').toggleClass("redbg");
    $('#arrowcont').toggleClass("pushtop");

  })

});

// responsive nav opener
function openNav(){
  document.getElementById("respnav").style.width="100%";
}
function closeNav(){
  document.getElementById("respnav").style.width="0%";
}


// FOUND CODE FROM W3SCHOOLS FOR MODAL
// Get the modal
var modal = document.getElementById('contactModal');

// Get the button that opens the modal
var btn = document.getElementById("openContact");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var button = document.getElementById("submitbutton");

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

button.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// tooltip code
var tooltipSpan = document.getElementById('tooltip-span');
var tooltipSpan2 = document.getElementById('tooltip-span2');

var toolTips = [];

// adds all tooltips to an array
$(document).ready(function(){
  for(var i=1;i<33;i++){
    toolTips[i]=$('#tooltip-span'+i);
  }

});

// shows the tooltips on mousemove offset from mouse
  window.onmousemove = function (e) {
    var x = e.clientX, y = e.clientY;
    $.each(toolTips, function (index, value) {
      $('#tooltip-span'+index).css('top',y);
      $('#tooltip-span'+index).css('left',x);
    });

};

// archived tooltip code
  // tooltipSpan.style.top = (y + 20) + 'px';
  // tooltipSpan.style.left = (x + 20) + 'px';
  // tooltipSpan2.style.top = (y + 20) + 'px';
  // tooltipSpan2.style.left = (x + 20) + 'px';


// window.onmousemove = function (e) {
//   var x = e.clientX, y = e.clientY;
//   tooltipSpan.style.top = (y + 20) + 'px';
//   tooltipSpan.style.left = (x + 20) + 'px';
//   tooltipSpan2.style.top = (y + 20) + 'px';
//   tooltipSpan2.style.left = (x + 20) + 'px';
// };

// stickytop
$(document).ready(function() {
  var $header = $("#followinfo"),
  // clones header on scroll exceptmobile
      $clone = $header.before($header.clone().addClass("clone"));
      if ($(window).width()>=480){
        $header.show();
      }

// toggles sticky class once it hits the 180 distance from top
  $(window).on("scroll", function() {
      var fromTop = $(window).scrollTop();
      $("body").toggleClass("down", (fromTop > 180));
      if (fromTop>180 && $( window ).width()>=840){
        $header.hide();
      } else {
        $header.show();
      }
  });
});
