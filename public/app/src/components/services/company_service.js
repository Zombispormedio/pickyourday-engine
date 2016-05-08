angular.module('Application')
    .factory("CompanyService", function(ApiService){

    return {

        base:"company",
        
        Pick:function(){
            return ApiService.rest(this.base+"/statsPicks", {
                stats:{method:"GET", params:{}}
            });
        },
          Profile:function(){
        	return ApiService.rest(this.base+"/profile",{
        		get:{method:"GET", params:{}}
        	});
        },

    };
});
