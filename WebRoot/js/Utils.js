var Utils = {
	// ajax同步请求
	//访问链接，参数，数据类型
	JQAjax : function(url, data) {
		 
		var a = $.ajax({
					url : url,
					async : false,
					data : data,
					type : 'POST'
				});
		return a.responseText;
	},
	pagerFilter : function(data) {

		if (typeof data.length == 'number' && typeof data.splice == 'function') { // is
																					// array
			data = {
				total : data.length,
				rows : data
			}
		}
		var dg = $("#" + this.id);
		var opts = dg.datagrid('options');
		var pager = dg.datagrid('getPager');
		pager.pagination({
					pageSize: 10,//每页显示的记录条数，默认为10  
        			pageList: [10,15,20],//可以设置每页记录条数的列表  
        			beforePageText: '第',//页数文本框前显示的汉字  
        			afterPageText: '页    共 {pages} 页', 
        				displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
					onSelectPage : function(pageNum, pageSize) {
						opts.pageNumber = pageNum;
						opts.pageSize = pageSize;
						pager.pagination('refresh', {
									pageNumber : pageNum,
									pageSize : pageSize
								});
						dg.datagrid('loadData', data);
					}
				});
		if (!data.originalRows) {
			data.originalRows = (data.rows);
		}
		var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
		var end = start + parseInt(opts.pageSize);
		data.rows = (data.originalRows.slice(start, end));
		return data;
	},
	//禁用backspace
	forbidBackspace : function() {
		document.getElementsByTagName("body")[0].onkeydown = function() {
			// 获取事件对象
			var elem = event.relatedTarget || event.srcElement || event.target
					|| event.currentTarget;
			if (event.keyCode == 8) {// 判断按键为backSpace键
				 
				// 获取按键按下时光标做指向的element
				var elem = event.srcElement || event.currentTarget;
				// 判断是否需要阻止按下键盘的事件默认传递
				var name = elem.nodeName;
				if (name != 'INPUT' && name != 'TEXTAREA') {
					return Utils._stopIt(event);
				}
				var type_e = elem.type.toUpperCase();
				if (name == 'INPUT'
						&& (type_e != 'TEXT' && type_e != 'TEXTAREA'
								&& type_e != 'PASSWORD' && type_e != 'FILE')) {
					return Utils._stopIt(event);
				}
				if (name == 'INPUT'
						&& (elem.readOnly == true || elem.disabled == true)) {
					return Utils._stopIt(event);
				}
				if (name == 'TEXTAREA'
						&& (elem.readOnly == true || elem.disabled == true)) {
					return Utils._stopIt(event);
				}
			}
		}
	},
	_stopIt : function(e) {
		if (e.returnValue) {
			e.returnValue = false;
		}
		if (e.preventDefault) {
			e.preventDefault();
		}

		return false;
	} 
};
 $(function(){
 	Utils.forbidBackspace();//禁用backspace键
 });
 
