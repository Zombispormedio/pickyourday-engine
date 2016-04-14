angular.module('alexandra')
    .directive('alexandraView', function($alexandraUtils, $alexandraForest, $alexandra, $alexandraInteractor) {

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



            switch(config.type){
                case "particle":{
                    tree.configureParticle();
                    tree.buildParticle(scope.source);
                     tree.configureRenderer();
                    break;
                }


                default:{
                    tree.configureLights();
                    tree.configureMesh();
                    tree.buildMeshBranch(scope.source);
                    tree.configureRenderer();
                }


            }





            $alexandraInteractor(tElement, tree.getCamera());

            if(config.autorun===false){
                console.warn("No AutoRun")
            }else{
                tree.run();
            }


            if(config.streaming){
                $alexandraUtils.watch(scope, "source", function(){
                    tree.reset();
                    tree.build(scope.source);
                });
            }

            $alexandraUtils.watch(scope, "config.type", function(){
                tree.setConfig(scope.config);

                switch(scope.config.type){
                    case "particle":
                        break;
                    default:
                        tree.resetMeshBranch();
                        tree.configureMesh();
                        tree.buildMeshBranch(scope.source);
                }

            });


        }
    };
});