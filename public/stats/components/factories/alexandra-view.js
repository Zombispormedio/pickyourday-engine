angular.module('alexandra')
    .factory('$alexandraView', function() {
    var x=0;

    return {

        inc:function(){
            x++;
        },
        show:function(){
            console.log(x);
        }


    }
});