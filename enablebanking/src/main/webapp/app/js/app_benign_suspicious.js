var app = angular.module('appDetails', ['nvd3', 'ui.bootstrap']);

app.controller("AccountInformationCtrl", function($scope, $http, $window) {
	
	var search = $window.location.search
            .split(/[&||?]/)
            .filter(function (x) { return x.indexOf("=") > -1; })
            .map(function (x) { return x.split(/=/); })
            .map(function (x) {
                x[1] = x[1].replace(/\+/g, " ");
                return x;
            })
            .reduce(function (acc, current) {
                acc[current[0]] = current[1];
                return acc;
            }, {});

    var caseId = search.caseId;
	
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
	
	if (caseId) {
		getCaseAccounts(caseId);
	} else{
		getCaseAccounts(11404);
	}
	
	function getCaseAccounts(caseId) {
		$http.get('../data/case_' + caseId + '.json')
			 .then(function(response) {				
			 	$scope.caseAccounts = response.data.accounts;
				$scope.caseAnalysis = response.data.analysisResult;
				getAccountData($scope.caseAccounts[0].accountNumber);	
			 });
	}
	
	function getAccountData(accountNumber) {
		$http.get('../data/suspicious_cases_' + accountNumber + '.json')
			 .then(function(response) {
				console.log('inside' + accountNumber);
			 	$scope.accountInformation = response.data.accountInformation;
			 	$scope.branchInformation = response.data.branchInformation;
			 });
	}
	
	$scope.getData = function(accountNumber) {
		getAccountData(accountNumber);
	};
	
});

app.controller("SuspiciousPatternDetailsCtrl", function($scope, $http) {
	$scope.options = {
        chart: {
            type: 'discreteBarChart',
            height: 175,
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
                tickFormat: function(d) {
                    return '';
                }
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
    $scope.initData = function () {
        $scope.itemsPerPage = 5;
        $scope.currentPage = 0;
        $scope.possibleRelatedEntities = [];
        
        $http.get('../data/possible_related_entities_data.json')
             .then(function(response) {
                $scope.possibleRelatedEntities = response.data.possibleRelatedEntities;
             });
    }

    $scope.range = function() {
        var rangeSize = 3;
        var ps = [];
        var start;

        start = $scope.currentPage;
        if (start > $scope.pageCount() - rangeSize) {
            start = $scope.pageCount() - rangeSize + 1;
        }

        for(var i=start; i < start+rangeSize; i++) {
            ps.push(i);
        }
        return ps;
    };

    $scope.prevPage = function() {
        if($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.DisablePrevPage = function() {
        return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function() {
        return Math.ceil($scope.possibleRelatedEntities.length/$scope.itemsPerPage)-1;
    };

    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pageCount()) {
          $scope.currentPage++;
        }
    };

    $scope.DisableNextPage = function() {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };

    $scope.setPage = function(n) {
        $scope.currentPage = n;
    };

});

app.filter('pagination', function() {
    return function(input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});

app.controller("TransactionsCtrl", function($scope, $http, $window) {
    var search = $window.location.search
            .split(/[&||?]/)
            .filter(function (x) { return x.indexOf("=") > -1; })
            .map(function (x) { return x.split(/=/); })
            .map(function (x) {
                x[1] = x[1].replace(/\+/g, " ");
                return x;
            })
            .reduce(function (acc, current) {
                acc[current[0]] = current[1];
                return acc;
            }, {});

    var caseId = search.caseId;

    $http.get('../data/benign_suspicious_transactions_data_' + caseId +'.json')
             .then(function(response) {
                $scope.transactions = response.data.transactions;
             });

});

app.controller("ReferenceDocumentsCtrl", function($scope, $http) {
    $http.get('../data/reference_documents_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.referenceDocuments = response.data.referenceDocuments;
        });
});

app.controller("GetTransactionInfoCtrl", function($scope, $http) {
    $scope.getData = function(transctionNo) {
        //console.log(transctionNo);
        $http.get('../data/transact_info_' + transctionNo + '.json')
            .then(function(response) {
                $scope.transactionInfo = response.data.transactionInfo;
                $scope.branchInfo = response.data.branchInfo;
            });
    };
});

app.controller("RelatedEntityCtrl", function($scope, $http) {
    $http.get('../data/entity_relationship_graph_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.entityRelationships = response.data;
        });
});