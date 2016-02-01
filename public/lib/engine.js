var Engine = {};

Engine.Utils = {

    getGLContext: function (canvas) {
        var ctx = null;
        var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];

        for (var i = 0; i < names.length; ++i) {
            try {
                ctx = canvas.getContext(names[i]);
            }
            catch (e) { }
            if (ctx) {
                break;
            }
        }
        if (ctx === null) {
            alert("Could not initialise WebGL");
            return null;
        }
        else {
            return ctx;
        }
    }

};

Engine.Scene = function (context) {
    this.context = context;
    
    this.WIDTH=this.context.drawingBufferWidth;
    this.HEIGHT=this.context.drawingBufferHeight;
};

Engine.Scene.prototype.init=function(){
    var gl=this.context;
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
};

Engine.Scene.prototype.render=function(){
    var gl=this.context;
   gl.viewport(0, 0, this.WIDTH, this.HEIGHT);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  
};