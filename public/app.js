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

Tree.buildDefaultGraph();
Tree.configure(function() {
    console.log(Tree);
    var x=1;
    BlazeEngine.Ketch.renderLoop(function(){
       Tree.scene.childNodes[0].entity.position=[x,0,-1];
      
        Tree.draw.bind(Tree)();
        x-=0.1;
        if(x<-1.5)x=1;
    });

});
