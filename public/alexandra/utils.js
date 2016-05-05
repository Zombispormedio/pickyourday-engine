function RandPosition(v) {
    var range = v || { min: 0, max: 100 };
    var x = chance.floating(range);
    var y = chance.floating(range);
    var z = chance.floating(range);
    return [x, y, z];
}

function RandColor(v) {
    var rangeColor = v || { min: 0, max: 1, fixed: 2 };
    var r = chance.floating(rangeColor);
    var g = chance.floating(rangeColor);
    var b = chance.floating(rangeColor);
    return [r, g, b, 1];
}

function RandSize(v) {
    var range = v || { min: 0.1, max: 2, fixed: 1 };
    var size = chance.floating(range);
    return [size, size, size];
}


function RandRotation(v){
    var range = v || { min: 0, max: 360};
    var x=Number(chance.bool());
    var y=Number(chance.bool());
    var z=Number(chance.bool());
    return  {
        angle:chance.integer({ min: 0, max: 360}),
        axis:[x,y,z]
    }
}


function generate(fn, count) {
    var count = count || chance.integer({ min: 0, max: 100 });
    return function() {

        return Array.apply(0, Array(count)).map(fn);
    };
}

function getPlane(width, height, w_s, h_s){
    var plane = new THREE.PlaneGeometry( width, height, w_s, h_s);

    var data={}
    data.v=plane.vertices.reduce(function(prev, item){
        prev.push(item.x);

        prev.push(chance.integer({min:0, max:100}));
        prev.push(item.y);
        return prev;
    },[]);

    data.iv=plane.faces.reduce(function(prev, item){
        prev.push(item.a);
        prev.push(item.c);
        prev.push(item.b);

        return prev;
    },[]);
    return data;
}