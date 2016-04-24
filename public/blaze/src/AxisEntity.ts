class AxisEntity extends Entity {
    private _vertices: Array<number>;
    private _indices: Array<number>;
    private _vbo;
    private _ibo;

    constructor(graph_id: string, d: number) {
        super(graph_id);
        d = d || 100;
        this._vertices = [0.0, 0.0, 0.0, d, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, d, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, d];
        this._indices = [0, 1, 2, 3, 4, 5];
    }

    init() {
        var gl = this.gl;
        this._vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._vertices), gl.STATIC_DRAW);


        this._ibo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this._indices), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    beginDraw(): void {
        var gl = this.gl;

        var uMaterialDiffuse = this.getUniform("uMaterialDiffuse");
        if (uMaterialDiffuse)
            gl.uniform4fv(uMaterialDiffuse, [0.5, 0.8, 0.1, 1]);

        var uWireframe = this.getUniform("uWireframe");
        if (uWireframe)
            gl.uniform1i(uWireframe, true);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);

        Ketch.enableAttrib(this.graphID, "a_position");

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo);

        gl.drawElements(gl.LINES, this._indices.length, gl.UNSIGNED_SHORT, 0);


    }
    endDraw(): void {
        var gl = this.gl;
        var uWireframe = this.getUniform("uWireframe");
        if (uWireframe)
            gl.uniform1i(uWireframe, false);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

}