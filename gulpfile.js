var gulp = require('gulp'),
	connect = require('gulp-connect'),
	webpack = require('webpack'),
	webpackConfig = require("./webpack.config.js");


gulp.watch(['./test/*.html', './src/**'], ['html']);
gulp.watch(['./src/js/*.js'], ['webpack']);

gulp.task('webServer', function(){
	connect.server();
});

gulp.task("webpack", function(callback) {
  var myConfig = Object.create(webpackConfig);
  // run webpack
  webpack(
    // configuration
    myConfig
  , function(err, stats) {
    // if(err) throw new gutil.PluginError("webpack", err);
    // gutil.log("[webpack]", stats.toString({
    //	 // output options
    // }));
    callback();
  });
});

gulp.task('html', function(){
	gulp.src('./test/*.html')
		.pipe(connect.reload());
})

gulp.task('default', ['webServer']);