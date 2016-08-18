const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
require('babel-core/register');

gulp.task('test', () => {
  gulp.src('test/**/*_test.js')
    .pipe($.plumber())
    .pipe($.mocha());
});

gulp.task('clean', () => {
  return gulp.src('lib/**')
    .pipe($.clean());
});

gulp.task('build', ['clean'], () => {
  gulp.src('src/**/*.js')
    .pipe($.plumber())
    .pipe($.babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('watch', () => {
  gulp.watch(['src/**/*.js', 'test/**/*_test.js'], ['test']);
});
