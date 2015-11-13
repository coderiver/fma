
window.current_state="cropping";

$( document ).ready(function() {
  console.log( "ready!" );
  resizeableImage($('.resize-image'));
  $('.restrict').hide();
  $('.js-crop').hide();
  $('.terms').hide();
});
$('.header__back').on('click', function(event) {
    alert('a');
    window.history.back();
    return false;
  });



var resizeableImage = function(image_target) {

  console.log ("init resizeableImage");



  $('.btn_next').hide();
  $('.resize-container').hide();
  $('#guide_points').hide();

  
  // console.log("Panzoom inited",$.Panzoom);

  console.log("crop inited",image_target);
  // $(image_target).panzoom();
  // Some variable and settings
 var loaded_canvas;
  var orig_src = new Image();
 
  var $container,
  image_target = $(image_target).get(0),
  event_state = {},
  constrain = false,
  min_width = 61, // Change as required
  min_height = 60,
  max_width = 1800, // Change as required
  max_height = 1900,
  scale_factor=0.5,
  init_height=500,
  resize_canvas = document.createElement('canvas');
  imageData=null;

  init = function(){

  //load a file with html5 file api
  $('.js-loadfile').change(function(evt) {


    $(this).fileExif(function(exifObject) {
      window.Orientation=exifObject.Orientation;
    });


    evt.preventDefault();
    if(this.files.length === 0) return;
    var imageFile = this.files[0];
    var img = new Image();
    var url = window.URL ? window.URL : window.webkitURL;
    img.src = url.createObjectURL(imageFile);
    img.onload = function(e) {
     // alert(window.Orientation);
     url.revokeObjectURL(this.src);

     var width;
     var height;

     var  transform = "none";
     var need_changes=true;

// window.Orientation=6;   
if(window.Orientation === 8) {
  width = img.height;
  height = img.width;
  transform = "left";
} else if(window.Orientation === 6) {
             // alert("6");
             width = img.height;
             height = img.width;
             transform = "right";
           } else if(window.Orientation === 1) {
            width = img.width;
            height = img.height;
          } else if(window.Orientation === 3) {
            width = img.width;
            height = img.height;
            transform = "flip";
          } else {
            // alert("1");
            need_changes=false;
            width = img.width;
            height = img.height;

          }
          var MAX_WIDTH = 1500;
          var MAX_HEIGHT = 1500;
          if (width/MAX_WIDTH > height/MAX_HEIGHT) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          var canvas =  document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext("2d");
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          if(transform === 'left') {
            ctx.setTransform(0, -1, 1, 0, 0, height);
            ctx.drawImage(img, 0, 0, height, width);
          } else if(transform === 'right') {
            ctx.setTransform(0, 1, -1, 0, width, 0);
            ctx.drawImage(img, 0, 0, height, width);
          } else if(transform === 'flip') {
            ctx.setTransform(1, 0, 0, -1, 0, height);
            ctx.drawImage(img, 0, 0, width, height);
          } else {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.drawImage(img, 0, 0, width, height);
          }
          ctx.setTransform(1, 0, 0, 1, 0, 0);

          // if(need_changes){
            var new_img=document.createElement('img');
            imageData=canvas.toDataURL("image/png");
            orig_src.src=imageData;
            // window.open(imageData);
            loaded_canvas=canvas;
          // }
           // else{
           //  console.
           //  imageData=url.createObjectURL(imageFile);
           //  window.open
           // }
            loadData();
          // new_img.src=canvas.toDataURL("image/png");
          // $('body').append(new_img);

        };










    // go to step2
    $('.js-crop').show();
    $('label.file').hide();
    $('.restrict').show();
    $('.photo__in').hide();

  });

    //add the reset evewnthandler
    $('.js-reset').click(function() {
      if(imageData)
        loadData();
    });

    $('.btn_next').click(function() {
      if(window.current_state=="cropping"){

        $('#usr_msg').text("Move point to define your nose, press next when you are done");
        window.current_state="point_nose";

        $('#guide_eye_l').css('visibility', 'hidden');
        $('#guide_eye_r').css('visibility', 'hidden');
        $('#guide_nose').css('visibility', 'visible');
        $('#guide_mouth').css('visibility', 'hidden');


      }else  if(window.current_state=="point_nose"){

        $('#usr_msg').text("Move point to define your mouth, press next when you are done");
        window.current_state="point_mouth";

        $('#guide_eye_l').css('visibility', 'hidden');
        $('#guide_eye_r').css('visibility', 'hidden');
        $('#guide_nose').css('visibility', 'hidden');
        $('#guide_mouth').css('visibility', 'visible');


      }else  if(window.current_state=="point_mouth"){


        $('.terms').show();
        $('.btn_next').text('LET ME SHOW MAN SING!').addClass('btn_gotovideo').on('click', function(event) {
          var  warper = new ImgWarper.PointDefiner(window.canvas, window.img, window.img_data,coord,generate_video);
          window.location.hash = '#/loading';
        });
        $('#usr_msg').text("Your video will be generated soon");
        $('#guide_mouth').css('visibility', 'hidden');




        window.current_state="warp";

        var coord=new Object();

        var offSet=new Object();
        offSet.x= $('.overlay').offset().left;
        offSet.y= $('.overlay').offset().top;

        coord.leftEye=[ ($('#guide_eye_l').offset().left- offSet.x+$('#guide_eye_l').width()/2)/scale_factor,($('#guide_eye_l').offset().top - offSet.y+$('#guide_eye_l').height()/2)/scale_factor];
        coord.rightEye=[ ($('#guide_eye_r').offset().left - offSet.x+$('#guide_eye_r').width()/2)/scale_factor,($('#guide_eye_r').offset().top- offSet.y+$('#guide_eye_r').height()/2)/scale_factor];
        coord.Nose=[( $('#guide_nose').offset().left- offSet.x+$('#guide_nose').width()/2)/scale_factor,($('#guide_nose').offset().top- offSet.y+$('#guide_nose').height()/2)/scale_factor];
        coord.Mouth=[ ($('#guide_mouth').offset().left- offSet.x+$('#guide_mouth').width()/2)/scale_factor,($('#guide_mouth').offset().top- offSet.y+$('#guide_mouth').height()/2)/scale_factor];




        // var  warper = new ImgWarper.PointDefiner(window.canvas, window.img, window.img_data,coord,generate_video);

// $( "#guide_mouth" ).mousemove(get_pos);


//       function get_pos(){
//         console.log("+$('#guide_mouth').width", +$('#guide_mouth').width(),+$('#guide_mouth').height());
//         console.log("guide_mouth", $('#guide_mouth').offset().left,$('#guide_mouth').offset().top);
//         console.log("guide_points", $('#guide_points').offset().left,$('#guide_points').offset().top);
//         console.log( $('#guide_mouth').offset().left- offSet.x+$('#guide_mouth').width()/2,$('#guide_mouth').offset().top- offSet.y+$('#guide_mouth').height()/2);

//       }



}


orig_src.src=image_target.src;
    // When resizing, we will always use this copy of the original as the base


  });






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

   console.log("loadData func")

   $('.resize-container').show();
   image_target.src=imageData;
   orig_src.src=image_target.src;


   $(orig_src).bind('load',function() {
    $( orig_src ).unbind( "load" );
    console.log("image_loaded")

    if($(image_target).width()<$(image_target).height())
      $(image_target).css({
        width:512*scale_factor,
        height:'auto'
      });
    else
      $(image_target).css({
        width:'auto',
        height:512*scale_factor
      });

    var x_pos=$('.overlay').offset().left+(512*scale_factor-$(image_target).width())/2-$container.offset().left;
    var y_pos=$('.overlay').offset().top+(512*scale_factor-$(image_target).height())/2-$container.offset().top;



  // alert("$('.overlay').offset().top "+$('.overlay').offset().top);
  // alert("512*scale_factor "+512*scale_factor);
  // alert("$(image_target).height() "+$(image_target).height());
  // alert("$container.offset().top "+$container.offset().top);



  $(".resize-container").css("transform", "matrix(1, 0, 0, 1, "+x_pos+", "+y_pos+")");

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

 crop_canvas.width = width*2;
 crop_canvas.height = height*2;



 var scaled=$container.panzoom("getMatrix")[0];

// alert(scaled);

$container.panzoom('reset', {

  animate: false

});




var scale_canvas= document.createElement('canvas');
var scaleCtx = scale_canvas.getContext('2d');

console.log("loaded_canvas.width()",loaded_canvas.width);
var inited_scale=$(image_target).width()/loaded_canvas.width;

scale_canvas.width=$(image_target).width()*scaled*2;
scale_canvas.height=$(image_target).height()*scaled*2;

// console.log(image_target, 0, 0,$(image_target).width(),$(image_target).height(),0,0,scale_canvas.width,scale_canvas.height);

// scaleCtx.drawImage(loaded_canvas, 0, 0,scale_canvas.width*inited_scale,scale_canvas.height*inited_scale);
scaleCtx.drawImage(loaded_canvas,  0, 0, loaded_canvas.width,  loaded_canvas.height, 0, 0,scale_canvas.width, scale_canvas.height);
// scaleCtx.drawImage(sourceCanvas, 0, 0);

// window.open(orig_src.src);
// window.open(image_target.src);
 // window.open(scale_canvas.toDataURL("image/png"));
crop_canvas.getContext('2d').drawImage(scale_canvas, -left*2, -top*2);
// scaleCtx.drawImage(sourceCanvas, -left, -top);
// crop_canvas.getContext('2d').drawImage(image_target, left/scaled, top/scaled, width/scaled, height/scaled, 0, 0, 512, 512);

// $(image_target).parent().append(crop_canvas);
// $(image_target).remove();

// // if(left>0)alert("it could be fail");
// console.log(left/scaled, top/scaled, width/scaled, height/scaled);
// // /||top>0||width/scaled+left/scaled<512||height/scaled+top/scaled<512
var dataURL=crop_canvas.toDataURL("image/png");
   // window.open(crop_canvas.toDataURL("image/png"));

  image_target.src=dataURL;
  // window.open(dataURL);
  orig_src.src=image_target.src;

  window.img_data=crop_canvas.getContext('2d').getImageData(0,0 ,512,512);
  window.canvas=crop_canvas;
  window.img=orig_src;


  $(image_target).bind("load",function() {
  // alert("image loaded")
  activate_drag_points();


  $(this).css({
    width:width,
    height:height

  }).unbind('load').parent().css({
    top:$('.overlay').offset().top- $('.crop-wrapper').offset().top,
    left:$('.overlay').offset().left- $('.crop-wrapper').offset().left
  })
});

}

init();
};



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
