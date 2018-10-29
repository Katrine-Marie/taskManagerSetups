var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');

// sass
gulp.task('sass', function(){
  return gulp.src('source/scss/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

// gulp-cssnano
gulp.task('nano', function() {
  return gulp.src('css/styles.css')
    .pipe(cssnano())
    .pipe(gulp.dest('css/minified'));
});

// uglify
gulp.task('compress', function () {
  return gulp.src('source/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .on('error', function(err) {
      console.error('Error in compress task', err.toString());
    });
});

// gulp-concat
gulp.task('concat', ['compress'], function() {
  return gulp.src(['js/*.js', '!js/**/bundled.js'])
    .pipe(concat('bundled.js'))
    .pipe(gulp.dest('js/bundled'));
});

// imagemin


// JSHint


gulp.task('watch', ['sass'], function(){
  livereload.listen();
  gulp.watch(['source/scss/**/*.scss'], ['sass']);
  gulp.watch(['css/styles.css'], ['nano']);
  gulp.watch(['source/js/*.js'], ['concat']);
  // Other watchers
})
