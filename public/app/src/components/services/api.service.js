angular.module('Application')
    .factory("ApiService", function($resource, $location){

    return {
        //env:$location.absUrl().indexOf("localhost")==-1?"prod":"dev",
        env:"prod",
        prod:{
            protocol:"https",
            host:"pickyourday.herokuapp.com",
            port:"",
            root:"api"
        },
        dev:{
            protocol:"http",
            host:"localhost",
            port:"5000",
            root:"api"
        },

        getApiPath:function(path){
            var api=this[this.env];
            return api.protocol+"://"+api.host+(api.port!==""?(":"+api.port):"")+"/"+api.root+"/"+path;
        },

        rest:function(path, methods, defaultParams){
            var resource=$resource(
                this.getApiPath(path),
                defaultParams || {},
                methods || {}
            );
            return resource;
        }
    };
});

