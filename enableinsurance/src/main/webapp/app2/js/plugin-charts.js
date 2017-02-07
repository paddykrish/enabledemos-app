FusionCharts.ready(function () {
    var cSatScoreChart = new FusionCharts({
        type: 'angulargauge',
        renderAt: 'gauge-chart-container',
        width: '380',
        height: '300',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Fraud Risk Grade",
                "subcaption": "As of Today",
                "lowerLimit": "0",
                "upperLimit": "100",                
                "showValue": "1",
                "valueBelowPivot": "1",
                "gaugeFillMix": "{dark-30},{light-60},{dark-10}",                
                "theme": "fint"
            },
            "colorRange": {
                "color": [
                    {
                        "minValue": "0",
                        "maxValue": "50",
                        "code": "#6baa01"                                                
                    },
                    {
                        "minValue": "50",
                        "maxValue": "75",
                        "code": "#f8bd19"                        
                    },
                    {
                        "minValue": "75",
                        "maxValue": "100",
                        "code": "#e44a00"                        
                    }
                ]
            },
            "dials": {
                "dial": [{
                    "value": "20",
					"bgColor": "#999999",
                    "borderAlpha": "0"
                }]
            }
        }
    }).render();
});