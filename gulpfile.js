var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-clean-css');
var del = require('del');

// Clean _dist
gulp.task('clean', function(done) {
  del('css');
  done();
});

// Generate styles
gulp.task('styles', function() {
  return gulp
      .src([
        'styles/styles.scss'
      ])
      .pipe(sass())
      .pipe(minify())
      .pipe(gulp.dest('css'))
});

// Default task - build dist
gulp.task('default', gulp.series('clean', 'styles'));