/* global 'Services/Validation/FastqCheckerWorker.ts' */
var gulp = require("gulp");
var ts = require('gulp-typescript');
var runSequence = require('run-sequence');
var typescript = require('gulp-tsc');
var merge = require('merge2');


/**
* 1. define new project path for templates and js here
*/ 
var files = {
	templates: '**/*.template.html',
	typescripts: '**/*.ts',
	templatesTS: 'Templates.ts',
	referenceTS: '_references.ts',
	tsConfig: 'tsconfig.json',
	definitions: '**/*.d.ts',
};

var paths = {
	common: 'MyProject/',
};

var tsProject = {
	common:  {
		js: 'bs.tang.common.js',
		ts: paths.common + files.typescripts,
		reference: paths.common + files.referenceTS,
		config: paths.common + files.tsConfig,
		template: {
			files: paths.common + files.templates,
			ts: paths.common + files.templatesTS,
			namespace: 'bs.Common'
		}
	}
};

/**
* 2. tasks for compiling templates and copying generated typescript files
*/ 
gulp.task('bundleCommonTemplate', function(cb){
//	tb.bundleTemplates(paths.common, tsProject.common.template.ts, tsProject.common.template.namespace).finally(function() {
//		cb();
//	});
});

// TODO: when changing to gulp-typescript we need to use tsconfig.json
gulp.task('compileCommonTS', function() {
	var tsResult = gulp.src(tsProject.common.reference)
						.pipe(ts({ out: tsProject.common.js, target: 'ES5', declaration: true }));				
	return merge([
        tsResult.dts.pipe(gulp.dest(paths.common)),
        tsResult.js.pipe(gulp.dest(paths.common))
    ]);
});


/**
* 3. watch for template changes and typescript generated file changes
*/ 
gulp.task('watch', function() {
	
	gulp.watch([tsProject.common.ts, '!' + files.definitions], ['compileCommonTS']);
});

gulp.task('default', function(callback){ runSequence('compileCommonTS', 'watch');});