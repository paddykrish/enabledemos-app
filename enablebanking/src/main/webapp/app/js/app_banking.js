var app = angular.module('appDetails', ['nvd3']);

app.controller("AllTransactionsCtrl", function($scope, $http) {
	$scope.options = {
        chart: {
            type: 'lineChart',
            height: 220,
            margin : {
                top: 20,
                right: 20,
                bottom: 40,
                left: 40
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
            noData: "Loading Data",
            showControls: false,
            yDomain: [0, 10000]

        }
    };

    var jsonFile = ["all_transactions_data_01.json", "all_transactions_data_02.json"];

    function getJson() {
       return jsonFile[Math.floor(Math.random() * jsonFile.length)];
    }

    loadData(jsonFile[0]);

    setInterval(function() {
        loadData(getJson());
    }, 3000);

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

app.controller("AdvancedTransactionsAnalysisCtrl", function($scope, $http) {
    $scope.options = {
        chart: {
            type: 'lineChart',
            height: 220,
            margin : {
                top: 20,
                right: 20,
                bottom: 40,
                left: 40
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
            noData: "Loading Data",
            showControls: false,
            yDomain: [2000, 10000]

        }
    };

    var jsonFile = ["advanced_transactions_data_01.json", "advanced_transactions_data_02.json"];

    function getJson() {
       return jsonFile[Math.floor(Math.random() * jsonFile.length)];
    }

    loadData(jsonFile[0]);

    setInterval(function() {
        loadData(getJson());
    }, 3000);

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

    var jsonFile = ["transactions_data_01.json", "transactions_data_02.json", "transactions_data_03.json"];

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
        $http.get('../data/' + file)
            .then(function(response) {
                //console.log(response.data);
                $scope.data = response.data;
            }); 
    } 

});

app.controller("AllTransactionsStackedCtrl", function($scope, $http) {
     $scope.options = {
        chart: {
            //type: 'lineChart',
            type: 'stackedAreaChart',
            height: 220,
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

    var jsonFile = ["transactions_caseopen_data_01.json", "transactions_caseopen_data_02.json", "transactions_caseopen_data_03.json"];

    function getJson() {
       return jsonFile[Math.floor(Math.random() * jsonFile.length)];
    }

    //console.log(getJson());

    loadBenign(jsonFile[0]);
    setInterval(function() {
        loadBenign(getJson());
    }, 5000);

    function loadBenign(file) {
        $http.get('../data/' + file)
            .then(function(response) {
                console.log(response.data);
                $scope.data = response.data;
            }); 
    } 
 
});

app.controller("BenignCtrl", function($scope, $http) {
     $scope.options = {
        chart: {
            //type: 'lineChart',
            type: 'stackedAreaChart',
            height: 220,
            margin : {
                top: 50,
                right: 20,
                bottom: 20,
                left: 40
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
            yDomain: [100, 12000]

        }
    };

    var jsonFile = ["benign_suspicious_data_01.json", "benign_suspicious_data_02.json", "benign_suspicious_data_03.json"];

    function getJson() {
       return jsonFile[Math.floor(Math.random() * jsonFile.length)];
    }

    //console.log(getJson());

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

    var jsonFile = ["transaction_list_data_01.json", "transaction_list_data_02.json", "transaction_list_data_03.json"];

    function getJson() {
       return jsonFile[Math.floor(Math.random() * jsonFile.length)];
    }

    initData(jsonFile[0]);
    setInterval(function() {
        initData(getJson());
    }, 3000);


    function initData(fileName) {
        $http.get('../data/'+ fileName)
        .then(function(response) {
            //console.log(response.data);
            $scope.transactions = response.data.transactions;
        });        
    }

});

app.controller("CasesListCtrl", function($scope, $http) {
    var jsonFile = ["cases_list_data_01.json", "cases_list_data_02.json", "cases_list_data_03.json"];
    function getJson() {
       return jsonFile[Math.floor(Math.random() * jsonFile.length)];
    }

    initData(jsonFile[0]);
    setInterval(function() {
        initData(getJson());
    }, 3000);

    function initData(fileName) {
        $http.get('../data/' + fileName)
            .then(function(response) {
                //console.log(response.data);
                $scope.cases = response.data.cases;
            });    
    }
    
});

app.controller("CasesListFNFPCtrl", function($scope, $http) {
    $http.get('../data/cases_list_fn_fp_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.casesListFnFp = response.data.cases;
        }); 

    var jsonFile = ["cases_list_fn_fp_data_01.json", "cases_list_fn_fp_data_02.json", "cases_list_fn_fp_data_03.json"];
    function getJson() {
       return jsonFile[Math.floor(Math.random() * jsonFile.length)];
    }

    initData(jsonFile[0]);
    setInterval(function() {
        initData(getJson());
    }, 3000);

    function initData(fileName) {
        $http.get('../data/' + fileName)
            .then(function(response) {
                //console.log(response.data);
                $scope.casesListFnFpRandom = response.data.cases;
            });    
    }
    
});

app.controller("EventsListCtrl", function($scope, $http) {
    //initial five records
    $http.get('../data/events_list_data.json')
        .then(function(response) {
            console.log(response.data);
            $scope.events = response.data.events;
        });

    var jsonFile = ["events_list_data_01.json", "events_list_data_02.json", "events_list_data_03.json"];
    function getJson() {
       return jsonFile[Math.floor(Math.random() * jsonFile.length)];
    }

    initData(jsonFile[0]);
    setInterval(function() {
        initData(getJson());
    }, 3000);

    function initData(fileName) {
        $http.get('../data/' + fileName)
            .then(function(response) {
                console.log(response.data);
                $scope.eventsRandom = response.data.events;
            });        
    }    
});

app.controller("TransactionAnalysisCtrl", function($scope, $http) {
    $http.get('../data/transaction_analysis_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.transactions_analysis = response.data.transactions_analysis;
        });
});

app.controller("YourCaseWorkloadCtrl", function($scope, $http) {
    $http.get('../data/yourcase_workload_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.your_case_workloads = response.data.your_case_workloads;
        });
});

app.controller("ActiveCasesCtrl", function($scope, $http) {
    $http.get('../data/active_cases_investigator_level_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.data = response.data.activeCasesInvestigators;
        });
});

app.controller("StatisticsCtrl", function($scope, $http) {
   $http.get('../data/statistics_data.json')
        .then(function(response) {
            $scope.allTransactions = response.data.allTransactions;
            $scope.transactionsNeedingInvestigation = response.data.transactionsNeedingInvestigation;
            $scope.advancedTransactionAnalysis = response.data.advancedTransactionAnalysis;
            $scope.eventTriage = response.data.eventTriage;
        }); 
});

app.controller("CaseDetailsCtrl", function($scope, $http) {
   $http.get('../data/case_details_info_data.json')
        .then(function(response) {
            //console.log('details: '  + response.data);;
            $scope.company_info = response.data.company_info;
            $scope.account_lists = response.data.account_lists;
            $scope.transaction_lists = response.data.transaction_lists;
        }); 
});

app.controller("investigatorsSummaryCtrl", function($scope, $http) {
   $http.get('../data/active_cases_investigators_summary.json')
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

app.controller("AllTransactionsMixedAxesCtrl", function($scope, $http) {
    $scope.options = {
            chart: {
                type: 'linePlusBarChart',
                height: 300,
                margin: {
                    top: 55,
                    right: 75,
                    bottom: 32,
                    left: 50
                },
                legend: {
                    maxKeyLength: 100
                },   
                bars: {
                    forceY: [3000, 30000]
                },
                bars2: {
                    //forceY: [0, 10000000]
                    forceY: [0]
                },
                color: ['#FFA31F', '#0f0'],
                //x: function(d,i) { return i },
                focusEnable: false,
                xAxis: {
                    //axisLabel: 'X Axis',
                    tickFormat: function(d) {
                        var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
                        if (dx > 0) {
                            //return d3.time.format('%x')(new Date(dx))
                            return '';
                        }
                        return null;
                    }
                },
               yDomain: [1000000, 12000000],
                y1Axis: {
                    //axisLabel: 'Case Opened',
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    },
                    axisLabelDistance: 12
                },
                y2Axis: {
                    //axisLabel: 'Transactions',
                    tickFormat: function(d) {
                        return d3.format(',.0f')(d)
                    }
                },
                noData: "Loading Data"
            }
        };

       /* $scope.data = [
                { values: [], key: 'Case Opened', bar: true },
                { values: [], key: 'Transactions' }
            ];*/

        //$scope.run = true;

        var jsonFile = ["all_transactions_data_m_01.json", "all_transactions_data_m_02.json", "all_transactions_data_m_03.json"];
        function getJson() {
           return jsonFile[Math.floor(Math.random() * jsonFile.length)];
        }

        loadData(jsonFile[0]);
        setInterval(function() {
            loadData(getJson());
        }, 3000);     

        function loadData(fileName) {
            $scope.data = [];
            $http.get('../data/' + fileName)
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
    
        /*var x = 1;
        setInterval(function(){
            //if (!$scope.run) return;
            $scope.data[0].values.push({ x: x,  y: Math.random() * 30000});
            $scope.data[1].values.push({ x: x,  y: Math.random() * 11000000});
            if ($scope.data[0].values.length > 20) {
                $scope.data[0].values.shift();
                $scope.data[1].values.shift();   
            }
            x++;
            
          $scope.$apply(); // update both chart
        }, 3000);     */

        $scope.data.map(function(series) {
                series.values = series.values.map(function(d) { return {x: d[0], y: d[1] } });
                return series;
            });
});

app.controller("IncrementNumberCtrl", function($scope, $http) {

    loadData("all_transactions_data_m_01.json");

    function loadData(fileName) {
        $http.get('../data/' + fileName)
            .then(function(response) {
                //console.log(response.data);
                var max = 45,
                    i = 0;
                
                $scope.casesOpened = 3000;
                $scope.transactions = 1000000;

                var jsonData = response.data;
                setInterval(function() {
                    if(i < max) {
                        //console.log(jsonData[0].values[i][0] + ' -- '+jsonData[0].values[i][1]);    
                        $scope.casesOpened = jsonData[0].values[i][1];
                        $scope.transactions = jsonData[1].values[i][1];
                        i++;
                    } else {
                        max = 45;
                        i = 0;
                    }
                    
                }, 3000);
            }); 
    } 
});

/*function getScope(ctrlName) {
	var sel = 'div[ng-controller="' + ctrlName + '"]';
	return angular.element(sel).scope();
}

function showCircleChart() {
	var $scope = getScope('ActiveCasesCtrl');
	
	var colors = [
						['#BEE3F7', '#45AEEA'], 
						['#F8F9B6', '#D2D558'], 
						['#D3B6C6', '#4B253A'],
						['#FCE6A4', '#EFB917'], 
						['#F4BCBF', '#D43A43']
					], 
		circles = [];
	
	angular.forEach($scope.data, function(item, key) {		
		
		var child = document.getElementById('investigatorLevel-' + key),
		percentage = item.numCases;

		circles.push(Circles.create({
			id:         child.id,
			value:		percentage,
			text: 		function() {
						   return this.getPercent() + '%';
					   },
			textClass: 'circleText',
			radius:     40,
			width:      12,
			colors:     colors[key],
		}));	
		
	});					
}*/ 