angular.module('alexandra')
    .factory('$alexandraModel', function (RobotoValue) {

    var font = new THREE.Font(RobotoValue);


    var Geometry= function (geom, t_vertex, t_faces) {
        var data = {}
        data.v = geom.vertices.reduce(function (prev, item) {

            if (t_vertex) {
                prev = transform_vertex(prev, item, index);
            }else{
                prev.push(item.x);
                prev.push(item.y);
                prev.push(item.z); 
            }

            return prev;
        }, []);

        data.iv = geom.faces.reduce(function (prev, item) {

            if (t_faces) {
                prev = transform_vertex(prev, item, index);
            }else{
                prev.push(item.a);
                prev.push(item.b);
                prev.push(item.c);
            }

            return prev;
        }, []);
        return data;
    };



    var Text=function(text, parameters) {
        parameters.font = font;

        var obj = new THREE.TextGeometry(text, parameters);

        return Geometry(obj);
    }


    var Plane=function(options, t_vertex) {
        var plane = new THREE.PlaneGeometry(options.width, options.height, options.w_s, options.h_s);

        var data = Geometry(plane, t_vertex, function(prev, item){
            prev.push(item.a);
            prev.push(item.c);
            prev.push(item.b);

            return prev;
        });
        return data;

    }



    return {
        Geometry: Geometry,
        Text: Text,
        Plane: Plane
    }


});