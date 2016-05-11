var gulp = require("gulp"),
    concat = require("gulp-concat"),
    sourcemaps = require("gulp-sourcemaps"),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    json2js = require('gulp-ng-json2js'),
    rename = require("gulp-rename"),
    del = require('del'),
    objParser = require("./gulp-obj-parser.js"),
    ngHtml2Js = require("gulp-ng-html2js");



gulp.task("obj", function () {
    return gulp.src("public/alexandra/assets/models/*.obj")
        .pipe(objParser())
        .pipe(gulp.dest("./public/alexandra/assets/models"));
});



gulp.task("models", ["obj"], function () {
    return gulp.src("public/alexandra/assets/models/*.json")
        .pipe(json2js({ moduleName: "alexandra" }))
        .pipe(concat("models_values.js"))
        .pipe(gulp.dest("./public/alexandra/src/components/values"));
});


gulp.task("textures", function () {
    return gulp.src("public/alexandra/assets/textures/*.json")
        .pipe(json2js({ moduleName: "alexandra" }))
        .pipe(concat("textures_values.js"))
        .pipe(gulp.dest("./public/alexandra/assets/textures/"));
});


gulp.task("clean-alexandra", function (cb) {
    del(['./public/alexandra/dist/alexandra.min.js'], cb);
});


gulp.task("build-js-alexandra", function () {
    return gulp.src("public/alexandra/src/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("alexandra.min.js"))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/alexandra/dist"));
});

gulp.task("build-alexandra", ["clean-alexandra", "build-js-alexandra"]);



gulp.task("alexandra", function () {
    return gulp.watch(["./public/alexandra/src/**/*.js"], ["build-alexandra"]);
});




gulp.task("clean-blaze", function (cb) {
    del(['public/blaze/dist/blaze.min.js'], cb);
});

gulp.task("build-js-blaze", function () {
    return gulp.src("public/blaze/dist/blaze.js")
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest("./public/blaze/dist"));
});

gulp.task("build-blaze", ["clean-blaze", "build-js-blaze"]);

gulp.task("blaze", function () {
    return gulp.watch(["./public/blaze/dist/blaze.js"], ["build-blaze"]);
});


gulp.task("clean", function (cb) {
    del(['public/app/dist/bundle.min.js', 'public/app/src/template-cache.js'], cb);
});



gulp.task("template-cache", function () {
    return gulp.src("public/app/src/views/**/*.html")
        .pipe(ngHtml2Js({ moduleName: "Application", prefix: "/views/" }))
        .pipe(concat("template-cache.js"))
        .pipe(gulp.dest("./public/app/src"));
});

gulp.task("build-js", ["template-cache"], function () {
    return gulp.src("public/app/src/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("bundle.min.js"))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/app/dist"));
});

gulp.task("build", ["clean", "build-js"]);

gulp.task("default", function () {
    return gulp.watch(["public/app/src/**/*.js", "public/app/src/views/**/*.html"], ["build"]);
});


const PACKAGES = "public/packages/";

var pkt = function (path) {
    return PACKAGES + path;
}

const paths = {
    bower: [
	   "gl-matrix/dist/gl-matrix.min.js",
        "async/dist/async.min.js",
        "chance/dist/chance.min.js",
        "lodash/dist/lodash.min.js",
         "three.js/three.min.js",
         "tween.js/src/Tween.js"
        
    ]
        .map(function (item) {
            return pkt(item);
        })
}



gulp.task("bower", function () {
    return gulp.src(paths.bower)
        .pipe(concat("bower.min.js"))
        .pipe(gulp.dest("./public/packages"));
});