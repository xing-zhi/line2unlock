'use strict';

const gulp = require('gulp'),
      browserify = require('browserify'),
      babelify = require('babelify'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer');

const $ = require('gulp-load-plugins')();

gulp.task('css', function() {
  return $.rubySass('src/css/', {style: 'expanded', compass: true})
    .pipe($.autoprefixer())
    .pipe(gulp.dest('public/css/'))
    .pipe($.livereload());
});

gulp.task('lint', function() {
  return gulp.src('src/js/**/*.js')
    .pipe($.eslint())
    .pipe($.eslint.format());
});

gulp.task('jade', function() {
  return gulp.src('src/jade/*.jade')
    .pipe($.jade({pretty: true}))
    .pipe(gulp.dest('public/'))
    .pipe($.livereload());
});

gulp.task('browserify', function() {
  return browserify('src/js/app.js')
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
//    .pipe($.sourcemaps.init({loadMaps: true}))
//    .pipe($.uglify().on('error', $.util.log))
//    .pipe($.sourcemaps.write('./'))
//    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('public/js'));
});

gulp.task('watch:css', ['css'], function() {
  gulp.watch(['src/sass/*.scss', 'src/css/*.scss'], ['css']);
});

gulp.task('watch:js', ['browserify'], function() {
  gulp.watch('src/js/**/*.js', ['browserify']);
});

gulp.task('watch:lint', ['lint'], function() {
  gulp.watch('src/js/**/*.js', ['lint']);
});

gulp.task('watch:jade', ['jade'], function() {
  gulp.watch('src/jade/**/*.jade', ['jade']);
});

gulp.task('watch', ['watch:jade', 'watch:css', 'watch:js']);

gulp.task('build', ['jade', 'css', 'browserify']);
