var app = angular.module('appDetails', ['chart.js', 'nvd3']);

app.controller("EstimatedLossStatsCtrl", function($scope, $http) {
	$http.get('data/estimated_loss_stats_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.estimatedLossStatistics = response.data.estimatedLossStatistics;
            $scope.totalEstimatedDamages = response.data.totalOverallEstimatedDamages;
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

app.controller("PropertyMonitoringMaintenanceCtrl", function($scope, $http) {
    $http.get('data/property_monitoring_maintenance_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.propertyMonitoringMaintenance = response.data.propertyMonitoringMaintenance;		
        });
});

app.controller("PropertyMonitoringNotificationCtrl", function($scope, $http) {
    $http.get('data/property_monitoring_notification_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.propertyMonitoringNotification = response.data.propertyMonitoringNotification;
			
        });
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
                        scaleLabel: {
                            fontColor: '#000',
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
    $http.get('data/top_stories_data.json')
        .then(function(response) {
            //console.log(response.data);
            $scope.headlines = response.data.headlines;
            $scope.featured = response.data.featuredStory;

        });
});