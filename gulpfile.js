const gulp       = require('gulp');
const babel      = require('gulp-babel');
const sass       = require('gulp-sass');
const cleanCSS   = require('gulp-clean-css');
const plumber    = require('gulp-plumber');
const sequence   = require('gulp-sequence');
const notify     = require('gulp-notify');
const del        = require('del');
const nodemon    = require('gulp-nodemon');
const livereload = require('gulp-livereload');
// const flatten    = require('gulp-flatten');
const src  = 'src';
const dist = 'public';

function reportError(error) {
  notify({ title: `Task Failed [${error.plugin}]`, message: 'Check the console.' }).write(error); // Trigger Mac OS notification
  console.log(error.toString()); // Log the error in the terminal
  this.emit('end'); // Prevents having to restart Gulp after a crash
}

gulp.task('clean', () => {
  return del([`${dist}/css`, `${dist}/js`, `${dist}/assets`]);
});

gulp.task('nodemon', () => {
  return nodemon({
    script: 'server.js',
    ext: 'js html',
    env: { NODE_ENV: 'development' }
  });
});

gulp.task('scripts', () => {
  return gulp
    .src(`${src}/**/*.js`)
    .pipe(plumber({ errorHandler: reportError }))
    // .pipe(babel({ presets: ['env'] }))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(gulp.dest(dist))
    .pipe(livereload());
});

gulp.task('sass', () => {
  return (
    gulp
      .src(`${src}/**/style.scss`)
      .pipe(plumber({ errorHandler: reportError }))
      .pipe(sass())
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      // .pipe(flatten())
      .pipe(gulp.dest(dist))
      .pipe(livereload())
  );
});

gulp.task('assets', () => {
  return gulp
    .src(`${src}/assets/**/*`)
    .pipe(gulp.dest(`${dist}/assets`));
});

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch(`${src}/**/*.js`, ['scripts']);
  gulp.watch(`${src}/**/*.scss`, ['sass']);
  gulp.watch(`${src}/assets/**/*`, ['assets']);
});

gulp.task('default', sequence('clean', ['scripts', 'sass', 'assets'], 'watch', 'nodemon'));
