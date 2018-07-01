// 获取课程列表
var GETCLASSES = 'http://imoocnote.calfnote.com/inter/getClasses.php';
var GETCLASSCHAPTER = 'http://imoocnote.calfnote.com/inter/getClassChapter.php';
var GETCLASSNOTE = 'http://imoocnote.calfnote.com/inter/getClassNote.php';

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

function refreshClasses(curPage) {
	$.getJSON(GETCLASSES, {curPage:curPage}, function(data){
		renderTemplate('#class-template', data['data'], '#classes');
		renderTemplate('#pag-template', formatPag(data), '#pag');
	});
}

$("#classes").on("click", "li", function(){
	$this = $(this);
	var cid = $this.data('id');
	// $.getJSON(GETCLASSCHAPTER, {cid: cid}, function(data) {
	// 	renderTemplate('#chapter-template', data, '#chapterdiv');
	// 	showNote(true);
	// });
	// $.getJSON(GETCLASSNOTE, {cid: 1}, function(data) {
	// 	// TODO
	// 	console.log( data );
	// 	renderTemplate('#note-template', data, '#notediv');
	// });
	$.when(
		$.getJSON(GETCLASSCHAPTER, {cid:cid}),
		$.getJSON(GETCLASSNOTE, {cid: 1})
	).done(function(cData, nData) {
		console.log( cData );
		console.log( nData );
		renderTemplate('#chapter-template', cData[0], '#chapterdiv');
		renderTemplate('#note-template', nData[0], '#notediv');
		showNote(true);
	})
});

$('.overlap').on('click', function() {
	showNote(false);
});

function showNote(show) {
	if(show) {
		$('.overlap').css('display', 'block');
		$('.notedetail').css('display', 'block');
	} else {
		$('.overlap').css('display', 'none');
		$('.notedetail').css('display', 'none');
	}
}

$.getJSON(GETCLASSES, {curPage:2}, function(data){
	renderTemplate('#class-template', data['data'], '#classes');
	renderTemplate('#pag-template', formatPag(data), '#pag');
});

$("#pag").on("click", "li.clickable", function(){
	$this = $(this);
	refreshClasses($this.data('id'));
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

Handlebars.registerHelper('addone', function(v) {
	return v+1;
})

// 格式化日期
Handlebars.registerHelper('formatDate', function(value) {
	if(!value) {
		return "";
	}
	var d      = new Date(value);
	var year   = d.getFullYear();
	var month  = d.getMonth() + 1;
	var date   = d.getDate();
	var hour   = d.getHours();
	var minute = d.getMinutes();
	var second = d.getSeconds();
	var str    = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
	return str
})

Handlebars.registerHelper('pag', function(v1, v2) {
	var str = "";
	str += "<ul>";
	return str;
})
