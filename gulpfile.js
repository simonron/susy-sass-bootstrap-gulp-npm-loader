// Gulpfile
var env = require('minimist')(process.argv.slice(2)),
	gulp = require('gulp'),
	gutil = require('gulp-util'),
	imagemin = require('gulp-imagemin'),
	livereload = require('gulp-livereload'),
	sass = require('gulp-sass'),
	csso = require('gulp-csso'), // CSS compressor
	coffee = require('gulp-coffee'),
	connect = require('gulp-connect'),
	uglify = require('gulp-uglify'),
	pug = require('gulp-pug'),
	inject = require('gulp-inject'),
  wiredep = require('wiredep').stream,
	concat = require('gulp-concat'),
	tinylr = require('tiny-lr'),
	express = require('express'),
	app = express(),
	marked = require('marked'),  
	path = require('path'),
	neat = require('node-neat').includePaths,
	server = tinylr(),
	sourcemaps = require('gulp-sourcemaps'),
	includePaths = require('normalize-path').includePaths,
	coffeeSources = ['scripts/hello.coffee'],
	jsSources = ['scripts/*.js'],
	imgSources = ['images/*'],
	sassSources = ['styles/*.scss'],
	lessSources = ['public/lib/bootstrap/less'],
	partialSources = ['partials/*.scss'],
	htmlSources = ['index.html'],
	phpSources = ['index.php'],
	compass = require('gulp-compass'),
	gulpif = require('gulp-if'),
	modRewrite = require('connect-modrewrite'),
	outputDir = '../';


gulp.task('log', function () {
	gutil.log('== My First Task ==')
});

/*gulp.task('copy', function () {
	gulp.src('index.html')	.pipe(gulp.dest("build"))
});*/

// Call Sass
/*gulp.task('compass', function(){
	return gulp.src('src/sass/main.scss')
		.pipe(compass({
			css: 'src/css',
			sass: 'src/sass',
			image: 'src/img'

		}))
		.pipe(gulpif(env.p, cssmin()))
		.pipe(gulp.dest('build/css/'))
		.pipe(connect.reload());
});*/

// Call Jade for compile Templates

gulp.task('pug', function(){
	return gulp.src('src/templates/*.pug')
		.pipe(pug({pretty: !env.p }))
		.pipe(gulp.dest('build/'))
		.pipe(connect.reload());
});

gulp.task('sass', function () {
	gulp.src(sassSources)
		// Initializes sourcemaps
		.pipe(sourcemaps.init())
		.pipe(sass({
			style: 'expanded'
		}))
		.on('error', gutil.log)
		.pipe(csso())
		// Writes sourcemaps into the CSS file
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(outputDir + "css/"))
		.pipe(connect.reload())
});

gulp.task('coffee', function () {
	gulp.src(coffeeSources)
		.pipe(coffee({
				bare: true
			})
			.on('error', gutil.log))
		.pipe(gulp.dest(outputDir + "js/"))
});

gulp.task('js', function () {
	gulp.src(jsSources)
		.pipe(uglify())
		.pipe(concat('script.js'))
		.pipe(gulp.dest(outputDir + "js/"))
		.pipe(connect.reload())
});
gulp.task('ie', function () {
	return gulp.src('src/assets/scripts/ie/*.js')
		.pipe(gulp.dest('dist/assets/js/ie/'))
		.pipe(livereload(server));
});

gulp.task('images', function () {
	gulp.src(imgSources)
		.pipe(imagemin())
		.pipe(gulp.dest(outputDir + "images/"))
		.pipe(livereload(server));
});


//gulp.task('images', function () {
//	return gulp.src('src/assets/images/**/*')
//		.pipe(gulp.dest('dist/assets/images/'))
//		.pipe(livereload(server));
// });

gulp.task('fonts', function () {
	return gulp.src('src/fonts/**/*')
		.pipe(gulp.dest(outputDir + "fonts/"))
		.pipe(livereload(server));
});

gulp.task('templates', function () {
	return gulp.src('src/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(outputDir))
		.pipe(livereload(server));
});

gulp.task('express', function () {
	app.use(express.static(path.resolve(outputDir)));
	app.listen(1337);
	gutil.log('Listening on port: 1337');
});

gulp.task('watch', function () {
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch(sassSources, ['sass']);
	gulp.watch(partialSources, ['sass']);
	gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function () {
	connect.server({
		root: '../',
		livereload: true
	})
});

gulp.task('html', function () {
	gulp.src(htmlSources)
		.pipe(gulp.dest(outputDir))
		.pipe(connect.reload())
});

gulp.task('php', function () {
	gulp.src(phpSources)
		.pipe(gulp.dest(outputDir))
		.pipe(connect.reload())
});

/*gulp.task('default', ['html','copy','js','images', 'fonts', 'templates', 'express', 'sass', 'connect', 'watch']);*/


gulp.task('default', ['html','php','pug', 'coffee', 'js', 'ie', 'images', 'fonts', 'templates', 'express', 'sass', 'connect', 'watch']);