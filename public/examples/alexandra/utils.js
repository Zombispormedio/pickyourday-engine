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
	 var a = chance.floating(rangeColor);
    return [r, g, b, a];
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


function generate(fn) {
    return function() {
        var count = chance.integer({ min: 0, max: 100 });
        return Array.apply(0, Array(count)).map(fn);
    };
}