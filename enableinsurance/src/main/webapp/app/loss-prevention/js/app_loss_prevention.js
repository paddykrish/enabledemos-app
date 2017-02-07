var app = angular.module('appDetails', ['chart.js', 'nvd3']);

app.controller("EstimatedLossCtrl", function($scope, $http) {
	
	var index = 1;
	var maxIndex = 20;
	
	$http.get('data/estimated-loss-stats-data-' + index + '.json')
		.then(function(response) {
		
		$scope.amountEstimatedDamages = response.data.totalOverallEstimatedDamages.amount;
		$scope.estimatedLossStatistics = response.data.estimatedLossStatistics;           
	});
		
	setInterval(function() {		
		$http.get('data/estimated-loss-stats-data-' + index + '.json')
			.then(function(response) {
            
			$scope.amountEstimatedDamages = response.data.totalOverallEstimatedDamages.amount;
			$scope.estimatedLossStatistics = response.data.estimatedLossStatistics;           
			
			if (index < maxIndex) {					
				index++;
			} else {
				index = 1;
			}
			
		});
	}, 3000);
});

app.controller("EventAlertAssessmentCtrl", function($scope, $http) {
	var index = 1;
	var maxIndex = 50;
	
	$http.get('data/event-alert-assessment-data-' + index + '.json')
		.then(function(response) {
		
		$scope.eventAlertAssessments = response.data.eventAlertAssessments;
		$scope.topClientEstimatedDamages = response.data.topClientEstimatedDamages;
		
	});
		
	setInterval(function() {		
		$http.get('data/event-alert-assessment-data-' + index + '.json')
			.then(function(response) {
            
			$scope.eventAlertAssessments = response.data.eventAlertAssessments;
            $scope.topClientEstimatedDamages = response.data.topClientEstimatedDamages;
			
			if (index < maxIndex) {					
				index++;
			} else {
				index = 1;
			}
			
		});
	}, 3000);
});

app.controller("PropertyMonitoringMaintenanceCtrl", function($scope, $http) {
	var index = 1;
	var maxIndex = 3;
	
	$http.get('data/property-monitoring-maintenance-data-' + index + '.json')
		.then(function(response) {		
		$scope.propertyMonitoringMaintenance = response.data.propertyMonitoringMaintenance;				
	});
		
	setInterval(function() {		
		$http.get('data/property-monitoring-maintenance-data-' + index + '.json')
			.then(function(response) {
            
			$scope.propertyMonitoringMaintenance = response.data.propertyMonitoringMaintenance;		
			
			if (index < maxIndex) {					
				index++;
			} else {
				index = 1;
			}
			
		});
	}, 7000);
});

app.controller("PropertyMonitoringNotificationCtrl", function($scope, $http) {
    
	var index = 1;
	var maxIndex = 3;
	
	$http.get('data/property-monitoring-notification-data-' + index + '.json')
		.then(function(response) {		
		$scope.propertyMonitoringNotification = response.data.propertyMonitoringNotification;
	});
		
	setInterval(function() {		
		$http.get('data/property-monitoring-notification-data-' + index + '.json')
			.then(function(response) {
            
			$scope.propertyMonitoringNotification = response.data.propertyMonitoringNotification;
			
			if (index < maxIndex) {					
				index++;
			} else {
				index = 1;
			}
			
		});
	}, 3000);
});

app.controller("UnderwritingLocationsCtrl", function($scope, $http) {
    $scope.getData = function(locationId, buildingId) {
        $http.get('../underwriting/data/location_' + locationId + '_bldg_' + buildingId + '.json')
            .then(function(response) {

                $scope.locationInformation = response.data;
                $scope.address = response.data.address;
                $scope.structureAttr = response.data.structureAttr;
                $scope.locationAttr = response.data.locationAttr;
                $scope.riskGrade = response.data.riskGrade;

                $scope.weather = response.data.riskExposure.weather;
                $scope.fire = response.data.riskExposure.fire;
                $scope.crime = response.data.riskExposure.crime;
                $scope.hail = response.data.riskExposure.hail;

                // handle radar data from json
                var dataRisk = [];
                var dataGrade = [];
                angular.forEach($scope.riskGrade, function(item) {
                  dataRisk.push(item.risk);
                  dataGrade.push(item.grade);
                });         
                
                // set radar data               
                $scope.options = { 
                    legend: { 
                        display: false
                    },
                    scale: {
                        ticks: {
                            beginAtZero: true,
                            min: 0
                        },
						pointLabels: {
							fontFamily: 'lato',
							fontSize: '11'
						}
                    }
                };
				
                $scope.labels = dataRisk;
                $scope.data = dataGrade;
                $scope.colors = dataGrade;
				
                $scope.onClick = function (points, evt) {
                  console.log(points, evt);
                };
            
            });
    }
});

app.controller("NewsFeedCtrl", function($scope, $http) {
	var index = 1;
	var maxIndex = 3;
	
	$http.get('data/top-stories-data-' + index + '.json')
		.then(function(response) {
		
		$scope.headlines = response.data.headlines;
		$scope.featured = response.data.featuredStory;
			
	});
	
	setInterval(function() {		
		$http.get('data/top-stories-data-' + index + '.json')
			.then(function(response) {
            
			$scope.headlines = response.data.headlines;
            $scope.featured = response.data.featuredStory;
			
			if (index < maxIndex) {					
				index++;
			} else {
				index = 1;
			}
			
		});
	}, 7000);
});