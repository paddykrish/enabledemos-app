$(function() {
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
	
	var config0 = {
        row: 0,
        xCategories: [],
        max: 10
    };

    var config1 = {
        row: 0,
        xCategories: [],
        max: 10
    };

	var config2 = {
        row: 0,
        xCategories: [],
        max: 10
    };
	
	var config3 = {
        row: 0,
        xCategories: [],
        max: 10
    };
	
	var config4 = {
        row: 0,
        xCategories: [],
        max: 10
    };


	var series0 = [];
    series0 = series0.concat(
		createPictoPoints(config0, '', [											
											[42, 'url(../images/circle-gray-small.png)'],
											[58, 'url(../images/circle-orange-small.png)']
										]
						)
		);
	
	
    var series1 = [];
    series1 = series1.concat(
		createPictoPoints(config1, '', [											
											[35, 'url(../images/circle-gray-small.png)'],
											[65, 'url(../images/circle-orange-small.png)']
										]
						)
		);
	
	var series2 = [];
    series2 = series2.concat(
		createPictoPoints(config2, '', [											
											[18, 'url(../images/circle-gray-small.png)'],
											[82, 'url(../images/circle-orange-small.png)']
										]
						)
		);

	
	
	// Format xcategories label
    if (config0.row < xGrids / 2) {
        for (var i = config0.row; i < xGrids; i++) {
            config0.xCategories.push('');
        }
        config0.row = config0.xCategories.length - 1;
    }
		
    // Format xcategories label
    if (config1.row < xGrids / 2) {
        for (var i = config1.row; i < xGrids; i++) {
            config1.xCategories.push('');
        }
        config1.row = config1.xCategories.length - 1;
    }
	
	// Format xcategories label
    if (config2.row < xGrids / 2) {
        for (var i = config2.row; i < xGrids; i++) {
            config2.xCategories.push('');
        }
        config2.row = config2.xCategories.length - 1;
    }
	
	
	
	chart0 = new Highcharts.Chart({
        chart: {
            renderTo: 'containers0',
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
            max: config1.row - 1,
            categories: config1.xCategories
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
        series: series0
    });
	
    chart1 = new Highcharts.Chart({
        chart: {
            renderTo: 'containers1',
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
            offset: 10,
            min: 0,
            max: config1.row - 1,
            categories: config1.xCategories
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
        series: series1
    });
	
	chart2 = new Highcharts.Chart({
        chart: {
            renderTo: 'containers2',
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
            offset: 10,
            min: 0,
            max: config2.row - 1,
            categories: config2.xCategories
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
        series: series2
    });
	
});