
/* VARs */
//Current main activity view
var mainId = '';
//Functions to run when add new structure to DOM
var toDoGo = [];
//Functions to run when init layout
var toDoLayoutInit = [];
//Functions to run when math layout
var toDoLayoutMath = [];
//Float element process functions
var toMathElementFloat = [elementWidth, elementHeight, elementWH, elementPositionX, elementPositionY];



/* Main Function - View Init*/
/* Run when new app view is set */
function mainView(index){
	mainId = index;
	/*$("div.main").each(function(el){
		$(this).css('display','none');
	});*/
	$("div.main").css('display','none');
	$('#'+index).css('display','block');
	document.body.className = index;
	doLayoutMath();
}

/* Function to process code before add to DOM */
function doGo(el){
	$(el).find("a.main").bind('click tapone', function(event){
		event.preventDefault();
		var index = $(this).attr("href");
		mainView(index);
		return false;
	});
	for (var i in toDoGo) {
		toDoGo[i].call(this, el);
	}
}

/* Function to math/process layout system */
function doLayoutMath(){
	//Init layout data
	for (var i in toDoLayoutInit) {
		toDoLayoutInit[i].call(this, null);
	}
	//Build-in float math system
	var w = $(window).width(),
	h = $(window).height();
	$(".float").each(function(){
		mathElementFloat( $(this) );
	});
	//Do layout after math
	for (var i in toDoLayoutMath) {
		toDoLayoutMath[i].call(this);
	}
}

/* Float element - Math section */
/* Functions used to math float elements */

function mathElementFloat(el){
	var w = $(window).width(),
		h = $(window).height();
	el.css('position','absolute');
	for (var i in toMathElementFloat) {
		toMathElementFloat[i].call(this, el, w ,h);
	}
}
 
function elementWH(el, winW, winH){
	var attr = el.attr('wh');
	if(attr=="c"){
		if(winW<winH){
			el.css('width',winW+"px");
			el.css('height',winW+"px");
		}else{
			el.css('width',winH+"px");
			el.css('height',winH+"px");
		}
	}
}

function elementWidth(el, winW, winH){
	var w, attr = el.attr('w');
	var minW = el.attr('minW');
	var maxW = el.attr('maxW');
	//value
	if(attr=='a'){
		el.css('width',"auto");
		return;
	}else if(attr){
		el.css('width',(attr*winW)+"px");	
	}
	//max & min
	w = el.width();
	if(w<minW){
		el.css('width',minW+"px");
	}else if(w>maxW){
		el.css('width',maxW+"px");
	}
}

function elementHeight(el, winW, winH){
	var h, attr = el.attr('h');
	var minH = el.attr('minH');
	var maxH = el.attr('maxH');
	//value
	if(attr=='a'){
		el.css('height',"auto");
		return;
	}else if(attr){
		el.css('height',(attr*winH)+"px");	
	}
	//max & min
	h = el.height();
	if(h<minH){
		el.css('height',minH+"px");
	}else if(h>maxH){
		el.css('height',maxH+"px");
	}
} 
 
function elementPositionX(el, winW, winH){
	var x, attr = el.attr('x');
	if(!attr || attr=="a"){
		el.css('left','auto');
		return;
	}
	if(attr=='c'){
		x = (winW-el.outerWidth())/2;
		x = x<0?0:x;
	}else{
		x = winH*attr;
	}
	el.css('left',x+"px");
} 

function elementPositionY(el, winW, winH){
	var y, attr = el.attr('y');
	if(!attr || attr=="a"){
		el.css('top','auto');
		return;
	}
	if(attr=='c'){
		y = (winH-el.outerHeight())/2;
		y = y<0?0:y;
	}else{
		y = winH*attr;
	}
	el.css('top',y+"px");
} 
 
 
/* GO */
 
$(document).ready( function(){
	doGo(document);
	$(window).resize(function(){
		doLayoutMath();
	});
});