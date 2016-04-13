var app = angular.module('alexandraExample', ["alexandra"]);

angular.module('alexandraExample')
    .controller('AlexandraExampleController', function($scope, $interval, $timeout) {



    var count=chance.integer({ min: 0, max: 100 });
    $scope.data=Array.apply(0, Array(count)).reduce(function(prev){
        prev.push(chance.integer({ min: 0, max: 100 }));
        prev.push(chance.integer({ min: 0, max: 100 }));
        prev.push(chance.integer({ min: 0, max: 100 }));
        return prev;
    }, []);
    console.log($scope.data);

    $scope.config={
        type:"particle",
        fullpage:true


    };

});