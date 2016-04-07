angular.module('alexandra')
    .factory('$alexandra', function($alexandraForest, $interval) {

    return function(id){

        var group=$alexandraForest.getTree(id);

        var Tree=group.tree;
        var config=group.config;

        console.log(Tree)

        var camera, light;


        return {
            setContext:function(canvas){
                Tree.setContext(canvas);
            },

            configureCamera:function(){
                camera=Tree.createCamera();
                camera.position=[0,0,10];
                camera.zoom=6;
                Tree.createMainChildNode("Camera", camera);
            },
            configureLights:function(){
                light=Tree.createLight({
                    direction: [0.0, -1.0, -1.0],
                    ambient: [0.03, 0.03, 0.03, 1.0],
                    diffuse: [1.0, 1.0, 1.0, 1.0],
                    specular: [1.0, 1.0, 1.0, 1.0]
                });
                Tree.createMainChildNode("Light", light);
            },
            configure:function(){
                Tree.configure();
            },
            run:function(){
                $interval(function(){
                    Tree.draw();
                }, 500);
            }


        }
    }
});