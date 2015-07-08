var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
  gulp.src('styles/index.scss')
    .pipe(sass({
        errLogToConsole: true
    }))
    .pipe(gulp.dest('./styles/'));
});

//Watch task
gulp.task('default',function() {
    gulp.watch('styles/**/*.scss',['styles']);
});