var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  livereload = require('gulp-livereload'),
  coffee = require("gulp-coffee")




gulp.task('build-coffee', ['clean'], function () {
  gulp.src('./coffee/**/*.coffee')
    .pipe(sourcemaps.init())
    .pipe(coffee())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./js'));
});

// Scripts
gulp.task('compile-coffee', function () {
  gulp.src('./coffee/**/*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('./js'));
});

// Watch
gulp.task('watch', function() {
  // Watch .coffee files
  gulp.watch('coffee/**/*.coffee', ['compile-coffee']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in js/, reload on change
  gulp.watch(['js/**']).on('change', livereload.changed);

});