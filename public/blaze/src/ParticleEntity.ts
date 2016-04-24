class ParticleEntity extends Entity {

    private _buffer;
    private _pointSize: number;
    private _numItems: number;
    private _texture;
    private _texture_id: string;

    constructor(graph_id: string, pointSize?: number) {
        super(graph_id);
        this._pointSize = pointSize || 1;
        this._buffer = null;
        this._texture_id="";
    }

    public configure(data_mesh: Array<number>, data_texture: Array<number>) {
        var gl = this.gl;

        this._buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data_mesh), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        this._numItems = data_mesh.length;
       
        
        this._texture_id = utils.uuid("Texture");
        this._texture = WebGLUtils.createTexture(gl, data_texture);
        Ketch.addTexture(this.graphID, this._texture_id);

    }
    public update(data: Array<number>) {
        var gl = this.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        this._numItems = data.length;
    }


    
    public get textureID() : string {
        return this._texture_id;
    }
    

    public set pointSize(v: number) {
        this._pointSize = v;
    }
    

    beginDraw() {

        var gl = this.gl;

        var uPointSize = this.getUniform("uPointSize");
        if (uPointSize)
            gl.uniform1f(uPointSize, this._pointSize);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
        Ketch.enableAttrib(this.graphID, "a_position");
        
        
        Ketch.activeTexture(this.graphID, this._texture_id, this._texture);
        
        gl.drawArrays(gl.POINTS, 0, this._numItems / 3);
    }

    endDraw() {
        var gl = this.gl;
        Ketch.disableAttrib(this.graphID, "a_position");
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

    }

}