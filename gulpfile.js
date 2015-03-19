var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  livereload = require('gulp-livereload'),
  coffee = require("gulp-coffee"),
  gutil = require("gulp-util")
  shell = require("gulp-shell");


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
    .pipe(coffee().on("error", gutil.log))
    .pipe(gulp.dest('./js'))
});

gulp.task('browserify', function () {
  gulp.src('./js/main.js')
    .pipe(shell(['browserify js/main.js -o js/all.min.js -d']));
})

// Watch
gulp.task('watch', function() {
  // Watch .coffee files
  gulp.watch('coffee/**/*.coffee', ['compile-coffee', 'browserify']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in js/, reload on change
  gulp.watch(['js/**']).on('change', livereload.changed);

});