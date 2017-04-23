// $(function() {
//         var params = {
//             q:"Maryland Institute College of Art"
//                   };
//
//       var data=   $.ajax({
//             url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + $.param(params),
//             beforeSend: function(xhrObj){
//                 // Request headers
//                 xhrObj.setRequestHeader("Content-Type","multipart/form-data");
//                 xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","5b267c9324ae4318bd66e2cc297753c9");
//             },
//             type: "GET",
//             dataType: 'json',
//
//             // Request body
//             data: "{body}",
//         })
//         .done(function(data) {
//             alert("success");
//         })
//         .fail(function() {
//             alert("error");
//         });
//         // console.log(data);
//         setTimeout(function(){
//
//           console.log(data.responseJSON.value[0].contentUrl);
//         },1000);
//     });
