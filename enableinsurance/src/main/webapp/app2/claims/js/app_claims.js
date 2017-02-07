var app = angular.module('appDetails', ['nvd3', 'chart.js']);

app.controller("ActiveClaimsStackedAreaChartCtrl", function($scope, $http) {
	$scope.options = {
        chart: {
            type: 'stackedAreaChart',
            height: 175,
            /*legend: {
                margin : {
                    top: 1,
                    right: 115,
                    bottom: 5,
                    left: 0
                }    
            },*/
            margin : {
                top: 20,
                right: 15,
                bottom: 20,
                left: 30
            },
            x: function(d){ return d.x; },
            y: function(d){ return d.y; },
            useInteractiveGuideline: true,
            dispatch: {
                stateChange: function(e){ console.log("stateChange"); },
                changeState: function(e){ console.log("changeState"); },
                tooltipShow: function(e){ console.log("tooltipShow"); },
                tooltipHide: function(e){ console.log("tooltipHide"); }
            },
            xAxis: {
                //axisLabel: 'Time (ms)',
                tickFormat: function(d) {
                    //return d3.time.format('%I:%M %p')(new Date(d))
                    return '';
                }
            },
            yAxis: {
                //axisLabel: 'Voltage (v)',
                tickFormat: function(d){
                    return d3.format('.00f')(d);
                },
                //axisLabelDistance: -10
            },
            callback: function(chart){
                console.log("!!! lineChart callback !!!");
            },
            showControls: false,
            showLegend: false,
            noData: "Loading Data",
            yDomain: [0, 100]
        }
    };

    
    $scope.data = [
        { values: [], key: 'Active Claims', color: '#D3E37F', classed: 'dashed' }
    ];

    var jsonFile = ["claims_data_01.json", "claims_data_01.json"];
    function getJson() {
       return jsonFile[Math.floor(Math.random() * jsonFile.length)];
    }

    //console.log(getJson());

    loadData();
    setInterval(function() {
        loadData(); 
    }, 10000);

    function loadData() {
        $scope.data = [];
        $http.get('data/' + getJson())
            .then(function(response) {
                //console.log(response.data);
                var x = 0;
                $scope.data = response.data;
                angular.forEach($scope.data, function(data1) {
                    //console.log(data1);
                    //$scope.data.push({
                    //    key: data1.key,
                    //    color: data1.color
                    //});
                    angular.forEach(data1.values, function(items) {
                        //console.log(items[0],items[1]);                
                        $scope.data[x].values.push({x: items[0], y: items[1]});
                    });
                    x++;
                });
                
            }); 
    } 
});

app.controller("ActiveClaimsPolarAreaChartCtrl", function($scope) {
	$scope.labels = ["Review", "Legal", "On Hold", "Investigation", "New"];
    $scope.options = {legend: {display: true, position: 'right'}};
    $scope.data = [20, 25, 72, 75, 60];
});

app.controller("WeatherCtrl", function($scope, $http) {
    $http.get('data/weather_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.weather_results = response.data.weather;
        });
});

app.controller("CrimeCtrl", function($scope, $http) {
    $http.get('data/crime_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.crime_results = response.data.crime;
        });
});

app.controller("FireCtrl", function($scope, $http) {
    $http.get('data/fire_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.fire_results = response.data.fire;
        });
});

app.controller("HailCtrl", function($scope, $http) {
    $http.get('data/hail_data.json')
        .then(function(response) {
            $scope.hail_results = response.data.hail;
        });
});

app.controller("SocialStreamCtrl", function($scope, $http) {
    $http.get('data/social_stream_data.json')
        .then(function(response) {
            $scope.social_streams = response.data;
        });
});

app.controller("EventAnalyticsCtrl", function($scope, $http) {
    $http.get('data/event_analytics_data.json')
        .then(function(response) {
            $scope.event_analytics = response.data.event_analytics;
            $scope.statistics = response.data.statistics;
        });
});

app.controller("ClaimHistoryCtrl", function($scope, $http) {
    $http.get('data/claim_history_data.json')
        .then(function(response) {
            $scope.claim_histories = response.data.claim_histories;
        });
});

app.controller("ActiveClaimsStatsCtrl", function($scope, $http) {
    $http.get('data/active_claims_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.statistics = response.data.active_claims_statistics;
        });
});

app.controller("ClaimsPayoutCtrl", function($scope, $http) {
    $http.get('data/claims_payout.json')
        .then(function(response) {
            $scope.payouts = response.data.claim_payout;
			
			/***
			   X-axis = months
			   Y-axis = perils
			*/
			var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			var numMonths = 12;
			var perils = [];
			var perilCount = 0;
			var dataItems = [];
			
			angular.forEach($scope.payouts, function(payout) {
				
				for (var monthKey = 0; monthKey < numMonths; monthKey++) {
					var dataItem = [monthKey, perilCount, payout.payout[monthKey]];	
					dataItems.push(dataItem);
				}			
				
				perils.push(payout.peril);
				perilCount++;			
				
			});						
			
			Highcharts.chart('heatMapPayout', {
				chart: {
					type: 'heatmap',
					marginTop: 10,
					marginBottom: 120,
					plotBorderWidth: 0
				},
				
				exporting: { 
					enabled: false 
				},
				
				credits: {
					enabled: false
				},
				
				title: {
					text: null
				},

				xAxis: {
					categories: months
				},

				yAxis: {
					categories: perils,
					title: null
				},
				
				colorAxis: {
					min: 0,
					max: 100000000,
					minColor: '#FCE4D6',
					maxColor: '#C15811',
				},

				legend: {
					align: 'left',
					layout: 'horizontal',
					margin: 0,
					verticalAlign: 'bottom',
					x: 70,
					y: 15
				},

				tooltip: {
					formatter: function () {
						var numberValue = this.point.value;
						
						return '<b>' + monthNames[this.point.x] +  '</b> has <br><b>' +
							numberValue.toLocaleString() + '</b> claims payout on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
					}
				},

				series: [{
					name: 'Claim Payout',
					borderWidth: 1,
					borderColor: "#fff",
					data: dataItems,
					dataLabels: {
						enabled: false,
						color: '#000'
						
					}
				}]

			});
	
        });
});

app.controller("ClaimDetailsCtrl", function($scope, $http) {
   $http.get('data/claim_details_info_data.json')
        .then(function(response) {
            $scope.claimInfo = response.data.claimInfo;
        }); 
});