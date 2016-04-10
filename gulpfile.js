var gulp = require("gulp"),
    concat = require("gulp-concat"),
    sourcemaps = require("gulp-sourcemaps"),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    json2js = require('gulp-ng-json2js'),
    rename = require("gulp-rename"),
    del = require('del'),
    objParser = require("./gulp-obj-parser.js");



gulp.task("obj", function() {
    return gulp.src("public/alexandra/assets/models/*.obj")
        .pipe(objParser())
        .pipe(gulp.dest("./public/alexandra/assets/models"));
});



gulp.task("models", ["obj"], function() {
    return gulp.src("public/alexandra/assets/models/*.json")
        .pipe(json2js({ moduleName: "alexandra" }))
        .pipe(concat("models_values.js"))
        .pipe(gulp.dest("./public/alexandra/src/components/values"));
});


gulp.task("clean-alexandra", function(cb) {
    del(['./public/alexandra/dist/alexandra.min.js'], cb);
});


gulp.task("build-js-alexandra", function() {
    return gulp.src("public/alexandra/src/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("alexandra.min.js"))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/alexandra/dist"));
});

gulp.task("build-alexandra", ["clean-alexandra", "build-js-alexandra"]);



gulp.task("alexandra", function() {
    return gulp.watch(["./public/alexandra/src/**/*.js"], ["build-alexandra"]);
});




gulp.task("clean-blaze", function(cb) {
    del(['public/blaze/dist/blaze.min.js'], cb);
});

gulp.task("build-js-blaze", function() {
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

gulp.task("blaze", function() {
    return gulp.watch(["./public/blaze/dist/blaze.js"], ["build-blaze"]);
});
