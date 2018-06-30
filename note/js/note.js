// 获取课程列表
var GETCLASSES = 'http://imoocnote.calfnote.com/inter/getClasses.php';


$.ajaxSetup({
	error: function() {
		alert('调用接口失败');
		return false;
	}
});

function renderTemplate(templateSelector, data, htmlSelector) {
	var t = $(templateSelector).html();
	var f = Handlebars.compile(t);
	var h = f(data);
	$(htmlSelector).html(h);
}

$.getJSON(GETCLASSES, {curPage:2}, function(data){
	renderTemplate('#class-template', data['data'], '#classes');
	renderTemplate('#pag-template', formatPag(data), '#pag');
});

Handlebars.registerHelper('equal', function(v1, v2, options) {
	if (v1 == v2) {
		return options.fn(this)
	} else {
		return options.inverse(this)
	}
})

Handlebars.registerHelper('long', function(v, options) {
	if (v.indexOf('小时') != -1) {
		return options.fn(this)
	} else {
		return options.inverse(this)
	}
})

Handlebars.registerHelper('pag', function(v1, v2) {
	var str = "";
	str += "<ul>";
	return str;
})
