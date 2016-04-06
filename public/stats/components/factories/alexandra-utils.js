angular.module('alexandra')
    .factory('$alexandraUtils', function() {
    return {

        fullPage:function(elem){
            return function(){
                elem.width=window.innerWidth;
                elem.height=window.innerHeight;
            }

        }

    }
});