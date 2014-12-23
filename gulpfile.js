var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var eslint = require('gulp-eslint');
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

gulp.task('lint', function () {
  // Note: To have the process exit with an error code (1) on
  //  lint error, return the stream and pipe to failOnError last.
  return gulp.src(['src/*.js'])
    .pipe(eslint({
      rules: {
        'quotes': false,
        'no-underscore-dangle': false
      },
      globals: {
        '$': true,
        'jQuery': true,
        'define': true,
        'require': true,
        'exports': true
      },
      envs: [
        'browser'
      ]
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('default', ['server', 'watch', 'browserify']);
