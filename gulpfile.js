var jshint  = require("gulp-jshint"),
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

gulp.task('test', ['lint'], function() {
});
