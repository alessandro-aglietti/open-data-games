google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {
	var mapOptions = {
		center : new google.maps.LatLng(43.839216, 11.208383),
		zoom : 19,
		mapTypeId : google.maps.MapTypeId.HYBRID,
		tilt: 0,
		streetViewControl : false,
		mapTypeControl : false
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"),
			mapOptions);
}
