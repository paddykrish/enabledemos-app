var app = angular.module('appDetails', ['chart.js', 'nvd3']);

app.controller("NumberQuotesCtrl", function($scope, $http) {
    $http.get('/enableinsurance/service/dataservice/getChildTypeRenewalData/all')
        .then(function(response) {
            //console.log(response.data);
            $scope.quotes_requests = response.data.results;
        });
});

app.controller("LossRatioCtrl", function($scope, $http) {
	$http.get('/enableinsurance/service/dataservice/getLostRatioHistoryData/all')
        .then(function(response) {
            //console.log(response.data);
            $scope.loss_ratios = response.data.results;
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
                bottom: 40,
                left: 55
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
    }, 3000);

    function getData() {

        $http.get('/enableinsurance/service/dataservice/getClaimsPremiumData/all')
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
                bottom: 40,
                left: 55
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
    }, 3000);

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

app.controller('RadarCtrl', ['$scope', function ($scope, $http) {

    $scope.options = { legend: { display: false } };

	$scope.labels = ['Crime', 'Hail Risk', 'Fire Risk', 'Flood Risk', 'Earthquake Risk', 'Windstorm Risk'];

    $scope.data = [
      [4, 2, 3.2, 9.3, 5, 7]
    ];
    /*
    $http.get('/enableinsurance/service/dataservice/getRiskFactors/all')
            .then(function(response) {
                //console.log(response.data);
                $scope.data = response.data;
            });
    */
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
  }]);