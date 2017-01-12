var StoreLocationController = (function() {

	var posfeed = null;
	var _storearr_ = null;
	var _storesales_ = [];
	var currentstoreid = null;

	function initCharts(chart, data) {

		$('#' + chart).html('');

		var chart = document.getElementById(chart), axisMargin = 0, margin = 0, valueMargin = 10, width = 270, height = 320, barHeight = (15), barPadding = 10, data, bar, svg, scale, xAxis, labelWidth = 0;

		var format = d3.time.format("%m/%d/%y");

		var margin = {
			top : 5,
			right : 20,
			bottom : 30,
			left : 17
		}, width = 280 - margin.left - margin.right, height = 190 - margin.top - margin.bottom;

		var x = d3.time.scale().range([ 0, width ]);

		var y = d3.scale.linear().range([ height, 0 ]);
		var z = d3.scale.category20c();
		var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(d3.time.days);
		var yAxis = d3.svg.axis().scale(y).orient("left");
		var stack = d3.layout.stack().offset("zero").values(function(d) {
			return d.values;
		}).x(function(d) {
			return d.date;
		}).y(function(d) {
			return d.value;
		});

		var nest = d3.nest().key(function(d) {
			return d.key;
		});

		var area = d3.svg.area().interpolate("cardinal").x(function(d) {
			return x(d.date);
		}).y0(function(d) {
			return y(d.y0);
		}).y1(function(d) {
			return y(d.y0 + d.y);
		});

		var svg = d3.select(chart).append("svg").attr("width", width + margin.left + margin.right).attr("height",
				height + margin.top + margin.bottom).append("g").attr("transform",
				"translate(" + margin.left + "," + margin.top + ")");

		d3.csv("../../data/data.tsv", function(error, data) {
			if (error)
				throw error;

			data.forEach(function(d) {
				d.date = format.parse(d.date);
				// d.value = +d.value;
				d.value = Math.floor((Math.random() * 64) + 12);
			});

			var layers = stack(nest.entries(data));

			x.domain(d3.extent(data, function(d) {
				return d.date;
			}));
			y.domain([ 0, d3.max(data, function(d) {
				return d.y0 + d.y;
			}) ]);

			svg.selectAll(".layer").data(layers).enter().append("path").attr("class", "layer").attr("d", function(d) {
				return area(d.values);
			}).style("fill", function(d, i) {
				return z(i);
			});

			svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

			svg.append("g").attr("class", "y axis").call(yAxis);
		});

	
	}

	function posfeedReader(loc) {

		$.ajax({
			url : '/serviceincidents/service/dataservice/getStores/' + loc,
			success : function(result) {
			//	var posresult = jQuery.parseJSON(result);

			/**	var chartData = [], sales = [], chartData1 = [];
				var i = 0;

				$(".storesalesapan").each(function(n, elem) {
					$(this).css("fontSize", "11px");
					$(this).css("color", "#000");
				});

				var store = _storearr_[Math.floor(Math.random() * _storearr_.length)];
				var userid = Math.floor(Math.random() * 99 + 1);
				//var user = allProducts[userid];
				

				var popupContent2 = "<table><tr><td><img src='../../images/ncratm.png' hspace=4></td><td nowrap>" + "<br><b>check in: </b> testname" 
				+ "</td></tr></table>", popup2 = new L.Popup({
			minWidth : 250
		});
				var totalcheckins = parseInt($("#storetotalreturns").html());
				$("#storetotalreturns").html(totalcheckins + 1);
				var salesAmt = totalcheckins + 100
				$("#storetotalsales").html(salesAmt);
				
				$("#storetotalsalesamount").html(salesAmt - 100);

				popup2.setLatLng(new L.LatLng(store.lat, store.lng));
				popup2.setContent(popupContent2);

				if ($(".leaflet-popup-close-button")[0])
					$(".leaflet-popup-close-button")[0].click();

				map.addLayer(popup2);

				var products = [];
				$(".productdef").each(function(i, elem) {
					productName = $(elem).context.textContent;
					products.push([ productName.split(' ')[0], Math.floor(Math.random() * 100) + 1 ]);
				});

				for (var i = 0; i < 6; i++) {
					chartData1.push(products[Math.floor(Math.random() * products.length)]);
				}

				StoreLocationController.initCharts('chart', chartData);
				StoreLocationController.initCharts('chart2', chartData1);**/

			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown);
			}
		});
	}

	function format() {
	}

	function getLocation(loc) {
	    console.log('Location is ' + loc);
	    console.log('Location url is ' + '/serviceincidents/service/dataservice/getStores/' + loc);

		$.ajax({
			url : '/serviceincidents/service/dataservice/getStores/' + loc,
			success : function(result) {
				
				if(result=="")return;
				var storearr = jQuery.parseJSON(result);
				_storearr_ = storearr;
			//	var store0addr = storearr[0].address + " " + storearr[0].city + " " + storearr[0].state + " "
				//		+ storearr[0].zip;

				$('#storename').html('NCR Service Incidents');
				$('#storeaddr').html('All Resorts');

				posfeed = setInterval(posfeedReader, 5000, storearr[0].id);

				drawMap(storearr);

				this._storearr_ = storearr;
				$.each(storearr, function(n, elem) {

					$('#invstates').append(
							$("<option></option>").attr("value", elem.id).text(
									elem.name + " " + elem.city + ", " + elem.state));

					$("#storelist").append(
							"<div class='storedef' id='storedef" + elem.id
									+ "' style='cursor:pointer;'><img src='../../images/information.png' hspace=4>"
									+ elem.name + "</div>");
					$("#storedef" + elem.id).data(elem);
				});

				$("#storedef" + storearr[0].id).css('background-color', '#eee');

				$(".storedef").mouseover(function() {
					$(this).css('background-color', '#eee');
				});

				$(".storedef").mouseout(function() {
					if ($(this)[0].textContent != $("#storename").html()) {
						$(this).css('background-color', '#fff');
					}
				});

				$(".storedef").click(

						function(e) {

							var storeid = $(this).data().id;
							$(".storedef").css('background-color', '#fff');
							$(this).css('background-color', '#eee');
							clearInterval(posfeed);
							posfeed = setInterval(posfeedReader, 3000, storeid);
							var storeaddr = $(this).data().address + " " + $(this).data().city + " "
									+ $(this).data().state + " " + $(this).data().zip;
							$('#storename').html($(this).data().name);
							$('#storeaddr').html(storeaddr);

							clearInterval(posfeed);

							$.each(storearr, function(idx, store) {

								if (e.target.textContent == store.name) {
									map.setView([ store.lat, store.lng ], 13);
									return false;
								}
							});

							showStorePopup($(this).data().city, $(this).data().state, storeid, $(this).data().name);

							$.each(_storesales_, function(idx, sale) {

								if (sale.store.substring(5, sale.store.length) == storeid) {
									console.log(sale);
								}
							});
						});

			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown);
			}
		});
		$.ajax({
			url : '/serviceincidents/service/updateInterface/test/10',
			success : function(result) {
				feedstarted = true;
				console.log("subscribed message: " + result);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown);
			}
		});
		
	}

	function geocode(storearr, i) {

		var geocoder = new google.maps.Geocoder();
		$.each(storearr[i], function(n, elem) {
			var storeaddr = storearr[i][n].address + " " + storearr[i][n].city + " " + storearr[i][n].state + " "
					+ storearr[i][n].zip;
			geocoder.geocode({
				'address' : storeaddr
			}, function(results, status) {
				locations.push({
					lat : results[0].geometry.location.lat(),
					lng : results[0].geometry.location.lng()
				});
			});
		});
	}

	function drawMap(storearr) {

		L.Map = L.Map.extend({
		});

		Window.map = new L.map('map').setView([ 39.50, -98.35 ], 5);
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZXJpY3BlcmxlciIsImEiOiJjaWp5YWdzamExcXBydndraTQ0M3J4N2VlIn0.SGSewOf7lm_cnXo4TomikA',
						{
							maxZoom : 18,
							attribution : 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '
									+ '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
									+ 'Imagery ? <a href="http://mapbox.com">Mapbox</a>',
							id : 'mapbox.streets'
						}).addTo(Window.map);
		placeStoreMarkers(storearr);
		Window.map.on('click', onMapClick);
	}

	function onMapClick(e) {
		$("#popup").hide();
		placeStoreMarkers(_storearr_);
	}

	function reset() {

		$('#storename').html('RCG Vacation Club');
		$('#storeaddr').html('All Resorts');
		$("#popup").hide();

		$("#storechart1").show();
		$("#storechart2").show();
		$("#resortdetail").hide();

		posfeed = setInterval(posfeedReader, 3000, 0)
		Window.map.setView([ 39.50, -98.35 ], 5);
	}

	function updateStore(currentstoreid) {
		var storesales = $("#store" + currentstoreid).text();
		var storesalenumeric = storesales.replace(/,/g, "");

		var storesalenumeric = $("#store" + currentstoreid).text().replace(/,/g, "").replace(/\$/g, "");
		$("#storetotalsales").html(
				"<span style='color:#000'>" + storesales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
						+ ".00</span>");
		$("#storetotalreturns").html(
				"<span style='color:#000'>$"
						+ (storesalenumeric / 12).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
						+ "</span>");
		$("#storetotalsalesamount").html(
				"<span style='color:#000'>$"
						+ (storesalenumeric / 50).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
						+ "</span>");
	}

	function showStorePopup(city, state, id, name) {

		currentstoreid = id;
		updateStore(currentstoreid);
		var appendthis = ("<div class='modal-overlay js-modal-close'></div>");

		$('a[data-modal-id]').click(function(e) {
			e.preventDefault();
			$("body").append(appendthis);
			$(".modal-overlay").fadeTo(500, 0.7);
			$(".js-modalbox").fadeIn(500);
			var modalBox = $(this).attr('data-modal-id');
			$('#' + modalBox).fadeIn($(this).data());
		});

		$(".js-modal-close, .modal-overlay").click(function() {
			$(".modal-box, .modal-overlay").fadeOut(500, function() {
				$(".modal-overlay").remove();
			});
		});

		$(window).resize();

		$(".modal-body").html('<img src="../../images/' + id + '.png"/>');
		$("#storemodal").html(name + '<br>');
		$("#storemodaltitle").html(city + ", " + state);

		$("#popup").show();

	}

	function placeStoreMarkers(storearr) {
		var popupdiv, popup, options = {
			'minWidth' : '300px',
			'minHeight' : '20',
			closeButton : false
		};

		$.each(storearr, function(n, elem) {
			L.marker([ elem.lat, elem.lng ] , {color: "red", weight: 2}).setRadius(5).addTo(Window.map).on('click', onClick);
			function onClick(e) {
				var current = e.latlng.lat + "" + e.latlng.lng, city, state, id, addr, zip, ref, name;

				$.each(storearr, function(n, elem) {

					if (current == (elem.lat + "" + elem.lng)) {
						console.log(elem)
						name = elem.name;
						city = elem.city;
						state = elem.state;
						id = elem.id;
						addr = elem.address;
						zip = elem.zip;
						ref = elem.ref;
					}
				});

				$('#storename').html(name);
				$('#storeaddr').html(addr + " " + city + ", " + state, +" " + zip);

				$("#storechart1").hide();
				$("#storechart2").hide();

				clearInterval(posfeed);

				$('#resortframe').attr('src',
						'http://www.marriottvacationclub.com/vacation-resorts/' + ref + '/overview.shtml');
				$("#resortdetail").show();
				showStorePopup(city, state, id, name);
				Window.map.setView(e.latlng, 13);
			}
			popup = L.popup();

		});
	}

	function getStores() {
		return _storearr_;
	}

	return {
		getLocation : getLocation,
		drawMap : drawMap,
		initCharts : initCharts,
		reset : reset,
		getStores : getStores
	};
})();
