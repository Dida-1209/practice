var canvasWidth=800;
var canvasHeight=canvasWidth;

var strokeColor="black";
var isMouseDown=false;
var lastLoc={x:0,y:0};
var lastTimestamp=0;
var lastLineWidth=-1;

var canvas=document.getElementById('canvas');
var context=canvas.getContext("2d");

canvas.width=canvasWidth;
canvas.height=canvasHeight;

drawGrid();
$("#clear_btn").click(
	function(e){
		context.clearRect(0,0,canvasWidth,canvasHeight);
	}
)
$(".color_btn").click(
	function(e){
		$(".color_btn").removeClass("color_btn_selected");
		$(this).addClass("color_btn_selected");
		strokeColor=$(this).css("background-color");
	}
)

canvas.onmousedown=function(e){
	e.preventDefault();
	isMouseDown=true;
	lastLoc=windowToCanvas(e.clientX,e.clientY);
	lastTimestamp=new Date().getTime();
}
canvas.onmouseup=function(e){
	e.preventDefault();
	isMouseDown=false;
}
canvas.onmouseout=function(e){
	e.preventDefault();
	isMouseDown=false;
}
canvas.onmousemove=function(e){
	e.preventDefault();
	if(isMouseDown){
		var curLoc=windowToCanvas(e.clientX,e.clientY);
		var curTimestamp=new Date().getTime();
		var s=calcDistance(curLoc,lastLoc);
		var t=curTimestamp-lastTimestamp;
		
		var lineWidth=calcLineWidth(t,s);
		
		context.beginPath();
		console.log(lastLoc.x+','+lastLoc.y);
		context.moveTo(lastLoc.x,lastLoc.y);
		context.lineTo(curLoc.x,curLoc.y);
		
		context.strokeStyle=strokeColor;
		context.lineWidth=lineWidth;
		context.lineCap="round";
		context.lineJoin="round";
		context.stroke();
		
		lastLoc=curLoc;
		lastTimestamp=curTimestamp;
	}
}

var maxLineWidth=30;
var minLineWidth=1;
var maxStrokeV=10;
var minStrokeV=0.1;

function calcLineWidth(t,s){
	var resultLineWidth;
	var v=s/t;
	
	if(v<=minStrokeV)
		resultLineWidth=maxLineWidth;
	else if(v>=maxStrokeV)
		resultLineWidth=minLineWidth;
	else
		resultLineWidth=maxLineWidth-(v-minStrokeV)/(maxLineWidth-minLineWidth)*(maxLineWidth-minLineWidth);
		
	if(lastLineWidth=-1)
		return resultLineWidth;

	return lastLineWidth*2/3+resultLineWidth*1/3;
}

function calcDistance(loc1,loc2){
	return Math.sqrt((loc1.x-loc2.x)*(loc1.x-loc2.x)+(loc1.y-loc2.y)*(loc1.y-loc2.y));
}

function windowToCanvas(x,y){
	var bbox=canvas.getBoundingClientRect();
	return {x:Math.round(x-bbox.left),y:Math.round(y-bbox.top)};
}

function drawGrid(){
context.strokeStyle="rgb(230,11,9)";

context.beginPath();
context.moveTo(3,3);
context.lineTo(canvasWidth-3,3);
context.lineTo(canvasWidth-3,canvasHeight-3);
context.lineTo(3,canvasHeight-3);
context.closePath();

context.lineWidth=6;
context.stroke();

context.beginPath();
context.moveTo(0,0);
context.lineTo(canvasWidth,canvasHeight);

context.moveTo(canvasWidth,0);
context.lineTo(0,canvasHeight);

context.moveTo(canvasWidth/2,0);
context.lineTo(canvasWidth/2,canvasHeight);

context.moveTo(0,canvasHeight/2);
context.lineTo(canvasWidth,canvasHeight/2);

context.lineWidth=1;
context.stroke();
	
}






