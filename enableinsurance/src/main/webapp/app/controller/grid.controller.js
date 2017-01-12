var GridController = (function() {

	var gridster;

	function init() {

		gridster = $(".gridster ul").gridster({
			widget_base_dimensions : [ 100, 55 ],
			widget_margins : [ 5, 5 ],
			serialize_params : function($w, wgd) {
				// console.log($($w))
				return {
					id : wgd.el[0].id,
					col : wgd.col,
					row : wgd.row,
					htmlContent : $($w).html()
				};
			},
			resize : {
				enabled : true,
				// max_size: [10, 10],
				min_size : [ 3, 3 ],
				start : function(e, ui, $widget) {
					//log.innerHTML = 'size: ' + ui.position.top + ' ' + ui.position.left;
				},

				resize : function(e, ui, $widget) {

					//log.innerHTML = 'size: ' + ui.pointer.diff_top + ' ' + ui.pointer.diff_left;
				},

				stop : function(e, ui, $widget) {

					//log.innerHTML = 'size: ' + ui.position.top + ' ' + ui.position.left;
				}
			},
			draggable : {
				start : function(e, ui, $widget) {
					//log1.innerHTML = 'position: ' + ui.position.top + ' ' + ui.position.left;
				},

				drag : function(e, ui, $widget) {
					//log1.innerHTML = 'position: ' + ui.pointer.diff_top + ' ' + ui.pointer.diff_left;
				},

				stop : function(e, ui, $widget) {
					//log1.innerHTML = 'position: ' + ui.position.top + ' ' + ui.position.left;
				}
			}
		}).data('gridster');

		$(document).on("click", ".gridli", function(data) {

			if (data.target.className === 'closebtn') {
				gridster.remove_widget(data.currentTarget);
				return;
			}

			select(data.currentTarget.id, data.currentTarget.textContent);
		});

		$('.ui-layout-center').on(
				'click',
				function(evt, data) {
					if (evt.target.className == 'gridster ready'
							|| evt.target.className.indexOf('ui-layout-center') != -1 || evt.target.tagName == 'UL') {
						var s = gridster.serialize();
						var pos = 0;
						$.each(s, function(i, val) {
							$("#" + val.id).css({
								"border" : "none",
								"border-radius" : "0px",
								"box-shadow" : "0 0 0",
							});
							pos++;
						});
					}
				});

		return gridster;

	}

	function select(id, text) {

		var s = gridster.serialize();
		var pos = 0;

		$.each(s, function(i, val) {
			$("#" + val.id).css({
				"border" : "none",
				"border-radius" : "0px",
				"box-shadow" : "0 0 0",
			});
			pos++;
		});

		$("#" + id).css({
			"border" : "0px 3px 3px 0px solid #5080B0",
//			"border-radius" : "7px",
			"box-shadow" : "0 0 10px #9ecaed",
			"outline" : "none",
			"border-color" : "#9ecaed"
			
		
		});

		$.get("data/properties.json", function(data) {
			data[0].value = id;
			data[1].value = text;
			$('#tt').datagrid('loadData', data);
		});

	}

	return {
		init : init,
		select : select
	};
})();
