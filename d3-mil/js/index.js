// ---------------------
// Request Data
// ---------------------

$(document).ready( function(){
  root_size = $(window).width() / 76.8;
  $('html').css({ 'font-size': root_size });

  $(window).resize(changeRootFontSize);
})

changeRootFontSize = function() {
  root_size = $(window).width() / 76.8;
  $('html').css({ 'font-size': root_size });
}

$(document).ready(function(){
var headermarker=$("#trigger");
$(window).scroll(function(){
  var scroll=$(window).scrollTop();
  var offset=headermarker.offset();
  console.log(offset.top)
  if(scroll>=offset.top){
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

var w=$(window).width();
var h=$(window).height();

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

var json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'http://mysafeinfo.com/api/data?list=topmilitarycountries2013&format=json',
        'dataType': 'json',
        'success': function (data) {
          json = data
        }
    });
    return json
})();



var countries = new Array();
var militarynum = new Array();
var ships = new Array();
var budget = new Array();
var plane = new Array();





// json.sort(function(a, b) {
//     return parseFloat(b.mnp) - parseFloat(a.mnp);
// });

var sortByProperty = function (property) {
    return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? -1 : 1));
    };
};

json.sort(sortByProperty('mnp'));

$.each(json,function( index,value){
  countries.push(value.cn);
  militarynum.push(value.mnp);
  budget.push(value.bdg);
  ships.push(value.shp);
  plane.push(value.pln);
});



var activelist=militarynum;




//
// d3.select("body").selectAll("p")
//     .data(countries)
//     .enter()
//     .append("p")
//     .text(function(d) { return d; });

//
// d3.select("body")
//     .selectAll("div")
//     .data(militarynum)
//     .enter()
//     //adds a div within body
//     .append("div")
//     //adds a class w title bar
//     .attr("class", "bar")
//     .style("height", function(d) {
//     return d/5000 + "px";
// })
//     .style("width",function(d){
//       return d/5000 +"px";
//     })

// d3.select("body")

var svg = d3.select("body").append("svg");
var scalefac=2.3;
var positions = new Array();

svg.attr("width", w);


var circles=svg.selectAll("circle")
    .data(activelist)
    .enter()
    .append("circle")
    .on("mouseover", handleMouseOver);

function drawcircles(){
  var positionshift=0;

  circles.attr("cy", function(d, i) {
    if (i!=0){
    var mapprevious=map_range(activelist[i-1],activelist[activelist.length-1],activelist[0],9,w*.7)
    // positionshift+=militarynum[i-1]*.0002;
    positionshift+=mapprevious;

    }
    console.log(positionshift)
    var mapthis=map_range(d,activelist[activelist.length-1],activelist[0],9,w*.7)
    positions.push(positionshift+mapthis/scalefac);
    return (positionshift+mapthis/scalefac);
      })
      .attr("fill","rgba(178,157,157,.5)")
   .attr("cx", w/1.5)
   .attr("r", function(d) {
    var mapped= map_range(d,activelist[activelist.length-1],activelist[0],9,w*.7);
    console.log(mapped);
    // return d*.0001;
    svg.attr("width",w);
    svg.attr("height", positionshift+100);
    return mapped/scalefac;
   })
   .on("mouseover",handleMouseOver)
   .on("mouseout",handleMouseOut)
   .on("click",handleMouseClick)


};

drawcircles();

function handleMouseOver(d, i) {  // Add interactivity

    // Use D3 to select element, change color and size
    d3.select(this).attr({
      fill: "#e2ac6a"
  });
  if ($(window).width()<=660){
  d3.select(this).attr("style","cursor:pointer")
}
  if ($(window).width()>=660){
    d3.select("body").append("div")
    .attr("text-anchor", "left")
    .attr("id","t" + d.x + "-" + d.y + "-" + i) // Create an id for text so we can select it later for removing on mouseout
    // .attr("x",w/6)
    // .attr("y",positions[i])
    .attr("class","label")

    .text(function() {
            return countries[i]+":\n"+activelist[i];  // Value of the text
          });

  }

};

function handleMouseClick(d,i){
  d3.select("#visible").remove();  // Remove text location
    if ($(window).width()<=660){
    d3.select("body").append("div")
    .attr("id","visible") // Create an id for text so we can select it later for removing on mouseout

    // .attr("x",w/6)
    // .attr("y",positions[i])
    .attr("class","mobilelabel")
    .text(function() {
        return countries[i]+"\n"+activelist[i];  // Value of the text
      });

  }
}


function handleMouseOut(d, i) {
      // Use D3 to select element, change color back to normal
      d3.select(this).attr({
        fill: "rgba(178,157,157,.5)",
      });
      d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location

    }



$(window).resize(function() {
   w = $(window).width();
   h = $(window).height();
   if ($(window).width()<=660){
     d3.select("#visible").remove();  // Remove text location
   }

   for (var i = positions.length; i > 0; i--) {
      positions.pop();
    }

   drawcircles();

  });



  $(document).ready(function() {
    $("#troops").addClass("active");
      $("button").click(function(){
        var id=this.id;
        $(".active").removeClass("active");
        if (id=="budget"){
          json.sort(sortByProperty('bdg'));
          resetLists();
          activelist=budget;
          $("#budget").addClass("active");
        }
        if (id=="plane"){
          json.sort(sortByProperty('pln'));
          resetLists();
          activelist=plane;
          $("#plane").addClass("active");
        }
        if (id=="ships"){
          json.sort(sortByProperty('shp'));
          resetLists();
          activelist=ships;
          $("#ships").addClass("active");



        }
        if (id=="troops"){
          json.sort(sortByProperty('mnp'));
          resetLists();
          activelist=militarynum;
          $("#troops").addClass("active");



        }

        for (var i = positions.length; i > 0; i--) {
           positions.pop();
         }


         svg.selectAll("circle")

             .data(activelist)
             .enter()
             .append("circle");
            //  .on("mouseover", handleMouseOver);
         drawcircles();


      });
  });


function resetLists(){

  for (var i = countries.length; i > 0; i--) {
     countries.pop();
     militarynum.pop();
     budget.pop();
     ships.pop();
     plane.pop();
   }

  $.each(json,function( index,value){
    countries.push(value.cn);
    militarynum.push(value.mnp);
    budget.push(value.bdg);
    ships.push(value.shp);
    plane.push(value.pln);
  });
}
