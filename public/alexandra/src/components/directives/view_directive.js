angular.module('alexandra')
    .directive('alexandraView', function($alexandraUtils, $alexandraForest, $alexandraMain, $alexandraInteractor, $alexandra) {


    var configureMesh=function(tree){
        tree.configureLights();
        tree.configureMesh();
    }

    var configureCustom=function(tree, source){
        tree.configureLights();
        tree.configureAndBuildCustomMesh(source);
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

    var choose=function(tree, type, source, config){
        config=config||{}
        switch(type){

            case "custom":{
                configureCustom(tree, source);

                break;
            }

            case "particle":{
                if(config.reseteable){
                    tree.resetParticle();
                }

                if(config.configurable){
                    configureParticle(tree);
                }
                if(config.texturizable){
                    tree.configureParticleTexture();
                }

                buildParticle(tree, source);

                break;
            }
            default:{
                if(config.reseteable){
                    tree.resetMesh();
                }
                if(config.configurable){
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

            var tree=$alexandraMain(TreeId, config);

            $alexandra.setView(TreeId, tree);

            tree.setContext(element);

            tree.configureCamera();

            if(config.axis){
                tree.configureAxis();
            }

            if(config.grid){
                tree.configureGrid();
            }


            tree.configureLabels();


            if(config.selector){
                tree.configureSelector();
            }


            choose(tree, config.type, scope.source, {configurable:true, texturizable:true});

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
                choose(tree, config.type, scope.source, {configurable:true, reseteable:true});
                tree.configureRenderer();
            });

            if(config.type==="particle"){
                $alexandraUtils.watch(scope, "config.particle.type", function(){
                    tree.setConfig(scope.config);
                    tree.reset();
                    choose(tree, config.type, scope.source, {configurable:true, reseteable:true});
                });
            }



            $alexandraInteractor(tElement, tree.getCamera(), tree);

            if(config.autorun!==false){
                tree.run();
            }




        }
    };
});