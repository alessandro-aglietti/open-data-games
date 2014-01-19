google.maps.event.addDomListener(window, 'load', initialize);

var GLOBAL = {};
GLOBAL.MAP = null;
GLOBAL.MARKERS = {};

function addEvent(m) {
	console.log("addEvent");
	$( '<li class="list-group-item">' + m.type + '</li>' ).prependTo( "#events" );
}

function openBaloon(m) {
	console.log("openBaloon");
	var infowindow;

	if (!GLOBAL.MARKERS[m.payload.key].infoWindow) {
		// la info window non  mai stata creata
		infowindow = new google.maps.InfoWindow({
			content : GLOBAL.MARKERS[m.payload.key].m.payload.info
		});

		GLOBAL.MARKERS[m.payload.key].infoWindow = infowindow;
	}

	GLOBAL.MARKERS[m.payload.key].infoWindow.open(GLOBAL.MAP,
			GLOBAL.MARKERS[m.payload.key].marker);
	
	addEvent(m);
}

function closeBaloon(m) {
	console.log("closeBaloon");

	GLOBAL.MARKERS[m.payload.key].infoWindow.close();
	
	addEvent(m);
}

function setPosition(m) {
	console.log("setPosition");

	var myLatlng = new google.maps.LatLng(m.payload.lat, m.payload.lng);

	GLOBAL.MARKERS[m.payload.key].marker.setPosition(myLatlng);
	
	addEvent(m);
}

function addMarker(m) {
	console.log("addMarker");

	console.log("aggiungo elemento su mappa");

	var myLatlng = new google.maps.LatLng(m.payload.lat, m.payload.lng);

	// To add the marker to the map, use the 'map' property
	var marker = new google.maps.Marker({
		position : myLatlng,
		map : GLOBAL.MAP,
		title : m.payload.title,
		icon : m.payload.icon
	});

	GLOBAL.MARKERS[m.payload.key] = {};
	GLOBAL.MARKERS[m.payload.key].marker = marker;
	GLOBAL.MARKERS[m.payload.key].m = m;
	
	addEvent(m);
}

function delMarker(m) {
	console.log("delMarker");

	GLOBAL.MARKERS[m.payload.key].marker.setMap(null);
	closeBaloon(m);
	
	addEvent(m);
}

function time() {
	console.log("time");
	
	addEvent(m);
}

// dispatch types
GLOBAL.DISPATCH_TYPES = {
	"OPEN_BALOON" : openBaloon,
	"CLOSE_BALOON" : closeBaloon,
	"SET_POSITION" : setPosition,
	"ADD_MARKER" : addMarker,
	"DEL_MARKER" : delMarker,
	"ADD_EVENT" : addEvent,
	"TIME" : time
};

function initialize() {
	var mapOptions = {
		center : new google.maps.LatLng(43.839216, 11.208383),
		zoom : 19,
		mapTypeId : google.maps.MapTypeId.HYBRID,
		tilt : 0,
		streetViewControl : false,
		mapTypeControl : false
	};
	GLOBAL.MAP = new google.maps.Map(document.getElementById("map-canvas"),
			mapOptions);

	startDemo();
}

function dispatch(messagesFromServer) {
	for (var i = 0; i < messagesFromServer.length; i++) {
		GLOBAL.DISPATCH_TYPES[messagesFromServer[i].type]
				(messagesFromServer[i]);
	}
}

function testAddMarker() {
	var messagesFromServer = [];
	messagesFromServer.push({
		type : "ADD_MARKER",
		payload : {
			key : "da39a3ee5e6b4b0d3255bfef95601890afd80709",
			lat : 43.839216,
			lng : 11.208383,
			title : "Furto",
			info : "Furto con scasso",
			icon : null
		},
		expire : 0
	});

	dispatch(messagesFromServer);
}

function testAddCustomIcon() {
	var messagesFromServer = [];
	messagesFromServer.push({
		type : "ADD_MARKER",
		payload : {
			key : "da39a3ee5e6b4b0d3255bfef95601890afd80701",
			lat : 43.839511,
			lng : 11.208209,
			title : "Sparatoria",
			info : "Sparatoria fra vecchi",
			icon : 'static/maps/icons/robbery.png'
		},
		expire : 0
	});

	dispatch(messagesFromServer);
}

function testSetPosition() {
	var messagesFromServer = [];
	messagesFromServer.push({
		type : "SET_POSITION",
		payload : {
			key : "da39a3ee5e6b4b0d3255bfef95601890afd80709",
			lat : 43.839062,
			lng : 11.207600
		},
		expire : 0
	});

	dispatch(messagesFromServer);
}

function testOpenBaloon() {
	var messagesFromServer = [];
	messagesFromServer.push({
		type : "OPEN_BALOON",
		payload : {
			key : "da39a3ee5e6b4b0d3255bfef95601890afd80709"
		},
		expire : 0
	});

	dispatch(messagesFromServer);
}

function testCloseBaloon() {
	var messagesFromServer = [];
	messagesFromServer.push({
		type : "CLOSE_BALOON",
		payload : {
			key : "da39a3ee5e6b4b0d3255bfef95601890afd80709"
		},
		expire : 0
	});

	dispatch(messagesFromServer);
}

function testDelMarker() {
	var messagesFromServer = [];
	messagesFromServer.push({
		type : "DEL_MARKER",
		payload : {
			key : "da39a3ee5e6b4b0d3255bfef95601890afd80709"
		},
		expire : 0
	});

	dispatch(messagesFromServer);
}

function startDemo() {

	setTimeout(function() {
		testAddCustomIcon();
	}, 6700);

	// 13s
	setTimeout(function() {
		testAddMarker();
		setTimeout(function() {
			testOpenBaloon();
			setTimeout(function() {
				testCloseBaloon();
				setTimeout(function() {
					testSetPosition();
					setTimeout(function() {
						testOpenBaloon();
						setTimeout(function() {
							testDelMarker();
						}, 2000);
					}, 2000);
				}, 2000);
			}, 2000);
		}, 2000);
	}, 3000);
}
