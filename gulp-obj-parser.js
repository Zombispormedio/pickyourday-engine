var through = require("through2"),
    gutil = require("gulp-util");



function parseObj(data) {
    var obj = {
        v: [],
        vn: [],
        vt: [],
        iv: [],
        in: [],
        it: []
    };
    var lines = data.split("\n");

    var vertex = lines.filter(function(a) {
        return a[0] === 'v';
    });

    var index = lines.filter(function(a) {
        return a[0] === 'f';
    });



    vertex.forEach(function(item) {
        var elems = item.replace("\r", "").split(" ");
        var key = elems[0];

        obj[key] = obj[key].concat(elems.slice(1).filter(function(a) {
            return a !== "";
        }));
    });

    var tempIndex = [];
    index.forEach(function(item) {
        var elems = item.replace("\r", "").replace("f", "").split(" ");
        tempIndex = tempIndex.concat(elems.slice(1).filter(function(a) {
            return a !== "";
        }));
    });


    tempIndex.forEach(function(item) {

        var elems = item.split("/");

        if (elems[0] && elems[0] !== "")
            obj.iv.push(parseInt(elems[0]) - 1);

        if (elems[1] && elems[1] !== "")
            obj.in.push(parseInt(elems[1]) - 1);

        if (elems[2] && elems[2] !== "")
            obj.it.push(parseInt(elems[2]) - 1);
    });

    return obj;
}



module.exports = function(param) {
    "use strict";

    // if necessary check for required param(s), e.g. options hash, etc.
    /* if (!param) {
         throw new gutil.PluginError("gulp-obj-parser", "No param supplied");
     }*/

    // see "Writing a plugin"
    // https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/README.md
    function gulpObjParser(file, enc, callback) {
        /*jshint validthis:true*/

        // Do nothing if no contents
        if (file.isNull()) {
            this.push(file);
            return callback();
        }

        if (file.isStream()) {

            // http://nodejs.org/api/stream.html
            // http://nodejs.org/api/child_process.html
            // https://github.com/dominictarr/event-stream

            // accepting streams is optional
            this.emit("error",
                new gutil.PluginError("gulp-obj-parser", "Stream content is not supported"));
            return callback();
        }

        // check if file.contents is a `Buffer`
        if (file.isBuffer()) {

            // manipulate buffer in some way
            // http://nodejs.org/api/buffer.html
            var value = JSON.stringify(parseObj(file.contents.toString()));

            file.contents = new Buffer(value);
            file.path = gutil.replaceExtension(file.path, '.json');
            this.push(file);

        }
        return callback();
    }

    return through.obj(gulpObjParser);
};
