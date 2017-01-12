var ReportObjectController = (function() {

	function init(model) {

		$('#html1').jstree(
				{
					"plugins" : [ "themes", "contextmenu", "dnd" ],
					contextmenu : {
						"items" : function(node) {
							return {
								"view" : {
									label : "View Record",
									action : function(obj) {
										console.log(node);
									}
								},
								"rename" : {
									label : "Rename",
									action : function(obj) {
										$j("#jstree").jstree(true).edit(node);
									}
								},
								"create" : {
									label : "Create New",
									action : function() {
										createNode(node);
									}
								},
								"delete" : {
									label : "Delete",
									action : function() {
										if (confirm("Really delete "
												+ node.text + "?")) {
											deleteNode(node);
										}
									},
									separator_before : true
								}
							};
						}
					},
					'core' : {
						'data' : {
							'url' : function(node) {

								return 'data/items.json';
							}
						}
					}
				}).bind("loaded.jstree", function(e, data) {

			$.each(data.instance._model.data, function(i, val) {
				if (val.original) {
					model[val.id] = val.original;
				}
			});

			ReportObjectModel.setModel(model);

		});
	};

	return {
		init : init
	};
})();
