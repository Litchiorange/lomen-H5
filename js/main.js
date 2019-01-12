require(['./config'],function(){
	require(['mui','jquery','picker',"dtpicker","poppicker"],function(mui,$,picker, dtPicker,poppicker){
		//初始化
		mui.init();
		//渲染数据账单
		mui.ajax('/bill/addBill',{
			type:'get',
			dataType:'json',
			success:function(data){
				//渲染账单
				 rander(data.msg);
				 //删除账单
				 deleteMoney();
			}
		});
		//确认弹出框
		isSure();
		//点击切换tab
		tabCon();	
		//初始化 年
		timeData();
		//初始化日期 列表
		loadTime()
	});
});

//渲染账单
function rander(data){
	var html='';
	$.each(data,function(index,item){
		html+=`
			<li class="mui-table-view-cell">
				<div class="mui-slider-right mui-disabled">
					<a class="mui-btn mui-btn-red" data-id=${item._id}>删除</a>
				</div>
				<div class="mui-slider-handle">
					<b>
						<span class="${item.icon}"></span>
						<span>${item.intro}</span>
						<span style="color:red">(${item.type})</span>
					</b>
					<span>${item.money}</span>
				</div>
				<p>${item.timer}</p>
			</li>
		`;
	});
	$('.mui-table-view').append(html);
}

//删除账单
function deleteMoney(){
	var removeBtn=document.querySelector('.mui-btn-red');
	console.log(removeBtn)
	var id =removeBtn.getAttribute('data-id');
	// console.log(id)
	$('.mui-btn-red').on('tap',function(){
		mui.ajax('/bill/deteleBills',{
			type:'post',
			dataType:'json',
			data:{
				id:id
			},
			succsee:function(data){
				console.log(data.msg)
				if(data.code===1){
					location.href='/'
				}
			}
		})
	})
}

//确认弹出框
function isSure(){
	$('#OA_task_1').on('tap', '.mui-btn', function(event) {
				var elem = this;
				var li = elem.parentNode.parentNode;
				mui.confirm('确认删除该条记录？', 'Hello MUI', btnArray, function(e) {
					if (e.index == 0) {
						// li.parentNode.removeChild(li);
						 //删除账单
						// deleteMoney();
					} else {
						setTimeout(function() {
							return;
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

//获取当前年
var currentYear=new Date().getFullYear();
//获取当前月
var currentMonth=new Date().getMonth() + 1;

var picker=null;
var dtPicker=null;

//点击年/月类型
function timeData(){
	document.querySelector('.timeType').addEventListener('tap',function(){
		 picker.show(function (selectItems) {
// 			console.log(selectItems[0].text);//年
// 			console.log(selectItems[0].value);//year 
 			
			var text=selectItems[0].value;
			
			//赋值到页面
			document.querySelector('.timeType').innerHTML=selectItems[0].text;
			
			var MonthH5=document.querySelector("[data-id=title-m]");
			var YearH5=document.querySelector("[data-id=title-y]");
			var MPickerH5=document.querySelector("[data-id=picker-m]");
			var YPickerH5=document.querySelector("[data-id=picker-y]");
			console.log(MonthH5,YearH5,MPickerH5,YPickerH5)
			
			//判断是月还是年
			if(text=="month"){ //月
				document.querySelector('.timeData').innerHTML=currentYear + "-" + currentMonth; //2019-01
				//月的显示
				MPickerH5.style.display="block";
				//月的显示
				MonthH5.style.display="inline-block";
				
				//年的一半
				YPickerH5.style.width="50%";
				//年的一半
				YearH5.style.width="50%";
			}else{ //年
				document.querySelector('.timeData').innerHTML=currentYear; //2019
				//月的隐藏
				MPickerH5.style.display="none";
				//月的隐藏
				MonthH5.style.display="none";
				
				//年的显示
				YPickerH5.style.width="100%";
				//年的显示
				YearH5.style.width="100%";
			}
			
		  });
	});
	
	//用于弹出日期选择器的列表 月 显示出来
	document.querySelector('.timeData').addEventListener('tap',function(){
		dtPicker.show(function (selectItems) { 
// 			console.log(selectItems.y);//{text: "2016",value: 2016} 
// 			console.log(selectItems.m);//{text: "05",value: "05"} 
			
			//年-月 赋值制到页面
			document.querySelector('.timeData').innerHTML=selectItems.y.text + "-" + selectItems.m.text
		});
		
	});
}

//初始化时间
function loadTime(){
	//初始化时间 年
	 picker = new mui.PopPicker();
	 picker.setData([{value:'month',text:'月'},{value:'year',text:'年'}]);
	 //判断是否大于小于0
	 currentMonth =currentMonth < 10 ? "0" + currentMonth : currentMonth;
	 
	 document.querySelector('.timeData').innerHTML=currentYear + "-" + currentMonth;
	 
	 //初始化 用于弹出日期选择器的列表 月
	 dtPicker = new mui.DtPicker({type:"month"}); 
}


//点击加号跳转页面
var addBtn=document.querySelector('.mui-icon-plus');
addBtn.addEventListener('tap',function(){
	location.href='./page/addUser.html'
});
