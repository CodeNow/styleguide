var gulp = require('gulp');
var fileinclude = require('gulp-file-include'); // html
var sass = require('gulp-sass'); // sass
var autoprefixer = require('gulp-autoprefixer'); // autoprefixer

gulp.task('fileinclude', function() {
  gulp.src(['html/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .on('error', function(err){
      console.log(err.message);
    })
    .pipe(gulp.dest('./'));
});

gulp.task('sass', function() {
  gulp.src('styles/index.scss')
    .pipe(sass({
        errLogToConsole: true
    }))
    .on('error', function(err){
      console.log(err.message);
    })
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./styles/'));
});

// watch task
gulp.task('default', ['fileinclude', 'sass'], function() {
    gulp.watch('styles/**/*.scss', ['sass']);
    gulp.watch('html/*.html', ['fileinclude']);
});