class Ketch {
    private static _views ={} ;
    static setCanvasToContext(key, canvas) {
        var context = WebGLUtils.getGLContext(canvas);
        Ketch.setContext(key, context);
    }

    static setContext(key, context) {
        Ketch._views[key].context = context;
    }

    static getContext(key) {
        return Ketch._views[key].context;
    }

    static createProgram(key, shaders) {
        var gl = Ketch.getContext(key);
        var program = WebGLUtils.createProgram(gl, shaders);
        Ketch.setProgram(key, program);
    }
    static setProgram(key, program) {
        Ketch._views[key].program = program;
    }
    static getProgram(key) {
        return Ketch._views[key].program;
    }

    static createView(key) {
        Ketch._views[key] = {};
    }

    static setAttributeLocations(key, attribs_names) {
        var view = Ketch._views[key];
        var gl = view.context;
        var prg = view.program;


        view.attribs = attribs_names.reduce(function(prev, attr) {
            prev[attr] = gl.getAttribLocation(prg, attr);
            return prev;
        }, {});

    }

    static getAttrib(view_key, attr_key) {
        return Ketch._views[view_key].attribs[attr_key];
    }

    static getUniform(view_key, uniform_key) {
        return Ketch._views[view_key].uniforms[uniform_key];
    }

    static setUniformLocations(key, uniform_names) {
        var view = Ketch._views[key];
        var gl = view.context;
        var prg = view.program;


        view.uniforms = uniform_names.reduce(function(prev, attr) {
            prev[attr] = gl.getUniformLocation(prg, attr);
            return prev;
        }, {});
    }

    static enableAttrib(view_key, attr_key, pointer?: WebGLUtils.AttribPointer) {
        var index = Ketch.getAttrib(view_key, attr_key);

        var gl = Ketch.getContext(view_key);

        gl.enableVertexAttribArray(index);

        if (pointer) {
            gl.vertexAttribPointer(index, pointer.size || 3, gl.FLOAT, pointer.normalized || false, pointer.stride || 0, pointer.offset || 0);
        } else {
            gl.vertexAttribPointer(index, 3, gl.FLOAT, false, 0, 0);
        }
    }

    static disableAttrib(view_key, attr_key) {
        var index = Ketch.getAttrib(view_key, attr_key);
        var gl = Ketch.getContext(view_key);
        gl.disableVertexAttribArray(index);
    }


}