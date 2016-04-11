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
            var config=scope.config;
            
            if(config.fullpage){
                $alexandraUtils.fullPage(element);
            }

            var id=attrs.id||$alexandraUtils.createForestID();

            var configTree={
                type:config.type,
                colortype: config.colortype
            };

            $alexandraForest.createTree(id, configTree);

            var tree=$alexandra(id);

            tree.setContext(element);

            tree.configureCamera();

            tree.configureLights();
       

            tree.configureMesh();
            
            
            tree.build(scope.source);

            tree.configureRenderer();



            $alexandraInteractor(tElement, tree.getCamera());
            
            if(config.autorun){
                tree.run();
            }else{
                console.warn("No AutoRun")
            }
            
            

            if(config.streaming){
                scope.$watch("source", function(){
                    tree.reset();
                    tree.build(scope.source);
                });
            }


        }
    };
});