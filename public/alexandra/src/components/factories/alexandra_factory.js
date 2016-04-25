angular.module('alexandra')
    .factory('$alexandra', function() {
    
    
    var Views={};
    return {


        setView:function(id, scene){

           Views[id]=scene;

        },

        getView:function(id){
            return Views[id];
        },

        removeView:function(id){
            delete View[id];
        }



    }
    
});