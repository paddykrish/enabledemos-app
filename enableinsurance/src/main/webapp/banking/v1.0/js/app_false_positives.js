var app = angular.module('appDetails', ['nvd3']);

app.controller("AllTransactionsCtrl", function($scope, $http) {
	$scope.options = {
        chart: {
            type: 'lineChart',
            height: 300,
            margin : {
                top: 20,
                right: 20,
                bottom: 40,
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
            yDomain: [200, 1000]

        }
    };

    var jsonFile = ["fp_all_transactions_data_01.json", "fp_all_transactions_data_02.json"];

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

app.controller("TransactionsCtrl", function($scope, $http) {
    $scope.options = {
        chart: {
            type: 'stackedAreaChart',
            height: 200,
            margin : {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 32
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
                    return d3.format('.f')(d);
                },
                //axisLabelDistance: -10
            },
            callback: function(chart){
                console.log("!!! lineChart callback !!!");
            },
            showControls: false,
            showLegend: false,
            yDomain: [100, 5000],
            noData: "Loading Data",
        }
    };

    var jsonFile = ["fp_transactions_data_01.json", "fp_transactions_data_02.json", "fp_transactions_data_03.json"];

    function getJson() {
       return jsonFile[Math.floor(Math.random() * jsonFile.length)];
    }

    //console.log(getJson());

    loadData(jsonFile[0]);

    setInterval(function() {
        loadData(getJson());
    }, 10000);

    /*for(var i = 0; i < jsonFile.length; i++) {
        console.log(jsonFile[i]);
        //loadData(jsonFile[i]);
        loadData(jsonFile[i]);
        setInterval(function() {
            loadData(jsonFile[i]); 
        }, 5000);
    }*/

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

app.controller("CasesOpenedCtrl", function($scope, $http) {
    $scope.options = {
        chart: {
            type: 'lineChart',
            height: 100,
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
                    //return d3.time.format('%I:%M %p')(new Date(d))
                    return '';
                }
            },
            callback: function(chart){
                console.log("show chart here");
            },
            noData: "Loading Data",
            showControls: false,
            showLegend: false,
            yDomain: [100, 1500]

        }
    };

    var jsonFile = ["fp_caseopened_data_01.json", "fp_caseopened_data_02.json", "fp_caseopened_data_03.json"];

    function getJson() {
       return jsonFile[Math.floor(Math.random() * jsonFile.length)];
    }

    console.log(getJson());

    loadCasedOpened(jsonFile[0]);
    setInterval(function() {
        loadCasedOpened(getJson());
    }, 3000);

    function loadCasedOpened(file) {
        $http.get('../data/' + file)
            .then(function(response) {
                //console.log(response.data);
                $scope.data = response.data;
            }); 
    } 

});

app.controller("BenignCtrl", function($scope, $http) {
     $scope.options = {
        chart: {
            type: 'lineChart',
            height: 100,
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
                    //return d3.time.format('%I:%M %p')(new Date(d))
                    return '';
                }
            },
            callback: function(chart){
                console.log("benign here");
            },
            noData: "Loading Data",
            showControls: false,
            showLegend: false,
            yDomain: [100, 3000]

        }
    };

    var jsonFile = ["fp_benign_data_01.json", "fp_benign_data_02.json", "fp_benign_data_03.json"];

    function getJson() {
       return jsonFile[Math.floor(Math.random() * jsonFile.length)];
    }

    console.log(getJson());

    loadBenign(jsonFile[0]);
    setInterval(function() {
        loadBenign(getJson());
    }, 3000);

    function loadBenign(file) {
        $http.get('../data/' + file)
            .then(function(response) {
                console.log(response.data);
                $scope.data = response.data;
            }); 
    } 
 
});

app.controller("TransactionListCtrl", function($scope, $http) {
    $http.get('../data/fp_transaction_list_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.transaction_lists = response.data.transaction_list;
        });
});

app.controller("TransactionAnalysisCtrl", function($scope, $http) {
    $http.get('../data/fp_transaction_analysis_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.transactions_analysis = response.data.transactions_analysis;
        });
});

app.controller("YourCaseWorkloadCtrl", function($scope, $http) {
    $http.get('../data/fp_yourcase_workload_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.your_case_workloads = response.data.your_case_workloads;
        });
});

app.controller("ActiveCasesCtrl", function($scope, $http) {
    $http.get('../data/active_cases_investigator_level_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.active_cases_investigator_levels = response.data.active_cases_investigator_levels;
        });
});
