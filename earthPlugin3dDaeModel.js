/**
 * inizializza un modello 3D dato un *.dae e la scala
 * @param ge - Google Earth Plugin instance
 * @param daeLocation
 * @param scale
 */
function init3dModel(ge, daeLocation, scale) {	
	clearLastChild(ge);
	
	/**
	 * KmlLocation Interface Reference
	 * http://code.google.com/apis/earth/documentation/reference/interface_kml_location.html
	 */
	var kmlLocation = ge.createLocation('snoway3Droid_kmlLocation');
	
	/**
	 * KmlLink Interface Reference
	 * http://code.google.com/apis/earth/documentation/reference/interface_kml_link.html
	 */
	var kmlLink = ge.createLink('snoway3Droid_kmlLink');
	kmlLink.setHref(daeLocation);
	
	/**
	 * KmlScale Interface Reference
	 * http://code.google.com/apis/earth/documentation/reference/interface_kml_scale.html
	 */
	var kmlScale = ge.createScale('snoway3Droid_kmlScale');
	kmlScale.set(scale, scale, scale);
	
	/**
	 * KmlModel Interface Reference
	 * http://code.google.com/apis/earth/documentation/reference/interface_kml_model.html
	 */
	var kmlModel = ge.createModel('snoway3Droid_kmlModel');
	kmlModel.setLink(kmlLink);
	kmlModel.setScale(kmlScale);
	
	/**
	 * KmlPlacemark Interface Reference
	 * http://code.google.com/apis/earth/documentation/reference/interface_kml_placemark.html
	 */
	var kmlPlacemark = ge.createPlacemark('snoway3Droid_kmlPlacemark');
	kmlPlacemark.setGeometry(kmlModel);
	
	ge.getFeatures().appendChild(kmlPlacemark);
}

/**
 * @param ge - Google Earth Plugin instance
 * @param latitude
 * @param longitude
 * @param altitude
 * @param heading opzionale - z aixs 0° is to North, corrisponde al bearing
 * @param tilt opzionale - x axis, rodeo rotation
 * @param roll opzionale - y axis backflip rotation is 90°
 */
function update3dModel(ge, latitude, longitude, altitude, heading, tilt, roll) {	
	var heading = heading || 0;
	var tilt = tilt || 0;
	var roll = roll || 0;
	
	/**
	 * KmlModel Interface Reference
	 * http://code.google.com/apis/earth/documentation/reference/interface_kml_model.html
	 * ge.getFeatures().getLastChild().getGeometry()
	 */

	/**
	 * KmlLocation Interface Reference
	 * http://code.google.com/apis/earth/documentation/reference/interface_kml_location.html
	 */
	ge.getFeatures().getLastChild().getGeometry().getLocation().setLatLngAlt(latitude, longitude, altitude);
	
	/**
	 * KmlOrientation Interface Reference
	 * http://code.google.com/apis/earth/documentation/reference/interface_kml_orientation.html
	 */
	ge.getFeatures().getLastChild().getGeometry().getOrientation().set(heading, tilt, roll);
	
	/**
	 * KmlScale Interface Reference
	 * http://code.google.com/apis/earth/documentation/reference/interface_kml_scale.html
	 * 
	 * for debug update the scale
	 * ge.getFeatures().getLastChild().getGeometry().getScale().set(SCALE, SCALE, SCALE);
	 */
}

/**
 * update the view, all params are required
 * @param ge - Google Earth Plugin instance
 * @param latitude
 * @param longitude
 * @param altitude
 * @param range
 * @param tilt
 * @param kmlAltitudeMode - see KmlAltitudeModeEnum on page http://code.google.com/apis/earth/documentation/reference/interface_g_e_plugin.html
 */
function updateView(ge, latitude, longitude, altitude, range, tilt, kmlAltitudeMode) {
	/**
	 * KmlLookAt Interface Reference
	 * http://code.google.com/apis/earth/documentation/reference/interface_kml_look_at.html
	 */
	var kmlLookAt = ge.getView().copyAsLookAt(kmlAltitudeMode);
	kmlLookAt.setLatitude(latitude);
	kmlLookAt.setLongitude(longitude);
	kmlLookAt.setAltitude(altitude);
	kmlLookAt.setRange(range);
	kmlLookAt.setTilt(tilt);
	
	ge.getView().setAbstractView(kmlLookAt);
}

/**
 * 
 * @param ge - Google Earth Plugin instance
 */
function clearLastChild(ge) {
	if (ge.getFeatures().hasChildNodes()) {
		ge.getFeatures().removeChild(
				ge.getFeatures().getLastChild());
	}
}