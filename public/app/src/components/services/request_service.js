angular.module('Application')
    .factory("RequestService", function(){

    return {
       
        ServerNotFound: ClosureMessage("Server Not Found"),

        NoRoleAuthorized: ClosureMessage("No Role Authorized"),
        
    
    };
});
