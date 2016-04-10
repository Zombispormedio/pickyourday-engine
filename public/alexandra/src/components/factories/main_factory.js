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

                var trans_vec=[];


                for(var i=10;i<100;i+=10){
                    var t_x=Tree.createTransform();

                    var x_node=Tree.createMainChildNode("TrMesh", t_x);
                    x_node.createChildNode("Mesh", mesh);

                    t_x.position=[i, 0,0];


                    var t_y=Tree.createTransform();

                    var y_node=Tree.createMainChildNode("TrMesh", t_y);
                    y_node.createChildNode("Mesh", mesh);

                    t_y.position=[0, i,0];



                    var t_z=Tree.createTransform();

                    var z_node=Tree.createMainChildNode("TrMesh", t_z);
                    z_node.createChildNode("Mesh", mesh);

                    t_z.position=[0, 0,i];
                }





            },

            configure:function(){    
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

            run:function(){
                $interval(function(){
                    Tree.draw();
                }, 500);
            }


        }
    }
});