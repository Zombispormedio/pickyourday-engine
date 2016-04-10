angular.module('alexandra')
    .factory('$alexandra', function($alexandraForest, $interval, SphereValue, ConeValue, CubeValue, DefaultMaterial, DefaultLightsConfig, DefaultCameraConfig) {

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
                camera.zoom=6;
                Tree.MainCamera = camera;
                Tree.createMainChildNode("Camera", camera);

            },
            configureLights:function(){
                light=Tree.createLight(DefaultLightsConfig);
                Tree.createMainChildNode("Light", light);
            },

            configureMesh:function(){
                config=config||{}

                var tr=Tree.createTransform();

                switch(config.type){
                    case "cone":
                        mesh=Tree.createMesh(ConeValue, DefaultMaterial);
                        tr.setAngle(90);
                        tr.setAxis([0,0,1]);
                        break;
                    case "cube":
                        mesh=Tree.createMesh(CubeValue, DefaultMaterial);
                        break;
                    case "sphere":
                    default:
                        mesh=Tree.createMesh(SphereValue, DefaultMaterial);

                        break;
                }


                var trnode=Tree.createMainChildNode("TrMesh", tr);
                trnode.createChildNode("Mesh", mesh);
                tr.position=[0, 0, 0];


                var mesh2=Tree.createMesh(SphereValue, DefaultMaterial);
                var tr2=Tree.createTransform();
                var trnode2=Tree.createMainChildNode("TrMesh", tr2);
                trnode2.createChildNode("Mesh", mesh2);
                tr2.position=[-2, 0, -1.8];
                tr2.size=[0.5,0.5,0.5];

            },

            configure:function(){    
                Tree.configure();
                console.log(Tree);
            },

            getCamera:function(){

                return {

                    getPosition:function(){
                        return camera.position;
                    },
                    changeAzimuth:function(v){
                        camera.changeAzimuth(v);
                    },
                    changeElevation:function(v){
                        camera.changeElevation(v);
                    }



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