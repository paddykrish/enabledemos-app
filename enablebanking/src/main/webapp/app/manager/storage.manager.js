var StorageManager = (function() {

	function isLocalSupported() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	}

	function isSessionSupported() {
		if (window.sessionStorage)
			true;
		return false;
	}

	function setSession(key, val) {
		sessionStorage.setItem(key, val);
	}

	function getSession(key) {
		sessionStorage.getItem(key);
	}

	function setLocal(key, val) {
		localStorage.setItem(key, val);
	}

	function getLocal(key) {
		localStorage.getItem(key);
	}

	function init(id, model) {

	}

	return {
		isLocalSupported : isLocalSupported,
		isSessionSupported : isSessionSupported,
		getSession : getSession,
		setSession : setSession,
		getLocal : getLocal,
		setLocal : setLocal

	};
})();
