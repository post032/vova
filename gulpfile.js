"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var pug = require("gulp-pug");
var rename = require("gulp-rename");
// var imagemin = require("gulp-imagemin");
// var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");

gulp.task("css", function() {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("pug", function() {
	return gulp.src("source/pug/pages/*.pug")
		.pipe(plumber())
	    .pipe(pug({
	    	pretty: true  // получивший код было удобно читать
	    }))
      .pipe(gulp.dest("build"))
      .pipe(server.stream());
});

// gulp.task("html", function() {
//   return gulp.src("source/*.html")
//     .pipe(posthtml([
//       include()
//     ]))
//     .pipe(gulp.dest("build"));
// });

gulp.task("server", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  // gulp.watch('source/pug/pages/*.pug',gulp.series("source"));
  gulp.watch("source/less/**/*.less", gulp.series("css"));
  // gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/pug/**/*.pug", gulp.series("pug"));
  // gulp.watch("source/*.html", gulp.series("html", "refresh"));
});
// gulp.task("images", function() {
//   return gulp.src("source/img/**/*.{png,jpg,svg}")
//     .pipe(imagemin([
//       imagemin.optipng({
//         optimizationlevel: 3
//       }),
//       imagemin.jpegtran({
//         progressive: true
//       }),
//       imagemin.svgo()
//     ]))
//     .pipe(gulp.dest("source/img"));
// });
// gulp.task("sprite", function() {
//   return gulp.src("source/img/*.svg")
//     .pipe(svgstore({
//       inlineSvg: true
//     }))
//     .pipe(gulp.dest("build/img"));
// });



gulp.task("copy", function() {
  return gulp.src([
      "source/fonts/**/*.{woff, woff2}",
      "source/img/**",
      "source/js/**",
      "source/css/*.css",
      "source/send/*.php"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});
gulp.task("clean", function() {
  return del("build");
})
gulp.task("refresh", function(done) {
  server.reload();
  done;
});

gulp.task("build", gulp.series("clean", "copy", "css", "pug"));
gulp.task("start", gulp.series("build", "server"));
