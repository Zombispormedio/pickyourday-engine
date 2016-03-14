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

    BlazeEngine.Ketch.renderLoop(Tree.draw.bind(Tree));

});
