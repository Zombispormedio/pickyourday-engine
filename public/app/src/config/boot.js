angular.module('Application')
    .run(function($rootScope,  $mdToast, $state){

    $rootScope.showToast = function(msg) {
      
        $mdToast.show(
            $mdToast.simple()
            .textContent(msg)
            .theme("pick-theme")
            .hideDelay(3000)
        );
    };
    
     $rootScope.go = function (state, params) {
        $state.go(state, params);
    };

});