var app = angular.module('alexandraExample', [ "alexandra"]);

angular.module('alexandraExample')
    .controller('AlexandraExampleController', function($rootScope, $scope, $interval, $timeout, $alexandraModel) {

       
    $scope.data=[{
        mesh:Torus(20, 6, 100, 16),
        position:[100,50,100],
        color: RandColor()
    },{
        mesh:Torus(20, 6, 100, 16),
        position:[20,50,100],
        color: RandColor()
    }]
    


    $scope.config={
    
    
        colortype:"variable",
        type:"custom",
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