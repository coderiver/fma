
window.getVideo=function(canvas){
// window.location.hash = '#/loading';

  // canvas.getContext('2d').drawImage(document.getElementById("face"), 0, 0);
  var data_uri = canvas.toDataURL('image/jpeg', 0.95);
window.open(data_uri);

  var imgdata = data_uri.slice(23,-1);
  var background = 'c';
  var animation = 'a';
  var audio = 'a';

  console.log('sending data ');
  //API, SIMPLE
  /*  
   send in imgdata, base64 encoded to jpeg as above
   background one of a,b,c,d
   animation one of a,b,c,d
  audio one of a,b,c,d
  */
  shoman.submit(imgdata, background, animation, audio, function(movieurl) {
    console.log('api returned url: ', movieurl);

    window.location.hash = '#/gift';
    
    setTimeout(function(){
      // alert('lets append vid');
      $('#video_holder').append('<video id="video" controls  height="230" width="230"  preload="auto" autoplay="" type="video/mp4"  poster="img/poster.png" style="position:absolute;top:0px;left:0px;width:230px;height:230px"><source src="' + movieurl + '"></video>');
      $("#video")[0].play();
  }, 100 )
    
  })

}