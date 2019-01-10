//引入
var gulp=require('gulp');
//服务
var server=require('gulp-webserver');
//sass
var sass=require('gulp-sass');

//编译sass
gulp.task('sass',function(){
	return gulp.src('./scss/index.scss')
	.pipe(sass())
	.pipe(gulp.dest('css/'))
});

//监听sass
gulp.task('watch',function(){
	gulp.watch('./scss/index.scss',gulp.series('sass'));
});

//服务
gulp.task('webserver',function(){
	return gulp.src('./')
	.pipe(server({
		port:3696,
		open:true,
		livereload:true,
		proxies:[
			{
				source:'/addBill',target:'http://localhost:3000/addBill'
			}
		]
	}))
});

//开发任务
gulp.task('dev',gulp.parallel('sass','watch','webserver'));

