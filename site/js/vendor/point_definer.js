var ImgWarper = ImgWarper || {};

ImgWarper.PointDefiner = function(canvas, image, imgData, coords,call_back) {
  this.oriPoints = new Array();
  this.dstPoints = new Array();

  this.call_back=call_back;

  //set up points for change; 
  var c = canvas;
  this.canvas = canvas;
  var that = this;
  this.dragging_ = false;
  this.computing_ = false;
  
  this.currentPointIndex = -1;
  this.imgWarper = new ImgWarper.Warper(c, image, imgData);


  this.generateOval();
  // console.log(coords);
  // this.generateCollibrationPoints();
  this.generateLeftEye(coords.leftEye);
  this.generateRightEye(coords.rightEye);
  this.generateNose(coords.Nose);
  this.generateMouth(coords.Mouth);

  this.redraw();

  this.call_back(this.canvas);

  console.log("warper inited");
};

ImgWarper.PointDefiner.prototype.touchEnd = function(event) {

}

ImgWarper.PointDefiner.prototype.touchDrag = function(e) {

};

ImgWarper.PointDefiner.prototype.redraw = function () {

  this.imgWarper.warp(this.oriPoints, this.dstPoints);

 // this.redrawCanvas();
   // this.imgWarper.drawToImg();

   
 };


 ImgWarper.PointDefiner.prototype.touchStart = function(e) {

 };


 ImgWarper.PointDefiner.prototype.generateCollibrationPoints = function() {
   var points= [100, 100,500,500];
   var d_points=[100, 100,500,500];
   for(var i=0;i<points.length;i+=2){
    var q = new ImgWarper.Point(points[i], points[i+1]);
    this.oriPoints.push(q);
    var d = new ImgWarper.Point(d_points[i], d_points[i+1]);

    this.dstPoints.push(d);
  }
}



ImgWarper.PointDefiner.prototype.generateOval = function() {
 var points= [241, 8, 248, 504, 450, 241, 47, 278, 93, 93, 390, 79, 390, 431, 101, 428];
 var d_points=[241, 8, 248, 504, 475, 237, 26, 276, 93, 93, 390, 79, 390, 431, 101, 428];
 for(var i=0;i<points.length;i+=2){
  var q = new ImgWarper.Point(points[i], points[i+1]);
  this.oriPoints.push(q);
  var d = new ImgWarper.Point(d_points[i], d_points[i+1]);

  this.dstPoints.push(d);
}
// this.redraw();

}

ImgWarper.PointDefiner.prototype.generateLeftEye = function(coord) {
 var points= [132, 196, 77, 169, 168, 154, 194, 191, 142, 241, 67, 221];
 var new_p=coord;
 var dis_p=[183, 239];

 for(var i=2;i<points.length;i+=2){
  var q = new ImgWarper.Point(points[i]-(points[0]-new_p[0]), points[i+1]-(points[1]-new_p[1]));
  this.oriPoints.push(q);
  var d = new ImgWarper.Point(points[i]-(points[0]-dis_p[0]), points[i+1]-(points[1]-dis_p[1]));
  this.dstPoints.push(d);
}
// this.redraw();

}

ImgWarper.PointDefiner.prototype.generateRightEye = function(coord) {
 var points= [305, 182, 236, 193, 258, 156, 331, 144, 363, 191];
 // var dis_p=coord;
 var new_p=coord;
 var dis_p=[330, 240];

 for(var i=2;i<points.length;i+=2){
   var q = new ImgWarper.Point(points[i]-(points[0]-new_p[0]), points[i+1]-(points[1]-new_p[1]));
   this.oriPoints.push(q);
   var d = new ImgWarper.Point(points[i]-(points[0]-dis_p[0]), points[i+1]-(points[1]-dis_p[1]));
   this.dstPoints.push(d);
 }
// this.redraw();

}
ImgWarper.PointDefiner.prototype.generateNose = function(coord) {
 var points= [218, 290, 149, 285, 224, 340, 290, 271];
 // var dis_p=coord;
 var new_p=coord;
 var dis_p=[262, 320];

 for(var i=2;i<points.length;i+=2){
  var q = new ImgWarper.Point(points[i]-(points[0]-new_p[0]), points[i+1]-(points[1]-new_p[1]));
  this.oriPoints.push(q);
  var d = new ImgWarper.Point(points[i]-(points[0]-dis_p[0]), points[i+1]-(points[1]-dis_p[1]));
  this.dstPoints.push(d);
}
// this.redraw();

}

ImgWarper.PointDefiner.prototype.generateMouth = function(coord) {
 var points= [239, 380, 137, 366, 227, 342, 343, 337, 244, 416];
 // var dis_p=coord;
 var new_p=coord;
 var dis_p=[258, 390];

 for(var i=2;i<points.length;i+=2){
  var q = new ImgWarper.Point(points[i]-(points[0]-new_p[0]), points[i+1]-(points[1]-new_p[1]));
  this.oriPoints.push(q);
  var d = new ImgWarper.Point(points[i]-(points[0]-dis_p[0]), points[i+1]-(points[1]-dis_p[1]));
  this.dstPoints.push(d);
}


// this.redraw();

}







ImgWarper.PointDefiner.prototype.getCurrentPointIndex = function(q) {
  var currentPoint = -1;   

  for (var i = 0 ; i< this.dstPoints.length; i++){
    if (this.dstPoints[i].InfintyNormDistanceTo(q) <= 20) {
      currentPoint = i;
      return i;
    }
  }
  return currentPoint;
};

ImgWarper.PointDefiner.prototype.redrawCanvas = function(points) {
  var ctx = this.canvas.getContext("2d");
  var oval_points=[];
  var oval_points_d=[];
  for (var i = 0; i < this.oriPoints.length; i++){

    oval_points.push(this.oriPoints[i].x,this.oriPoints[i].y);
    oval_points_d.push(this.dstPoints[i].x,this.dstPoints[i].y);
    if (i < this.dstPoints.length) {
      if (i == this.currentPointIndex) {
        this.drawOnePoint(this.dstPoints[i], ctx, 'orange');
      } else {
        this.drawOnePoint(this.dstPoints[i], ctx, '#6373CF');
      }



      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.moveTo(this.oriPoints[i].x, this.oriPoints[i].y);
      ctx.lineTo(this.dstPoints[i].x, this.dstPoints[i].y);
      //ctx.strokeStyle = '#691C50';
      ctx.stroke();
    } else {
      this.drawOnePoint(this.oriPoints[i], ctx, '#119a21');
    }
  } 
  console.log("origin",oval_points);
  console.log("dist",oval_points_d);
  ctx.stroke();
};

ImgWarper.PointDefiner.prototype.drawOnePoint = function(point, ctx, color) {
  var radius = 10; 
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.arc(parseInt(point.x), parseInt(point.y), radius, 0, 2 * Math.PI, false);
  ctx.strokeStyle = color;
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.arc(parseInt(point.x), parseInt(point.y), 3, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill(); 
};