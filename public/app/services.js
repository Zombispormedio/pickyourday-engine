factory.$engine = function () {


    var scene;

    function configure(params) {
        var context = Engine.Utils.getGLContext(params);
        scene = new Engine.Scene(context);
        
        scene.init();
    }

   
    function render(){
        scene.render();
    }

    var engine = {
        configure:configure,
        render:render
    };
    return engine;
};