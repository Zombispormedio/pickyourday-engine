var fs = require("fs");
var path = require("path");
var async = require("async");

const BLAZE_DIR = "./public/blaze";
const BLAZE_SHADERS_DIR = BLAZE_DIR + "/shaders/";
const DST_DIR=BLAZE_DIR+"/src/";


String.prototype.capitalize= function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

async.waterfall([
    function ReadShadersDir(next) {

        fs.readdir(BLAZE_SHADERS_DIR, function(err, files) {
            if (err) return next(err);

            var worker = {
                fragments_files: files.filter(function(a) { return path.extname(a) === ".frag"; }),
                vertex_files: files.filter(function(a) { return path.extname(a) === ".vert"; })
            };

            next(null, worker);

        });

    },

    function CreateFragmentClass(worker, next) {

        var source = "export class Fragment{\n";

        async.eachSeries(worker.fragments_files, function iterate(item, callback) {
              
              
              var name=path.basename(item, '.frag');
              var static="static "+name.capitalize()+":string=`";
              fs.readFile(BLAZE_SHADERS_DIR+item, function(err, data){
                  
                  if(err){
                   
                      return callback();
                      }
               
                  static+=data+"`;";
                  source+=static+"\n";
                  callback();
              });         

        }, function done() {
 
            worker.fragment_source = source+"}\n";
            
            next(null, worker);


        });





    },
    function CreateVertexClass(worker, next) {
        var source = "export class Vertex{\n";

        async.eachSeries(worker.vertex_files, function iterate(item, callback) {
              
              
              var name=path.basename(item, '.vert');
              var static="static "+name.capitalize()+":string=`";
              fs.readFile(BLAZE_SHADERS_DIR+item, function(err, data){
                  
                  if(err){
                   
                      return callback();
                      }
               
                  static+=data+"`;";
                  source+=static+"\n";
                  callback();
              });         

        }, function done() {
 
            worker.vertex_source = source+"}\n";
            
            next(null, worker);


        });
    },
    function CreateShaderModel(worker, next) {
        var s="module Shaders{\n"+worker.fragment_source+worker.vertex_source+"}\n";
        
        fs.writeFile(DST_DIR+"Shaders.ts", s, function(err){
           next(err); 
        });
        
        
    }

], function(err) {
    if (err) console.log(err);
   console.log("Shaders Source Compilation Finished!"); 
});