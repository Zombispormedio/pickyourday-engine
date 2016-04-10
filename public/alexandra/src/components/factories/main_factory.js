angular.module('alexandra')
    .factory('$alexandra', function($alexandraForest, $interval, SphereValue, ConeValue, CubeValue, DefaultMaterial, DefaultLightsConfig, DefaultCameraConfig) {

    return function(id){

        var group=$alexandraForest.getTree(id);

        var Tree=group.tree;
        var config=group.config;

        var camera, light, mesh, transformation_buffer=[];

        return {
            setContext:function(canvas){
                Tree.setContext(canvas);
            },

            configureCamera:function(){
                camera=Tree.createCamera();
                camera.position=DefaultCameraConfig.position;
                camera.azimuth=DefaultCameraConfig.azimuth;
                camera.elevation=DefaultCameraConfig.elevation;
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
                    case "cone":
                        mesh=Tree.createMesh(ConeValue, DefaultMaterial);
                        break;
                    case "cube":
                        mesh=Tree.createMesh(CubeValue, DefaultMaterial);
                        break;
                    case "sphere":
                    default:
                        mesh=Tree.createMesh(SphereValue, DefaultMaterial);
                        break;
                }

            },


            configureRenderer:function(){    
                Tree.configure();
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
                    },
                    zoom:function(v){
                        camera.zoom=v;
                    }
                };

            },

            build:function(source){
                transformation_buffer=source.map(function(item){
                    var tr=Tree.createTransform();
                    var trnode=Tree.createMainChildNode("TrMesh", tr);
                    trnode.createChildNode("Mesh", mesh);
                    tr.position=item;
                    return trnode;

                });
            },

            reset: function(){
                 transformation_buffer.forEach(function(item){
                     Tree.removeMainChildNode(item);
                 });
                transformation_buffer=[];
            },

            run:function(){
                $interval(function(){
                    Tree.draw();
                }, 500);
            }


        }
    }
});