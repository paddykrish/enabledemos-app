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
        $http.get('/enablebanking/service/dataservice/allTransactionsByType/all/')
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

    var jsonFile = ["transactions_data_01.json", "transactions_data_02.json", "transactions_data_03.json"];

    function getJson() {
       return jsonFile[Math.floor(Math.random() * jsonFile.length)];
    }

    //console.log(getJson());

    loadData(jsonFile[0]);

    setInterval(function() {
        loadData(getJson());
    }, 10000);


    function loadData(file) {
        $scope.data = [];
        $http.get('/enablebanking/service/dataservice/allTransactionsCount/all/' )
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

    var jsonFile = ["caseopened_data_01.json", "caseopened_data_02.json", "caseopened_data_03.json"];

    function getJson() {
       return jsonFile[Math.floor(Math.random() * jsonFile.length)];
    }

    console.log(getJson());

    loadCasedOpened(jsonFile[0]);
    setInterval(function() {
        loadCasedOpened(getJson());
    }, 3000);

    function loadCasedOpened(file) {

        $http.get('/enablebanking/service/dataservice/allCaseOpenedCount/all/')
            .then(function(response) {
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

    var jsonFile = ["benign_data_01.json", "benign_data_02.json", "benign_data_03.json"];

    function getJson() {
       return jsonFile[Math.floor(Math.random() * jsonFile.length)];
    }

    console.log(getJson());

    loadBenign(jsonFile[0]);
    setInterval(function() {
        loadBenign(getJson());
    }, 3000);

    function loadBenign(file) {
        $http.get('/enablebanking/service/dataservice/allBenignCount/all/')
            .then(function(response) {
                console.log(response.data);
                $scope.data = response.data;
            }); 
    } 
 
});

app.controller("TransactionListCtrl", function($scope, $http) {
    $http.get('/enablebanking/service/dataservice/getTransactionList/all')
        .then(function(response) {
            //console.log(response.data);
            $scope.transaction_lists = response.data.transaction_list;
        });
});

app.controller("TransactionAnalysisCtrl", function($scope, $http) {
    $http.get('/enablebanking/service/dataservice/getTransactionAnalysis/all')
        .then(function(response) {
            //console.log(response.data);
            $scope.transactions_analysis = response.data.transactions_analysis;
        });
});

app.controller("YourCaseWorkloadCtrl", function($scope, $http) {
    $http.get('/enablebanking/service/dataservice/getYourCaseWorkload/all/')
        .then(function(response) {
            //console.log(response.data);
            $scope.your_case_workloads = response.data.your_case_workloads;
        });
});

app.controller("ActiveCasesCtrl", function($scope, $http) {
    $http.get('/enablebanking/service/dataservice/allActiveCasesInvLevels/all/')
        .then(function(response) {
            //console.log(response.data);
            $scope.active_cases_investigator_levels = response.data.active_cases_investigator_levels;
        });
});
