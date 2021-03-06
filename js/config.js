require.config({
	paths:{
		"mui":"./libs/mui.min",
		"jquery":"./libs/jquery.min",
		"picker":"./libs/mui.picker",
		"dtpicker":"./libs/mui.dtpicker",
		"poppicker":"./libs/mui.poppicker"
	},
	shim:{
		"picker":{
			deps:['mui']
		},
		"dtpicker":{
			deps:['mui']
		},
		"poppicker":{
			deps:['mui']
		}
	}
})