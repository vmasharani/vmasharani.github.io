// fill an array with a bunch of locations



$(document).ready(function(){

    var plots={};
    var slices=[];


    function map_range(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }



$.getJSON('data/testdata.json',function(data){

  var counter=0;

        console.log('success');
        dataType: 'json'

        $.each(data,function(i,ev){

          var ethnictotal;
          var sexualtotal;


          if(ev.agencyname!="Total"){

            var longitude;
            var latitude;
            var entrypoint = cities.indexOf(ev.state);
            var stake = cities.indexOf(ev.agencyname,entrypoint);


            if (cities[stake-1]!=ev.state){
              console.log(ev.agencyname);
              latitude=-99999;
              longitude=-99999;
            } else{
            // console.log(cities[stake+1],cities[stake+2]);

            latitude=parseFloat(cities[stake+1]);
            longitude=parseFloat(cities[stake+2]);
            ev.longitude=longitude;
            ev.latitude=latitude;
            data[i]=(JSON.parse(JSON.stringify(ev)));
          }
              }
          });
      setTimeout(function(){


        // console.log(data[1].longitude);

        for (var i=0;i<data.length;i++){
          var totalcrimes=parseInt(data[i].rea)+parseInt(data[i].religion)+parseInt(data[i].sexualorientation)+parseInt(data[i].disability)+parseInt(data[i].gender)+parseInt(data[i].genderidentity);
          var truepop=data[i].population*1000;
          var crimesper=parseFloat((totalcrimes*10000)/truepop);
          plots['location'+i]=(
                {
                    value: crimesper*100,
                    latitude: data[i].latitude,
                    longitude: data[i].longitude,
                    total: totalcrimes,
                    per1000: crimesper,
                    href: "#",
                    tooltip: {
                        content: data[i].agencyname+" total crimes: "+totalcrimes,
                    },
                    blurb: "hate crimes based on ethnicity: "+"<span class='numemph'>"+data[i].rea+"</span>"+"<br/>"+"hate crimes based on religion: "+data[i].religion+"<br/>"+"hate crimes based on sexual orientation: "+data[i].sexualorientation+"<br/>"+"hate crimes based on disability: "+data[i].disability+"<br/>"+"hate crimes based on gender: "+parseInt(data[i].genderidentity+data[i].gender)+"<br/>"+"total hate crimes: "+totalcrimes+"<br/>"+"hate crimes per 10000: "+crimesper,
                }
          )
        };
        //
        // for (var i=0;i<data.length;i++){
        //
        //   if(data[i].population!=null){
        //     console.log(data[i].agencyname);
        //
        //
        //   var scaledvalue=map_range(data[i].population,1.1,8550,5,300);
        //
        //   var newslice={
        //       size: parseInt(Math.floor(scaledvalue)),
        //       type: "circle",
        //       min: data[i].population-10,
        //       max:data[i].population+10,
        //       attrs: {
        //           fill: "#89ff72"
        //       },
        //     }
        //
        //   slices.push(newslice);
        //   console.log(data[i].agencyname,parseInt(Math.floor(scaledvalue)));
        //   }
        //
        // }



      $(".mapcontainer").mapael({
          map: {
              name: "usa_states",
              zoom: {
                  enabled: true
              },
              defaultPlot: {
                  size: 3,
                  eventHandlers: {
                      mouseover: function (e, id, mapElem, textElem, elemOptions) {
                          if (typeof elemOptions.blurb != 'undefined') {
                              $('.myText span').html(elemOptions.blurb).css({display: 'none'}).fadeIn('slow');
                          }
                      }
                  },

                  attrs: {
                    opacity:0.6
                  }
              }
            },
            legend: {
                plot: {
                    cssClass: 'myLegend',
                    labelAttrs: {
                        fill: "#4a4a4a"
                    },
                    titleAttrs: {
                        fill: "#4a4a4a"
                    },
                    marginBottom: 20,
                    marginLeft: 30,
                    hideElemsOnClick: {
                        opacity: 0
                    },
                    title: "French cities population",
                    // slices:slices
                    slices: [{
                        size: 4,
                        type: "circle",
                        max: 100,
                        attrs: {
                            fill: "#89ff72"
                        },
                        label: "Less than 20000 inhabitants"
                    }, {
                        size: 12,
                        type: "circle",
                        min: 100,
                        max: 200,
                        attrs: {
                            fill: "#89ff72"
                        },
                        label: "Less than 20000 inhabitants"
                    }, {
                        size: 16,
                        type: "circle",
                        min: 200,
                        max: 300,
                        attrs: {
                            fill: "#89ff72"
                        },
                        label: "Less than 20000 inhabitants"
                    }, {
                        size: 20,
                        type: "circle",
                        min: 300,
                        max: 400,
                        attrs: {
                            fill: "#89ff72"
                        },
                        label: "Less than 20000 inhabitants"
                    }, {
                        size: 23,
                        type: "circle",
                        min: 400,
                        max: 500,
                        attrs: {
                            fill: "#89ff72"
                        },
                        label: "Less than 20000 inhabitants"
                    }, {
                        size: 25,
                        type: "circle",
                        min: 400,
                        max: 500,
                        attrs: {
                            fill: "#89ff72"
                        },
                        label: "Less than 20000 inhabitants"
                    }, {
                        size: 27,
                        type: "circle",
                        min: 500,
                        max: 600,
                        attrs: {
                            fill: "#89ff72"
                        },
                        label: "Less than 20000 inhabitants"
                    }, {
                        size: 29,
                        type: "circle",
                        min: 600,
                        max: 700,
                        attrs: {
                            fill: "#89ff72"
                        },
                        label: "Less than 20000 inhabitants"
                    }, {
                        size: 31,
                        type: "circle",
                        min: 700,
                        max: 800,
                        attrs: {
                            fill: "#89ff72"
                        },
                        label: "Less than 20000 inhabitants"
                    }, {
                        size: 33,
                        type: "circle",
                        min: 800,
                        max:900,
                        attrs: {
                            fill: "#89ff72"
                        },
                        label: "Less than 20000 inhabitants"
                    }, {
                        size: 34,
                        type: "circle",
                        min: 900,
                        max:1000,
                        attrs: {
                            fill: "#89ff72"
                        },
                        label: "Less than 20000 inhabitants"
                    }, {
                        size: 36,
                        type: "circle",
                        min: 1000,
                        max:1100,
                        attrs: {
                            fill: "#89ff72"
                        },
                        label: "Less than 20000 inhabitants"
                    }, {
                        size: 41,
                        type: "circle",
                        min: 1200,
                        max: 1300,
                        attrs: {
                            fill: "#89ff72"
                        },
                        label: "Less than 20000 inhabitants"
                    }, {
                        size: 46,
                        type: "circle",
                        min: 1300,
                        max: 1400,
                        attrs: {
                            fill: "#89ff72"
                        },
                        label: "Less than 20000 inhabitants"
                    }, {
                        size: 54,
                        type: "circle",
                        min: 1400,
                        max: 1500,
                        attrs: {
                            fill: "#89ff72"
                        },
                        label: "Less than 20000 inhabitants"
                    }, {
                        size: 61,
                        type: "circle",
                        min: 1500,
                        attrs: {
                            fill: "#89ff72"
                        },
                        label: "Less than 20000 inhabitants"
                    } ]
                }
            },
            plots: plots
            });
        },1000);


        $('.changescale').on('click',function(event){
          var which=event.target.id;
          var updatedOptions={'plots':{}};

          for (var i=0;i<data.length;i++){
            var totalcrimes=parseInt(data[i].rea)+parseInt(data[i].religion)+parseInt(data[i].sexualorientation)+parseInt(data[i].disability)+parseInt(data[i].gender)+parseInt(data[i].genderidentity);
            var truepop=data[i].population*1000;
            var crimesper=parseFloat((totalcrimes*10000)/truepop);
            if (which=='popscale'){
              plots['location'+i].value=data[i].population*.65;
            }
            if (which=='perscale'){
              plots['location'+i].value=crimesper*100;
            }
            if (which=='crimescale'){
              plots['location'+i].value=totalcrimes*10;
            }
          }

          updatedOptions.plots=plots;
          $(".mapcontainer").trigger('update', [{
              mapOptions:updatedOptions,
              animDuration: 200
          }]);
        });
  });
});

// ADD - STATE BY STATE PI CHARTS (select from a dropdown menu, then pass the id into an array each containing the same id (State) and a dataset (structure: [ ["ca", [30,40,60] ] ]    )

// $(document).ready(function(){
//   $('#button1').click(function(){
//     alert($('#combo :selected').text());
//   });
// });

// <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
// <select id="combo">
//   <option value="1">Test 1</option>
//   <option value="2">Test 2</option>
// </select>
// <input id="button1" type="button" value="Click!" />

// so you select from a dropdown menu, get the value back, then iterate back through the data using an if statement for the data[i].state as an entry point and if it's no longer true, just break it. that's how we get totals for the variables. then push those variables into a generic data array. and use the basic chart.js framework for pi chart this whole thing can run on button click.


// ADD - COUNTRY-WIDE RESULTS. run through the data one more time, then just append it to a ul and style it.
