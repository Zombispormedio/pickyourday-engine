var path = require("path"),
    rootPath = path.normalize(__dirname + "/..");

var rootfunc = function (basename) {
    return path.normalize(rootPath+"/"+basename);
};


var secure = function (value) {
    return { writable: false, configurable: true, value: value };
};

var secure_path=function(basename){
    return secure(rootfunc(basename));
}

var Config = Object.create(null);
Config.prototype = {};
var config = Object.create(Config.prototype, {

	db_secure: secure("mongodb://127.0.0.1:27017/pickyourday"),
    root: secure(rootPath),
    config: secure_path("config/"),
    routes: secure_path("app/routes/"),
    lib:secure_path("app/lib/"),
    models:secure_path("app/models/"),
    ctrl:secure_path("app/ctrl/"),
    port:secure(process.env.PORT || 5001)
});



module.exports = config;