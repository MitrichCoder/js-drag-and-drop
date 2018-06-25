"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minifycss = require('gulp-csso');
var concat = require('gulp-concat')
var minifyjs = require('gulp-minify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var run = require('run-sequence');
var del = require('del');

// server
gulp.task('serve', ['style'], function() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', ['style']);
  gulp.watch('source/js/**/*.js', ['scripts']);
  gulp.watch('source/*.html', ['html'])
    .on('change', server.reload);
});

// cleaning
gulp.task('clean', function() {
  return del('build');
});

// copying
gulp.task('copy', function() {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source/js/**/*.min.js'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
});

// css
gulp.task('style', function() {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sass({includePaths: require('node-normalize-scss').includePaths}))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minifycss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css/'))

    .pipe(server.stream());
});

// js
gulp.task('scripts', function() {
  return gulp.src(['source/js/**/*.js', '!source/js/**/*.min.js'])
    /*.pipe(minifyjs())*/
    .pipe(minifyjs({
      ext: {
        min: '.min.js'
      },
      ignoreFiles: ['-min.js']
    }))
    .pipe(gulp.dest('build/js'));
});

// graphic - images
gulp.task('images', function() {
  return gulp.src('source/img/**/*.{jpg,png,svg}')
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest('build/img'));
});

// graphic - webp
gulp.task('webp', function() {
  return gulp.src('build/img/**/*.{jpg,png}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('build/img'))
});

// graphic - svg
gulp.task('sprite', function() {
  return gulp.src('source/img/icon-*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

// html
gulp.task('html', function() {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('build'));
});

// building
gulp.task('build', function(done) {
  run(
    'clean',
    'copy',
    'style',
    'images',
    'webp',
    'sprite',
    'scripts',
    'html',
    done
  );
});
