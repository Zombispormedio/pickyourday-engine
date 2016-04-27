angular.module('Application')
    .controller('AppCtrl', function($scope, OauthService){
    
    
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    
    
    $scope.logout=function(){
        OauthService. logout().Session(function(){
		 deleteLocal("user");
        $rootScope.go("login");   
	}, function(){});
    }
    
});