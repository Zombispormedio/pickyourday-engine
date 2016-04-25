var app = angular.module('alexandraExample', ["alexandra"]);

angular.module('alexandraExample')
    .controller('AlexandraExampleController', function($rootScope, $scope, $interval, $timeout, $http) {

        
    $rootScope.myStyle={}
    
    $http({method: 'GET', url: 'https://pickyourday.herokuapp.com/api/company/statsPicks', headers: {
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1lcmNlQHNhbHVkLmNvbSIsInJvbGUiOjIsImNyZWF0ZWQiOjE0NjEyNTM3NTMwODcsImlhdCI6MTQ2MTI1Mzc1M30.ILiPkgDRIFGRwbWAEPKS2gvu9IjRle8NLZ6rcTBOg40'}
          }).then(function(res){
        $scope.data=res.data.data[27];
        console.log($scope.data)
    }, function(res){
        console.log(res);
    });



    $scope.config={
        colortype: "variable",
        axis:true,
        axisLength:300,
        streaming:true,
        background:[0.3,0.3,0.3],
        grid:true
    };


});