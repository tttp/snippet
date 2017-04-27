'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var inject = require('gulp-inject');
var mode = require('gulp-mode')();

var DEST = './dist/';
var jsfiles = [
'node_modules/jquery/dist/jquery.js',
'node_modules/bootstrap/dist/js/bootstrap.js',
'node_modules/vue/dist/vue.js',
'node_modules/vue-form/dist/vue-form.js',
'node_modules/clipboard-js/clipboard.js',
];

var cssfiles = [
'node_modules/bootstrap/dist/css/bootstrap.css',
'node_modules/bootstrap/dist/css/bootstrap-theme.css',
];
//node_modules/bootstrap/dist/css/bootstrap
//node_modules/jquery/dist/jquery.js

gulp.task('partial', function() {
gulp.src('index.html')
  .pipe(inject(gulp.src(['partial/head.html']), {
    starttag: '<!-- inject:head:{{ext}} -->',
    transform: function (filePath, file) {
      // return file contents as string 
      return file.contents.toString('utf8')
    }
  }))
  .pipe(inject(gulp.src(['partial/nav.html']), {
    starttag: '<!-- inject:nav:{{ext}} -->',
    transform: function (filePath, file) {
      // return file contents as string 
      return file.contents.toString('utf8')
    }
  }))
  .pipe(gulp.dest('./dist'));
});


gulp.task('copy', function() {
  gulp.src(jsfiles)
  .pipe(gulp.dest(DEST + 'js'));

  gulp.src(cssfiles)
  .pipe(gulp.dest(DEST + 'css'));
});


gulp.task('minify-css', ['copy'], function() {
//  return gulp.src(DEST+ 'css/*.css')
  return gulp.src(cssfiles)
    .pipe(concat('style.css'))
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(gulp.dest(DEST));
});

gulp.task('minify-js', ['copy'],function() {
//gulp.src(DEST+'js/*.js')
//.pipe(mode.production(uglify()))

return gulp.src(jsfiles)
    .pipe(concat('all.js'))
    .pipe(gulp.dest(DEST))
    // This will minify and rename to foo.min.js
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(DEST));
});

gulp.task('default', ['minify-css','minify-js']);

