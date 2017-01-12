var DataObjectModel = (function() {

	var _model = [];
	var _context;

	function init(model) {
	}

	function getModel() {
		return _model;
	}

	function setModel(model) {
		_model = model;
	}

	function getContext() {
		return _context;
	}

	function setContext(context) {
		_context = context;
	}

	function contains(id) {
		var found = false;
		$.each(_model, function(i, val) {
			if (val.id == id) {
				found = true;
				return false;
			}
		});
		return found;
	}

	function get(id) {
		var value = null;
		$.each(_model, function(i, val) {
			if (val.id == id) {
				value = val;
				return false;
			}
		});
		return value;
	}

	function put(id, obj) {
		$.each(_model, function(i, val) {
			if (val.id == id) {
				val.data.push(obj);
				return false;
			}
		});
	}

	return {
		getModel : getModel,
		setModel : setModel,
		getContext : getContext,
		setContext : setContext,
		contains : contains,
		get : get,
		put : put
	};
})();
