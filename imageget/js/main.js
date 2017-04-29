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
      //
      //           saveText( JSON.stringify(data), "trendinga27.json" );
      //   },1000);
      //
      //   function saveText(text, filename){
      //   var a = document.createElement('a');
      //   a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
      //   a.setAttribute('download', filename);
      //   a.click()
      // }


      // $('#download-btn').click(function(){
        var a28=$.getJSON('data/trendinga28.json',function(data){
          console.log(data);
          dataType: 'json'

          // for (var i=2;i<3;i++){
          //   for (var j=0;j<data.responseJSON.categories[0].tiles.length;j++){
          //     var link = document.createElement('a');
          //     console.log(data.responseJSON.categories[i].tiles[j].image.contentUrl);
          //     link.download='a24'+'_'+data.responseJSON.categories[i].title+j;
          //     link.target="blank";
          //     link.href = data.responseJSON.categories[i].tiles[j].image.contentUrl;  // use realtive url
          //     document.body.appendChild(link);
          //     link.click();
          //   }
          // }


          return data
          });
     //
     //
    //  });


    var a27 = $.getJSON('data/trendinga27.json',function(data){
      dataType: 'json'
      return data
      });
      var a28 = $.getJSON('data/trendinga28.json',function(data){
        dataType: 'json'
        return data
        });

        console.log(a28);



    setTimeout(function(){


      // var image = new Image();
      // image.crossOrigin = 'anonymous';
      //
      //
      // // create an empty canvas element
      // var canvas = document.createElement("canvas"),
      //     canvasContext = canvas.getContext("2d");
      //
      // image.onload = function () {
      //
      //   //Set canvas size is same as the picture
      //   canvas.width = image.width;
      //   canvas.height = image.height;
      //
      //   // draw image into canvas element
      //   canvasContext.drawImage(image, 0, 0, image.width, image.height);
      //
      //   // get canvas contents as a data URL (returns png format by default)
      //   var dataURL = canvas.toDataURL();
      //
      //   document.write(dataURL);
    //   // };
    //
    //   window.onload = function() {
    //   var width = 400;
    //   var height = 400;
    //   var canvas = document.getElementById('canvas');
    //   var context = canvas.getContext('2d');
    //   var image = document.getElementById('image');
    //   debugger
    //   window.fastThreshold = 10;
    //
    //   var doFindFeatures = function() {
    //     tracking.Fast.THRESHOLD = window.fastThreshold;
    //     context.drawImage(image, 0, 0, width, height);
    //     var imageData = context.getImageData(0, 0, width, height);
    //     var gray = tracking.Image.grayscale(imageData.data, width, height);
    //     var corners = tracking.Fast.findCorners(gray, width, height);
    //     for (var i = 0; i < corners.length; i += 2) {
    //       context.fillStyle = '#f00';
    //       context.fillRect(corners[i], corners[i + 1], 3, 3);
    //     }
    //   };
    //   doFindFeatures();
    // }
    //
    //
    //   var gui = new dat.GUI();
    //   gui.add(window, 'fastThreshold', 0, 100).onChange(doFindFeatures);
    // ;

// create an app to download all images that i have saved as of now with a name that's easy to iterate through (date_category_number)
// create arrays of images
//



    },1000)


//do some object processing (resort by date then by category)
// a24, a27, a28, categories for each, images for each
 // big array that creates canvases
// big array that puts one image per canvas
// creates a point list per image --> use objects? create an object with properties width, height, position, points
// adds style to original image (copied)
    window.onload = function() {
      var width = 400;
      var height = 400;
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      var image = document.getElementById('image');
      window.fastThreshold = 50;
      var doFindFeatures = function() {
        tracking.Fast.THRESHOLD = window.fastThreshold;
        context.drawImage(image, 0, 0, width, height);
        var imageData = context.getImageData(0, 0, width, height);
        var gray = tracking.Image.grayscale(imageData.data, width, height);
        var corners = tracking.Fast.findCorners(gray, width, height);
        for (var i = 0; i < corners.length; i += 2) {
          context.fillStyle = '#f00';
          context.fillRect(corners[i], corners[i + 1], 3, 3);
        };

        // polygon(0px 208px, 146.5px 207px, 147px 141.2px, ...)

        var stylestring="polygon(";
        for (var i=0;i<corners.length;i+=2){

          stylestring+=corners[i]+"px "+corners[i+1]+"px, ";

        }
        console.log(stylestring);
        stylestring = stylestring.slice(0,-2);
        stylestring+=")";
        document.getElementById("fix").setAttribute( "style", "clip-path:"+stylestring);


      };
      doFindFeatures();


      // var gui = new dat.GUI();
      // gui.add(window, 'fastThreshold', 0, 100).onChange(doFindFeatures);
    }


  });
