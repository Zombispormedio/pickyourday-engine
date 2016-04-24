var app = angular.module('alexandraExample', ["alexandra"]);

angular.module('alexandraExample')
    .controller('AlexandraExampleController', function($scope, $interval, $timeout, $http) {



   /* var JustPosition = generate(function() {
        return { position: RandPosition() };
    }, 80);

    function Data() {
        $scope.data = JustPosition();
    }

    Data();*/

    
    $http({method: 'GET', url: 'https://pickyourday.herokuapp.com/api/company/statsPicks', headers: {
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1lcmNlQHNhbHVkLmNvbSIsInJvbGUiOjIsImNyZWF0ZWQiOjE0NjEyNTM3NTMwODcsImlhdCI6MTQ2MTI1Mzc1M30.ILiPkgDRIFGRwbWAEPKS2gvu9IjRle8NLZ6rcTBOg40'}
          }).then(function(res){
        $scope.data=res.data.data[27];
        console.log($scope.data)
    }, function(res){
        console.log(res);
    });



    $scope.config={
        fullpage:true,
     
        colortype: "variable",
        axis:true,
        streaming:true
    };


});