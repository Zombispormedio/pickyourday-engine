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

Tree.buildDefaultGraph();

console.log(Tree);

Tree.draw();

var repeat = function (num, char) {
    return Array(num).join(char);
};



var root = Tree.scene;


function showTree(i, o, _parent, index) {
    var childNodes = o.childNodes;
    var show = o.oid;

    if (_parent) {
        var branch = "";

        var siblings = _parent.childNodes;
        if (index === siblings.length - 1) { branch += "└"; }
        else branch += "├";
        branch += "─";
        if (childNodes.length > 0) branch += "┬";
        else branch += "─";

        show = repeat(i, " ") + branch + show;

    }

    console.log(show);
    if (childNodes.length > 0) {
        childNodes.forEach(function (a, index) {
            showTree(i + 1, a, o, index);
        });
    }
}


showTree(0, root);