var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-clean-css');
var del = require('del');

// Clean _dist
gulp.task('clean', function(done) {
  del('_dist');
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
      .pipe(gulp.dest('_dist/styles'))
});

// Copy html
gulp.task('html', function() {
    return gulp.src('*.html').pipe(gulp.dest('_dist'));
});

// Copy assets
gulp.task('assets', function() {
  return gulp.src('assets/**/*').pipe(gulp.dest('_dist/assets'));
});

// Default task - build dist
gulp.task('default', gulp.series('clean', 'styles', 'html', 'assets'));