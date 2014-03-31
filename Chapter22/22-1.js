function test() {
	// var image = getmap();
	// document.getElementById("body1").appendChild(image);
	whereami(document.getElementById("lbl1"));
}
//取得GoogleMap電腦的位置，傳回圖片
function getmap(){
	if (!navigator.geolocation) {throw "Geolocation not supported"; }
	var image = document.createElement("img");
	navigator.geolocation.getCurrentPosition(setMapURL);
	return image;
	//
	function setMapURL(pos){
		var latitude = pos.coords.latitude;
		var longitude = pos.coords.longitude;
		var accuracy = pos.coords.accuracy;
		var url = "http://map.google.com/maps/api/staticmap" +
			"?center=" + latitude + "," + longitude +
			"&size=640x640&sensor=true";
		var zoomlevel = 20;
		if (accuracy > 80){
			zoomlevel -= Math.round(Math.log(accuracy / 50) / Math.LN2);
		}
		url += "&zoom=" + zoomlevel;
		image.src = url;
	}
}

//取得地理位置的坐標
function whereami(elt){
	var options = {
		enableHighAccuracy: false,
		maximumAge: 300000,
		timeout: 15000
	};

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(success, error, options);
	} else {
		elt.innerHTML = "GeoLocation not supported in this browser";
	}

	function error(e){
		elt.innerHTML = "Geolocation error " + e.code + ": " + e.message;
	}

	function success(pos){
		var msg = "At " + 
			new Date(pos.timestamp).toLocaleString() + " you were within " +
			pos.coords.accuracy + " meters of latitude " +
			pos.coords.latitude + " longitude " +
			pos.coords.longitude + ".";
		//
		if (pos.coords.altitude){
			msg += " You are " + pos.coords.altitude + " ± " +
				pos.coords.altitudeAccuracy + "meters above sea level.";
		}
		if (pos.coords.speed){
			msg += " You are travlling at " +
				pos.coords.speed + "m/s on heading " +
				pos.coords.heading + ".";
		}
		elt.innerHTML = msg;
	}

}
