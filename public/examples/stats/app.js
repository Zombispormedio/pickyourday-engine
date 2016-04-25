var app = angular.module('alexandraExample', ['ngAnimate', 'ngMaterial', "alexandra"]);

angular.module('alexandraExample')
    .controller('AlexandraExampleController', function($rootScope, $scope, $interval, $timeout, $http, $alexandra) {

    $scope.loading=true;
    
    $scope.calendar=[];
    
    $scope.values={
        index:1
    };
        
    $http({method: 'GET', url: 'https://pickyourday.herokuapp.com/api/company/statsPicks', headers: {
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1lcmNlQHNhbHVkLmNvbSIsInJvbGUiOjIsImNyZWF0ZWQiOjE0NjEyNTM3NTMwODcsImlhdCI6MTQ2MTI1Mzc1M30.ILiPkgDRIFGRwbWAEPKS2gvu9IjRle8NLZ6rcTBOg40'}
          }).then(function(res){
        $scope.calendar=res.data.data;
        var index=$scope.values.index-1;
        $scope.source=$scope.calendar[index];
    
         $scope.loading=false;
        console.log(res.data);
        
        
        $alexandra.getView("view_1").run();
        
    }, function(res){
        console.log(res);
    });
    
 
    
    $scope.select=function(){
          var index=$scope.values.index-1;
        console.log(index);
        
        $scope.source=$scope.calendar[index];
    }


    $scope.config={
        colortype: "variable",
        axis:true,
        axisLength:300,
        streaming:true,
        background:[0.3,0.3,0.3],
        grid:true,
        gridConfig:{
            lines:60,
            dim:500
        },
        autorun:false
        
    };


});