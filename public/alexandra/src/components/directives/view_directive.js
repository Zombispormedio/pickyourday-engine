angular.module('alexandra')
    .directive('alexandraView', function($alexandraUtils, $alexandraForest, $alexandra, $alexandraInteractor) {


    var configureMesh=function(tree){
        tree.configureLights();
        tree.configureMesh();
    }

    var configureParticle=function(tree){
        tree.configureParticle();
    }

    var buildMesh=function(tree, source){
        tree.buildMeshBranch(source);
    }

    var buildParticle=function(tree, source){
        tree.buildParticle(source);
    }

    var choose=function(tree, type, source, configurable, texturizable){
        switch(type){
            case "particle":{
                if(configurable){
                    configureParticle(tree);
                }
                if(texturizable){
                    tree.configureParticleTexture();
                }

                buildParticle(tree, source);

                break;
            }
            default:{
                if(configurable){
                    configureMesh(tree);
                }
                buildMesh(tree, source);  
            }

        }
    }

    return {
        restrict: 'A',
        scope:{
            source:"=alexandraSource",
            config:"=alexandraConfig"
        },
        link:function(scope, tElement, attrs){
            var element=tElement[0];
            var config=scope.config || {};

            if(config.fullpage){
                $alexandraUtils.fullPage(element);
            }

            var TreeId=attrs.id||$alexandraUtils.createForestID();

            $alexandraForest.createTree(TreeId);

            var tree=$alexandra(TreeId, config);

            tree.setContext(element);

            tree.configureCamera();


            choose(tree, config.type, scope.source, true, true);

            tree.configureRenderer();

            if(config.streaming){
                $alexandraUtils.watch(scope, "source", function(){
                    tree.reset();
                    choose(tree, config.type, scope.source);
                });
            }

            $alexandraUtils.watch(scope, "config.type", function(){
                tree.setConfig(scope.config);
                tree.reset();
                choose(tree, config.type, scope.source, true);
                tree.configureRenderer();
            });

            if(config.type==="particle"){

                $alexandraUtils.watch(scope, "config.particle.type", function(){
                     choose(tree, config.type, scope.source, true);
                });
            }



            $alexandraInteractor(tElement, tree.getCamera());

            if(config.autorun===false){
                console.warn("No AutoRun")
            }else{
                tree.run();
            }





        }
    };
});