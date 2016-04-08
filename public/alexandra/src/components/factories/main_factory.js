angular.module('alexandra')
    .factory('$alexandra', function($alexandraForest, $interval, SphereValue, DefaultMaterial, DefaultLightsConfig, DefaultCameraConfig) {

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
                camera.position=DefaultCameraConfig.position;
                Tree.MainCamera = camera;
                Tree.createMainChildNode("Camera", camera);

            },
            configureLights:function(){
                light=Tree.createLight(DefaultLightsConfig);
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
            
            getCamera:function(){
                
                return {
                    
                    
                    
                    
                };
                
            },
            
            run:function(){
                $interval(function(){
                    Tree.draw();
                }, 500);
            }


        }
    }
});