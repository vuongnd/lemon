const gulp = require('gulp');
const plugins = require('gulp-load-plugins')({
	overridePattern: true,
	pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*', 'browser-*']
});

// Error handler
var onError = function (err) {
	this.emit('end');
};

// Set default tasks work with html and css files
gulp.task('default', function() {

	// place code for your default task here
	gulp.src('src/app.js')
		.pipe(plugins.babel({
			presets: ['env']
		}))
		.on('error', onError)
		.pipe(gulp.dest('dist'));

	// verify code style in dist folder
	gulp.src('src/**/*.js')
		.pipe(plugins.jshint(''))
		.pipe(plugins.jshint.reporter('jshint-stylish'));

	gulp.src('src/**/*.html')
	    .pipe(plugins.htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'));

	gulp.src(['src/**/style.scss', 'node_modules/blueimp-gallery/css/blueimp-gallery.min.css'])
		.pipe(plugins.sass())
		.pipe(gulp.dest('dist/styles/'));

	gulp.src(['bower_components/bootstrap-sass/assets/fonts/**'])
		.pipe(gulp.dest('dist/fonts/'));
	gulp.src(['bower_components/bootstrap-sass/assets/javascripts/*.min.js', 'bower_components/jquery/dist/jquery.min.js', 'node_modules/blueimp-gallery/js/blueimp-gallery.min.js'])
		.pipe(gulp.dest('dist/scripts/'));
});

// Minify images
gulp.task('minifyimage', function() {
	gulp.src('src/images/*')
		.pipe(plugins.imagemin())
		.pipe(gulp.dest('dist/images'));

});

// gulp serve and livereload
gulp.task('serve', ['minifyimage'], function() {
	plugins.browserSync.init({
        server: "./dist"
    });

	gulp.watch(['src/**/*.js', 'src/**/*.html', 'src/**/*.scss'], ['default'])
		.on('change', plugins.browserSync.reload);
	gulp.watch(['src/images/*'], ['minifyimage'])
		.on('change', plugins.browserSync.reload);
});
