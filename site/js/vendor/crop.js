
window.current_state="cropping";


$('.btn_next').hide();
$('.resize-container').hide();
$('#guide_points').hide();



var resizeableImage = function(image_target) {

  // Some variable and settings
  var $container,
  orig_src = new Image(),
  image_target = $(image_target).get(0),
  event_state = {},
  constrain = false,
  min_width = 60, // Change as required
  min_height = 60,
  max_width = 1800, // Change as required
  max_height = 1900,
  init_height=500,
  resize_canvas = document.createElement('canvas');
  imageData=null;

  init = function(){

  //load a file with html5 file api
  $('.js-loadfile').change(function(evt) {
    var files = evt.target.files; // FileList object
    var reader = new FileReader();

    reader.onload = function(e) {
      imageData=reader.result;
      loadData();
    }
    reader.readAsDataURL(files[0]);
  });
  
  //add the reset evewnthandler
  $('.js-reset').click(function() {
    if(imageData)
      loadData();
  });

  $('.btn_next').click(function() {
    if(window.current_state=="cropping"){

      $('#usr_msg h1').text("Move point to define your nose, press next when you are done");
      window.current_state="point_nose";

      $('#guide_eye_l').css('visibility', 'hidden');
      $('#guide_eye_r').css('visibility', 'hidden');
      $('#guide_nose').css('visibility', 'visible');
      $('#guide_mouth').css('visibility', 'hidden');


    }else  if(window.current_state=="point_nose"){

      $('#usr_msg h1').text("Move point to define your mouth, press next when you are done");
      window.current_state="point_mouth";

      $('#guide_eye_l').css('visibility', 'hidden');
      $('#guide_eye_r').css('visibility', 'hidden');
      $('#guide_nose').css('visibility', 'hidden');
      $('#guide_mouth').css('visibility', 'visible');

    }else  if(window.current_state=="point_mouth"){

      $('.btn_next').hide();
      $('#usr_msg h1').text("Your video will be generated soon");
      $('#guide_mouth').css('visibility', 'hidden');
  
      window.current_state="warp";

      var coord=new Object();
      coord.leftEye=[ $('#guide_eye_l').offset().left,$('#guide_eye_l').offset().top];
      coord.rightEye=[ $('#guide_eye_r').offset().left,$('#guide_eye_l').offset().top];
      coord.Nose=[ $('#guide_nose').offset().left,$('#guide_eye_l').offset().top];
      coord.Mouth=[ $('#guide_mouth').offset().left,$('#guide_eye_l').offset().top];
      var  warper = new ImgWarper.PointDefiner(window.canvas, window.img, window.img_data,coord,generate_video);

    }


  });







    // When resizing, we will always use this copy of the original as the base
    orig_src.src=image_target.src;

    // Wrap the image with the container and add resize handles
    $(image_target).height(init_height)
    .wrap('<div class="resize-container cont_hover"></div>')
    .before('<span class="resize-handle resize-handle-nw"></span>')
    .before('<span class="resize-handle resize-handle-ne"></span>')
    .after('<span class="resize-handle resize-handle-se"></span>')
    .after('<span class="resize-handle resize-handle-sw"></span>');

    // Assign the container to a variable
    $container =  $('.resize-container');




    $container.prepend('<div class="resize-container-ontop"></div>');


    $('.js-crop').on('click', crop);


    var $panzoom = $container.panzoom();
    $panzoom.on('mousewheel.focal', function( e ) {
      e.preventDefault();
      var delta = e.delta || e.originalEvent.wheelDelta;
      var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
      $panzoom.panzoom('zoom', zoomOut, {
        increment: 0.1,
        animate: false,
        focal: e
      });
    });

  };






  loadData = function() {
   $('.resize-container').show();
  //set the image target
  image_target.src=imageData;
  orig_src.src=image_target.src;
  
  //set the image tot he init height
  
  if($(image_target).width()<$(image_target).height())
    $(image_target).css({
      width:512,
      height:'auto'
    });
  else
    $(image_target).css({
      width:'auto',
      height:512
    });

  var x_pos=$('.overlay').offset().left+(512-$(image_target).width())/2-$container.offset().left;
  var y_pos=$('.overlay').offset().top+(512-$(image_target).height())/2-$container.offset().top;

  console.log($('.overlay').offset().top,$('.overlay').offset().left);
  
  $(".resize-container").css("transform", "matrix(1, 0, 0, 1, "+x_pos+", "+y_pos+")");

  $(orig_src).bind('load',function() {
    resizeImageCanvas($(image_target).width(),$(image_target).height());
  });

  console.log($(image_target).width());
};


resizeImageCanvas = function(width, height){
  resize_canvas.width = width;
  resize_canvas.height = height;
  resize_canvas.getContext('2d').drawImage(orig_src, 0, 0, width, height);   
  $(image_target).attr('src', resize_canvas.toDataURL("image/png"));  
};



crop = function(){

 var crop_canvas,
 left = $('.overlay').offset().left- $container.offset().left,
 top =  $('.overlay').offset().top - $container.offset().top,
 width = $('.overlay').width(),
 height = $('.overlay').height();

 crop_canvas = document.createElement('canvas');

 crop_canvas.width = width;
 crop_canvas.height = height;



 var scaled=$container.panzoom("getMatrix")[0];



 $container.panzoom('reset', {

  animate: false

});

 console.log(scaled);

 crop_canvas.getContext('2d').drawImage(image_target, left/scaled, top/scaled, width/scaled, height/scaled, 0, 0, width, height);
 var dataURL=crop_canvas.toDataURL("image/png");
 image_target.src=dataURL;
 orig_src.src=image_target.src;

 window.img_data=crop_canvas.getContext('2d').getImageData(0,0 ,512,512);
 window.canvas=crop_canvas;
 window.img=orig_src;
 

 $(image_target).bind("load",function() {
  activate_drag_points();


  $(this).css({
    width:width,
    height:height

  }).unbind('load').parent().css({
    top:$('.overlay').offset().top- $('.crop-wrapper').offset().top,
    left:$('.overlay').offset().left- $('.crop-wrapper').offset().left
  })
});
  //  window.open(crop_canvas.toDataURL("image/png"));
}

init();
};

resizeableImage($('.resize-image'));



function activate_drag_points(){
  $('#usr_msg h1').text("Move points to define your pupils, press next when you are done");
  $('.btn_next').show();
  $('#crop_buttons').hide();
  $('#guide').hide();

  $('#crop_buttons').hide();


  $('#guide_points').show();

  $('#guide_eye_l').css('visibility', 'visible');
  $('#guide_eye_r').css('visibility', 'visible');
  $('#guide_nose').css('visibility', 'hidden');
  $('#guide_mouth').css('visibility', 'hidden');
  //$('#guide_nose').hide();
 // $('#guide_mouth').hide();
 
 $('.drag_point').panzoom();

 console.log("drag points active");
 $('.resize-container').addClass('unactive');



}


function generate_video(canvas){
  
   window.getVideo(canvas);


}

window.current_state="cropping";
resizeableImage($('.resize-image'));