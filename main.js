// 轮播图
var lunBo = new XMLHttpRequest();
lunBo.open('GET', '/sliders', true);
lunBo.send();
lunBo.onload = () => {
	var data = JSON.parse(lunBo.responseText);
	Ms('.sl').style.marginLeft = '0vw';
	Ms('.sl').style.width = data.length + '00vw';
	data.forEach((a, b, c) => {
		var inner = Ms('.sl').innerHTML;
		Ms('.sl').innerHTML += b ? inner : '';
		Ms('.sl-butt').innerHTML += !b ? '<span class="ACTIVE"></span>' : '<span></span>';
		MsAll('.sl-pic')[b].src = a.imgURL;
		MsAll('.sl-pic')[b].addEventListener('click', () => {
			location.href = a.link;
		})
	})
	var Timer = setInterval(function () {
		Ms('.sl').style.marginLeft = parseInt(Ms('.sl').style.marginLeft) - 100 + 'vw';
		if (Ms('.sl').style.marginLeft == '-' + Ms('.sl').style.width) {
			Ms('.sl').style.marginLeft = '0vw';
		}
		Ms('.sl-art').innerHTML = data[-parseInt(Ms('.sl').style.marginLeft) / 100].title;
		MsAll('.sl-butt span').forEach((a, b, c) => {
			a.className = '';
		})
		MsAll('.sl-butt span')[-parseInt(Ms('.sl').style.marginLeft) / 100].className = 'ACTIVE';
	}, 3000);
	Mindex(MsAll('.sl-butt span'));
	MsAll('.sl-butt span').forEach(function(a, b, c) {
		MsAll('.sl-butt span')[b].addEventListener('click', function () {
			console.log('12');
			Ms('.sl').style.marginLeft = '-' + this.index + '00vw';
			MsAll('.sl-butt span').forEach((a, b, c) => {
				a.className = '';
			})
			MsAll('.sl-butt span')[b].className = 'ACTIVE';
		}, true);
	});
}

// 底部文章
var wenZhang = new XMLHttpRequest(),
	artNum = Math.ceil(Math.random() *5) + 2;
	console.log(artNum);
wenZhang.open('GET', 'news?num=' + artNum, true);
wenZhang.send();
wenZhang.onload = () => {
	var data = JSON.parse(wenZhang.responseText),
		inner = Ms('.s-main').innerHTML;
	data.forEach((a, b, c) => {
		Ms('.s-main').innerHTML += b ? inner : '';
	})
	MsAll('.s-main .s-art').forEach((a, b, c) => {
		a.querySelector('.sa-pic').setAttribute('src', data[b].imgURL);
		a.addEventListener('click', () => {
			location.href = data[b].link;
		}, true);
		a.querySelector('.sa-title').innerHTML = data[b].title;
		a.querySelector('.sa-des').innerHTML = data[b].description;
		a.querySelector('.sa-type').innerHTML = parseInt(data[b].post) > 10000 ? (parseInt(data[b].post) % 1000) / 10 + '万次跟帖' : parseInt(data[b].post) + '次跟贴';
		if (data[b].type) {
			a.querySelector('.sa-type').innerHTML += '<span>' + data[b].type + '</span>'
			a.querySelector('.sa-type span').style.background = data[b].typeColor;
		}
	})
}

// 顶部菜单 & aside
var caiDan = new XMLHttpRequest();
caiDan.open('GET', '/tags', true);
caiDan.send();
caiDan.onload = () => {
	var data = JSON.parse(caiDan.responseText);
	data.added.forEach((a, b, c) => {
		Ms('header ul').innerHTML += !b ? '<li class="ACTIVE">' + a.name + '</li>' : '<li>' + a.name + '</li>';
		Ms('aside #added').innerHTML += '<span>' + a.name + '</span>';
	});
	data.avaliable.forEach((a, b, c) => {
		Ms('aside #ava').innerHTML += '<span>' + a.name + '</span>';
	})

	MsAll('#ava span').forEach((a, b, c) => {
		a.addEventListener('click', function () {
			Ms('#added').innerHTML += this.outerHTML;
			this.style.display = 'none';
		})
	})
	MsAll('#added span').forEach((a, b, c) => {
		a.addEventListener('click', function () {
			MsAll('header ul li').forEach((a, b, c) => {
				a.className = '';
			});
			MsAll('header ul li')[b].className = 'ACTIVE';
			Ms('aside').style.transform = 'scale(0, 0)';
		})
	})
}

Ms('aside').style.transform = 'scale(0, 0)';
Ms('#h-butt').style.transform = 'rotate(0)';
Ms('#h-butt').addEventListener('click', () => {
	Ms('aside').style.transform = Ms('aside').style.transform == 'scale(1, 1)' ? 'scale(0, 0)' : 'scale(1, 1)';
	Ms('#h-butt').style.transform = Ms('#h-butt').style.transform == 'rotate(180deg)' ? 'rotate(0)' : 'rotate(180deg)';
})













