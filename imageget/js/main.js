$(function() {
      // var params = {
      //       q:"Maryland Institute College of Art"
      //             };
      //
      // var data=   $.ajax({
      //       url: "https://api.cognitive.microsoft.com/bing/v5.0/images/trending" ,
      //       beforeSend: function(xhrObj){
      //           // Request headers
      //           xhrObj.setRequestHeader("Content-Type","multipart/form-data");
      //           xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","5b267c9324ae4318bd66e2cc297753c9");
      //       },
      //       type: "GET",
      //       dataType: 'json',
      //
      //       // Request body
      //       data: "{body}",
      //   })
      //
      //   .done(function(data) {
      //       alert("success");
      //   })
      //
      //   .fail(function() {
      //       alert("error");
      //   });
      //   // console.log(data);
      //   setTimeout(function(){
      //     localStorage.setItem('a23trend',JSON.stringify(data));
      //   },1000);
      //   // console.log(JSON.stringify(data));
        // console.log(a23string);

      var retrieve=localStorage.getItem('a23trend');
      console.log(JSON.parse(retrieve));
    });
