require(['./config'],function(){
	require(['mui','jquery'],function(mui,$){
		//初始化
		mui.init();
		//确认弹出框
		isSure();
		//点击切换tab
		tabCon();
		
		//渲染数据账单
		$.ajax({
			url:'/addBill',
			type:'get',
			success:function(data){
				console.log(data.msg)
			}
		});
	});
});

//确认弹出框
function isSure(){
	$('#OA_task_1').on('tap', '.mui-btn', function(event) {
				var elem = this;
				var li = elem.parentNode.parentNode;
				mui.confirm('确认删除该条记录？', 'Hello MUI', btnArray, function(e) {
					if (e.index == 0) {
						li.parentNode.removeChild(li);
					} else {
						setTimeout(function() {
							$.swipeoutClose(li);
						}, 0);
					}
				});
			});
			var btnArray = ['确认', '取消'];
			//第二个demo，向左拖拽后显示操作图标，释放后自动触发的业务逻辑
			$('#OA_task_2').on('slideleft', '.mui-table-view-cell', function(event) {
				var elem = this;
				mui.confirm('确认删除该条记录？', 'Hello MUI', btnArray, function(e) {
					if (e.index == 0) {
						elem.parentNode.removeChild(elem);
					} else {
						setTimeout(function() {
							$.swipeoutClose(elem);
						}, 0);
					}
				});
			});
}

//点击切换tab
function tabCon(){
	// var tab=document.querySelector('.tab');
	var lis=document.querySelectorAll('.tab li')
	$('.tab').on('tap','li',function(){
		//判断点击的是图标还是账单
		if(this.innerHTML=='图表'){
			$('.conTwo').show();
			$('.conOne').hide();
		}else{
			$('.conTwo').hide();
			$('.conOne').show();
		}
		//切换样式
		$(this).addClass('active').siblings().removeClass('active');
	})
}

