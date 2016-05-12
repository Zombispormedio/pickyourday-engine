angular.module('alexandra')
    .factory('$alexandraModel', function (RobotoValue) {

    var font = new THREE.Font(RobotoValue);


    var Geometry= function (geom, t_vertex, t_faces) {
        var data = {}
        data.v = geom.vertices.reduce(function (prev, item, index) {

            if (t_vertex) {
                prev = t_vertex(prev, item, index);
            }else{
                prev.push(item.x);
                prev.push(item.y);
                prev.push(item.z); 
            }

            return prev;
        }, []);

        data.iv = geom.faces.reduce(function (prev, item, index) {

            if (t_faces) {
                prev = t_faces(prev, item, index);
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
        parameters=parameters||{};
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

    var Dodecahedron=function(rad, detail){
        var dode= new THREE.DodecahedronGeometry(rad, detail);
        return transformGeometry(dode);
    }




    var Icosahedron=function(rad, detail){
        var dode= new THREE.IcosahedronGeometry(rad, detail);


        return transformGeometry(dode);
    }
    var  Lathe=function(line,  segments, phiStart, phiLength){
        var points = [];
        line=line||50
        for ( var i = 0; i < line; i ++ ) {
            points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
        }
        var geometry = new THREE.LatheGeometry( points,  segments, phiStart, phiLength );


        return transformGeometry(geometry);
    }


    var Tetrahedron =function(radius, detail){
        var geometry= new THREE.TetrahedronGeometry(radius, detail);
        return transformGeometry(geometry);
    }

    var Octahedron =function(radius, detail){
        var geometry= new THREE.OctahedronGeometry(radius, detail);
        return transformGeometry(geometry);
    }

    var TorusKnot=function(radius, tube, tubularSegments, radialSegments, p, q){
        var geometry= new THREE.TorusKnotGeometry(radius, tube, tubularSegments, radialSegments, p, q)
        return transformGeometry(geometry);
    }

    var Box=function(width, height, depth, widthSegments, heightSegments, depthSegments){
        var geometry = new THREE.BoxGeometry( width, height, depth, widthSegments, heightSegments, depthSegments);      
        return transformGeometry(geometry);
    }

    var Cylinder=function(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength){
        var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength);      
        return transformGeometry(geometry);
    }

    var Sphere =function(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength){
        var geometry= new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
        return transformGeometry(geometry);
    }


    var Torus =function(radius, tube, radialSegments, tubularSegments, arc){
        var geometry= new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc);
        return transformGeometry(geometry);
    }

    var Tube=function(l, segments, radius, radiusSegments, closed){
        var CustomSinCurve = THREE.Curve.create(
            function ( scale ) { //custom curve constructor
                this.scale = (scale === undefined) ? 1 : scale;
            },

            function ( t ) { //getPoint: t is between 0-1
                var tx = t * 3 - 1.5,
                    ty = Math.sin( 2 * Math.PI * t ),
                    tz = t * 3 - 1.5;

                return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
            }
        );

        var path = new CustomSinCurve( l );

        var geometry= new THREE.TubeGeometry(path, segments, radius, radiusSegments, closed)
        return transformGeometry(geometry);
    }



    return {
        Geometry: Geometry,
        Text: Text,
        Plane: Plane,
        Dodecahedron:Dodecahedron,
        Icosahedron :Icosahedron,
        Lathe:Lathe,
        Tetrahedron:Tetrahedron,
        TorusKnot:TorusKnot,
        Box:Box,
        Cylinder:Cylinder,
        Octahedron:Octahedron,
        Sphere:Sphere,
        Torus:Torus,
        Tube:Tube
    }


});