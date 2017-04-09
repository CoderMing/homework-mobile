// Mibary ---- Coder Ming的个人小库    My blog: www.coderming.com
'use strict'

// 性能好，动态的选择器
function MsId(a) {
	return document.getElementById(a);
}

function MsClass(a) {
	return document.getElementsByClassName(a).length == 1 ? document.getElementsByClassName(a)[0] : document.getElementsByClassName(a);
}

function MsClassAll(a) {
	return document.getElementsByClassName(a);
}


// 好用，全面的元素选择器
function Ms(a) {
	return document.querySelectorAll(a).length == 1 ? document.querySelector(a) : document.querySelectorAll(a);
}

function MsAll(a) {
	return document.querySelectorAll(a);
}



// Ajax-GET
function MAjaxGET(b, c, d) {
	var m = new XMLHttpRequest(),
		a = {};
	m.open('GET', b, true);
	if (!d) {
		d = function() {
			console.log('MAjaxGET is not search error');
		}
	}
	m.onreadystatechange = function() {
		if (m.status == 200 || m.status == 304) {
			a = JSON.parse(m.responseText);
			c(a);
		} else {
			d();
		}
	}
	m.send();
	return true;
}

// Ajax-POST
function MAjaxPOST() {
	var m = new XMLHttpRequest;
}


// 测试版JSONP
// 与iframe配合可能会出错
function MajaxJSONP(a, b) {
	var ran = Math.floor((Math.random() * 1000)) + 1;
	window[ran] = function(x) {
		b(x);
	}
	var m = document.createElement('script');
	m.src = a + '&callback=window[' + ran + ']';
	document.body.appendChild(m);
}



// 给数组赋index的值
function Mindex(a) {
	for (var i = a.length - 1; i >= 0; i--) {
		a[i].index = i;
	}
}


// input框回车触发事件
function MenterInput(a, b) {
	a.onkeyup = function() {
		if (event.keyCode == 13) {
			b();
		}
	}
}


// 页面自动刷新
// 异步GET，请在服务器环境下   
// 仅适用于css切图阶段，与js结合可能会出bug
function Mreload(a) {
	setInterval(function () {
		window.MreloadRandomXHR = new XMLHttpRequest();
			MreloadRandomXHR.open('GET', '', true);
			MreloadRandomXHR.onload = function () {
			document.querySelector('body').innerHTML = MreloadRandomXHR.responseText.split(/<\/?body>/)[1];
		}
		MreloadRandomXHR.send();
    },200);
}


// XML转对象
// xml一定是要有根元素root的类型，此方法会自动忽略根元素
// 产生的一切属性均为String格式
function MxmlToObj (xml) {
	var result = {};
		
	function getNodes(xml, obj) {
		var XMLchild = xml.childNodes;
		if (XMLchild.length == 0) {
			obj = null;
		}
		else if (XMLchild.length == 1 && XMLchild[0].nodeType == 3) {
			obj[XMLchild[0].nodeName] = XMLchild[0].innerHTML;
		}
		else {
			XMLchild.forEach(function (a, b, c) {
				obj[a.nodeName] = {};
				if (a.childNodes.length > 1) {
					getNodes(a, obj[a.nodeName]);
				}
				else {
					if (a.childNodes.length == 0) {
						obj[a.nodeName] = null;
					}
					else {
						obj[a.nodeName] = a.innerHTML;
					}
				}
			});
		}	
	}

	getNodes(xml.childNodes[0], result);

	return result;
}