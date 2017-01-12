var GoogleMapController = (function() {

	function init() {

		geocoder = new GClientGeocoder();
	}

	function makemap() {

		$.ajax({
			url : "/serviceincidents/data/locations.json",
			success : function(result) {
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown);
			}
		});

		var addrs = [ {
			address : "1419 Half Day Rd Highland Park IL",
			data : "1419 Half Day Rd Highland Park IL",
			options : {
				icon : "images/walgreens_small.png"
			}
		}, {
			address : "1519 Lake Cook Rd Deerfield IL",
			data : "1519 Lake Cook Rd Deerfield IL",
			options : {
				icon : "images/walgreens_small.png"
			}
		}, {
			address : "780 Waukegan Rd Deerfield IL",
			data : "780 Waukegan Rd Deerfield IL",
			options : {
				icon : "images/walgreens_small.png"
			}
		}, {
			address : "200 Wilmot Rd Deerfield IL",
			data : "200 Wilmot Rd Deerfield IL",
			options : {
				icon : "images/walgreens_small.png"
			}
		}, {
			address : "2501 Waukegan Rd Bannockburn IL",
			data : "2501 Waukegan Rd Bannockburn IL",
			options : {
				icon : "images/walgreens_small.png"
			}
		} ];

		$("#map_canvas1").width("228px").height("400px").gmap3({
			map : {
				options : {
					center : [ 42.151258, -87.862193 ],
					zoom : 5
				}
			},
			marker : {
				values : addrs,
				options : {
					draggable : false
				},
				events : {
					click : function(marker, event, context) {
						var current = $('#tt').datagrid('getData').rows[0].value;
						$('#footer-' + current).append(context.data + '<br/>');
					},
					mouseover : function(marker, event, context) {
						var map = $(this).gmap3("get"), infowindow = $(this).gmap3({
							get : {
								name : "infowindow"
							}
						});
						if (infowindow) {
							infowindow.open(map, marker);
							infowindow.setContent(context.data);
						} else {
							$(this).gmap3({
								infowindow : {
									anchor : marker,
									options : {
										content : context.data
									}
								}
							});
						}
					},
					mouseout : function() {
						var infowindow = $(this).gmap3({
							get : {
								name : "infowindow"
							}
						});
						if (infowindow) {
							infowindow.close();
						}
					}
				}
			}
		});
	}

	function resize(width, height) {
		setTimeout(function() {
			$('#map_canvas1').width(width).height(height).gmap3({
				trigger : "resize"
			}).delay(100).gmap3({
				map : {
					options : {
						center : [ 42.151258, -87.862193 ]
					}
				}
			});

		}, 0);
	}

	var _points = [];
	function geocode(address, name) {
		// var map = new GMap2(document.getElementById("map"));
		// map.addControl(new GSmallMapControl());
		// map.addControl(new GMapTypeControl());
		if (geocoder) {
			geocoder.getLatLng(address, function(point) {
				if (!point) {
					console.log(address + " not found");
				} else {

					console.log("setting item " + name + " : " + point);
					_points.push(point);
					localStorage.setItem(name, JSON.stringify(_points));
					// document.getElementById("lat").innerHTML =
					// point.lat().toFixed(5);
					// document.getElementById("lng").innerHTML =
					// point.lng().toFixed(5);
					// map.clearOverlays()
					// map.setCenter(point, 14);
					// var marker = new GMarker(point, {
					// draggable : true
					// });
					// map.addOverlay(marker);

					// GEvent.addListener(marker, "dragend", function() {
					// var pt = marker.getPoint();
					// map.panTo(pt);
					// document.getElementById("lat").innerHTML =
					// pt.lat().toFixed(5);
					// document.getElementById("lng").innerHTML =
					// pt.lng().toFixed(5);
					// });

					// GEvent.addListener(map, "moveend", function() {
					// map.clearOverlays();
					// var center = map.getCenter();
					// var marker = new GMarker(center, {
					// draggable : true
					// });
					// map.addOverlay(marker);
					// document.getElementById("lat").innerHTML =
					// center.lat().toFixed(5);
					// document.getElementById("lng").innerHTML =
					// center.lng().toFixed(5);
					//
					// GEvent.addListener(marker, "dragend", function() {
					// var pt = marker.getPoint();
					// map.panTo(pt);
					// document.getElementById("lat").innerHTML =
					// pt.lat().toFixed(5);
					// document.getElementById("lng").innerHTML =
					// pt.lng().toFixed(5);
					// });

					// });

				}
			});
		}
	}

	function reversegeocode(x, y) {
		var addrs = [];
		var lat = parseFloat(x);
		var lng = parseFloat(y);
		var latlng = new google.maps.LatLng(lat, lng);
		geocoder = new google.maps.Geocoder();
		geocoder.geocode({
			'latLng' : latlng
		}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					console.log(results);
					addrs.push(results)
					localStorage.setItem("addrs", addrs);
				} else {
					console.log('No results found');
				}
			} else {
				console.log('Geocoder failed due to: ' + status);
			}
		});
	}

	return {
		init : init,
		resize : resize,
		geocode : geocode,
		reversegeocode : reversegeocode
	};
})();
