var app = angular.module('appDetails', ['nvd3']);

app.controller("AccountInformationCtrl", function($scope, $http) {
	//console.log("adsfasdfasdf");
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
                   return d3.format('.01f')(d) + 'M';
                }
            },
            xAxis: {
            	tickFormat: function(d) {
                    return d3.time.format('%b %Y')(new Date(d))
                }
            },
            noData: "Loading Data",
            yDomain: [0.1, 1]
        }
    };


	initData(76343431);	
	
	$scope.getData = function(accountNumber) {
		console.log('getdata');
		initData(accountNumber);
	};

	function initData(accountNumber) {
		console.log('initdata');
		$http.get('../data/suspicious_cases_' + accountNumber + '.json')
			 .then(function(response) {
			 	$scope.accountInformation = response.data.accountInformation;
			 	$scope.branchInformation = response.data.branchInformation;
			 	$scope.transactions = response.data.transactions;
			 	$scope.accountBalanceSnapshot = response.data.accountBalanceSnapshot;
			 	$scope.data = response.data.balanceOvertime;
			 });
	}
});

app.controller("SuspiciousPatternDetailsCtrl", function($scope, $http) {
	$scope.options = {
        chart: {
            type: 'discreteBarChart',
            height: 200,
            margin : {
                top: 20,
                right: 20,
                bottom: 20,
                left: 45
            },
            x: function(d){return d.label;},
            y: function(d){return d.value;},
            //showValues: true,
            valueFormat: function(d){
                return d3.format(',.0f')(d);
            },
            transitionDuration: 500,
            xAxis: {
                //axisLabel: 'Month',
                //rotateLabels: -20,
            },
            yAxis: {
                //axisLabel: 'Revenue',
                //axisLabelDistance: 30,
                tickFormat: function(d){
                   return d3.format('.00f')(d) + "K";
                }
            }
        }
    };

    getData();

    function getData() {
    	$scope.data = [];
    	$http.get('../data/suspicious_pattern_details_data.json')
		     .then(function(response) {
		     var x = 0;
		     $scope.data = response.data;
		     angular.forEach($scope.data, function(items) {
		     	angular.forEach(items.values, function(items2) {
		     		$scope.data[x].values.push({
		     			'label': items2.label, 
		     			'value': items2.value, 
		     			'color': items2.color
		     		});
		     	});
		     	x++;
		     });
		});
    }
});

app.controller("PossibleRelatedEntitiesCtrl", function($scope, $http) {
	
	initData();

    function initData() {
		$http.get('../data/possible_related_entities_data.json')
			 .then(function(response) {
			 	$scope.possibleRelatedEntities = response.data.possibleRelatedEntities;
			 });
	}

});