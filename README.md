# gulp-jasmine-node [![Build Status](https://travis-ci.org/sgerrand/gulp-jasmine-node.svg?branch=master)](https://travis-ci.org/sgerrand/gulp-jasmine-node)

A Gulp plugin to run [Jasmine](https://jasmine.github.io) features using [jasmine-node](https://github.com/mhevery/jasmine-node).

## Installation

    npm install --save-dev gulp-jasmine-node

## Usage

```javascript
var gulp = require('gulp');
var jasmine = require('gulp-jasmine-node');

gulp.task('test', function () {
  return gulp.src('spec/**/*.js')
    .pipe(jasmine())
});
```

You can supply the following options to `jasmine()`:

```javascript
var gulp = require('gulp');
var jasmine = require('gulp-jasmine-node');

gulp.task('test', function () {
  return gulp.src('spec/**/*.js')
    .pipe(jasmine({
      showColors: true, // spec output uses color to indicate passing (green)
                        // or failing (red) specs
      coffee: true,     // allow execution of .coffee specs
      verbose: true     // verbose output as the specs run
    }))
});
```
