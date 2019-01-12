require(['./config'],function(){
	require(['mui','jquery'],function(mui,$){
		mui.init();
		//点击切换
		tabTitle();
		//点击键盘
		keyBoad();
		//添加账单
		addBill();
		//icon图标切换
		iconTab();
	});
})

//点击切换
function tabTitle(){
	$('header').on('tap','span',function(){
		if(this.innerHTML=='收支'){
			$('.contentIn').hide();
			$('.contentOut').show();
		}
		else{
			$('.contentIn').show();
			$('.contentOut').hide();
		}
		$(this).addClass('active').siblings().removeClass('active');
	});
}
//点击icon图标切换
function iconTab(){
	$('.picBox').on('tap','dl',function(){
		$(this).addClass('activeType').siblings().removeClass('activeType');
	});
}

//点击键盘
function keyBoad(){
	//获取输入框的焦点
	$('.iptMoney').on('focus',function(){
		$('.keyBoad').on('tap','span',function(){
			//点击的内容
			var text=this.innerHTML;
			console.log(this.innerHTML);
			document.querySelector('.iptMoney').value+=text;
			
			if(text=="完成"){
				document.querySelector('.iptMoney').text = 0.00;
			};
		})
	})
}

//添加账单
function addBill(){
	//点击完成ajax请求
	var sure=document.querySelector('.sure');
	sure.addEventListener('tap',function(){
		//uid
		var uid="5c34b5511fcbb93648e1115b";
		//收支类型
		var type=document.querySelector('header > .active').innerHTML;
		//说明
		var intro=document.querySelector('.picBox .activeType dd').innerHTML;
		//金额
		var money=$('.iptMoney').val();
		//icon
		var icon=document.querySelector('.picBox .activeType dt').getAttribute('class');
		var timer=new Date().toLocaleString();
		console.log(uid + "  " + type + "  " + intro + "  " + money + "  " + icon + "  " + timer)
		
		mui.ajax('/bill/BillDatas',{
			type:'post',
			dataType:'json',
			data:{
				uid:uid,
				type:type,
				money:money,
				icon:icon,
				timer:timer,
				intro:intro
			},
			success:function(data){
				if(data.code===1){
					location.href='/'
				}
			}
		});
	});
}