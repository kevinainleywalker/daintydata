var gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	gulpif = require('gulp-if'),
	args = require('yargs').argv,
	rimraf = require('rimraf'),
	mainBowerFiles = require('main-bower-files'),
	less = require('gulp-less'),
	path = require('path'),
	http = require('http'),
	express = require('express'),
	compression = require('compression'),
	open = require('gulp-open');

var output = '.build/';

gulp.task('clean', function (cb) {
	rimraf(output, cb);
});

gulp.task('bower', ['clean'], function() {
	return gulp.src(mainBowerFiles())
		.pipe(gulpif(args.production, concat('vendor-scripts.js')))
		.pipe(gulpif(args.production, uglify()))
		.pipe(gulpif(args.production, rename({ extname: '.min.js' })))
		.pipe(gulp.dest(output + 'scripts/vendors'));
});

gulp.task('scripts', ['clean'], function() {
	return gulp.src('app/scripts/**/*.js')
		.pipe(gulpif(args.production, concat('scripts.js')))
		.pipe(gulpif(args.production, uglify()))
		.pipe(gulpif(args.production, rename({ extname: '.min.js' })))
		.pipe(gulp.dest(output + 'scripts'));
});

gulp.task('css', ['clean'], function () {
	return gulp.src('app/less/main-app.less')
		.pipe(less({
			paths: [ path.join(__dirname, 'less', 'includes') ]
		}))
		.pipe(gulp.dest(output + 'css'));
});

gulp.task('vendor-css', ['clean'], function () {
	return gulp.src('app/bower_components/html5-boilerplate/css/*.css')
		.pipe(gulp.dest(output + 'css'));
});

gulp.task('fonts', ['clean'], function () {
	return gulp.src('app/fonts/*.*')
		.pipe(gulp.dest(output + 'fonts'));
});

gulp.task('images', ['clean'], function () {
	return gulp.src('app/images/*.*')
		.pipe(gulp.dest(output + 'images'));
});

gulp.task('index', ['clean'], function () {
	return gulp.src('app/index.html')
		.pipe(gulp.dest(output));
});

gulp.task('partials', ['clean'], function () {
	return gulp.src('app/partials/*.html')
		.pipe(gulp.dest(output + 'partials'));
});

gulp.task('server', function() {
	var expressApp = express(),
		server = http.createServer(expressApp),
		port = 8002,
		url = 'http://jaffa:' + port;

	expressApp.use(compression({
		threshold: 0,
		filter: function () {
			return true;
		}
	}));

	expressApp.use(express.static(process.cwd() + '/.build/', { maxAge: 0 }));

	server.listen(port, function () {
		gulp.src(process.cwd() + '/.build/index.html')
			.pipe(open('', { app: 'chrome', url: url }));
	});
});

gulp.task('build', ['clean', 'scripts', 'fonts', 'images', 'bower', 'css', 'vendor-css', 'index', 'partials']);

gulp.task('default', ['build', 'server']);