var app = angular.module('alexandraExample', [ "alexandra"]);

angular.module('alexandraExample')
    .controller('AlexandraExampleController', function($rootScope, $scope, $interval, $timeout, $http, $alexandra) {

    
     var ColorSizePosition = generate(function() {
        return {
            position: RandPosition(),
            color: RandColor(),
            size: RandSize({ min: 4, max: 8, fixed: 1 }),
            rotation:RandRotation()
        };
    });
    function Data() {
        $scope.data = ColorSizePosition();
    }
    Data();

 


    $scope.config={
        colortype: "variable",
        axis:true,
        axisLength:500,
        streaming:true,
        background:[0.3,0.3,0.3],
        grid:true,
        gridConfig:{
            lines:60,
            dim:500
        },
        fullpage:true
        
     
        
    };


});