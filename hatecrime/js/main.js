// fill an array with a bunch of locations



$(document).ready(function(){



  var modal = document.getElementById("contentmodal");
  var close = document.getElementsByClassName("close")[0];
  var cover = document.getElementById("cover");
  var projects = document.getElementsByClassName("projectlink");


// MODAL FUNCTIONS

  function clearView(){
    modal.style.display = "none";
    cover.style.display="none";
    $('#projectcontainer').empty();
  }

  close.addEventListener('click',function(e){
    clearView();
  });

  cover.addEventListener('click',function(e){
    clearView();
  });

  $(document).keypress(function(e) {
    if (e.keyCode == 27) {
      clearView();
    }
  });

  $(document).on('keyup',function(evt) {
    if (evt.keyCode == 27) {
      console.log("keyprese");
      clearView();
    }
  });

  for (var i=0;i<projects.length;i++){
    projects[i].addEventListener('click', function(e) {
      modal.style.display="block";
      cover.style.display="block";
      $('#projectcontainer').load(e.target.id+'.html');
    }, false);
  };

  // VARIABLES FOR MAP PLOTTING

  var plots={};
  var statetotals=[];
  var lastpressed="perscale";

  // VARIABLES FOR STATE DATA

  var dropdown=$("#statedropdown");
  var states=["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA","MD", "ME", "MI", "MN", "MO", "MT", "NC", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"];
  var statedata=new Array();

  // FILLS STATE DROPDOWN

  for (var i=0;i<states.length;i++){
     $('<option/>').val(states[i]).html(states[i]).appendTo('#statedropdown');
  }

  // MAPPING FUNCTION
  function map_range(value, low1, high1, low2, high2) {
      return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }


  // GETS DATA
  $.getJSON('data/testdata.json',function(data){

    // CRIMECOUNTERS
    var ethnictotal=0, religiontotal=0, sexualtotal=0, disabletotal=0, gendertotal=0, natlethnictotal=0, natlreligiontotal=0, natlsexualtotal=0, natldisabletotal=0, natlgendertotal=0;

    var statetotalvariables=[ethnictotal, religiontotal, sexualtotal, disabletotal, gendertotal];
    var nationaltotalvariables=[natlethnictotal, natlreligiontotal, natlsexualtotal, natldisabletotal, natlgendertotal];

    console.log('success');
    dataType: 'json'

// ITERATES THROUGH DATA

    $.each(data,function(i,ev){


// GETS LONGITUDE, LATITUDE
      if(ev.agencyname!="Total"){
        var longitude;
        var latitude;
        var entrypoint = cities.indexOf(ev.state);
        var stake = cities.indexOf(ev.agencyname,entrypoint);

        if (cities[stake-1]!=ev.state){
          // console.log(ev.agencyname);
        } else{
          latitude=parseFloat(cities[stake+1]);
          longitude=parseFloat(cities[stake+2]);
          ev.longitude=longitude;
          ev.latitude=latitude;
          data[i]=(JSON.parse(JSON.stringify(ev)));
        }
      }
    });

// TIMEOUT SO THAT AJAX REQUEST CAN COMPLETE.
    setTimeout(function(){

// PLOTS DATA USING MAPAEL

      for (var i=0;i<data.length;i++){
        var totalcrimes=parseInt(data[i].rea)+parseInt(data[i].religion)+parseInt(data[i].sexualorientation)+parseInt(data[i].disability)+parseInt(data[i].gender)+parseInt(data[i].genderidentity);
        var truepop=data[i].population*1000;
        var crimesper=(parseFloat((totalcrimes*10000)/truepop)).toFixed(2);

          plots['location'+i]=(
            {
              value: crimesper*100,
              latitude: data[i].latitude,
              longitude: data[i].longitude,
              total: totalcrimes,
              per1000: crimesper,
              href: "",
              tooltip: {
                  content: data[i].agencyname+" ("+totalcrimes+" total crimes)",
              },
              blurb: "Hate crimes based on ethnicity: "+data[i].rea+"<br/>"+"Hate crimes based on religion: "+data[i].religion+"<br/>"+"Hate crimes based on sexual orientation: "+data[i].sexualorientation+"<br/>"+"Hate crimes based on disability: "+data[i].disability+"<br/>"+"hate crimes based on gender: "+parseInt(data[i].genderidentity+data[i].gender)+"<br/>"+"<span class='numemph'>"+"Total hate crimes: "+totalcrimes+"</span> <br/>Hate crimes per 10000: "+crimesper,
            })

        natlethnictotal+=data[i].rea;
        natlreligiontotal+=data[i].religion;
        natlsexualtotal+=data[i].sexualorientation;
        natldisabletotal+=data[i].disability;
        natlgendertotal+=data[i].gender;

// WRITES CONCLUSION STATEMENT

        if(i==data.length-1){
          $('#conclusion').append("<div class='conclusion'>In the USA, there were "+natlethnictotal+" hate crimes based on ethnicity, <br>"+natlreligiontotal+" hate crimes based on religion, <br>"+natlsexualtotal+" hate crimes based on sexual orientation, <br>"+natldisabletotal+" hate crimes based on disability, and <br>"+natlgendertotal+" hate crimes based on gender in 2015.</div>");
        };

        var currentstate=data[i].state;
        if (data[i].state!="WY"){

          if (data[i].state==data[i+1].state){
            ethnictotal+=data[i].rea;
            religiontotal+=data[i].religion;
            sexualtotal+=data[i].sexualorientation;
            disabletotal+=data[i].disability;
            gendertotal+=data[i].gender;
          }

          if (data[i].state!=data[i+1].state){
            ethnictotal+=data[i].rea;
            religiontotal+=data[i].religion;
            sexualtotal+=data[i].sexualorientation;
            disabletotal+=data[i].disability;
            gendertotal+=data[i].gender;
            statetotals.push(data[i].state);
            statetotals.push([ethnictotal,religiontotal,sexualtotal,disabletotal,gendertotal]);
            ethnictotal=0;
            religiontotal=0;
            sexualtotal=0;
            disabletotal=0;
            gendertotal=0;
          }
        } else if (data[i].state=="WY"){
          ethnictotal+=data[i].rea;
          religiontotal+=data[i].religion;
          sexualtotal+=data[i].sexualorientation;
          disabletotal+=data[i].disability;
          gendertotal+=data[i].gender;

          statetotals.push(data[i].state);
          statetotals.push([ethnictotal,religiontotal,sexualtotal,disabletotal,gendertotal]);
          break
        }
      };

      statedata=statetotals[statetotals.indexOf("AK")+1];
      myPieChart.data.datasets[0].data=statedata;
      myPieChart.update();

// CREATES MAPAEL UNDER MAP

      $(".mapcontainer").mapael({
        map: {
          name: "usa_states",
          zoom: {
            enabled: true,
            mousewheel: true,
            animDuration: 250,
          },
          defaultArea: {
            attrs:{
              fill:'#f2f2f2'
            },
            attrsHover : {
              fill:"#f2f2f2"
            }
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
                fill: "#7D7D7D"
              },
              label: "Less than 20000 inhabitants"
              }, {
                size: 12,
                type: "circle",
                min: 100,
                max: 200,
                attrs: {
                    fill: "#887574"
                },
                label: "Less than 20000 inhabitants"
              }, {
                size: 16,
                type: "circle",
                min: 200,
                max: 300,
                attrs: {
                    fill: "#8D716F"
                },
                label: "Less than 20000 inhabitants"
              }, {
                size: 20,
                type: "circle",
                min: 300,
                max: 400,
                attrs: {
                    fill: "#936D6B"
                },
                label: "Less than 20000 inhabitants"
              }, {
                size: 23,
                type: "circle",
                min: 400,
                max: 500,
                attrs: {
                    fill: "#996966"
                },
                label: "Less than 20000 inhabitants"
              }, {
                size: 25,
                type: "circle",
                min: 400,
                max: 500,
                attrs: {
                    fill: "#9E6562"
                },
                label: "Less than 20000 inhabitants"
              }, {
                size: 27,
                type: "circle",
                min: 500,
                max: 600,
                attrs: {
                    fill: "#A4615D"
                },
                label: "Less than 20000 inhabitants"
              }, {
                size: 29,
                type: "circle",
                min: 600,
                max: 700,
                attrs: {
                    fill: "#A95D59"
                },
                label: "Less than 20000 inhabitants"
              }, {
                size: 31,
                type: "circle",
                min: 700,
                max: 800,
                attrs: {
                    fill: "#AF5955"
                },
                label: "Less than 20000 inhabitants"
              }, {
                size: 33,
                type: "circle",
                min: 800,
                max:900,
                attrs: {
                    fill: "#B55550"
                },
                label: "Less than 20000 inhabitants"
              }, {
                size: 34,
                type: "circle",
                min: 900,
                max:1000,
                attrs: {
                    fill: "#BA514C"
                },
                label: "Less than 20000 inhabitants"
              }, {
                size: 36,
                type: "circle",
                min: 1000,
                max:1100,
                attrs: {
                    fill: "#C04D47"
                },
                label: "Less than 20000 inhabitants"
              }, {
                size: 41,
                type: "circle",
                min: 1200,
                max: 1300,
                attrs: {
                    fill: "#C54943"
                },
                label: "Less than 20000 inhabitants"
              }, {
                size: 46,
                type: "circle",
                min: 1300,
                max: 1400,
                attrs: {
                    fill: "#CB453E"
                },
                label: "Less than 20000 inhabitants"
              }, {
                size: 54,
                type: "circle",
                min: 1400,
                max: 1500,
                attrs: {
                    fill: "#D1413A"
                },
                label: "Less than 20000 inhabitants"
              }, {
                size: 61,
                type: "circle",
                min: 1500,
                max:1600,
                attrs: {
                    fill: "#D63D35"
                },
                label: "Less than 20000 inhabitants"
              }, {
                size: 71,
                type: "circle",
                min: 1600,
                max:2000,
                attrs: {
                    fill: "#DC3931"
                },
                label: "Less than 20000 inhabitants"
              }, {
                size: 81,
                type: "circle",
                min: 2000,
                max:2400,
                attrs: {
                    fill: "#DC3931"
                },
                label: "Less than 20000 inhabitants"
              }, {
                size: 110,
                type: "circle",
                min: 2400,
                attrs: {
                    fill: "#E2362D"
                },
                label: "Less than 20000 inhabitants"
              }  ]
          }
        },
        plots: plots
      });
    },1000);


// EVENTS FOR CHANGING THE SCALE OF THE MAP

    $('.changescale').on('click',function(event){
      $('#'+lastpressed).removeClass('clicked');
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

        if (which=='equalscale'){
          plots['location'+i].value=16;
        }
      }

      updatedOptions.plots=plots;
      $(".mapcontainer").trigger('update', [{
          mapOptions:updatedOptions,
          animDuration: 200
      }]);

      lastpressed=which;
      $('#'+lastpressed).addClass('clicked');
    });

// PIE CHART

    var ctx = document.getElementById("myChart");
    var myPieChart = new Chart(ctx,{
      type: 'pie',
      data: {
        labels: ["Ethnicity", "Religion", "Sexual Orientation", "Disability", "Gender"],
        datasets: [{
          data: statedata,
          backgroundColor: [
            'rgba(165, 114, 89, 0.8)',
            'rgba(204, 132, 199, 0.8)',
            'rgba(89, 219, 171, 0.8)',
            'rgba(80, 104, 168, 0.8)',
            'rgba(144, 135, 145, 0.8)'
          ],
          borderColor: [
            'rgba(0,0,0,1)',
            'rgba(0,0,0,1)',
            'rgba(0,0,0,1)',
            'rgba(0,0,0,1)',
            'rgba(0,0,0,1)'
          ],
        borderWidth: 1
        }]
      },
      options: {
        cutoutPercentage: 0,
        legend :{
          position : "top",
          labels:{
            fontFamily: "'Work Sans', sans-serif",
          }
        },
        tooltips:{
          bodyFontFamily:"'Work Sans', sans-serif"

        },
        pieceLabel: {
          mode: 'value',
          fontSize: 14,
          fontStyle: 'bold',
          fontColor: '#000',
          fontFamily:'Work Sans'
        }
      }
    });

// DROPDOWN CHANGE EVENT FOR STATE PIE CHART

    $('#statedropdown').change(function(event){
      var pickedstate=($('#statedropdown :selected').text());
      statedata=statetotals[statetotals.indexOf(pickedstate)+1]
      myPieChart.data.datasets[0].data=statedata;
      myPieChart.update();
    })
  });

// LINE CHART

  var ctx2 = document.getElementById("myChart2");
  var myLineChart = new Chart(ctx2, {
    type: 'line',
    data:{
      labels:years,
      datasets:[{
      data:totals,
      spanGaps:false,
      lineTension:0,
      backgroundColor:'rgba(0,0,0,0.0)',
      borderColor:'rgba(0,0,0,1)',
      borderWidth:1
    }]},
    options: {
      legend:{
        display: false
      },
      hover:{
      }
    }
  });
});
