(function() {

	var counter = 0;

	var socket = new SockJS("/serviceincidents/service/ws");
	var stompClient = Stomp.over(socket);

	var connectCallback = function() {
		stompClient.subscribe('/topic/msg', handleMessage);
	};

	var errorCallback = function(error) {
		alert(error);
	};

	stompClient.connect("guest", "guest", connectCallback, errorCallback);

	function handleMessage(frame) {

		var body = jQuery.parseJSON(frame.body);
		console.log('body ' + body[0].message);
		var msg = jQuery.parseJSON(body[0].message);
		console.log("websocket: handleMessage() "+frame)
		var dotcolor = 'red';
		if (msg.type == 0){
            dotcolor = 'blue';
		} else if ( msg.type == 1) {
            dotcolor = 'green';
		} else if ( msg.type == 2) {
            dotcolor = 'yellow';
		}
        //L.circleMarker([ msg.lat,  msg.lng], {color: dotcolor, weight: 2}).setRadius(5).addTo(Window.map);
        geocoder = new L.Control.Geocoder.Nominatim();
        //var newaddress = '6006 shady wood circle, pa';
        geocoder.geocode(msg.address, function(results) {
            if (results != null && results.length > 0){
               L.circleMarker([ results[0].center.lat,  results[0].center.lng], {color: dotcolor, weight: 2}).setRadius(5).addTo(Window.map);

               //console.log(results[0].center.lat, results[0].center.lng)
               }
        });

/*
geocoder.geocode(yourQuery, function(results) {
       latLng= new L.LatLng(results[0].center.lat, results[0].center.lng);
       marker = new L.Marker (latLng);
       map.addlayer(marker);
});
*/
	}

}());