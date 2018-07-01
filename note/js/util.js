






























// 将分页数据格式化为handlerbars需要的数据
// 与其在Helper中拼接html, 不如为handlebars封装数据
// 对于逻辑复杂的函数,编写可测试代码
function formatPag(pagData) {
	var arr   = [];
	var total = ~~(pagData['totalCount']);
	var cur   = ~~(pagData['curPage']);
	// 处理首页的逻辑
	var toLeft   = {};
	toLeft.index = 1;
	toLeft.text  = '&laquo;';
	if(cur != 1) {
		toLeft.clickable = true;
	}
	arr.push(toLeft);
	// 处理上一页的逻辑
	var pre   = {};
	pre.index = cur - 1;
	pre.text  = '&lsaquo;';
	if(cur != 1) {
		pre.clickable = true;
	}
	arr.push(pre);
	// 处理到cur页前的逻辑
	if(cur <=5) {
		for(var i=1; i<cur; i++) {
			var pag       = {};
			pag.text      = i;
			pag.index     = i;
			pag.clickable = true;
			arr.push(pag);
		}
	} else {
		// 如果cur>5, 那么cur前的页要显示...
		var pag = {};
		pag.text = 1;
		pag.index = 1;
		pag.clickable = true;
		arr.push(pag);
		var pag = {};
		pag.text = '...';
		arr.push(pag);
		for(var i=cur-2; i<cur; i++) {
			var pag = {};
			pag.text = i;
			pag.index = i;
			pag.clickable = true;
			arr.push(pag);
		}
	}
	// 处理到cur页的逻辑
	var pag = {};
	pag.text = cur;
	pag.index = cur;
	pag.cur = true;
	arr.push(pag);
	// 处理到url页后的逻辑
	if(cur >= total-4) {
		for(var i=cur+1; i<=total; i++) {
			var pag = {};
			pag.text = i;
			pag.index = i;
			pag.clickable = true;
			arr.push(pag);
		}
	} else {
		// 如果cur<total-4, 那么cur后的页要显示...
		for(var i=cur+1; i<=cur+2; i++) {
			var pag = {};
			pag.text = i;
			pag.index = i;
			pag.clickable = true;
			arr.push(pag);
		}
		var pag = {};
		pag.text = '...';
		arr.push(pag);
		var pag = {};
		pag.text = total;
		pag.index = total;
		pag.clickable = true;
		arr.push(pag);
	}
	// 处理到下一页的逻辑
	var next = {};
	next.index = cur + 1;
	next.text = '&rsaquo;';
	if(cur != total) {
		next.clickable = true;
	}
	arr.push(next);
	// 处理到页尾的逻辑
	var toRight = {};
	toRight.index = total;
	toRight.text = '&raquo;';
	if(cur != total) {
		toRight.clickable = true;
	}
	arr.push(toRight);
	return arr;
}

Handlebars.registerHelper('formatDate', function(value) {
	if(!value) {
		return "";
	}
	var d = new Date(value);
	var year = d.getFullYear();
})
