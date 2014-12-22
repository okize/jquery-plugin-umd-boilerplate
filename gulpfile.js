var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var port = 1111;

gulp.task('server', function () {
  connect.server({
    root: ['example', 'src', 'assets', 'node_modules'],
    port: port,
    livereload: true
  });
  gutil.log(
    gutil.colors.red('Examples can be viewed at'),
    gutil.colors.blue('http://localhost:' + port)
  );
});

gulp.task('html', function () {
  gulp.src('./example/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./src/plugin.js', './assets/styles.css'], ['html', 'browserify']);
});

gulp.task('browserify', function() {
  return browserify('./example/commonjs/app.js')
    .bundle()
    .pipe(source('script.js'))
    .pipe(gulp.dest('./example/commonjs/'));
});

gulp.task('default', ['server', 'watch', 'browserify']);
