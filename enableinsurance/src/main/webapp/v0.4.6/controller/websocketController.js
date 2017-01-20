(function() {

	var counter = 0;

	var socket = new SockJS("/enableinsurance/service/ws");
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
		console.log('body ' + body[0]);
		var msg = jQuery.parseJSON(body[0]);
		//console.log("websocket: handleMessage() "+frame)
        $('#avgtoday').text(msg.a) ;
        $('#pitoday').text(msg.p) ;
        $('#premiumtoday').text(msg.t) ;


        //L.circleMarker([ msg.lat,  msg.lng], {color: dotcolor, weight: 2}).setRadius(5).addTo(Window.map);

/*
        geocoder = new L.Control.Geocoder.Nominatim();
        //var newaddress = '6006 shady wood circle, pa';
        geocoder.geocode(msg.address, function(results) {
            if (results != null && results.length > 0){
               L.circleMarker([ results[0].center.lat,  results[0].center.lng], {color: dotcolor, weight: 2}).setRadius(5).addTo(Window.map);

               //console.log(results[0].center.lat, results[0].center.lng)
               }
        });
geocoder.geocode(yourQuery, function(results) {
       latLng= new L.LatLng(results[0].center.lat, results[0].center.lng);
       marker = new L.Marker (latLng);
       map.addlayer(marker);
});
*/
	}

}());