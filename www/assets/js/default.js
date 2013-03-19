

//Main Init
$(document).ready( function(){
	//default view
	mainView("search");

	//Init global handlers
	$('#searchForm').submit(goSearch);
});

/* MY - Function to process code before add to DOM */
toDoGo.push(myDoGo);
function myDoGo(el){
	$(el).find(".graveMap").bind('click tapone', onGravLinkClick);
}

//handler for grav buttons 
function onGravLinkClick(event){
	event.preventDefault();
	var cords = $(this).attr('cord').split(",");
	//alert(cords[0]+' '+cords[1]);
	var map = new GMaps({
		div: '#gmapContainer',
		lat: cords[1],
		lng: cords[0]
	});
	map.addMarker({
	  lat: cords[1],
	  lng: cords[0],
	  title: 'A (grave)',
	});
	
	$("#driveSearch").bind('click tapone', function(event){
		event.preventDefault();
		/*GMaps.geolocate({
		  success: function(position) {
			map.setCenter(position.coords.latitude, position.coords.longitude);
			map.drawRoute({
			  origin: [position.coords.latitude, position.coords.longitude],
			  destination: [cords[1], cords[0]],
			  travelMode: 'driving',
			  strokeColor: '#131540',
			  strokeOpacity: 0.6,
			  strokeWeight: 6
			});
		  }
		});*/
		navigator.geolocation.getCurrentPosition(function(position) {
			map.setCenter(position.coords.latitude, position.coords.longitude);
			map.drawRoute({
			  origin: [position.coords.latitude, position.coords.longitude],
			  destination: [cords[1], cords[0]],
			  travelMode: 'driving',
			  strokeColor: '#131540',
			  strokeOpacity: 0.6,
			  strokeWeight: 6
			});
		  }, geolocationError);
	});
}

function geolocationError(){
	alert('Geolokalizacja niedostępna. Aby wyznaczyć trasę włącz geolokalizacje.');
}

/* MY - Function to math/process layout system */
toDoLayoutInit.push(myLayoutInit);
function myLayoutInit(){
	var w = $(window).width(), h = $(window).height();
	var isMini = w<500?true: h<400?true:false;
	if(isMini){
		$("div.defaultMainStyle").addClass('float');
		$("div.defaultMainStyle").attr('x','c').attr('y','c').attr('w','0.96').attr('h','a');
		$("#search").addClass('float').attr('x','c').attr('y','c').attr('w','0.8').attr('h','a');
		$("#grob").attr('h','1');
	}else{
		$("div.defaultMainStyle").addClass('float');
		$("div.defaultMainStyle").attr('x','c').attr('y','c').attr('w','0.7').attr('h','a');
		$("#grob").attr('h','0.95');
	}
}

/*toDoLayoutMath.push(myLayout);
function myLayout(){
	var w = $(window).width();
	var h = $(window).height();
	var min = w<h?w:h, max = w<h?h:w;
	//layout params - math
	var lSize = min*0.3;
	var lOpacity = 1;
	var mainBox = $('#'+mainId);
	var mainBoxX = (w-mainBox.width())/2, mainBoxY = (h-mainBox.height())/2;
	if(mainId==="search"){
		lSize = min*0.98;
		lOpacity = 0.6;
	}
	//Set data
	//$("#logo").css("height",lSize+"px");
	//$("#logo").css("opacity",lOpacity);
	mainBox.css('left',mainBoxX);
	mainBox.css('top',mainBoxY);
	$(el).find(".graveMap").bind('click tapone', onGravLinkClick);
}*/



//Search Handler
function goSearch(event){
	event.preventDefault();
	mainView("list");
	
	//Template
	//$( "#listTemplate" ).tmpl( [{g_name:"n1"},{g_name:"n2"}] ).appendTo( "#listContainer" );
	
	//$("#listContainer").empty();
	$("#listContainer").html("<div class='loading'><img src='assets/img/loading.gif' /></div>");
	doLayoutMath();
	var name = $("#sName").val().toLowerCase();
	if(name){
		listContainerAppend("http://www.poznan.pl/featureserver/featureserver.cgi/groby?maxFeatures=100&queryable=g_name&g_name="+name);
		listContainerAppend("http://www.poznan.pl/featureserver/featureserver.cgi/groby?maxFeatures=100&queryable=g_surname&g_surname="+name);
		listContainerAppend("http://www.poznan.pl/featureserver/featureserver.cgi/groby?maxFeatures=100&queryable=g_surname_name&g_surname_name="+name);
	}else{
		listContainerAppend("http://www.poznan.pl/featureserver/featureserver.cgi/groby/all.json?maxfeatures=100");
	}
	return false;
}


//add data get from URL to #listTemplate element
function listContainerAppend(url){
	jQuery.support.cors = true;
    //var template = _.template( $("#listTemplate").html() );
	$.get(url, function(data) {
		$("#listContainer .loading").remove();
		//data = ;
		var items = JSON.parse(data).features;
		//var c = '';
		var contener = $("#listContainer");
		for (var key in items) {
			/*var raw = $("<div>").append( $("<a>")
					.attr("class","main graveMap")
					.attr("cord",items[key].geometry.coordinates)
					.attr("href","grob")
					.append( items[key].properties.g_surname_name ));*/
			var raw = $('<div>'+
					'<a class="main graveMap" href="grob" cord="'+items[key].geometry.coordinates+'">'+
					'<div class="name">'+items[key].properties.g_surname_name+'</div><br/>'+
					'<div class="date">'+items[key].properties.g_date_birth+' - '+items[key].properties.g_date_burial+' </div>'+
				'</a><div style="clear:both"></div></div>');
			contener.append( raw );
			
		}
		doGo(contener);
		//$("#listContainer").append(c)
		//doGo(c);
		doLayoutMath();
	});
}
