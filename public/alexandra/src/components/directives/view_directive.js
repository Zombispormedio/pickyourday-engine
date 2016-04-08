angular.module('alexandra')
    .directive('alexandraView', function($alexandraUtils, $alexandraForest, $alexandra, $alexandraInteractor) {
    return {
        restrict: 'A',
        link:function(scope, tElement, attrs){
            var element=tElement[0];
            
            if(attrs.fullpage=="true"){
                $alexandraUtils.fullPage(element);
            }

            var id=attrs.id||$alexandraUtils.createID();

            var config={
                type:attrs.type
            };

            $alexandraForest.createTree(id, config);

            var tree=$alexandra(id);

            tree.setContext(element);

            tree.configureCamera();
            
            tree.configureLights();
            
            tree.configureMesh();
            
            tree.configure();
            
            $alexandraInteractor(element, tree.getCamera());
            
            if(attrs.auto==="" && attrs.auto!=="false"){
                  tree.run();
            }
          
            
        }
    };
});