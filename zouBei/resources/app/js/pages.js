window.onload = initial();

function initial(){
	var btn = document.getElementById('all');
	btn.onclick = showRows;
}

//后台传过来的JSON数据
function getRow() {
	return ( 
	[
		{
			title: '8888',
			status: 1,  // 0-5  编辑/暂停/启动/null
			time: '2016-01-01 12:21:00',
			from: '2016-01-02',
			to: '2016-01-04',
			money: '230.05',
			sales: '10',
		},{
			title: '获取子节点children和childNodes',
			status: 4,  // 0-5  编辑/暂停/启动/null
			time: '2016-01-01 12:21:00',
			from: '2016-01-02',
			to: '2016-01-04',
			money: '230.05',
			sales: '10',
		},{
			title: '宜宾+蜀南竹海2日1晚跟团游 踏青春游好去处 赠送圣灵山+鱼化石博物馆',
			status: 5,  // 0-5  编辑/暂停/启动/null
			time: '2016-01-01 12:21:00',
			from: '2016-01-02',
			to: '2016-01-04',
			money: '230.05',
			sales: '10',
		}
	]);
}
//对数据的处理：状态
function getStatus(status) {
	switch(status) {
		case 0: return '编辑中';
		case 1: return '审核中';
		case 2: return '审核未通过';
		case 3: return '已上线';
		case 4: return '暂停中';
		case 5: return '已结束';
		default: '数据错误';
	}
	
}
//对数据的处理：操作
function getBtn(status) {
	switch(status) {
		case 0: return '<a href="javascript:;"><i class="fa fa-edit"></i> 编辑</a>';
		case 1: return '<a href="javascript:;"><i class="fa fa-edit"></i> 编辑</a>'; 
		case 2: return '';
		case 3: return '<a href="javascript:;"><i class="fa fa-power-off"></i> 暂停</a>';
		case 4: return '<a href="javascript:;"><i class="fa fa-check-circle-o"></i> 启动</a>';
		case 5: return '';
	}
}

function showRows() {
	var dataRows = getRow();
	dataRows.forEach(function(row) {
		var status = getStatus(row.status);
		var tds = '<td> ' + row.title + '</td> \
			<td>'+ status +'</td> \
			<td> \
				<span>'+ row.time.split(' ')[0] +'</span> \
				<span>'+ row.time.split(' ')[1] +'</span> \
			</td> \
			<td> \
				<span>'+ row.from +'</span><br> \
				<span>'+ row.to +'</span> \
			</td> \
			<td class="font-yellow-lemon">￥'+ row.money +'</td> \
			<td>'+ row.sales +'</td> \
			<td> \
				'+ getBtn(row.status) +'&nbsp;&nbsp; \
				<a href="javascript:;"><i class="fa fa-eye"></i> 预览</a>&nbsp;&nbsp; \
				<a href="javascript:;"><i class="fa fa-trash"></i> 删除</a> \
			</td>';
		var obj = document.getElementById('test');
		var newRow = document.createElement('tr');
		newRow.innerHTML = tds;
		obj.appendChild(newRow);
	});
}