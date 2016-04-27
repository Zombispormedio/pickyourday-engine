angular.module('Application')
    .controller('LoginCtrl', function($rootScope, $scope, OauthService, RequestService){
    

    
    $scope.user = {email:"", password:""};
    $scope.login = function () {
        async.waterfall([

            function validate(next){
                var isEmail=emptyOrUndefined($scope.user.email);
                var isPassword=emptyOrUndefined($scope.user.password);
                if(isEmail || isPassword){
                    if(isEmail){
                        next("Email Empty");
                    }else{
                        if(isPassword){
                           next("Password Empty");
                        }
                    }
                }else{
                    next();
                }
            },
            function login(next){

                OauthService.login().Session($scope.user, function(res){
                    if(res.error)return next(res.error);

                    next(null, res.data);

                }, RequestService.ServerNotFound(next));

            }, 
            function checkRole(user, next){
                OauthService.role().check({role:user.role}, function(res){
                    if(res.error)return next(res.error);

                    if(res.data==2){

                        next(null, user);
                    }else{
                        RequestService.NoRoleAuthorized(next)();
                    }

                }, RequestService.ServerNotFound(next));
            }



        ], function(err, user){
            if(err){
                return $rootScope.showToast(err);
            }
            saveLocal("user", user);
            $rootScope.go("app.normal");
        });


    };


    
    
    
});