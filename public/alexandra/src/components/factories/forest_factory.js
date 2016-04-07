angular.module('alexandra')
    .factory('$alexandraForest', function() {

    var forest={};
    return {


        createTree:function(id, config){
            
            var new_tree=new Blaze.SceneGraph();
            
            forest[id]={
                tree:new_tree,
                config:config
            }
            
        },
        
        getTree:function(id){
            return forest[id];
        },
        
        removeTree:function(id){
            delete forest[id];
        }
        
        

    }
});