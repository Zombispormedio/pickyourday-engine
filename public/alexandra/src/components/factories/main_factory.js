angular.module('alexandra')
    .factory('$alexandra', function($alexandraForest, $interval, SphereValue,CylinderValue, WallValue, ConeValue, CubeValue, MaterialValue, CameraValue, LightValue, TextureValue) {

    return function(id, c){

        var Tree=$alexandraForest.getTree(id);
        var config=c;

        var camera, light, mesh, particle, transformation_buffer=[], textures={};

        return {
            setContext:function(canvas){
                Tree.setContext(canvas);
            },

            configureCamera:function(){
                camera=Tree.createCamera();
                var camera_config=CameraValue.default;
                camera.position=camera_config.position;
                camera.azimuth=camera_config.azimuth;
                camera.elevation=camera_config.elevation;
                Tree.MainCamera = camera;
                Tree.createMainChildNode("Camera", camera);

            },
            configureLights:function(){
                light=Tree.createLight(LightValue.default);
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
                        mesh_config.material=MaterialValue.variable;
                        break;
                    default:
                        mesh_config.material=MaterialValue.default; 
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
                config.particle=config.particle||{};
                particle=Tree.createParticle(config.particle.size||5);
            },

            configureParticleTexture:function(){

                var canvas=document.createElement("canvas");
                var ctx=canvas.getContext("2d");

                textures.particle={};
                for(var key in TextureValue){
                    var data=TextureValue[key];
                    var len=data.length;
                    var dimensions=Math.sqrt(len/4);

                    var imgData=ctx.createImageData(dimensions,dimensions);

                    for (var i=0;i<len;i+=4){
                        imgData.data[i+0]=data[i+0];
                        imgData.data[i+1]=data[i+1];
                        imgData.data[i+2]=data[i+2];
                        imgData.data[i+3]=data[i+3];
                    }

                    textures.particle[key]=imgData;

                }



            },

            buildParticle:function(source){
                var format_source=source.reduce(function(prev, item){
                    var position=item.position;
                    for(var i=0;i<position.length;i++){
                        prev.push(position[i]);
                    }
                    return prev;
                }, []);
                var texture;

                switch(config.particle.type){

                    case "fire":
                        texture=textures.particle.Fire;
                        break;
                    case "fire2":
                        texture=textures.particle.Fire2;
                        break;
                    case "flower":
                        texture=textures.particle.Flower;
                        break;
                    case "fog":
                        texture=textures.particle.Fog;
                        break;
                    case "light":
                        texture=textures.particle.Light;
                        break;
                    case "spark":
                        texture=textures.particle.Spark;
                        break;
                    case "spatial":
                        texture=textures.particle.Spatial;
                        break;
                    case "star":
                        texture=textures.particle.Star;
                        break;
                    case "warning":
                        texture=textures.particle.Warning;
                        break;
                    case "acid":
                        texture=textures.particle.Acid;
                        break;
                    case "fireball":
                        texture=textures.particle.Fireball;
                        break;
                    case "firebust":
                        texture=textures.particle.Firebust;
                        break;
                    case "flash":
                        texture=textures.particle.Flash;
                        break;
                    case "starbust":
                        texture=textures.particle.Starbust;
                        break;
                    case "aura":
                        texture=textures.particle.Aura;
                        break;
                    case "bolt":
                        texture=textures.particle.Bolt;
                        break;
                    case "energy":
                        texture=textures.particle.Energy;
                        break;
                    case "energy2":
                        texture=textures.particle.Energy2;
                        break;
                    case "energy3":
                        texture=textures.particle.Energy3;
                        break;
                    case "misc":
                        texture=textures.particle.Misc;
                        break;

                    case "misc2":
                        texture=textures.particle.Misc2;
                        break;
                    case "pink":
                        texture=textures.particle.Pink;
                        break;

                    case "plasma":
                        texture=textures.particle.Plasma;
                        break;
                    case "plasma2":
                        texture=textures.particle.Plasma2;
                        break;
                    case "purple":
                        texture=textures.particle.Purple;
                        break;
                    case "ray":
                        texture=textures.particle.Ray;
                        break;
                    case "smoke":
                        texture=textures.particle.Smoke;
                        break;
                    case "water":
                        texture=textures.particle.Water;
                        break;
                    case "water2":
                        texture=textures.particle.Water2;
                        break;
                    case "drop":
                        texture=textures.particle.Drop;
                        break;


                    default:
                        texture=textures.particle.Default;
                }


                particle.configure(format_source, texture);

                var tr=Tree.createTransform();
                var trnode=Tree.createMainChildNode("TrParticle", tr);
                trnode.createChildNode("Particle", particle);
                transformation_buffer.push(trnode);

            },
            setConfig:function(new_config){
                config=new_config;
            },
            resetParticle:function(){
                Tree.removeTexture(particle.textureID);
                particle=null;
            },
            resetMesh:function(){
                mesh=null;
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
                }, 30);
            }


        }
    }
});