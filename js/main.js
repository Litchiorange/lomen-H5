require(['./config'],function(){
	require(['mui','jquery'],function(mui,$){
		//初始化
		mui.init();
		//确认弹出框
		isSure();
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