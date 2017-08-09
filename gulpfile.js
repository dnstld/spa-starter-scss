var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    sass = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),

    // js files
    scripts  = {
      jquery: 'vendor/jquery/dist/jquery.slim.min.js',
      tether: 'vendor/tether/dist/js/tether.min.js',
      bootstrap: 'vendor/bootstrap/dist/js/bootstrap.min.js',
      main: 'develop/js/main.js'
    };

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
  browserSync.init({
      server: "./"
  });

  gulp.watch("develop/scss/**/*.scss", ['sass']);
  gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("develop/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("develop/css"))
    .pipe(browserSync.stream());
});

// Autoprefixer and minify CSS
gulp.task('css', function() {
  return gulp.src("develop/css/main.css")
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/css'))
});

// Concat and minify JS
gulp.task('js', function() {
  return gulp.src([
    scripts.jquery,
    scripts.tether,
    scripts.bootstrap,
    scripts.main
  ])
    .pipe(concat('main.js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify().on('error', function() {
      console.log(err);
    }))
    .pipe(gulp.dest('dist/js'));
});

// default task
gulp.task('default', ['serve']);

// dist task
gulp.task('dist', ['css', 'js']);
