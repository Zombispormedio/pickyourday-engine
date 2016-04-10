var app = angular.module('alexandraExample', ["alexandra"]);

angular.module('alexandraExample')
    .controller('AlexandraExampleController', function($scope, $interval, $timeout) {

    function generate(){
      
        var count=chance.integer({min: 0, max: 100});
        $scope.data=Array.apply(0, Array(count)).map(function(){
            var x=chance.floating({min: 0, max: 100});
            var y=chance.floating({min: 0, max: 100});
            var z=chance.floating({min: 0, max: 100});
            return [x,y,z];
        });
    }

    generate();
    
 

});