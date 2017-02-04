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

    var jsonFile = ["fn_all_transactions_data_01.json", "fn_all_transactions_data_02.json"];

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

    var jsonFile = ["fn_transactions_data_01.json", "fn_transactions_data_02.json", "fn_transactions_data_03.json"];

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

    var jsonFile = ["fn_caseopened_data_01.json", "fn_caseopened_data_02.json", "fn_caseopened_data_03.json"];

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
            //type: 'lineChart',
            type: 'stackedAreaChart',
            height: 270,
            margin : {
                top: 50,
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
            //showLegend: false,
            yDomain: [100, 5000]

        }
    };

    var jsonFile = ["fn_benign_suspicious_data_01.json", "fn_benign_suspicious_data_02.json", "fn_benign_suspicious_data_03.json"];

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
    $http.get('../data/fn_transaction_list_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.transaction_lists = response.data.transaction_list;
        });
});

app.controller("TransactionAnalysisCtrl", function($scope, $http) {
    $http.get('../data/fn_transaction_analysis_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.transactions_analysis = response.data.transactions_analysis;
        });
});

app.controller("YourCaseWorkloadCtrl", function($scope, $http) {
    $http.get('../data/fn_yourcase_workload_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.your_case_workloads = response.data.your_case_workloads;
        });
});

app.controller("ActiveCasesCtrl", function($scope, $http) {
    $http.get('../data/fn_active_cases_investigator_level_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.active_cases_investigator_levels = response.data.active_cases_investigator_levels;
        });
});

app.controller("investigatorsSummaryCtrl", function($scope, $http) {
   $http.get('../data/fn_active_cases_investigators_summary.json')
        .then(function(response) {
            $scope.data = response.data.investigatorSummary;
			
			// Before creating a pictograph, you need to specify how many grids along the
			// inverted y-axis 
			// These control how pack between the images on both horizontal and vertical
			// direction
			var yGrids = 10;
			var xGrids = 10;

			/**
			 * @method This method is call to fill in the series array. The method should be 
			 * called for each category and should be called before creating the chart. 
			 * @param {object} config - general configuration how the icons should be laid out
			 * @param {object} name - the name display along with the icons on x-axis
			 * @param {object} dataArr - can be a single array of pictograph value or an array 
			 * of arrays of pictograph values. A pictograph array is [ value, "url(./image.png)" ]
			 *
			 * @example This create a pictograph of 'Adam' showing continuous icons
			 * of 5 oranges and 3 apples:
			 *
			 * var series = [];
			 * var config = {
			 *     max: 25,  // max number of icons display in each row
			 *     row: 0,   // row index on x-axis
			 *     // This build up the cateogries when building the pictograph
			 *     xCategories: []
			 * }; 
			 *
			 * // Create the first group of icons 
			 * series.concat(createPictoPoints(config, 'Adam', 
			 *    [ [ 5, 'url(./orange.png)' ], [ 3, 'url(./apple.png)' ] ])); 
			 */
			var createPictoPoints = function(config, name, dataArray) {
				var limit = config.max,
					y = 0;
				var row = config.row;
				var seriesArray = [];
				config.xCategories[row] = name;

				var categoryArray = dataArray;
				if (!$.isArray(dataArray[0]) && $.isNumeric(dataArray[0])) {
					categoryArray = [dataArray];
				}
				for (var i = 0; i < categoryArray.length; i++) {
					var value = categoryArray[i][0];
					var icon = categoryArray[i][1];
					var quit = false;

					for (var x = 0; x < value;) {
						var newRow = [];
						for (; y < limit; y++, x++) {
							if (x >= value) {
								quit = true;
								break;
							}
							newRow.push({
								x: config.row,
								y: y,
								marker: {
									symbol: icon
								}
							});
						}

						// Reach the end of the limit, start a new row
						if (y >= limit) {
							y = 0;
							config.row++;
							config.xCategories[config.row] = '';
						}
						seriesArray.push({
							data: newRow
						});
						if (quit) {
							break;
						}
					}
				}
				config.row++;
				config.xCategories[config.row] = '';
				config.row++;
				return seriesArray;
			};
			
			angular.forEach($scope.data, function(item, key) {
					
					var config = {
						row: 0,
						xCategories: [],
						max: 10
					};
					
					var series = [];
					series = series.concat(
					createPictoPoints(config, '', [											
													[100 - item.numCases, 'url(../images/circle-gray-small.png)'],
													[item.numCases, 'url(../images/circle-orange-small.png)']
												]
								)
					);
					
					// Format xcategories label
					if (config.row < xGrids / 2) {
						for (var i = config.row; i < xGrids; i++) {
							config.xCategories.push('');
						}
						config.row = config.xCategories.length - 1;
					}
					
					chart = new Highcharts.Chart({
						chart: {
							renderTo: 'containers' + key,
							type: 'scatter',
							inverted: true,
							width: 120
						},
						title: {
							text: ''
						},
						subtitle: {
							text: ''
						},
						legend: {
							enabled: false
						},
						xAxis: {
							title: {
								text: null
							},
							labels: {
								style: {
									fontWeight: 'bold',
									fontSize: 11
								}
							},
							allowDecimals: false,
							gridLineWidth: 0,
							lineWidth: 0,
							tickWidth: 0,
							offset: 5,
							min: 0,
							max: config.row - 1,
							categories: config.xCategories
						},
						yAxis: {
							allowDecimals: false,
							gridLineWidth: 0,
							labels: {
								enabled: false
							},
							min: 0,
							max: yGrids,
							title: {
								text: '',
								align: 'high'
							}
						},
						tooltip: {
							enabled: false
						},
						plotOptions: {
							bar: {
								dataLabels: {
									enabled: true
								}
							}
						},
						credits: {
							enabled: false
						},
						series: series
					});
				
			});					
	  });
});


app.controller("StatisticsCtrl", function($scope, $http) {
   $http.get('../data/fn_statistics_data.json')
        .then(function(response) {
            //console.log('stats'  + response.data);
            $scope.main_stats = response.data.main;
            $scope.all_transactions_stats = response.data.all_transactions;
            $scope.transactions_stats = response.data.transactions;
            $scope.transactions_fnp = response.data.transactions_fnp;
        }); 
});

app.controller("CaseDetailsCtrl", function($scope, $http) {
   $http.get('../data/fn_case_details_info_data.json')
        .then(function(response) {
            //console.log('details: '  + response.data);;
            $scope.company_info = response.data.company_info;
            $scope.account_lists = response.data.account_lists;
            $scope.transaction_lists = response.data.transaction_lists;
        }); 
});