module.exports = function(options) {
  'use strict';

  options = options || {};

  var regExpSpec, onComplete;

  var path    = require('path'),
      gutil   = require('gulp-util'),
      jasmine = require('jasmine-node'),
      through = require('through2'),
      util    = require('util');

  var autotest          = options.autotest || false,
      captureExceptions = options.captureExceptions || false,
      coffee            = options.coffee || false,
      extensions        = options.extensions || "js",
      forceExit         = options.forceExit || false,
      growl             = options.growl || false,
      junitreport       = options.junitreport,
      match             = options.match || ".",
      matchall          = options.matchall || false,
      projectRoot       = options.projectRoot || ".",
      showColors        = options.showColors || false,
      source            = options.source || "src",
      specFolders       = options.specFolders || [],
      specNameMatcher   = options.specNameMatcher || "spec",
      teamcity          = options.teamcity || false,
      useHelpers        = options.useHelpers || false,
      useRequireJs      = options.requirejs || false,
      verbose           = options.verbose || false;

  if (projectRoot) {
    specFolders.push(projectRoot);
  }

  onComplete = function (runner, log) {
    var exitCode;

    console.log("\n");

    if (runner.results().failedCount === 0) {
      exitCode = 0;
    }
    else {
      exitCode = 1;

      if (options.forceExit) {
        process.exit(exitCode);
      }
    }

    jasmine.getGlobal().jasmine.currentEnv_ = undefined;
    
  };

  options = {
    coffee:          coffee,
    extensions:      extensions,
    growl:           growl,
    isVerbose:       verbose,
    junitreport:     junitreport,
    match:           match,
    matchall:        matchall,
    onComplete:      onComplete,
    showColors:      showColors,
    specFolders:     specFolders,
    specNameMatcher: specNameMatcher,
    teamcity:        teamcity,
    useRequireJs:    useRequireJs
  };

  if (options.coffee) {
    options.extensions = 'js|coffee|litcoffee';
    require('coffee-script');
  }

  regExpSpec = new RegExp(options.match + (options.matchall ? "" : options.specNameMatcher + "\\.") + "(" + options.extensions + ")$", 'i');
  options.regExpSpec = regExpSpec;

  var jasmineOptions = {
    coffee:             options.coffee,
    growl:              options.growl,
    includeStackTrace:  options.includeStackTrace,
    isVerbose:          options.isVerbose,
    junitreport:        options.junitreport,
    onComplete:         onComplete,
    regExpSpec:         regExpSpec,
    showColors:         options.showColors,
    specFolders:        options.specFolders,
    teamcity:           options.teamcity,
    useRequireJs:       options.useRequireJs
  };

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-jasmine-node', 'Streaming not supported'));
      return;
    }

    try {
      legacyArguments = Object.keys(options).map(function(key) {
        return options[key];
      });
      jasmine.executeSpecsInFolder.apply(this, legacyArguments);
    }
    catch(e) {
      try {
        jasmine.executeSpecsInFolder(jasmineOptions);
      }
      catch(err) {
        cb(new gutil.PluginError('gulp-jasmine-node', 'Failed to execute "jasmine.executeSpecsInFolder": ' + err.stack));
      }
    }
  });
};
