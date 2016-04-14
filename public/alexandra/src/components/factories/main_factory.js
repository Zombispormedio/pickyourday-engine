angular.module('alexandra')
    .factory('$alexandra', function($alexandraForest, $interval, SphereValue,CylinderValue, WallValue, ConeValue, CubeValue, VaribleDiffuseMaterial, DefaultMaterial, DefaultLightsConfig, DefaultCameraConfig) {

    return function(id, c){

        var Tree=$alexandraForest.getTree(id);
        var config=c;

        var camera, light, mesh, particle, transformation_buffer=[];

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



                switch(config.colortype){
                    case "variable":
                        mesh_config.material=VaribleDiffuseMaterial;
                        break;
                    default:
                        mesh_config.material=DefaultMaterial; 

                }



                mesh=Tree.createMesh(mesh_config);

            },


            configureRenderer:function(){ 
                var renderConfig={};
                switch(config.type){
                    case "particle":
                        renderConfig.typeShader="Particle";
                        break;
                        
                }
                Tree.configure(renderConfig);

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

            buildMeshBranch:function(source){
                transformation_buffer=source.map(function(item){
                    var tr=Tree.createTransform();
                    var trnode=Tree.createMainChildNode("TrMesh", tr);
                    var parent_node;

                    switch(config.colortype){
                        case "variable":
                            var diffuse=Tree.createDiffuse(item.color);
                            parent_node=trnode.createChildNode("Diffuse", diffuse);  
                            break;
                        default:
                            parent_node=trnode;
                    }


                    parent_node.createChildNode("Mesh", mesh);

                    if(item.position){
                        tr.position=item.position;
                    }

                    if(item.size){
                        tr.size=item.size;
                    }

                    if(item.rotation){

                        if(item.rotation.angle){
                            tr.rotation.angle=item.rotation.angle;
                        }
                        if(item.rotation.axis){
                            tr.rotation.axis=item.rotation.axis;
                        }


                    }


                    return trnode;

                });
            },

            configureParticle:function(){
                particle=Tree.createParticle(50);


            },

            buildParticle:function(source){
                particle.configure(source);
                var tr=Tree.createTransform();
                var trnode=Tree.createMainChildNode("TrParticle", tr);
                trnode.createChildNode("Particle", particle);
            

            },
            setConfig:function(new_config){
                config=new_config;
            },
            resetMeshBranch: function(){
                transformation_buffer.forEach(function(item){
                    Tree.removeMainChildNode(item);
                });
                transformation_buffer=[];
            },

            run:function(){
                $interval(function(){
                    Tree.draw();
                }, 30);
            }


        }
    }
});