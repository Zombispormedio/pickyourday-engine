var app = angular.module('alexandraExample', [ "alexandra"]);

angular.module('alexandraExample')
    .controller('AlexandraExampleController', function($rootScope, $scope, $interval, $timeout, $http, $alexandra) {



  

    $scope.data={
        mesh:getPlane( 100, 100, 30, 30), 
        position:[50,0,50]
    };

    $scope.config={
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