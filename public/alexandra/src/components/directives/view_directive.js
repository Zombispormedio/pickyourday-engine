angular.module('alexandra')
    .directive('alexandraView', function($alexandraUtils, $alexandraForest, $alexandra, $alexandraInteractor) {
    return {
        restrict: 'A',
        scope:{
            source:"=source"
        },
        link:function(scope, tElement, attrs){
            var element=tElement[0];

            if($alexandraUtils.validAttribute(attrs.fullPage)){
                $alexandraUtils.fullPage(element);
            }

            var id=attrs.id||$alexandraUtils.createForestID();

            var config={
                type:attrs.type
            };

            $alexandraForest.createTree(id, config);

            var tree=$alexandra(id);

            tree.setContext(element);

            tree.configureCamera();

            tree.configureLights();
       

            tree.configureMesh();
            

            tree.build(scope.source);

            tree.configureRenderer();



            $alexandraInteractor(tElement, tree.getCamera());

            if($alexandraUtils.validAttribute(attrs.autoRun)){
                tree.run();
            }

            if($alexandraUtils.validAttribute(attrs.streaming)){
                scope.$watch("source", function(){
                    tree.reset();
                    tree.build(scope.source);
                });
            }


        }
    };
});