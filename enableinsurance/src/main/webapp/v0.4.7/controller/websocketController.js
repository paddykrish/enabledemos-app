(function() {

	var counter = 0;

	var socket = new SockJS("/enableinsurance/service/ws");
	var stompClient = Stomp.over(socket);

	var connectCallback = function() {
		stompClient.subscribe('/topic/msg', handleMessage);
	};

	var errorCallback = function(error) {
		alert(error);
	};

	stompClient.connect("guest", "guest", connectCallback, errorCallback);

	function handleMessage(frame) {

		var body = jQuery.parseJSON(frame.body);
		console.log('body ' + body[0]);
		var msg = jQuery.parseJSON(body[0]);
		console.log('msg ' + msg);
		var sel = angular.element('div[ng-controller="StatisticsCtrl"]').scope();
		sel.statisticsData = msg.statisticsData;

		var sel = angular.element('div[ng-controller="StatusBreakdownCtrl"]').scope();
		sel.quoteStatusData = msg.quoteStatusData;

		var sel = angular.element('div[ng-controller="quotesByRiskCtrl"]').scope();
		sel.quotesByRisk = msg.quotesByRisk;

		var sel = angular.element('div[ng-controller="riskQuotesStepCtrl"]').scope();
		sel.quotesBySteps = msg.quotesBySteps;

		var sel = angular.element('div[ng-controller="ListCtrl"]').scope();
		sel.premiums = msg.annual_premiums;


		//console.log("websocket: handleMessage() "+frame)
        //$('#pitoday').text(msg.p) ;
        //$('#avgtoday').text(msg.a) ;
        //$('#premiumtoday').text(msg.t) ;
        /*
        $('#submission').text(msg.submission) ;
        $('#verification').text(msg.verification) ;
        $('#rating').text(msg.rating) ;
        $('#quotePrep').text(msg.quotePrep) ;
        $('#quoteDelivery').text(msg.quoteDelivery) ;


        $('#lowRisk').text(msg.lowRisk) ;
        $('#mediumRisk').text(msg.mediumRisk) ;
        $('#highRisk').text(msg.highRisk) ;
        $('#veryHighRisk').text(msg.veryHighRisk) ;

        $('#riskpreparation').text(msg.riskpreparation) ;
        $('#riskverification').text(msg.riskverification) ;
        $('#riskrating').text(msg.riskrating) ;
        $('#risksubmission').text(msg.risksubmission) ;
        $('#riskdelivery').text(msg.riskdelivery) ;
        */

	}

}());