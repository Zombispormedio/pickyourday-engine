

var app = angular.module("_3dApp", ['ngMaterial']);


app.controller('AppController', function($scope) {
    $scope.loading = true;
    $scope.values = { zoom: 0 };

    $scope.checkAxis = function(axis) {
        return axis == 1;
    };

    $scope.toggleAxis = function(axis, index) {
        axis[index] = axis[index] == 1 ? 0 : 1;
    };
   


    $scope.Tree = new Blaze.SceneGraph();

    $scope.Tree.setContext(document.getElementById("3dView"));


    $scope.camera = $scope.Tree.createCamera();
    $scope.camera.position = [0, 0, 10];
    $scope.camera.zoom=6;


    $scope.Tree.createMainChildNode("Camera", $scope.camera);

    $scope.Tree.MainCamera = $scope.camera;

    $scope.light = $scope.Tree.createLight({
        direction: [0.0, -1.0, -1.0],
        ambient: [0.03, 0.03, 0.03, 1.0],
        diffuse: [1.0, 1.0, 1.0, 1.0],
        specular: [1.0, 1.0, 1.0, 1.0]
    });

    $scope.Tree.createMainChildNode("Light", $scope.light);



    $scope.tr = $scope.Tree.createTransform();
    $scope.tr.setAngle(90);
    $scope.tr.setAxis([0, 1, 0]);
    $scope.TrMeshNode = $scope.Tree.createMainChildNode("TRMesh", $scope.tr);
    $scope.mesh = $scope.Tree.createMeshByLoader({ mesh: "data/picky.obj", material: "data/test.mtl", texture: "data/texture.jpg" });
    $scope.TrMeshNode.createChildNode("Mesh", $scope.mesh);

    $scope.tr.position = [0, 0, 0];

    $scope.mesh2 = $scope.Tree.createMeshByLoader({ mesh: "data/sphere.json", material: "data/test.mtl" });
    $scope.tr2 = $scope.Tree.createTransform();
    $scope.TrMesh2Node = $scope.Tree.createMainChildNode("TrMesh", $scope.tr2);
    $scope.TrMesh2Node.createChildNode("Mesh", $scope.mesh2);
    $scope.tr2.setAngle(90);
    $scope.tr2.setAxis([0, 1, 0]);

    $scope.tr2.position = [-2, 0, -1.8];
    $scope.meshes = [{ mesh: $scope.mesh, tr: $scope.tr }, { mesh: $scope.mesh2, tr: $scope.tr2 }];


    $scope.Tree.configureWithLoader(function() {
        console.log($scope.Tree);

        $scope.loading = false;
        Blaze.Ketch.renderLoop(function() {
            $scope.$apply(function() {


                $scope.Tree.render.bind($scope.Tree)();
            });



        });

    });

});