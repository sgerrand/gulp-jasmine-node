var jasmine = require("./"),
    jshint  = require("gulp-jshint"),
    gulp    = require("gulp");

gulp.task('lint', function() {
  return gulp.src([
                '*.js',
                '**/*.js',
                '!gulpfile.js',
                '!node_modules/**'
              ])
             .pipe(jshint())
             .pipe(jshint.reporter('default', { showNonErrors: true, verbose: true }))
             .pipe(jshint.reporter('fail'));
});

gulp.task('spec', function() {
  return gulp.src(['spec/**/*.js'])
             .pipe(jasmine({
               isVerbose: true,
               showColors: true
             }));
});

gulp.task('test', ['lint', 'spec'], function() {

});

gulp.task('default', ['test'], function() {

});
