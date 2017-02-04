var app = angular.module('appDetails', ['nvd3']);

app.controller("CurrentInformationCtrl", function($scope, $http) {
	$http.get('../data/current_information_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.currentHomeAddress = response.data.currentHomeAddress;
            $scope.currentWorkAddress = response.data.currentWorkAddress;
        });
});

app.controller("RecentTransactionsCtrl", function($scope, $http) {
	$http.get('../data/recent_transactions_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.recentTransactions = response.data.recentTransactions;
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