angular.module('alexandra')
    .factory('$alexandraInteractor', function(){

    return function(element, camera){
        console.log(element);
        console.log(camera)
    }
    
});