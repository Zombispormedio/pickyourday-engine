angular.module('alexandra')
    .factory('$alexandra', function($alexandraForest, $interval, SphereValue, DefaultMaterial) {

    return function(id){

        var group=$alexandraForest.getTree(id);

        var Tree=group.tree;
        var config=group.config;


        var camera, light, mesh;


        return {
            setContext:function(canvas){
                Tree.setContext(canvas);
            },

            configureCamera:function(){
                camera=Tree.createCamera();
                camera.position=[0,0,100];
                Tree.MainCamera = camera;
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

            configureMesh:function(){
                config=config||{}

                switch(config.type){
                    case "sphere":
                    default:
                        mesh=Tree.createMesh(SphereValue, DefaultMaterial);
                        break;
                }


                var tr=Tree.createTransform();
                var trnode=Tree.createMainChildNode("TrMesh", tr);
                trnode.createChildNode("Mesh", mesh);

                tr.setAngle(90);
                tr.setAxis([0,1,0]);
                tr.position=[0, 0, 0];

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