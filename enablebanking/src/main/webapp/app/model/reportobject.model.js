var ReportObjectModel = (function() {

	var _model = [];

	function init(model) {
	}

	function getModel() {
		return _model;
	}

	function setModel(model) {
		_model = model;
	}

	return {
		getModel : getModel,
		setModel : setModel
	};
})();
