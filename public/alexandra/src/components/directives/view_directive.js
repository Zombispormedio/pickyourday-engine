angular.module('alexandra')
    .directive('alexandraView', function($alexandraUtils, $alexandraForest, $alexandra) {
    return {
        restrict: 'A',
        link:function(scope, tElement, attrs){
            var element=tElement[0];
            console.log(attrs);
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
            tree.configure();
            
            
       
            if(attrs.auto==="" && attrs.auto!=="false"){
                  tree.run();
            }
          
            
        }
    };
});