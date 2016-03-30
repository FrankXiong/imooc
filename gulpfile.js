var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    webserver = require('gulp-webserver'),
    config = require('./config.json'),
    opn = require('opn');
    clean = require('gulp-clean');

gulp.task('default',function() {
    gulp.run("clean");
    gulp.run("libs");
    gulp.run("generate");
    gulp.run("watch");
    // gulp.run("server");
    gulp.run("openbrowser");
});


gulp.task('css', function() {  
  return gulp.src('src/css/*.css')
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    // .pipe(concat('main.css'))
    // .pipe(minifycss())
    .pipe(gulp.dest('dist/static/css'))
    .pipe(livereload())
    .pipe(notify({ message: 'CSS task complete' }));
});

gulp.task('js', function() {  
  return gulp.src('src/js/**/*.js')
    // .pipe(uglify())
    .pipe(gulp.dest('dist/static/js'))
    .pipe(livereload())
    .pipe(notify({ message: 'Scripts task complete' }));
});

// gulp.task('img', function() {  
//   return gulp.src('src/images/**/*')
//     .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
//     .pipe(gulp.dest('dist/static/img'))
//     .pipe(livereload())
//     .pipe(notify({ message: 'Images task complete' }));
// });

// gulp.task('font', function() {  
//   return gulp.src('src/fonts/**/*')
//     .pipe(gulp.dest('dist/static/font'))
//     .pipe(livereload())
//     .pipe(notify({ message: 'Fonts task complete' }));
// });

// gulp.task('jade', function() {
//     gulp.src(['src/views/*.jade'])
//         .pipe(gulp.dest('dist/'))
//         .pipe(livereload())
//         .pipe(notify({message: 'jade task complete'}));
// });

var libs = {
    js: [
        "vendor/assets/requirejs/require.js",
        "vendor/assets/jquery/dist/jquery.js",
        "vendor/assets/bootstrap/dist/js/bootstrap.js"
    ],
    css:[
        "vendor/assets/bootstrap/dist/css/bootstrap.css"
    ]
};

gulp.task("libs", function() {
  gulp.src(libs.js)
    .pipe(uglify())
    .pipe(gulp.dest('dist/static/js/lib'))
    .pipe(notify({ message: 'Libs-Scripts task complete' }));

  gulp.src(libs.css)
    .pipe(minifycss())
    .pipe(gulp.dest('dist/static/css'))
    .pipe(notify({ message: 'Libs-Stylesheets task complete!' }));

  // gulp.src(libs.font)
  //   .pipe(gulp.dest('dist/static/fonts'))
  //   .pipe(notify({ message: 'Libs-Fonts task complete!' }));
});

// gulp.task("data", function() {
//   gulp.src('src/datas/*.json')
//     .pipe(gulp.dest('dist/static/data'))
//     .pipe(notify({ message: 'JSON Data Updated!' }));
// });


// //开启本地 Web 服务器功能
// gulp.task('server', [ 'generate' ],function() {
//   gulp.src( ['./dist'] )
//     .pipe(webserver({
//       host:             config.localserver.host,
//       port:             config.localserver.port,
//       livereload:       true,
//       directoryListing: false
//     }));
// });

//通过浏览器打开本地 Web服务器 路径
gulp.task('openbrowser', function() {
  opn( 'http://' + config.localserver.host + ':' + config.localserver.port );
});

gulp.task('generate', ['css', 'js']);

gulp.task('clean', function() {
  return gulp.src([
      './dist/static/css/*.min.css',
      './dist/static/css/*.css',
      './dist/static/img/*.*',
      './dist/static/js/*.js',
      './dist/static/js/*.min.js',
      './dist/static/font/*.*'
      ], {read: false})
    .pipe(clean({force: true}));
});


gulp.task('reload', ['clean', 'default']);

gulp.task('watch', function() {

    livereload.listen();
    gulp.watch(['src/**']).on('change', livereload.changed);

    // Watch .css files/
    gulp.watch('src/css/**/*.css', ['css']);
    gulp.watch('src/css/*.css', ['css']);

    // Watch .js files
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/js/**/*.js', ['js']);

});




