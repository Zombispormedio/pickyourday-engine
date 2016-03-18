/*var controller = {};
var factory = {};
var filter = {};
var directive = {};

var app = angular.module("_3dApp", [])
    .controller(controller)
    .factory(factory)
    .filter(filter)
    .directive(directive);*/

var Tree = new BlazeEngine.SceneGraph();

Tree.setContext(document.getElementById("3dView"));



var light = Tree.createLight({
    direction: [0.0, -1.0, -1.0],
    ambient: [0.03, 0.03, 0.03, 1.0],
    diffuse: [1.0, 1.0, 1.0, 1.0],
    specular: [1.0, 1.0, 1.0, 1.0]
});

Tree.createMainChildNode("Light", light);



var tr = Tree.createTransform();
tr.setAngle(90);
tr.setAxis([0, 1, 0]);
var TrMeshNode = Tree.createMainChildNode("TRMesh", tr);
var mesh = Tree.createMesh({ mesh: "data/picky.obj", material: "data/test.mtl", texture: "data/webgl.png" });
TrMeshNode.createChildNode("Mesh", mesh);

//var mesh2 = Tree.createMesh({ mesh: "data/sphere.json", material: "data/test.mtl" });

/*
var tr2 = Tree.createTransform();*/
//var TrMesh2Node = Tree.createMainChildNode("Mesh", mesh2);
//TrMesh2Node.createChildNode("Mesh", mesh2);




Tree.configure(function() {
    console.log(Tree);
    var x = 2;
    BlazeEngine.Ketch.renderLoop(function() {
        tr.position = [x, -1, -2];
       
        Tree.draw.bind(Tree)();
        x -= 0.1;
        if (x < -2) x = 4;
    });

});
