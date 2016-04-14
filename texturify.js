var fs = require("fs");
var path = require("path");
var async = require("async");
var getPixels = require("get-pixels");

const DIR = "./public/alexandra/assets/textures";


String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

var formats = [".jpg", ".png"];


async.waterfall([
    function ReadShadersDir(next) {

        fs.readdir(DIR, function (err, files) {
            if (err) return next(err);

            filenames = files.filter(function (a) { return formats.indexOf(path.extname(a)) > -1; });
            next(null, filenames);
        });

    }, function Pixels(filenames, next) {

        async.reduce(filenames, {}, function (prev, item, callback) {

            var name = path.basename(item, path.extname(item)).capitalize();

            getPixels(DIR + "/" + item, function (err, pixels) {
                if (err) return callback(err);

                var image_array = Object.keys(pixels.data).map(function (a) {
                    return pixels.data[a];
                });
                
                prev[name]=image_array;
                callback(null, prev);

            });

        }, function (err, result) {
            if (err) return next(err);
            next(null, result);
        });


    }], function (err, result) {
        if (err) return console.log(err);
         fs.writeFileSync(DIR+"/texture.json", JSON.stringify(result));
        console.log("Images Finished");
    });