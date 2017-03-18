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
            var geocoder =  new google.maps.Geocoder();
            geocoder.geocode( { 'address': ev.agencyname + ev.state}, function(results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                    alert("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng());
                    latitude=results[0].geometry.location.lat();
                    longitude=results[0].geometry.location.lng();
                    ev.longitude=longitude;
                    ev.latitude=latitude;
                    data[i]=(JSON.parse(JSON.stringify(ev)));
                    console.log(data[i]);
                  } else {
                    alert("Something got wrong " + status);
                  }
                });
              };
          });
      setTimeout(function(){
        var plots={};


        // console.log(data[1].longitude);

        for (var i=0;i<data.length;i++){
          var totalcrimes=parseInt(data[i].rea)+parseInt(data[i].religion)+parseInt(data[i].sexualorientation)+parseInt(data[i].disability)+parseInt(data[i].gender)+parseInt(data[i].genderidentity);
          plots['location'+i]=(

                {
                    value: "2268265",
                    latitude: data[i].latitude,
                    longitude: data[i].longitude,
                    total: totalcrimes,
                    href: "#",
                    tooltip: {
                        content: data[i].agencyname+" total crimes: "+totalcrimes
                    }
                }


          )
        };


          console.log(plots);

      $(".mapcontainer").mapael({
          map: {
              name: "usa_states"
            },
            plots: plots
            });
        },1000);
  });
});
