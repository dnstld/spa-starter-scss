var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    deleteLines = require('gulp-delete-lines'),
    insertLines = require('gulp-insert-lines'),
    plumber = require('gulp-plumber'),

    // js files
    scripts  = {
      main: 'assets/js/main.js'
    };

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
  browserSync.init({
      server: "./"
  });

  gulp.watch("assets/scss/**/*.scss", ['sass']);
  gulp.watch("assets/js/*.js").on('change', browserSync.reload);
  gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("assets/scss/main.scss")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.stream());
});

// Autoprefixer and minify CSS
gulp.task('css', function() {
  return gulp.src("assets/css/main.css")
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/assets/css'))
});

// Concat and minify JS
gulp.task('js', function() {
  return gulp.src([
    scripts.main
  ])
    .pipe(concat('main.js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify().on('error', function(err) {
      console.log(err);
    }))
    .pipe(gulp.dest('build/assets/js'))
});

// HTML
gulp.task('html', function() {
  return gulp.src('*.html')
    .pipe(deleteLines({
      'filters': [
        /<link\s+rel=/i
      ]
    }))
    .pipe(insertLines({
      'before': /<\/head>$/,
      'lineBefore': '    <link rel="stylesheet" type="text/css" href="assets/css/main.min.css">',
    }))
    .pipe(deleteLines({
      'filters': [
        /<script\s+src=/i
      ]
    }))
    .pipe(insertLines({
      'before': /<\/body>$/,
      'lineBefore': '    <script src="assets/js/main.min.js"></script>'
    }))
    .pipe(gulp.dest('build'))
});

// icon
gulp.task('icon', function() {
  return gulp.src('assets/icon/**/*.*')
    .pipe(gulp.dest('build/assets/icon'))
});

// svg
gulp.task('svg', function() {
  return gulp.src('assets/svg/**/*.*')
    .pipe(gulp.dest('build/assets/svg'))
});

// images
gulp.task('images', function() {
  return gulp.src('assets/images/**/*.*')
    .pipe(gulp.dest('build/assets/images'))
});

// favicon
gulp.task('favicon', function() {
  return gulp.src('favicon.ico')
    .pipe(gulp.dest('build/'))
});

// default task
gulp.task('default', ['serve']);

// build task
gulp.task('build', ['html', 'css', 'js', 'icon', 'svg', 'images', 'favicon']);
