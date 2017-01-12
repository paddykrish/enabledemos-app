define([

/** jquery * */

'jquery', '../jquery/jquery.grid/jquery.gridster', '../jquery/jquery.ui/jquery-ui', '../jquery/jquery.layout/jquery.layout-latest', '../jquery/jquery.ui/jquery.dd',
		'../jquery/jquery.tabs/jquery-tabs', '../jstree/jstree', '../jquery/jquery.tmpl/jquery.tmpl.min', '../jquery/jquery.ui/jquery.nicescroll.min', 'stomp',

		/** controllers* */

		'../../app/controller/grid.controller', '../../app/controller/dataobjects.controller', '../../app/controller/reportobjects.controller',
		'../../app/controller/controlbar.controller', '../../app/controller/datacontext.controller', '../../app/controller/map.controller',
		'../../app/controller/search.controller',

		/** models* */

		'../../app/model/reportobject.model', '../../app/model/dataobject.model',

		/** managers* */

		'../../app/manager/drag.manager', '../../app/manager/storage.manager' ],

function($) {

	var model = {};
	var index = 0;

	var gridster = GridController.init();
	ControlBarController.init(gridster);
	ReportObjectController.init(model);
	DataObjectsController.init(null, []);
	DataContextController.init();
	GoogleMapController.init();
	SearchController.init();

	var socket = new SockJS("/bigdata-demo/service/ws");
	var stompClient = Stomp.over(socket);

	$(function() {

		$('body').layout({
			north : {
				size : 54,
				closable : false,
				resizable : false,
				spacing_open : 0,
				spacing_closed : 0
			},
			south : {
				size : 65,
				closable : false,
				resizable : false,
				spacing_open : 0,
				spacing_closed : 0
			},
			east : {
				size : 300
			},
			west : {
				size : 300
			},
			west__onresize : function() {
				GoogleMapController.resize($("#accordion").width() - 50, "400px");
			}

		});

		var names = [];

		$(document).bind('mapwindowclose', function(e, data) {

			names.push(data);
			// console.log(names);
			var uniqueNames = [];
			$.each(names, function(i, el) {
				if ($.inArray(el, uniqueNames) === -1)
					uniqueNames.push(el);
			});

			var current = $('#tt').datagrid('getData').rows[0].value;

			if (DataObjectModel.contains(current)) {
				DataObjectModel.put(current, {
					text : data,
					pos : 'footer',
					dim : 'store'
				});
			} else {

				console.log(data)

				DataObjectModel.getModel().push({
					id : current,
					data : [ {
						text : data,
						pos : 'footer',
						dim : 'store'
					} ]
				});
			}

			var html = "<table><tr>";
			var cnt = 0;
			$.each(uniqueNames, function(i, val) {
				if (cnt != 0 && cnt % 5 == 0)
					html += "<td class=datacell>" + val + "</td></tr><tr>";
				else
					html += "<td class=datacell>" + val + "</td>";
				cnt++;
			});
			html += "</tr></table>";
			$("#footer-" + current).html(html);

		});

		$("#accordion").accordion({
			heightStyle : "content",
			beforeActivate : function(event, ui) {
				if (ui.newHeader.context && ui.newHeader.context.textContent === 'Properties') {
					// GoogleMapController.resize("228px", "400px");
					$.get("data/properties.json", function(data) {
						data[0].value = "";
						data[1].value = "";
						$('#tt').datagrid('loadData', data);
					});
				}
			}
		});

		$('.ui-accordion-header').bind('click', function(e) {
			if (e.target.innerText === 'Locations') {
				GoogleMapController.resize($("#accordion").width() - 50, "400px");
			}
		});

		$("#tabs").tabs();

		$("html").niceScroll();
		$("div.ui-layout-west").niceScroll({
			cursorcolor : "#ccc"
		});

		$('#jstree_demo').jstree({
			"plugins" : [ "themes", "contextmenu", "dnd" ],
			"core" : {
				'data' : [ {
					"text" : "Saved Reports",
					"state" : {
						"opened" : true
					},
					"children" : [ {
						"text" : "Maps",
						"children" : [ {
							"text" : "Sales By County",
							"icon" : "images/ro_pivot.png"
						} ]
					} ]
				} ]
			}
		});

		var stompClient = Stomp.over(socket);

		var connectCallback = function() {
			stompClient.subscribe('/topic/price', renderPrice);
		};

		var errorCallback = function(error) {
			alert(error.headers.message);
		};
		stompClient.connect("guest", "guest", connectCallback, errorCallback);

	});

	$(document).on('dnd_move.vakata', function(e, data) {

		if (data.data.obj.context.id === 'html1') {

			if (data.event.target.offsetParent.className == 'gridster ready' || data.event.target.offsetParent.className == 'ui-layout-container') {
				data.helper.find('.jstree-icon').removeClass('jstree-er').addClass('jstree-ok');
			} else {
				data.helper.find('.jstree-icon').removeClass('jstree-ok').addClass('jstree-er');
			}
		} else if (data.data.obj.context.id === 'jstree2') {

			// console.log(data.event.target.id)

			if (data.event.target.className == 'footer' || data.event.target.className == 'contentcolumn') {

				data.helper.find('.jstree-icon').removeClass('jstree-er').addClass('jstree-ok');
			}
		} else if (data.data.obj.context.id === 'jstree_demo') {
			console.log(data.data.obj.context.id);
			data.helper.find('.jstree-icon').removeClass('jstree-er').addClass('jstree-ok');
		}
	}).on(
			'dnd_stop.vakata',
			function(e, data) {

				var jsonstr = JSON.stringify({
					'code' : "ATG",
					'price' : "102"
				});
				stompClient.send("/app/addStock", {}, jsonstr);

				var s = gridster.serialize();
				var t1 = $(data.event.target.offsetParent).closest('.ui-layout-center').context.id;
				var closest = null;

				var idx = index++;
				var id = data.data.nodes[0] + '-' + idx;

				$.each(s, function(i, val) {
					if (val.id === t1) {
						closest = val;
					}
				});

				if (data.data.obj.context.id === 'jstree_demo') {
					document.getElementById("ui-layout-center").innerHTML = "<iframe id='contentframe' name='list_frame'"
							+ "' frameborder=0 width=100% height=95% scrolling=yes></iframe>";
					$('#ui-layout-center').removeClass('ui-layout-center');
					var form = $("<form/>").attr({
						method : "post",
						action : "app/view/us.html",
						target : "list_frame"
					});
					form.append($("<input/>").attr({
					/*
					 * name : "data", value : JSON.stringify(obj)
					 */
					}));
					$("body").append(form);
					form.submit();
					return;
				}

				if (data.data.obj.context.id === 'jstree2') {

					if (closest == null)
						return;

					var datamodel = $('#jstree2').jstree(true).get_json();
					var parent = null;
					jQuery.each(datamodel, function(i, val) {
						jQuery.each(val.children, function(i, child) {
							jQuery.each(child.children, function(i, child1) {
								if (child1.text && child1.text == data.element.text) {
									parent = $('#' + val.id).find('a')[0].innerText;
									return false;
								}
							});
						});
					});

					if (DataObjectModel.contains(t1)) {
						DataObjectModel.put(t1, {
							text : data.element.text,
							pos : data.event.target.className,
							dim : parent
						});
					} else {
						DataObjectModel.getModel().push({
							id : t1,
							data : [ {
								text : data.element.text,
								pos : data.event.target.className,
								dim : parent
							} ]
						});
					}

					var table;
					if ($("#" + data.event.target.id).find("table").length > 0) {
						table = $("#" + data.event.target.id).find("table");
					} else {
						table = $('<table></table>').addClass('datatable');
					}

					$.each(table.find("td"), function(i, val) {
						// console.log(val.offsetWidth + " :: " +
						// data.event.offsetX);
					});

					// console.log(table.find("td")[0]);
					var row1;
					row1 = $('<td></td>').addClass('datacell').text(data.element.text);
					if (table.find("td")[0] && table.find("td")[0].offsetWidth < data.event.offsetX) {
						var cell = table.find("tr")[0].insertCell(0);
						cell.className = "datacell";
						cell.innerHTML = data.element.text;
					} else {
						var row = $('<tr></tr>');
						table.append(row);
						row.append(row1);
					}
					//
					// $("#" + data.event.target.id).append(table);

					// list = $('<ul></ul>').addClass('datatable');
					// var strs = [ "String 1", "String 2", "String 3" ];
					// var list = document.createElement("ul");
					// list.className= 'sortable grid';
					// list.id= 'sortable2';
					// for (var i in strs) {
					// var anchor = document.createElement("a");
					// anchor.href = "#";
					// anchor.innerText = strs[i];
					//
					// var elem = document.createElement("li");
					// elem.appendChild(anchor);
					// list.appendChild(elem);
					// }

					// $("#" + data.event.target.id).append(list);
					$("#" + data.event.target.id).append(table);

					// $('#sortable2').sortable();

					return;
				}

				var _row = 0, _col = 0;
				if (closest) {
					_row = closest.row;
					_col = closest.col;
				}

				var books = {
					text : model[data.data.nodes[0]].text,
					idx : idx,
					id : id,
					type : model[data.data.nodes[0]].type
				};

				$.get("./app/view/griditem.html", null, function(bookTemplate) {

					var html = $.tmpl(bookTemplate, books);

					var g = gridster.add_widget.apply(gridster, [ '<li class="gridli" id="' + id + '">' + html.html() + '</li>', 3, 3, _col, _row ]);

					$("#log2").html('row: ' + (Math.floor(g[0].offsetHeight / 274)));
					$("#log3").html('column: ' + (Math.floor(g[0].offsetLeft / 324) + 1));
					$("#log4").html('width: ' + g.width());
					$("#log5").html('height: ' + g.height());

					// console.log(g.width())

					GridController.select(id, model[data.data.nodes[0]].text);
				});
			});
});

function renderPrice(frame) {

	var prices = JSON.parse(frame.body);

	for ( var i in prices) {
		var price = prices[i];
		console.log(price)
		if (price.price > 140) {
			console.log(price)
		}
	}
}