
window.getVideo=function(canvas){


  // canvas.getContext('2d').drawImage(document.getElementById("face"), 0, 0);
  var data_uri = canvas.toDataURL('image/jpeg', 0.5);


  var imgdata = data_uri.slice(23,-1);
  var background = 'c';
  var animation = 'a';
  var audio = 'a';

  console.log('sending data ')
  //API, SIMPLE
  /*  
   send in imgdata, base64 encoded to jpeg as above
   background one of a,b,c,d
   animation one of a,b,c,d
  audio one of a,b,c,d
  */
  shoman.submit(imgdata, background, animation, audio, function(movieurl) {
    console.log('api returned url: ', movieurl);

    $('.overlay').append('<video id="video" style="position:absolute;top:0px;left:0px"><source src="' + movieurl + '" type="video/mp4"></video>');
    $("#video")[0].play();
  })

}

