angular.module('alexandra')
    .factory('$alexandraUtils', function($timeout, RobotoValue) {

    var watch=false;

    $timeout(function() { watch = true; });
    var FullPage=function(elem){
        return function(){
            elem.width=window.innerWidth;
            elem.height=window.innerHeight;
        };

    };


    var ID=function(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }


    function transformGeometry(geom){
        var data={}
        data.v=geom.vertices.reduce(function(prev, item){
            prev.push(item.x);
            prev.push(item.y);
            prev.push(item.z);
            return prev;
        },[]);

        data.iv=geom.faces.reduce(function(prev, item){
            prev.push(item.a);
            prev.push(item.b);
            prev.push(item.c);
            return prev;
        },[]);
        return data;
    }

    function Text(text, parameters){
        var font=new THREE.Font(RobotoValue);

        parameters.font=font;

        var obj= new THREE.TextGeometry(text, parameters);

        return transformGeometry(obj);
    }




    return {

        fullPage:function(elem){
            var fn=FullPage(elem);
            window.addEventListener('resize', fn, false);
            fn();
        },

        createForestID:ID,

        validAttribute:function(value){
            return (value===""||value=="true") && value!=="false";
        },

        watch:function(scope, key, cb){
            scope.$watch(key, function(){
                if(watch){
                    cb();
                }
            });
        },
        watchCollection:function(scope, key, cb){
            scope.$watchCollection(key, function(){
                if(watch){
                    cb();
                }
            });
        },
        transformGeometry:transformGeometry,
        Text:Text



    };
});