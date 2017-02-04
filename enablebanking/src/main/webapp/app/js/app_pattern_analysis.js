var app = angular.module('appDetails', ['nvd3']);

app.controller("AllTransactionsCtrl", function($scope, $http) {
	$scope.options = {
        chart: {
            type: 'lineChart',
            height: 200,
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
                    return d3.time.format('%I:%M %p')(new Date(d))
                }
            },
            noData: "Loading Data",
            showControls: false,
            showLegend: false,
            yDomain: [200, 1000]

        }
    };

    var jsonFile = ["all_transactions_data_01.json", "all_transactions_data_02.json"];

    function getJson() {
       return jsonFile[Math.floor(Math.random() * jsonFile.length)];
    }

    loadData(jsonFile[0]);

    setInterval(function() {
        loadData(getJson());
    }, 10000);

    function loadData(file) {
        $scope.data = [];
        $http.get('../data/' + file)
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

app.controller("SuspiciousTransactionsStatsCtrl", function($scope, $http) {
	$scope.options = {
        chart: {
            type: 'lineChart',
            height: 200,
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
            noData: "Loading Data",
            showLegend: false
        }
    };

    Date.prototype.addMonth= function(m){
        this.setMonth(this.getMonth()+m);
        return this;
    }

    var jsonFile = ["suspicious_transact_stats_data.json", "suspicious_transact_stats_data_02.json", "suspicious_transact_stats_data_03.json"];

    function getJson() {
       return jsonFile[Math.floor(Math.random() * jsonFile.length)];
    }

    loadData(jsonFile[0]);

    setInterval(function() {
        loadData(getJson());
    }, 5000);

    function loadData(file) {
        $scope.data = [];
        $http.get('../data/' + file)
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

app.controller("BenignTransactionsStatsCtrl", function($scope, $http) {
	$scope.options = {
        chart: {
            type: 'lineChart',
            height: 200,
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
            noData: "Loading Data",
            showLegend: false
        }
    };

    Date.prototype.addMonth= function(m){
        this.setMonth(this.getMonth()+m);
        return this;
    }

    var jsonFile = ["benign_transact_stats_data.json", "benign_transact_stats_data_02.json", "benign_transact_stats_data_03.json"];

    function getJson() {
       return jsonFile[Math.floor(Math.random() * jsonFile.length)];
    }
    
    loadData(jsonFile[0]);

    setInterval(function() {
        loadData(getJson());
    }, 5000);

    function loadData(file) {
        $scope.data = [];
        $http.get('../data/' + file)
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

app.controller("TransactionsListCtrl", function($scope, $http) {
	$http.get('../data/pa_transaction_list_data.json')
         .then(function(response) {
         //console.log(response.data.transactionLists);   
         $scope.transactionLists = response.data.transactionLists;
    });
});

app.controller("CaseOpenedSuspiciousCtrl", function($scope, $http) {
    $http.get('../data/case_opened_suspicious_data.json')
         .then(function(response) {
         //console.log(response.data.transactionLists);   
         $scope.caseOpenedSuspicious = response.data.caseOpenedSuspicious;
    });
});

app.controller("PatternAnalysisStatisticsCtrl", function($scope, $http) {
    $http.get('../data/pattern_analysis_statistics_data.json')
         .then(function(response) {
         //console.log(response.data.transactionLists);   
         $scope.overallStatistics = response.data.overallStatistics;
         $scope.suspiciousTransactionStatistics = response.data.suspiciousTransactionStatistics;
         $scope.benignTransactionsStatistics = response.data.benignTransactionsStatistics;
    });
});