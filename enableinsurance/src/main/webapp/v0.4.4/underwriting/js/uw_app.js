var app = angular.module('plunker', ['nvd3']);

app.controller("StackedAreaCtrl", function($scope, $http) {
    $scope.options = {
        chart: {
            type: 'stackedAreaChart',
            height: 400,
            legend: {
                margin : {
                    top: 1,
                    right: 115,
                    bottom: 5,
                    left: 0
                }
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
                    return d3.time.format('%I:%M %p')(new Date(d))
                }
            },
            yAxis: {
                //axisLabel: 'Voltage (v)',
                tickFormat: function(d){
                    return d3.format('.02f')(d);
                },
                //axisLabelDistance: -10
            },
            callback: function(chart){
                console.log("!!! lineChart callback !!!");
            },
            showControls: false,
            noData: "Loading Data",
        }
    };


    $scope.data = [
        { values: [], key: 'Auto', color: '#026C38', classed: 'dashed' },
        { values: [], key: 'Crime', color: '#ff0000', classed: 'dashed' },
        { values: [], key: 'GL', color: '#003366', classed: 'dashed' },
        { values: [], key: 'Property', color: 'yellow', classed: 'dashed' },
        { values: [], key: 'Workers Compensation', color: '#DA5C0A', classed: 'dashed' },
    ];

    /*$scope.run = true;

    Date.prototype.addHours= function(h){
        this.setHours(this.getHours()+h);
        return this;
    }

    var x = 0;
    setInterval(function(){
        if (!$scope.run) return;
        $scope.data[0].values.push({ x: new Date().addHours(x),  y: Math.random() * 30});
        $scope.data[1].values.push({ x: new Date().addHours(x),  y: Math.random() * 35});
        $scope.data[2].values.push({ x: new Date().addHours(x),  y: Math.random() * 40});
        $scope.data[3].values.push({ x: new Date().addHours(x),  y: Math.random() * 45});
        $scope.data[4].values.push({ x: new Date().addHours(x),  y: Math.random() * 50});

        if ($scope.data[0].values.length > 20) {
             $scope.data[0].values.shift();
             $scope.data[1].values.shift();
             $scope.data[2].values.shift();
             $scope.data[3].values.shift();
             $scope.data[4].values.shift();
        }

        x++;

      $scope.$apply(); // update both chart
    }, 10000);*/

    var jsonFile = ["submissions_by_lob2.json", "submissions_by_lob3.json", "submissions_by_lob4.json"];
    function getJson() {
       return jsonFile[Math.floor(Math.random() * jsonFile.length)];
    }

    console.log(getJson());

    loadData();
    setInterval(function() {
        loadData();
    }, 30000);
    //console.log($scope.data);

    function loadData() {
        $scope.data = [];
        $http.get('/enableinsurance/service/dataservice/getLOBCounts/all')
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

app.controller("ListCtrl", function($scope, $http) {
    $http.get('/enableinsurance/service/dataservice/getTop10ActiveQuotes/all')
        .then(function(response) {
            //console.log(response.data);
            $scope.premiums = response.data.annual_premiums;
        });
});

app.controller("StatusBreakdownCtrl", function($scope, $http) {
    $http.get('/enableinsurance/service/dataservice/getStatusBreakdown/all')
        .then(function(response) {
            $scope.quoteStatusData = response.data.quoteStatusData;
            $scope.total = $scope.quoteStatusData.submission + $scope.quoteStatusData.verification
                            + $scope.quoteStatusData.rating + $scope.quoteStatusData.quotePrep
                            + $scope.quoteStatusData.quoteDelivery;
        });
});

app.controller("StatisticsCtrl", function($scope, $http) {
   $http.get('/enableinsurance/service/dataservice/getStatistics/all')
        .then(function(response) {
            //console.log(response.data);
            $scope.date = new Date();
            $scope.statisticsData = response.data.statisticsData;
        });
});