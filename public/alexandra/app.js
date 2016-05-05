var app = angular.module('alexandraExample', [ "alexandra"]);

angular.module('alexandraExample')
    .controller('AlexandraExampleController', function($rootScope, $scope, $interval, $timeout, $http, $alexandra) {

  
 

  

   /* $scope.data={
        mesh: Text("Pick Your Day", {
            size:10,
            height:1,
            curveSegments:10,
            
        }),//getPlane( 100, 100, 50, 50), 
        position:[50,190,50],
        rotation:{
            angle:90,
            axis:[1,0,0]
        }
        
    };*/

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