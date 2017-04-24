$(function() {
      var params = {
            q:"Maryland Institute College of Art"
                  };

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
      //           saveText( JSON.stringify(data), "trendinga24.json" );
      //   },1000);
      //
      //   function saveText(text, filename){
      //   var a = document.createElement('a');
      //   a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
      //   a.setAttribute('download', filename);
      //   a.click()
      // }
  var a24 = $.getJSON('data/trendinga24.json',function(data){
    dataType: 'json'
    return data
    });

    setTimeout(function(){
      console.log()

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
      // };

      function getDataUri(url, callback) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);

        // Get raw image data
        callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

        // ... or get as Data URI
        callback(canvas.toDataURL('image/png'));
    };

    image.src = url;
}

// Usage
getDataUri(a24.responseJSON.responseJSON.categories[0].tiles[0].image.contentUrl, function(dataUri) {
    // Do whatever you'd like with the Data URI!
});



    },1000)



  });
