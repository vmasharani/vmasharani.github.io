// fill an array with a bunch of locations



$(document).ready(function(){

  // var coords = new Array();
  var citystate = new Array();



var x;

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
                    longitude=results[0].geometry.location.lat();
                    latitude=results[0].geometry.location.lng();
                    ev.longitude=longitude;
                    ev.latitude=latitude;
                    data[i]=(JSON.parse(JSON.stringify(ev)));
                    // data[i]="null";
                    // console.log(data[i]);
                  } else {
                    alert("Something got wrong " + status);
                  }
                });
              };
          });
          setTimeout(function(){

            console.log(data[3].longitude);

          },500);
  });
});
