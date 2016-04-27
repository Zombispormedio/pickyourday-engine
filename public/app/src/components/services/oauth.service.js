angular.module('Application')
    .factory("OauthService", function(ApiService){

    return {

        base:"oauth",
        login:function(){
            return ApiService.rest(this.base,{
                Session:{method:"POST", params:{}}
            });
        },
        logout:function(){
            return ApiService.rest(this.base+"/logout", {
                Session:{method:"GET", params:{}}
            });
        },
        role:function(){
            return ApiService.rest(this.base+"/role/:role", {
                  check:{method:"GET", params:{role:"@role"}},
            });
        }

    };
});


