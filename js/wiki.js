$(document).ready(function() {
  window.onload = function () {
    var canvas = document.getElementById("book");
    var ctx = canvas.getContext("2d");
    var img = document.createElement("img");
    img.src = "/home/timothy/Dropbox/wikisearch/img/hitchpng.png";
    img.addEventListener("load", function () {
      ctx.drawImage(img, 0, 0);
    }, false);

  };

  //document.getElementById("book").
  
});

