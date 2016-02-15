var fs=require("fs");
var async=require("async");
const CONFIG="./config_modules.json";
const SRC_DIR="./public/src/";
const DST_DIR="./public/dist/";
const MODULE_NAME="Engine";
const DST_FILE="pickyourday-engine";


function run_cmd(cmd, args, cb,end) {
    var spawn = require('child_process').spawn,
        child = spawn(cmd, args),
        me=this;
        
    child.stdout.on('data', function (buffer) { cb(me, buffer); });
    child.stdout.on('end', end);
}



async.waterfall([
    function getConfig(next){
        fs.readFile(SRC_DIR+CONFIG, function(err, result){
            if(err)return next(err);
            var str=result.toString();
            var seq=JSON.parse(str);
            next(null, seq);
        });
    }, function getModule(seq, next){
        var modules="";
        async.eachSeries(seq, function(item, callback){
            fs.readFile(SRC_DIR+item, function(err, result){
                if(err)return callback();
                modules+= "export "+result.toString()+"\n";
                callback();
            });
        }, function(err){
           if(err)return next(err);
           
           var init="module "+MODULE_NAME+" {\n";
           var end="}";
         
            next(null, init+modules+end);
        });
    }, 
    function writeModule(src, next){
        fs.writeFile(SRC_DIR+MODULE_NAME+".ts", src, function(err){
           if(err)next(err);
           next(); 
        });
    },
    function buidlModule(next){
      
    console.log('Building DIST');
    
        run_cmd("tsc.cmd", ["--out", DST_DIR+DST_FILE+".js", SRC_DIR+MODULE_NAME+".ts", "--target", "ES5"], function(me, buffer){
          console.log( buffer.toString());
            
        },function(){
            next();
        });
    }
    
], function(err){
    if(err)return console.log(err);
    console.log('Module Built');
    
});