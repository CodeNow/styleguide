var gulp = require('gulp');
var debug = require('gulp-debug'); // debug
var newer = require('gulp-newer'); // file changes
var fileinclude = require('gulp-file-include'); // html
var sass = require('gulp-sass'); // sass
var autoprefixer = require('gulp-autoprefixer'); // autoprefixer
var imagemin = require('gulp-imagemin'); // image optimizer
var pngquant = require('imagemin-pngquant'); // pngquant

// file locations
var src = 'src/'
var htmlSrc = src + 'html/index.html';
var sassSrc = src + 'styles/index.scss';
var imgSrc = src + 'images/**/*.*';

var dist = './dist/';
var htmlDist = dist;
var sassDist = dist + 'styles/';
var imgDist = dist + 'images/';

// html files
gulp.task('fileinclude', function() {
  gulp.src([htmlSrc])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .on('error', function(err){
      console.log(err.message);
    })
    .pipe(gulp.dest(htmlDist));
});

// sass
gulp.task('sass', function() {
  gulp.src(sassSrc)
    .pipe(sass({
        errLogToConsole: true
    }))
    .on('error', function(err){
      console.log(err.message);
    })
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(sassDist));
});

// images
gulp.task('imagemin', function () {
  return gulp.src(imgSrc)
    .pipe(newer(imgDist))
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(debug({
      title: 'imagemin'
    }))
    .pipe(gulp.dest(imgDist));
});

// watch task
gulp.task('default', ['fileinclude', 'sass'], function() {
    gulp.watch(htmlSrc, ['fileinclude']);
    gulp.watch(sassSrc, ['sass']);
    gulp.watch(imgSrc, ['imagemin']);
});