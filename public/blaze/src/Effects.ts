class Effects extends Renderable {
    private _canvas;
    private _texture;
    private _framebuffer;
    private _renderbuffer;
    private _vbo;
    private _tbo;
    private _shader;
    private _uniforms;
    private _attribs;
    private _start;
    private _type;
    private _noisetexture;


    constructor(graph_id: string, canvas, type?: string) {
        super(graph_id);

        this._texture = null;
        this._framebuffer = null;
        this._renderbuffer = null;
        this._vbo = null;
        this._tbo = null;
        this._shader = null;
        this._uniforms = null;
        this._attribs = null;
        this._noisetexture = null;

        this._start = Date.now();

        this._canvas = canvas;

        this._type = type || "no";

        this.configure();

        this.Geometry();

        this.setEffect();


    }


    configure() {
        var gl = this.gl;
        var width = this._canvas.width;
        var height = this._canvas.height;

        this._texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

        this._renderbuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this._renderbuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);

        this._framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._texture, 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._renderbuffer);

        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }


    public Geometry() {
        var gl = this.gl;

        var vertices = [
            -1.0, -1.0,
            1.0, -1.0,
            -1.0, 1.0,

            -1.0, 1.0,
            1.0, -1.0,
            1.0, 1.0
        ];

        var textureCoords = [
            0.0, 0.0,
            1.0, 0.0,
            0.0, 1.0,

            0.0, 1.0,
            1.0, 0.0,
            1.0, 1.0
        ];

        this._vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        this._tbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._tbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
    
    
    public get type() : string {
        return this._type;
    }
    

    public setEffect(type?: string) {
        this._type = type || this._type;
      
        var gl = this.gl;
        var source: { vertex?: string, fragment?: string } = {};
        source.vertex = Shaders.Vertex["Effect"];

        switch (this._type) {
              case "all":
                source.fragment = Shaders.Fragment["All_effect"];
                break;
            
             case "invert":
                source.fragment = Shaders.Fragment["Invert_effect"];
                break;
            
             case "grey":
                source.fragment = Shaders.Fragment["Grey_effect"];
                break;

            case "blur":
                source.fragment = Shaders.Fragment["Blur_effect"];
                break;

            case "film":
                source.fragment = Shaders.Fragment["Film_effect"];
                break;

            case "wavy":
                source.fragment = Shaders.Fragment["Wavy_effect"];
                break;

            case "no":
            default:
                source.fragment = Shaders.Fragment["No_effect"];
        }


        if (this._shader) {
            gl.deleteProgram(this._shader);
        }


        this._shader = WebGLUtils.createProgram(gl, source);
        var count;
        this._attribs = {};
        count = gl.getProgramParameter(this._shader, gl.ACTIVE_ATTRIBUTES);

        for (var i = 0; i < count; i++) {
            var attrib = gl.getActiveAttrib(this._shader, i);
            this._attribs[attrib.name] = gl.getAttribLocation(this._shader, attrib.name);
        }


        this._uniforms = {};
        count = gl.getProgramParameter(this._shader, gl.ACTIVE_UNIFORMS);

        for (var i = 0; i < count; i++) {
            var uniform = gl.getActiveUniform(this._shader, i);
            this._uniforms[uniform.name] = gl.getUniformLocation(this._shader, uniform.name);
        }

    }

    public Size() {

        var gl = this.gl;
        var width = this._canvas.width;
        var height = this._canvas.height;

        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);


        gl.bindRenderbuffer(gl.RENDERBUFFER, this._renderbuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);


        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);

    }

    setNoiseTexture(data_texture) {
        var gl = this.gl;
        this._noisetexture = WebGLUtils.createTexture(gl, data_texture);
    }

    public Bind() {
        var gl = this.gl;

        var width = this._canvas.width;
        var height = this._canvas.height;

        gl.useProgram(this._shader);

        gl.enableVertexAttribArray(this._attribs.a_position);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
        gl.vertexAttribPointer(this._attribs.a_position, 2, gl.FLOAT, false, 0, 0);

        gl.enableVertexAttribArray(this._attribs.a_texture_coords);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._tbo);
        gl.vertexAttribPointer(this._attribs.a_texture_coords, 2, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.uniform1i(this._uniforms.uSampler, 0);

        if (this._uniforms.uTime) {
            gl.uniform1f(this._uniforms.uTime, (Date.now() - this._start) / 1000.0);
        }
            
        if (this._uniforms.uInverseTextureSize) {
            gl.uniform2f(this._uniforms.uInverseTextureSize, 1.0 / width, 1.0 / height);
        }

        if (this._uniforms.uNoiseSampler && this._noisetexture) {
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, this._noisetexture);
            gl.uniform1i(this._uniforms.uNoiseSampler, 1);
        }


    }

    public bindFrameBuffer() {
        var gl = this.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer);
    }

    public unbindFrameBuffer() {
        var gl = this.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    draw() {
        var gl = this.gl;
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        gl.disableVertexAttribArray(this._attribs.a_position);
        gl.disableVertexAttribArray(this._attribs.a_texture_coords);

    }

}