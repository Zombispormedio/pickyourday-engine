var app = angular.module('alexandraExample', ["alexandra"]);

angular.module('alexandraExample')
    .controller('AlexandraExampleController', function($scope, $interval, $timeout) {


    var ColorSizePosition = generate(function() {
        return {
            position: RandPosition(),
            color: RandColor(),
            size: RandSize({ min: 4, max: 8, fixed: 1 }),
            rotation:RandRotation()
        };
    });
    
    $scope.data=ColorSizePosition();
    

    $scope.config={
        streaming:true,
        fullpage:true,
        type:"cone",
        colortype:"variable"
    };
    
});