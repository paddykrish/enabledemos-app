var app = angular.module('appDetails', ['chart.js', 'nvd3']);

app.controller("NumberQuotesCtrl", function($scope, $http) {
    var companycode = location['search'].split('&')[0].split("=")[1];
    if (companycode == null){
        companycode = "all"
    }

    console.log("company code " + companycode);
    $http.get('/enableinsurance/service/dataservice/getChildTypeRenewalData/' + companycode + '/')
        .then(function(response) {
            //console.log(response.data);
            $scope.quotes_requests = response.data.results;
        });
});

app.controller("LossRatioCtrl", function($scope, $http) {
    var companycode = location['search'].split('&')[0].split("=")[1];
    if (companycode == null){
        companycode = "all"
    }
	$http.get('/enableinsurance/service/dataservice/getLostRatioHistoryData/' + companycode + '/')
        .then(function(response) {
            //console.log(response.data);
            $scope.loss_ratios = response.data.results;
        });
});

app.controller("LossRatioSummaryCtrl", function($scope, $http) {
    var companycode = location['search'].split('&')[0].split("=")[1];
    if (companycode == null){
        companycode = "all"
    }

	$http.get('/enableinsurance/service/dataservice/getLossRatioSummary/' + companycode + '/')
        .then(function(response) {
            $scope.lossRatioSummary = response.data.lossRatioSummary;
        });
});

app.controller("ClaimsPremiumCtrl", function($scope, $http) {
	$scope.options = {
        chart: {
            type: 'lineChart',
            height: 190,
            margin : {
                top: 20,
                right: 20,
                bottom: 20,
                left: 45
            },
            x: function(d){ return d[0]; },
            y: function(d){ return d[1]; },
            useInteractiveGuideline: true,
            duration: 0,    
            yAxis: {
            	//axisLabel: 'Millions',
            	//axisLabelDistance: -25,
                tickFormat: function(d){
                   return d3.format('.00f')(d) + 'M';
                }
            },
            xAxis: {
            	tickFormat: function(d) {
                    return d3.time.format('%b %Y')(new Date(d))
                }
            },
            noData: "Loading Data"
        }
    };

    Date.prototype.addMonth= function(m){
        this.setMonth(this.getMonth()+m);
        return this;
    }
    
    /*$scope.options1 = angular.copy($scope.options);
    $scope.options1.chart.duration = 0;
    $scope.options1.chart.yDomain = [-1,1];*/
    
    /*$scope.data = [
    	{ values: [], key: 'Claims', color: '#000' }, 
    	{ values: [], key: 'Premium', color: '#0f0' }
    ];
        
    $scope.run = true;
    
    var x = 0;
    setInterval(function(){
	    if (!$scope.run) return;
	    $scope.data[0].values.push({ x: new Date().addMonth(x),	y: Math.random() * 10});
	    $scope.data[1].values.push({ x: new Date().addMonth(x),	y: Math.random() * 20});
      	if ($scope.data[0].values.length > 20) {
      		$scope.data[0].values.shift();
      		$scope.data[1].values.shift();
      	}
	    x++;
	    
      $scope.$apply(); // update both chart
    }, 10000); */

    $scope.data = [];
    setTimeout(function() {
        $scope.data = getData();
        //$scope.$apply();
    }, 2000);

    function getData() {
        /*return [
            {
                key: 'Claims',
                color: '#0f0',
                values: [
                    [1451624400000 , 8], [ 1454302800000 , 7], [1456808400000, 8], [1459483200000, 7], 
                    [1462075200000, 7], [1464753600000, 4], [1467345600000, 5], [1470024000000, 3], 
                    [1472702400000, 5], [1475294400000, 6], [1477972800000, 5], [1480568400000, 7]
                ]
            },
            {
                key: 'Premium',
                color: '#000',
                values: [
                    [ 1451624400000 , 22], [ 1454302800000 , 10], [1456808400000, 24], [1459483200000, 9], 
                    [1462075200000, 12], [1464753600000, 23], [1467345600000, 18], [1470024000000, 10], 
                    [1472702400000, 15], [1475294400000, 30], [1477972800000, 10], [1480568400000, 14]
                ]
            }
            
        ];*/
        var companycode = location['search'].split('&')[0].split("=")[1];
        if (companycode == null){
            companycode = "all"
        }
        $http.get('/enableinsurance/service/dataservice/getClaimsPremiumData/' + companycode + '/')
            .then(function(response) {
                //console.log(response.data);
                $scope.data = response.data;
            });
    }
});

app.controller("LossRatioGraphCtrl", function($scope, $http) {
	$scope.options = {
        chart: {
            type: 'lineChart',
            height: 190,
            margin : {
                top: 20,
                right: 20,
                bottom: 20,
                left: 32
            },
            x: function(d){ return d[0]; },
            y: function(d){ return d[1]; },
            useInteractiveGuideline: true,
            duration: 0,    
            yAxis: {
            	//axisLabel: 'Millions',
            	//axisLabelDistance: -25,
                tickFormat: function(d){
                   return d3.format('.00f')(d);
                }
            },
            xAxis: {
            	tickFormat: function(d) {
                    return d3.time.format('%b %Y')(new Date(d))
                }
            },
            noData: "Loading Data",
            showLegend: false
        }
    };

    Date.prototype.addMonth= function(m){
        this.setMonth(this.getMonth()+m);
        return this;
    }
    
    /*$scope.options1 = angular.copy($scope.options);
    $scope.options1.chart.duration = 0;
    $scope.options1.chart.yDomain = [-1,1];*/
    
    /*$scope.data = [{ values: [], color: '#F00' }];
        
    $scope.run = true;
    
    var x = 0;
    setInterval(function(){
	    if (!$scope.run) return;
	    $scope.data[0].values.push({ x: new Date().addMonth(x),	y: Math.random() * 50});
      	if ($scope.data[0].values.length > 20) {
      		$scope.data[0].values.shift();
      	}
	    x++;
	    
      $scope.$apply(); // update both chart
    }, 5000); */
    $scope.data = [];
    setTimeout(function() {
        $scope.data = getData();
        //$scope.$apply();
    }, 2000);

    function getData() {
        /*return [
            {
                key: '',
                values: [
                    [1451624400000 , 31], [ 1454302800000 , 48], [1456808400000, 29], [1459483200000, 60], 
                    [1462075200000, 50], [1464753600000, 15], [1467345600000, 30], [1470024000000, 30], 
                    [1472702400000, 32], [1475294400000, 22], [1477972800000, 50], [1480568400000, 48]
                ],
                color: '#F00'
            }
            
        ];*/

        $http.get('data/loss_ratio_graph_data.json')
            .then(function(response) {
                //console.log(response.data);
                $scope.data = response.data;
            });
    }
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

app.controller("RadarCtrl", function($scope, $http) {    
	
    var companycode = location['search'].split('&')[0].split("=")[1];
    if (companycode == null){
        companycode = "all"
    }

	$http.get('/enableinsurance/service/dataservice/getRiskFactors/' +companycode + '/')
        .then(function(response) {
            
			// handle data from json
			$scope.dataRiskGrade = response.data.riskGrade;
            
			var dataRisk = [];
			var dataGrade = [];
			angular.forEach($scope.dataRiskGrade, function(item) {
			  dataRisk.push(item.risk);
			  dataGrade.push(item.grade);
			});			
			
			// set radar data
			$scope.options = { legend: { display: false } };
			
			$scope.labels = dataRisk;
			$scope.data = dataGrade;

			$scope.onClick = function (points, evt) {
			  console.log(points, evt);
			};
						
        });
});

app.controller("CompaniesCtrl", function($scope, $http, $location) {
    $http.get('/enableinsurance/service/dataservice/getCompanies/all')
        .then(function(response) {
            $scope.companies = response.data.companies;
        });
});

app.controller("clientDataCtrl", function($scope, $http) {
    var companycode = location['search'].split('&')[0].split("=")[1];
    if (companycode == null){
        companycode = "all"
    }

    $http.get('/enableinsurance/service/dataservice/getClientData/' + companycode + '/')
        .then(function(response) {
            $scope.clientData = response.data.clientData;
        });
});

app.controller("SocialStreamCtrl", function($scope, $http) {
    $http.get('data/social_stream_data.json')
        .then(function(response) {
            $scope.social_streams = response.data;
        });
});

app.controller("LocationRiskAssessmentCtrl", function($scope, $http) {
    var companycode = location['search'].split('&')[0].split("=")[1];
    if (companycode == null){
        companycode = "all"
    }
	$http.get('/enableinsurance/service/dataservice/getLocationRiskAssessmentData/' +companycode + '/')
        .then(function(response) {
            $scope.locationRiskAssessments = response.data;

            $scope.calcAverage = function(c1,c2,c3,c4,c5) {
                var sum = 0;
                sum = c1 + c2 + c3 + c4 + c5;
                var avg = sum/5;
                return avg;
            }

            $scope.applyCSS = function(num) {
                var css = "";
                if(num >= 7.5) {
                    css = "high";
                } else if (num >= 5.0 && num <= 7.4) {
                    css = "medium";
                } else if (num < 5.0) {
                    css = "low";
                }
                return css;
            }
        });
});

app.controller("FraudRiskCtrl", function($scope, $http) {    
 	
 	$http.get('data/fraud_risk.json')
         .then(function(response) {
             
 			// handle data from json
 			$scope.fraudRiskGrade = response.data.fraudRiskGrade;
             
 			FusionCharts.ready(function () {
 				var cSatScoreChart = new FusionCharts({
 					type: 'angulargauge',
 					renderAt: 'gauge-chart-container',
 					width: '380',
 					height: '300',
 					dataFormat: 'json',
 					dataSource: {
 						"chart": {
 							"caption": $scope.fraudRiskGrade.title,
 							"subcaption": $scope.fraudRiskGrade.caption,
 							"lowerLimit": "0",
 							"upperLimit": "100",                
 							"showValue": "1",
 							"valueBelowPivot": "1",
 							"gaugeFillMix": "{dark-30},{light-60},{dark-10}",                
 							"theme": "fint"
 						},
 						"colorRange": {
 							"color": [
 								{
 									"minValue": "0",
 									"maxValue": "50",
 									"code": "#6baa01"                                                
 								},
 								{
 									"minValue": "50",
 									"maxValue": "75",
 									"code": "#f8bd19"                        
 								},
 								{
 									"minValue": "75",
 									"maxValue": "100",
 									"code": "#e44a00"                        
 								}
 							]
 						},
 						"dials": {
 							"dial": [{
 								"value": $scope.fraudRiskGrade.grade,
 								"bgColor": "#999999",
 								"borderAlpha": "0"
 							}]
 						}
 					}
 				}).render();
 			});
 					
	});
 });

app.controller("UnderwritingLocationsCtrl", function($scope, $http) {
    $scope.getData = function(locationId, buildingId) {
        $http.get('data/location_' + locationId + '_bldg_' + buildingId + '.json')
            .then(function(response) {
                $scope.locationInformation = response.data;
                $scope.address = response.data.address;
                $scope.structureAttr = response.data.structureAttr;
                $scope.locationAttr = response.data.locationAttr;
                $scope.riskGrade = response.data.riskGrade;

				$scope.weather = response.data.riskExposure.weather;
                $scope.fire = response.data.riskExposure.fire;
                $scope.crime = response.data.riskExposure.crime;
                $scope.hail = response.data.riskExposure.hail;

                // handle radar data from json
				var dataRisk = [];
				var dataGrade = [];
				angular.forEach($scope.riskGrade, function(item) {
				  dataRisk.push(item.risk);
				  dataGrade.push(item.grade);
				});			
				
				// set radar data				
				$scope.options = { 
					legend: { 
						display: false
					},
					scale: {
						ticks: {
							beginAtZero: true,
							min: 0
						},
						scaleLabel: {
							fontColor: '#000',
							fontSize: '11'
						}
					}
				};
			
				
				$scope.labels = dataRisk;
				$scope.data = dataGrade;
				$scope.colors = dataGrade;

				$scope.onClick = function (points, evt) {
				  console.log(points, evt);
				};
			
            });
    }
});