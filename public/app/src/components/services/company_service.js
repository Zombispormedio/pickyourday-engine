angular.module('Application')
    .factory("CompanyService", function(ApiService){

    return {

        base:"company",

        Pick:function(){
            return ApiService.rest(this.base+"/statsPicks", {
                stats:{method:"GET", params:{}}
            });
        },
        
        OriginPick:function(){
            return ApiService.rest(this.base+"/originPicks", {
                stats:{method:"GET", params:{}}
            });
        },
        
         ScoreService:function(){
            return ApiService.rest(this.base+"/scoreService", {
                stats:{method:"GET", params:{}}
            });
        },
        MoneyResource:function(){
            return ApiService.rest(this.base+"/moneyResources", {
                stats:{method:"GET", params:{}}
            });
        },
        
        WorkResource:function(){
            return ApiService.rest(this.base+"/workResources", {
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
