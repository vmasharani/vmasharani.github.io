$(document).ready(function(){

  var modtest = document.getElementById("reflexive");
  var modal = document.getElementById("contentmodal");
  var close = document.getElementsByClassName("close")[0];
  var cover = document.getElementById("cover");
  var projects = document.getElementsByClassName("projectlink");
  var info = document.getElementsByClassName("infobut");




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


  for (var i=0;i<projects.length;i++){
    projects[i].addEventListener('click', function(e) {
        modal.style.display="block";
        cover.style.display="block";
        $('#projectcontainer').load(e.target.id+'.html');

    }, false);
  }



});
