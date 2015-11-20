var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var babel = require('gulp-babel');
var gulp = require('gulp');

var path = {
	ENTRY_POINT: './app/client.js',
	OUT_BUNDLE: 'bundle.js',
	APP_JS: "./app/app.js",
	ROUTES_JS: "./app/routes.js",
	STORES_JS: "stores/*.js",
	ACTIONS_JS: "actions/*.js",
	COMPONENTS_JS: "components/*.{jsx,js}",
	DEST_PUBLIC: 'build',
	CSS: './app/style.css'
};

gulp.task('babel', [], function() {
	return browserify({
		entries: [path.ENTRY_POINT],
		extensions: ['.jsx', '.js'],
		debug: true,
	}).transform(babelify.configure({
		optional: ["es7.classProperties", "es7.decorators"]
	}))
	.bundle()
	.pipe(source(path.OUT_BUNDLE))
	.pipe(gulp.dest(path.DEST_PUBLIC));
});

gulp.task('copy', function() {
	return gulp.src(path.CSS).pipe(gulp.dest(path.DEST_PUBLIC));
});

gulp.task('watch', ['babel', 'copy'], function() {
	gulp.watch(path.CSS, ['copy']);
	gulp.watch(path.APP_JS, ['babel']);
	gulp.watch(path.ROUTES_JS, ['babel']);
	gulp.watch(path.ENTRY_POINT, ['babel']);
	gulp.watch(path.STORES_JS, ['babel']);
	gulp.watch(path.ACTIONS_JS, ['babel']);
	gulp.watch(path.COMPONENTS_JS, ['babel']);
});

gulp.task('default', ['watch']);
