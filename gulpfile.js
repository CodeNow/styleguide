var autoprefixer = require('gulp-autoprefixer');
var debug = require('gulp-debug');
var fileinclude = require('gulp-file-include');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var pngquant = require('imagemin-pngquant');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');

// file locations
var src = 'src/';
var htmlDir = src + 'html/**/*.html';
var htmlSrc = src + 'html/index.html';
var sassDir = src +'styles/**/*.scss';
var sassSrc = src + 'styles/index.scss';
var imgDir = src + 'images/**/*.*';
var imgDirMisc = src + 'images/**/*.eps';

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
  return gulp.src(imgDir)
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

// move Misc
gulp.task('moveMisc', function () {
  return gulp.src(imgDirMisc)
    .pipe(debug({
      title: 'moveMisc'
    }))
    .pipe(gulp.dest(imgDist));
});

// local webserver
gulp.task('server', function() {
  gulp.src(dist)
    .pipe(webserver());
});

// build
gulp.task('build', function(cb) {
  runSequence(['fileinclude', 'sass', 'imagemin', 'moveEps'], cb);
});

// watch task
gulp.task('default', function(cb) {
  runSequence('build', 'server', cb);
  gulp.watch(htmlDir, ['fileinclude']);
  gulp.watch(sassDir, ['sass']);
  gulp.watch(imgDir, ['imagemin', 'moveEps']);
});