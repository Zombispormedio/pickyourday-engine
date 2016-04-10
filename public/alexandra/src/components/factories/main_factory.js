angular.module('alexandra')
    .factory('$alexandra', function($alexandraForest, $interval, SphereValue,CylinderValue, WallValue, ConeValue, CubeValue, VaribleDiffuseMaterial, DefaultLightsConfig, DefaultCameraConfig) {

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

                var mesh_config={};
                switch(config.type){               
                    case "cylinder":
                        mesh_config.mesh=CylinderValue;
                        break;
                    case "wall":
                        mesh_config.mesh=WallValue;
                        break;
                    case "cone":
                        mesh_config.mesh=ConeValue;
                        break;
                    case "cube":
                        mesh_config.mesh=CubeValue; 
                        break;
                    case "sphere":
                    default:
                        mesh_config.mesh=SphereValue;
                        break;
                }
                
                mesh_config.material=VaribleDiffuseMaterial;
                
                mesh=Tree.createMesh(mesh_config);

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
                    },
                    setPositionX:function(x){
                        camera.position[0]+=x;
                    },
                     setPositionY:function(y){
                        camera.position[1]+=y;
                    }
                };

            },

            build:function(source){
                transformation_buffer=source.map(function(item){
                    var tr=Tree.createTransform();
                    var trnode=Tree.createMainChildNode("TrMesh", tr);
                    var diffuse=Tree.createDiffuse(item.diffuseColor);
                    
                    var dnode=trnode.createChildNode("Diffuse", diffuse);
                    
                    dnode.createChildNode("Mesh", mesh);
                    tr.position=item.position;
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