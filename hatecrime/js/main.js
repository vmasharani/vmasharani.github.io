// fill an array with a bunch of locations



$(document).ready(function(){






$.getJSON('data/testdata.json',function(data){
        console.log('success');
        dataType: 'json'
        $.each(data,function(i,ev){
          $('ul').append('<li>'+ev.state+' '+ev.rea+'</li>');
          if(ev.agencyname!="Total"){
            var longitude;
            var latitude;

            var entrypoint = cities.indexOf(ev.state);
            var stake = cities.indexOf(ev.agencyname,entrypoint);
            console.log(cities[stake+1],cities[stake+2]);
            latitude=parseFloat(cities[stake+1]);
            longitude=parseFloat(cities[stake+2]);
            ev.longitude=longitude;
            ev.latitude=latitude;
            data[i]=(JSON.parse(JSON.stringify(ev)));

              };
          });
      setTimeout(function(){
        var plots={};


        // console.log(data[1].longitude);

        for (var i=0;i<data.length;i++){
          var totalcrimes=parseInt(data[i].rea)+parseInt(data[i].religion)+parseInt(data[i].sexualorientation)+parseInt(data[i].disability)+parseInt(data[i].gender)+parseInt(data[i].genderidentity);
          var trupop=data[i].population*1000;
          var crimesper=parseFloat((totalcrimes*10000)/trupop);
          plots['location'+i]=(

                {
                    value: parseInt(data[i].population*1000),
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


          console.log(plots);

      $(".mapcontainer").mapael({
          map: {
              name: "usa_states",
              defaultPlot: {
                  size: 15,
                  eventHandlers: {
                      mouseover: function (e, id, mapElem, textElem, elemOptions) {
                          if (typeof elemOptions.blurb != 'undefined') {
                              $('.myText span').html(elemOptions.blurb).css({display: 'none'}).fadeIn('slow');
                          }
                      }
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
                    slices: [{
                        size: 4,
                        type: "circle",
                        max: 20000,
                        attrs: {
                            fill: "#89ff72"
                        },
                        label: "Less than 20000 inhabitants"
                    }, {
                        size: 6,
                        type: "circle",
                        min: 20000,
                        max: 100000,
                        attrs: {
                            fill: "#fffd72"
                        },
                        label: "Between 20000 and 100000 inhabitants"
                    }, {
                        size: 20,
                        type: "circle",
                        min: 100000,
                        max: 200000,
                        attrs: {
                            fill: "#ffbd54"
                        },
                        label: "Between 100000 et  200000 inhabitants"
                    }, {
                        size: 40,
                        type: "circle",
                        min: 200000,
                        attrs: {
                            fill: "#ff5454"
                        },
                        label: "More than 200000 inhabitants"
                    }]
                }
            },
            plots: plots
            });
        },1000);
  });
});
