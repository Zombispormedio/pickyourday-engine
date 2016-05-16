angular.module('Application')
    .factory("StatsService", function(CompanyService){

    function Data(cb, error){
        return function(res){
            if(res.error)return error(res.error);
            if(!res.data)return error("No Data");

            cb(res.data);

        };
    }

    function Error(error){
        return function(){
            if(error)return error("Server Not Found")
            console.log("Server Not Found")
        };
    }

    return {
        Picks:function(cb, error){
            CompanyService.Pick().stats(Data(cb, error),Error(error));
        },
        OriginPicks:function(cb, error){
            CompanyService.OriginPick().stats(Data(cb, error),Error(error));
        },
        ScoreServices:function(cb, error){
            CompanyService.ScoreService().stats(Data(cb, error),Error(error));
        },
        MoneyResources:function(cb, error){
            CompanyService.MoneyResource().stats(Data(cb, error),Error(error));
        },
        WorkResources:function(cb, error){
            CompanyService.WorkResource().stats(Data(cb, error),Error(error));
        }

    }
});