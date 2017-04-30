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
      window.fastThreshold = 30;
      // var doFindFeatures = function() {
      //   tracking.Fast.THRESHOLD = window.fastThreshold;
      //   context.drawImage(image, 0, 0, width, height);
      //   var imageData = context.getImageData(0, 0, width, height);
      //   var gray = tracking.Image.grayscale(imageData.data, width, height);
      //   var corners = tracking.Fast.findCorners(gray, width, height);
      //   for (var i = 0; i < corners.length; i += 2) {
      //     context.fillStyle = '#f00';
      //     context.fillRect(corners[i], corners[i + 1], 3, 3);
      //   };
      //
      //   // polygon(0px 208px, 146.5px 207px, 147px 141.2px, ...)
      //
      //   var stylestring="polygon(";
      //   for (var i=0;i<corners.length;i+=2){
      //
      //     stylestring+=corners[i]+"px "+corners[i+1]+"px, ";
      //
      //   }
      // }
        // console.log(stylestring);
        // stylestring = stylestring.slice(0,-2);
        // stylestring+=")";
        // document.getElementById("fix").setAttribute( "style", "clip-path:"+stylestring);

        var dates=["a24","a27","a28","a29"]
        var cats = ["people","animal","nature"];
        var imgArray = new Array();
        var daycounter=0;
        var catcounter = 0;
        var imgcounter = 1;
        var totalcounter=0;
        var loading=false;

        var pointlist=new Array();
        var idlist=new Array();

      //   var doFindFeatures = function() {
      //     context.clearRect(0, 0, canvas.width, canvas.height);
      //     var width = 400;
      //     var height = 400;
      //
      //     tracking.Fast.THRESHOLD = window.fastThreshold;
      //     context.drawImage(this.img, 0, 0, width, height);
      //     var imageData = context.getImageData(0, 0, width, height);
      //     var gray = tracking.Image.grayscale(imageData.data, width, height);
      //     var corners = tracking.Fast.findCorners(gray, width, height);
      //     for (var i = 0; i < corners.length; i += 2) {
      //       context.fillStyle = '#f00';
      //       // context.fillRect(corners[i], corners[i + 1], 3, 3);
      //     };
      //
      //     // console.log(this.img);
      //
      //     // polygon(0px 208px, 146.5px 207px, 147px 141.2px, ...)
      //
      //     var stylestring="polygon(";
      //     for (var i=0;i<corners.length;i+=2){
      //
      //       stylestring+=corners[i]+"px "+corners[i+1]+"px, ";
      //
      //     }
      //     stylestring = stylestring.slice(0,-2);
      //     stylestring+=")";
      //
      //     pointlist.push(stylestring);
      //     // console.log(pointlist);
      //
      //
      // }

        for (var k=0;k<dates.length;k++){
          for (var j=0;j<cats.length;j++){
            for (var i=0;i<9;i++){
              img= new Image();

              img.src="assets/"+dates[k]+"_"+cats[j]+"_"+(i+1)+".jpg"
              img.onload=(function(){


                  var canvas = document.getElementById('canvas');
                  var context = canvas.getContext('2d');


                  var imagecheck = img.width;
                  if (imagecheck.width!=0){
                  // console.log("whole image");
                  this.width=400;
                  this.height=400;
                  // COULD POTENTIALLY CHANGE ID BASED ON CATEGORY
                  this.id="img"+totalcounter;
                  idlist.push("img"+totalcounter);


                  $('#wholeimages').append(this);
                  totalcounter++;

                  // console.log(this);

                  context.clearRect(0, 0, canvas.width, canvas.height);
                  var width = 400;
                  var height = 400;

                  tracking.Fast.THRESHOLD = window.fastThreshold;
                  context.drawImage(this, 0, 0, width, height);
                  var imageData = context.getImageData(0, 0, width, height);
                  var gray = tracking.Image.grayscale(imageData.data, width, height);
                  var corners = tracking.Fast.findCorners(gray, width, height);
                  for (var i = 0; i < corners.length; i += 2) {
                    context.fillStyle = '#f00';
                    // context.fillRect(corners[i], corners[i + 1], 3, 3);
                  };

                  // console.log(this.img);

                  // polygon(0px 208px, 146.5px 207px, 147px 141.2px, ...)

                  var stylestring="polygon(";
                  for (var i=0;i<corners.length;i+=2){

                    stylestring+=corners[i]+"px "+corners[i+1]+"px, ";

                  }
                  stylestring = stylestring.slice(0,-2);
                  stylestring+=")";

                  pointlist.push(stylestring);




                // var stylestring=doFindFeatures();
                // console.log("img"+totalcounter);



              }


              });
            }
          }
        }

        // console.log(pointlist);
        console.log(idlist);





      setTimeout(function(){
        for (var i=0;i<idlist.length;i++){
          document.getElementById(idlist[i]).setAttribute("style","clip-path:"+pointlist[i]);
          console.log("hello");

        }
      }, 500);

        // console.log(pointlist);

      };

// array of people, animal, nature, iterate through each number (a27_xxxxx_1) until stringname[4!=p], then move on to
// progress to the next item in the array—each of these is logging an image to the dom with a custom ID.


    });
