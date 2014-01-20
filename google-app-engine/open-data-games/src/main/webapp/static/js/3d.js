var optionalSettings = {
	// "callback" : initialize,
	"other_params" : "key=AIzaSyDzM1v79rsT7CczWHKNkrTUAj86408XeXc&sensor=true_or_false"
};
google.load("earth", "1", optionalSettings);
google.setOnLoadCallback(initialize);

var GLOBAL = {};
GLOBAL.MAP = null;
GLOBAL.MARKERS = {};

// dispatch types
GLOBAL.DISPATCH_TYPES = {
	// "OPEN_BALOON" : openBaloon,
	// "CLOSE_BALOON" : closeBaloon,
	// "SET_POSITION" : setPosition,
	// "ADD_MARKER" : addMarker,
	"ADD_MARKER_3D" : addMarker3D,
// "DEL_MARKER" : delMarker,
// "ADD_EVENT" : addEvent,
// "TIME" : time
};

function addMarker3D(m) {
	console.log("addMarker3D");
	
	// Placemark
	var placemark = GLOBAL.MAP.createPlacemark('');
	placemark.setName('model');

	// Placemark/Model (geometry)
	var model = GLOBAL.MAP.createModel('');
	placemark.setGeometry(model);

	// Placemark/Model/Link
	var link = GLOBAL.MAP.createLink('');
	link.setHref(m.payload.href);
//	link.setHref('http://earth-api-samples.googlecode.com/svn/trunk/examples/static/splotchy_box.dae');
	model.setLink(link);

	// get center look at location
	var lookAt = GLOBAL.MAP.getView().copyAsLookAt(GLOBAL.MAP.ALTITUDE_RELATIVE_TO_GROUND);

	// Placemark/Model/Location
	var loc = GLOBAL.MAP.createLocation('');
	loc.setLatitude(lookAt.getLatitude());
	loc.setLongitude(lookAt.getLongitude());
	model.setLocation(loc);

	// add the model placemark to Earth
	GLOBAL.MAP.getFeatures().appendChild(placemark);
}

function initialize() {

	google.earth.createInstance('map3d', initCB, failureCB);

}

function initCB(instance) {
	GLOBAL.MAP = instance;
	GLOBAL.MAP.getWindow().setVisibility(true);

	// Get the current view.
	// var lookAt =
	// GLOBAL.MAP.getView().copyAsLookAt(GLOBAL.MAP.ALTITUDE_RELATIVE_TO_GROUND);

	// Create a new LookAt.
	var lookAt = GLOBAL.MAP.createLookAt('');

	// Set new latitude and longitude values.
	lookAt.setLatitude(43.839511);
	lookAt.setLongitude(11.208209);
	lookAt.setRange(60.0); // default is 0.0
	lookAt.setTilt(45.0);

	// Update the view in Google Earth.
	GLOBAL.MAP.getView().setAbstractView(lookAt);
	
	GLOBAL.MAP.getNavigationControl().setVisibility(GLOBAL.MAP.VISIBILITY_SHOW);
	
	startDemo();
}

function failureCB(errorCode) {
	alert(errorCode);
}

function dispatch(messagesFromServer) {
	for (var i = 0; i < messagesFromServer.length; i++) {
		GLOBAL.DISPATCH_TYPES[messagesFromServer[i].type]
				(messagesFromServer[i]);
	}
}

function testAdd3D() {
	var messagesFromServer = [];
	messagesFromServer.push({
		type : "ADD_MARKER_3D",
		payload : {
			key : "da39a3ee5e6b4b0d3255bfef95601890afd80709",
			lat : 43.839216,
			lng : 11.208383,
			title : "Furto",
			info : "Furto con scasso",
			icon : null,
			href : 'http://nomadic-zoo-465.appspot.com/static/3d/us_police_car/models/us_police_car.dae'
		},
		expire : 0
	});

	dispatch(messagesFromServer);
}

function testAdd3DGorilla() {
	var messagesFromServer = [];
	messagesFromServer.push({
		type : "ADD_MARKER_3D",
		payload : {
			key : "da39a3ee5e6b4b0d3255bfef95601890afd80700",
			lat : 43.839062,
			lng : 11.207600,
			title : "Furto",
			info : "Furto con scasso",
			icon : null,
			href : 'http://nomadic-zoo-465.appspot.com/static/3d/gorilla/models/gorilla.dae'
		},
		expire : 0
	});

	dispatch(messagesFromServer);
}

function startDemo() {

	setTimeout(function() {
		testAdd3D();
	}, 2000);
	
	setTimeout(function() {
		testAdd3DGorilla();
	}, 3000);
	
}
