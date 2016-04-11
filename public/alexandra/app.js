var app = angular.module('alexandraExample', ["alexandra"]);

angular.module('alexandraExample')
    .controller('AlexandraExampleController', function($scope, $interval, $timeout) {

    function generate(){
      var range={min: 0, max: 100};
        var rangeColor={min:0, max:1, fixed:2};
        var count=50||chance.integer(range);
        $scope.data=Array.apply(0, Array(count)).map(function(){
            var x=chance.floating(range);
            var y=chance.floating(range);
            var z=chance.floating(range);
            
            
            var r=chance.floating(rangeColor);
            var g=chance.floating(rangeColor);
            var b=chance.floating(rangeColor);
            
            
            var size=chance.floating({min:0, max:2, fixed:1});
            
            return {
                position:[x,y,z],
                color:[r,g,b,1],
                size:[size, size, size]
            };
        });
   
    }

    generate();
    
    $scope.config={
        fullpage:true,
        type:"sphere",
        autorun:true,
        colortype:"variable"
    };
 

});