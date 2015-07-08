var gulp = require('gulp');
var sass = require('gulp-sass');
var fileinclude = require('gulp-file-include');

gulp.task('fileinclude', function() {
  gulp.src(['html/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('styles', function() {
  gulp.src('styles/index.scss')
    .pipe(sass({
        errLogToConsole: true
    }))
    .pipe(gulp.dest('./styles/'));
});

//Watch task
gulp.task('default', ['fileinclude', 'styles'], function() {
    gulp.watch('styles/**/*.scss',['styles']);
    gulp.watch('html/*.html', ['fileinclude']);
});