

var app = angular.module("_3dApp", ['ngMaterial']);


app.controller('AppController', function($scope) {
    $scope.loading = true;
    $scope.values={zoom:5};
    
    $scope.checkAxis=function(axis){
        return axis==1;
    };
    
    $scope.toggleAxis=function(axis, index){
      axis[index]=axis[index]==1?0:1;  
    };
    $scope.changeZoom=function(){
        $scope.camera.zoom($scope.values.zoom);
    };
 
    
    $scope.Tree = new BlazeEngine.SceneGraph();

    $scope.Tree.setContext(document.getElementById("3dView"));


    $scope.camera = $scope.Tree.createCamera({ focus: [0.0, 0.0, 0.0], azimuth: 10, elevation: -11, home: [0.0, 0.0, 0.0] });


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
    $scope.mesh = $scope.Tree.createMesh({ mesh: "data/picky.obj", material: "data/test.mtl", texture: "data/webgl.png" });
    $scope.TrMeshNode.createChildNode("Mesh", $scope.mesh);

    $scope.tr.position = [0, -1, -7];
    
    $scope.mesh2 = $scope.Tree.createMesh({ mesh: "data/sphere.json", material: "data/test.mtl" });
    $scope.tr2 = $scope.Tree.createTransform();
    $scope.TrMesh2Node = $scope.Tree.createMainChildNode("TrMesh", $scope.tr2);
    $scope.TrMesh2Node.createChildNode("Mesh", $scope.mesh2);
      $scope.tr2.position = [-10, -4, -20];
    $scope.meshes=[{mesh:$scope.mesh, tr:$scope.tr}, {mesh:$scope.mesh2, tr:$scope.tr2}];
    $scope.mesh2.diffuse=[0.16, 0.8, 0.65,1];



    $scope.Tree.configure(function() {
        console.log($scope.Tree);

        $scope.loading = false;
        BlazeEngine.Ketch.renderLoop(function() {
            $scope.$apply(function() {
               

                $scope.Tree.draw.bind($scope.Tree)();
            });



        });

    });

});