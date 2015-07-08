var gulp = require('gulp');
var fileinclude = require('gulp-file-include'); // html
var sass = require('gulp-sass'); // sass

gulp.task('fileinclude', function() {
  gulp.src(['html/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .on('error', function(err){ console.log(err.message); }) // on error
    .pipe(gulp.dest('./'));
});

gulp.task('styles', function() {
  gulp.src('styles/index.scss')
    .pipe(sass({
        errLogToConsole: true
    }))
    .on('error', function(err){ console.log(err.message); }) // on error
    .pipe(gulp.dest('./styles/'));
});

//Watch task
gulp.task('default', ['fileinclude', 'styles'], function() {
    gulp.watch('styles/**/*.scss',['styles']);
    gulp.watch('html/*.html', ['fileinclude']);
});