var gulp = require('gulp'),
	 connect = require('gulp-connect'),
	 webpack = require('webpack'),
	 webpackConfig = require("./webpack.config.js"),
   uglify = require('gulp-uglify');


gulp.watch(['./test/*.html', './src/**'], ['html']);
gulp.watch(['./src/js/*.js'], ['webpack']);

gulp.task('webServer', function(){
	connect.server();
});

gulp.task("webpack", function(callback) {
  var myConfig = Object.create(webpackConfig);
  webpack(myConfig, function(err, stats) {
    callback();
  });
});

gulp.task('html', function(){
	gulp.src('./test/*.html')
		.pipe(connect.reload());
});

gulp.watch('./src/js/*.js', ['webpack'], function(){
  gulp.src('./src/js/datepicker.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});

gulp.task('default', ['webServer']);