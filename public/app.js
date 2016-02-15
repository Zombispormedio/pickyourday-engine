var controller = {};
var factory = {};
var filter = {};
var directive = {};

var app = angular.module("_3dApp", [])
    .controller(controller)
    .factory(factory)
    .filter(filter)
    .directive(directive);
    
    var parent=new Engine.NodeElement();
var child=new Engine.NodeElement(parent);
parent.addChildNode(child);
console.log(child.indexInParent());