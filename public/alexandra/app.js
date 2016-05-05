var app = angular.module('alexandraExample', [ "alexandra"]);

angular.module('alexandraExample')
    .controller('AlexandraExampleController', function($rootScope, $scope, $interval, $timeout, $http, $alexandra) {





    /*Text("Pick Your Day", {
        size:10,
        height:0.5,
        curveSegments:30,
        bevelEnabled :true,
        bevelThickness:1.5,
        bevelSize:0.5
    }, function(data){
        $scope.data={
            mesh:data,
            position:[50,50,50],
           
        }
    })*/

    
    $scope.data={
        mesh:Torus(40, 15, 100, 16),
        position:[80,100,80]
    }


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