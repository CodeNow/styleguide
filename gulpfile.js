var gulp = require('gulp');
var changed = require('gulp-changed'); // if changes
var fileinclude = require('gulp-file-include'); // html
var sass = require('gulp-sass'); // sass
var autoprefixer = require('gulp-autoprefixer'); // autoprefixer
var imagemin = require('gulp-imagemin'); // image optimizer
var pngquant = require('imagemin-pngquant'); // pngquant

// html files
gulp.task('fileinclude', function() {
  gulp.src(['src/html/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .on('error', function(err){
      console.log(err.message);
    })
    .pipe(gulp.dest('./dist/'));
});

// sass
gulp.task('sass', function() {
  gulp.src('src/styles/index.scss')
    .pipe(sass({
        errLogToConsole: true
    }))
    .on('error', function(err){
      console.log(err.message);
    })
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./dist/styles/'));
});

// images
gulp.task('imagemin', function () {
  return gulp.src('src/images/**/*.*')
    .pipe(changed('src/images/**/*.*'))
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/images'));
});

// watch task
gulp.task('default', ['fileinclude', 'sass'], function() {
    gulp.watch('src/styles/**/*.scss', ['sass']);
    gulp.watch('src/html/*.html', ['fileinclude']);
    gulp.watch('src/images/**/*.*', ['imagemin']);
});