var app = angular.module('appDetails', ['nvd3']);

app.controller("EstimatedLossStatsCtrl", function($scope, $http) {
	$http.get('data/estimated_loss_stats_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.estimatedLossStatistics = response.data.estimatedLossStatistics;
        });
});

app.controller("EventAlertAssessmentCtrl", function($scope, $http) {
	$http.get('data/event_alert_assessment_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.eventAlertAssessments = response.data.eventAlertAssessments;
            $scope.topClientEstimatedDamages = response.data.topClientEstimatedDamages;
        });
});