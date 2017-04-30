$(function() {
      // var params = {
      //       q:"Maryland Institute College of Art"
      //             };

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
      //           saveText( JSON.stringify(data), "trendinga29.json" );
      //   },1000);
      //
      //   function saveText(text, filename){
      //   var a = document.createElement('a');
      //   a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
      //   a.setAttribute('download', filename);
      //   a.click()
      // }


      $('#download-btn').click(function(){
        var a29=$.getJSON('data/trendinga29.json',function(data){
          console.log(data);
          dataType: 'json'

          for (var i=2;i<3;i++){
            for (var j=0;j<data.responseJSON.categories[0].tiles.length;j++){
              var link = document.createElement('a');
              console.log(data.responseJSON.categories[i].tiles[j].image.contentUrl);
              link.download='a24'+'_'+data.responseJSON.categories[i].title+j;
              link.target="blank";
              link.href = data.responseJSON.categories[i].tiles[j].image.contentUrl;  // use realtive url
              document.body.appendChild(link);
              link.click();
            }
          }


          return data
          });
     //
     //
     });


    var a27 = $.getJSON('data/trendinga27.json',function(data){
      dataType: 'json'
      return data
      });

      var a28 = $.getJSON('data/trendinga28.json',function(data){
        dataType: 'json'
        return data
        });




    setTimeout(function(){

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

        var dates=["a24","a27","a28","a29"]
        var cats = ["people","animal","nature"];
        var imgArray = new Array();
        var daycounter=0;
        var catcounter = 0;
        var imgcounter = 1;
        var loading=false;

        for (var i=0;i<10;i++){
          img= new Image();

          img.src="assets/"+dates[daycounter]+"_"+cats[catcounter]+"_"+imgcounter+".jpg"
          img.onload=(function(){
            var imagecheck = img.width;
            if (imagecheck.width!=0){
              console.log("whole image");
              $('#wholeimages').append(this);
            }
          });



          imgcounter++;

        }

      };
      doFindFeatures();

// array of people, animal, nature, iterate through each number (a27_xxxxx_1) until stringname[4!=p], then move on to
// progress to the next item in the array—each of these is logging an image to the dom with a custom ID.


    }

    function IsImageOk(img) {

    // However, they do have two very useful properties: naturalWidth and
    // naturalHeight. These give the true size of the image. If it failed
    // to load, either of these should be zero.

    if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
        return false;
    }

    // No other way of checking: assume it’s ok.
    return true;
}


  });
