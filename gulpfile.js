var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

// convert less in css
gulp.task('less', function () {
	return gulp.src('app/scss/**/*.less')
		.pipe(less())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

// watch modification in project files
gulp.task('watch', ['browserSync', 'less'], function () {
	gulp.watch('app/scss/**/*.less', ['less']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	// Other watchers
})

// Sync with browser
gulp.task('browserSync', function () {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	})
});

gulp.task('useref', function () {
	return gulp.src('app/*.html')
		.pipe(useref())
		// Minifies only if it's a JavaScript file
		.pipe(gulpIf('*.js', uglify()))
		// Minifies only if it's a CSS file
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'))
});

//Optimizing images
gulp.task('images', function () {
	return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
		// Caching images that ran through imagemin
		.pipe(cache(imagemin({
			interlaced: true
		})))
		.pipe(gulp.dest('dist/images'))
});


gulp.task('fonts', function () {
	return gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean:dist', function () {
	return del.sync('dist');
})


gulp.task('default', function (callback) {
	runSequence('clean:dist',
		['less', 'useref', 'images', 'fonts', 'browserSync', 'watch'],
		callback
	)
});

gulp.task('hello', function () {
	console.log('Hello world');
});