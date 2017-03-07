$(document).ready(function(){
  console.log("test");
  var modtest = document.getElementById("reflexive");

  var modal = document.getElementById("contentmodal");
  var close = document.getElementsByClassName("close")[0];
  var cover = document.getElementById("cover");
  var projects = document.getElementsByClassName("projectlink");



  // projects.onclick = function(){
  // }

  close.onclick = function() {
      modal.style.display = "none";
      cover.style.display="none";

  }

  window.onclick = function(event) {
    for (var i=0;i<projects.length;i++){

      if (event.target.id == projects[i].id){
          modal.style.display = "block";
          cover.style.display="block";
      }
    }
    // modal.append(event.target.id);

    $('#contentmodal').load(event.target.id + '.html');


      if (event.target == cover) {
          modal.style.display = "none";
          cover.style.display="none";
          $('#contentmodal').empty();


      }

  }

});
