var app = angular.module('plunker', ['nvd3']);

app.controller("StackedAreaCtrl", function($scope, $http) {
	$scope.options = {
        chart: {
            type: 'stackedAreaChart',
            height: 370,
            /*legend: {
                margin : {
                    top: 1,
                    right: 115,
                    bottom: 5,
                    left: 0
                }    
            },*/
            margin : {
                top: 70,
                right: 15,
                bottom: 20,
                left: 50
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
                    return d3.time.format('%I:%M %p')(new Date(d))
                }
            },
            yAxis: {
                //axisLabel: 'Voltage (v)',
                tickFormat: function(d){
                    return d3.format('.00f')(d);
                },
                axisLabelDistance: -10
            },
            callback: function(chart){
                console.log("!!! lineChart callback !!!");
            },
            showControls: false,
            //showLegend: false,
            noData: "Loading Data",
        }
    };

    
    $scope.data = [
        { values: [], key: 'Auto', color: '#026C38', classed: 'dashed' },
        { values: [], key: 'Crime', color: '#ff0000', classed: 'dashed' },
        { values: [], key: 'GL', color: '#003366', classed: 'dashed' },
        { values: [], key: 'Property', color: 'yellow', classed: 'dashed' },
        { values: [], key: 'Workers Compensation', color: '#DA5C0A', classed: 'dashed' },
    ];
        
    /*$scope.run = true;
    
    Date.prototype.addHours= function(h){
        this.setHours(this.getHours()+h);
        return this;
    }

    var x = 0;
    setInterval(function(){
        if (!$scope.run) return;
        $scope.data[0].values.push({ x: new Date().addHours(x),  y: Math.random() * 30});
        $scope.data[1].values.push({ x: new Date().addHours(x),  y: Math.random() * 35});
        $scope.data[2].values.push({ x: new Date().addHours(x),  y: Math.random() * 40});
        $scope.data[3].values.push({ x: new Date().addHours(x),  y: Math.random() * 45});
        $scope.data[4].values.push({ x: new Date().addHours(x),  y: Math.random() * 50});

        if ($scope.data[0].values.length > 20) {
             $scope.data[0].values.shift();
             $scope.data[1].values.shift();
             $scope.data[2].values.shift();
             $scope.data[3].values.shift();
             $scope.data[4].values.shift();
        }

        x++;
        
      $scope.$apply(); // update both chart
    }, 10000);*/
    
    var jsonFile = ["submissions_by_lob2.json", "submissions_by_lob3.json", "submissions_by_lob4.json"];
    function getJson() {
       return jsonFile[Math.floor(Math.random() * jsonFile.length)];
    }

    console.log(getJson());

    loadData();
    setInterval(function() {
        loadData(); 
    }, 3000);
    //console.log($scope.data);  

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

app.controller("ListCtrl", function($scope, $http) {
    $http.get('data/top_10_active_quotes-av.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.premiums = response.data.annual_premiums;
        });
});

app.controller("StatusBreakdownCtrl", function($scope, $http) {
    $http.get('data/status_breakdown.json')
        .then(function(response) {       
            $scope.quoteStatusData = response.data.quoteStatusData;
            $scope.total = $scope.quoteStatusData.submission + $scope.quoteStatusData.verification
                            + $scope.quoteStatusData.rating + $scope.quoteStatusData.quotePrep
                            + $scope.quoteStatusData.quoteDelivery;
        });
});

app.controller("StatisticsCtrl", function($scope, $http) {
   $http.get('data/statistics.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.date = new Date();
            $scope.statisticsData = response.data.statisticsData;
        });  
});

app.controller("quotesByRiskCtrl", function($scope, $http) {
   $http.get('data/quotes_by_risk_client.json')
        .then(function(response) {
            $scope.quotesByRisk = response.data.quotesByRiskClient;
			var maxHeight = 300;
			var totalQuotesByRisk = $scope.quotesByRisk.lowRisk  + $scope.quotesByRisk.mediumRisk + $scope.quotesByRisk.highRisk + $scope.quotesByRisk.veryHighRisk;
			var factorRisk = maxHeight / totalQuotesByRisk;
			
			$scope.highRiskHeight = Math.ceil($scope.quotesByRisk.highRisk * factorRisk);
			$scope.veryHighRiskHeight = Math.ceil($scope.quotesByRisk.veryHighRisk * factorRisk);
			
        });  
});

app.controller("riskQuotesStepCtrl", function($scope, $http) {
   $http.get('data/quotes_by_risk_client.json')
        .then(function(response) {
            $scope.quotesBySteps = response.data.highRiskQuotesStep;
			var maxHeight = 300;
			var totalQuotesBySteps = $scope.quotesBySteps.preparation  + $scope.quotesBySteps.verification + $scope.quotesBySteps.rating + $scope.quotesBySteps.submission + $scope.quotesBySteps.delivery;
			var factorRisk = maxHeight / totalQuotesBySteps;
			
			$scope.preparationHeight = Math.ceil($scope.quotesBySteps.preparation * factorRisk);
			$scope.verificationHeight = Math.ceil($scope.quotesBySteps.verification * factorRisk);
			$scope.ratingHeight = Math.ceil($scope.quotesBySteps.rating * factorRisk);
			$scope.submissionHeight = Math.ceil($scope.quotesBySteps.submission * factorRisk);
			$scope.deliveryHeight = Math.ceil($scope.quotesBySteps.delivery * factorRisk);
			
        });  
});

app.controller('RealTimeCtrl', function($scope) {
    $scope.options = {
        chart: {
            //type: 'lineChart',
            type: 'stackedAreaChart',
            height: 350,
            margin : {
                top: 50,
                right: 20,
                bottom: 40,
                left: 25
            },
            x: function(d){ return d.x; },
            y: function(d){ return d.y; },
            useInteractiveGuideline: true,
            duration: 500,    
            yAxis: {
                tickFormat: function(d){
                   return d3.format('.00f')(d);
                }
            },
            xAxis: {
                tickFormat: function(d) {
                    //return d3.format('.00f')(d);
                    return '';
                }
            },
            showControls: false,
            noData: "Loading Data"
            //yDomain: [0, 60],
            //xDomain: [0, 50]
        }
    };
    
    $scope.options1 = angular.copy($scope.options);
    $scope.options1.chart.duration = 0;
    $scope.options1.chart.yDomain = [0,100];
    //$scope.options1.chart.xDomain = [0,100];
    
    /*$scope.data = [
        { 
            values: [], 
            key: 'Random Walk', 
            color: '#B9D81C' 
        },
        { 
            values: [], 
            key: 'Auto', 
            color: '#ff7f0e' 
        }
    ];*/
    $scope.data = [
        { values: [], key: 'Auto', color: '#026C38', classed: 'dashed' },
        { values: [], key: 'Crime', color: '#ff0000', classed: 'dashed' },
        { values: [], key: 'GL', color: '#003366', classed: 'dashed' },
        { values: [], key: 'Property', color: 'yellow', classed: 'dashed' },
        { values: [], key: 'Workers Compensation', color: '#DA5C0A', classed: 'dashed' },
    ];
        
    $scope.run = true;
    
    var x = 10;
    setInterval(function(){
        if (!$scope.run) return;
        $scope.data[0].values.push({ x: x,  y: Math.random() * 45});
        $scope.data[1].values.push({ x: x,  y: Math.random() * 20});
        $scope.data[2].values.push({ x: x,  y: Math.random() * 15});
        $scope.data[3].values.push({ x: x,  y: Math.random() * 10});
        $scope.data[4].values.push({ x: x,  y: Math.random() * 12});
        if ($scope.data[0].values.length > 10) {
            $scope.data[0].values.shift();
            $scope.data[1].values.shift();   
            $scope.data[2].values.shift();   
            $scope.data[3].values.shift();   
            $scope.data[4].values.shift();   
        }
        x++;
        
      $scope.$apply(); // update both chart
    }, 2000);        
});

app.controller("IncrementNumberCtrl", function($scope, $http) {

    loadData("status_breakdown_1.json");

    function getMaxFromArray(numArray) {
        return Math.max.apply(null, numArray);
    }

    function loadData(fileName) {
        $http.get('data/' + fileName)
            .then(function(response) {
                //console.log(response.data);
                var max = 20,
                    i = 0;
            

                var jsonData = response.data;

                $scope.total = getMaxFromArray(jsonData[0].values) + getMaxFromArray(jsonData[1].values) 
                               + getMaxFromArray(jsonData[2].values) + getMaxFromArray(jsonData[3].values) 
                               + getMaxFromArray(jsonData[4].values);
                
                $scope.submission = jsonData[0].values[0];
                $scope.verification = jsonData[1].values[0];
                $scope.rating = jsonData[2].values[0];
                $scope.quotePrep = jsonData[3].values[0];
                $scope.quoteDelivery = jsonData[4].values[0];


                setInterval(function() {
                    if(i < max) {
                        //console.log(jsonData[0].values[i][0] + ' -- '+jsonData[0].values[i][1]);    
                        $scope.submission = jsonData[0].values[i];
                        $scope.verification = jsonData[1].values[i];
                        $scope.rating = jsonData[2].values[i];
                        $scope.quotePrep = jsonData[3].values[i];
                        $scope.quoteDelivery = jsonData[4].values[i];

                        i++;
                    } else {
                        max = 20;
                        i = 0;
                    }
                    
                }, 3000);
            }); 
    } 
});

app.controller("IncrementRiskQuotesCtrl", function($scope, $http) {

    loadData("quotes_by_risk_client_1.json");

    function loadData(fileName) {
        $http.get('data/' + fileName)
            .then(function(response) {
                //console.log(response.data);
                var max = 20,
                    i = 0;
            
                var jsonData = response.data.quotesByRiskClient;
                //console.log(response.data);
                $scope.lowRisk = jsonData.lowRisk[0];
                $scope.mediumRisk = jsonData.mediumRisk[0];
                $scope.highRisk = jsonData.highRisk[0];
                $scope.veryHighRisk = jsonData.veryHighRisk[0];

                setInterval(function() {
                    if(i < max) {
                        var maxHeight = 300;

                        //console.log("aaa: " + jsonData.lowRisk[i]);    
                        $scope.lowRisk = jsonData.lowRisk[i];
                        $scope.mediumRisk = jsonData.mediumRisk[i];
                        $scope.highRisk = jsonData.highRisk[i];
                        $scope.veryHighRisk = jsonData.veryHighRisk[i];

                        var totalQoutesByRisk = $scope.lowRisk + $scope.mediumRisk + $scope.highRisk + $scope.veryHighRisk;
                        var factorRisk = maxHeight/totalQoutesByRisk;

                        $scope.highRiskHeight = Math.ceil($scope.highRisk * factorRisk);
                        $scope.veryHighRiskHeight = Math.ceil($scope.veryHighRisk * factorRisk);

                        i++;
                    } else {
                        max = 20;
                        i = 0;
                    }
                    
                }, 3000);
            }); 
    } 
});


app.controller("IncrementVeryHighRiskTotalExposureCtrl", function($scope, $http) {
    
    loadData("quotes_by_risk_client_1.json");

    function loadData(fileName) {
        $http.get('data/' + fileName)
            .then(function(response) {
                //console.log(response.data);
                var max = 20,
                    i = 0;
            
                var jsonData = response.data.highRiskQuotesStep;
                //console.log(response.data);
                $scope.preparation = jsonData.preparation[0];
                $scope.verification = jsonData.verification[0];
                $scope.rating = jsonData.rating[0];
                $scope.submission = jsonData.submission[0];
                $scope.delivery = jsonData.delivery[0];

                setInterval(function() {
                    if(i < max) {
                        var maxHeight = 300;

                        //console.log("aaa: " + jsonData.lowRisk[i]);    
                        $scope.preparation = jsonData.preparation[i];
                        $scope.verification = jsonData.verification[i];
                        $scope.rating = jsonData.rating[i];
                        $scope.submission = jsonData.submission[i];
                        $scope.delivery = jsonData.delivery[i];

                        var totalQoutesByRisk = $scope.preparation + $scope.verification 
                                               + $scope.rating + $scope.submission 
                                               + $scope.delivery;
                        var factorRisk = maxHeight/totalQoutesByRisk;

                        $scope.highRiskHeight = Math.ceil($scope.highRisk * factorRisk);
                        $scope.veryHighRiskHeight = Math.ceil($scope.veryHighRisk * factorRisk);

                        i++;
                    } else {
                        max = 20;
                        i = 0;
                    }
                    
                }, 3000);
            }); 
    }
});

app.controller("IncrementStatisticsCtrl", function($scope, $http) {

    loadData("statistics_1.json");

    function loadData(fileName) {
        $http.get('data/' + fileName)
            .then(function(response) {
                //console.log(response.data);
                var max = 5,
                    i = 0;
                
                $scope.date = new Date();
                
                var jsonData = response.data.statisticsData;
                //console.log(response.data);
                $scope.averageProcessingDays = jsonData.averageProcessingDays[0];
                $scope.policiesIssuedToday = jsonData.policiesIssuedToday[0];
                $scope.totalPremiumIssuedToday = jsonData.totalPremiumIssuedToday[0];
                $scope.veryHighRiskLossRatio = jsonData.veryHighRiskLossRatio[0];
                $scope.veryHighRiskTotalExposure = jsonData.veryHighRiskTotalExposure[0];

                setInterval(function() {
                    if(i < max) {
                        //console.log("aaa: " + jsonData.lowRisk[i]);    
                        $scope.averageProcessingDays = jsonData.averageProcessingDays[i];
                        $scope.policiesIssuedToday = jsonData.policiesIssuedToday[i];
                        $scope.totalPremiumIssuedToday = jsonData.totalPremiumIssuedToday[i];
                        $scope.veryHighRiskLossRatio = jsonData.veryHighRiskLossRatio[i];
                        $scope.veryHighRiskTotalExposure = jsonData.veryHighRiskTotalExposure[i];

                        i++;
                    } else {
                        max = 5;
                        i = 0;
                    }
                    
                }, 3000);
            }); 
    } 
});