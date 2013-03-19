function init(event){
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
};

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