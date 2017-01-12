//$(document)
//		.on(
//				'dnd_move.vakata',
//				function(e, data) {
//
//					if (data.data.obj.context.id === 'html1') {
//						if (data.event.target.offsetParent.className == 'gridster ready'
//								|| data.event.target.offsetParent.className == 'ui-layout-container') {
//							data.helper.find('.jstree-icon').removeClass(
//									'jstree-er').addClass('jstree-ok');
//						} else {
//							data.helper.find('.jstree-icon').removeClass(
//									'jstree-ok').addClass('jstree-er');
//						}
//					} else if (data.data.obj.context.id === 'jstree2') {
//						if (data.event.target.className == 'left'
//								|| data.event.target.className == 'right') {
//
//							data.helper.find('.jstree-icon').removeClass(
//									'jstree-er').addClass('jstree-ok');
//						}
//					} else {
//
//					}
//				})
//		.on(
//				'dnd_stop.vakata',
//				function(e, data) {
//
//					var s = GridController.grid().serialize();
//					var t1 = $(data.event.target.offsetParent).closest(
//							'.ui-layout-center').context.id;
//					var closest = null;
//
//					var idx = index++;
//					var id = data.data.nodes[0] + '-' + idx;
//
//					$.each(s, function(i, val) {
//						if (val.id === t1) {
//							closest = val;
//						}
//					});
//
//					if (data.data.obj.context.id === 'jstree2') {
//
//						var html = $.parseHTML(closest.htmlContent);
//						var zone = $('#' + data.event.target.className + '-'
//								+ data.event.target.offsetParent.id);
//
//						zone.html(zone.html() + data.element.text + '<br>');
//
//						// var div =
//						// $(html).find("div.data.event.target.className)[0];
//						return;
//					}
//
//					var _row = 0, _col = 0;
//					if (closest) {
//						_row = closest.row;
//						_col = closest.col;
//					}
//
//					var tmpl = "<div style='background-color:#037BD1;color:white;padding:5px;height:10'>"
//							+ model[data.data.nodes[0]].text
//							+ "-"
//							+ idx
//							+ "<img src='images/min.png' class='cogbtn' hspace=2 style='float:right'><img src='images/max.png' class='cogbtn' hspace=2 style='float:right'><img src='images/close.png' class='closebtn' hspace=2 style='float:right'></div><div style='border:1px solid;height: 86%;'><div class='left' id='left-"
//							+ id
//							+ "' style='float:left;border-right:1px solid;height: 78%;width:30%'></div><div style='float:left;background-color:fff;horizontal-align:center;'><img src='images/"
//							+ model[data.data.nodes[0]].type
//							+ ".png' height=100% width=100%/></div><div align='left' class=right id='right-"
//							+ id
//							+ "' style='padding-left:3px;clear:both;border-top:1px solid;height: 20%;overflow:auto'></div></div></div>";
//
//					GridController.grid().add_widget.apply(GridController.grid(), [
//							'<li class="gridli" id="' + id + '">' + tmpl
//									+ '</li>', 3, 3, _col, _row ]);
//
//					GridController.select(id, model[data.data.nodes[0]].text);
//				});
