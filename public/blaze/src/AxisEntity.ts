class AxisEntity extends Entity {
    private _vertices: Array<number>;
    private _indices: Array<number>;
    private _colors: Array<number>;
    private _vbo;
    private _ibo;
    private _cbo;


    constructor(graph_id: string, d: number) {
        super(graph_id);
        d = d || 100;
        this._vertices = [0.0, 0.0, 0.0, d, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, d, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, d];
        this._indices = [0, 1, 2, 3, 4, 5];
        this._colors = [1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1];
    }

    init() {
        var gl = this.gl;
        this._vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._vertices), gl.STATIC_DRAW);


        this._ibo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this._indices), gl.STATIC_DRAW);


        this._cbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._cbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._colors), gl.STATIC_DRAW);


        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    beginDraw(): void {
        var gl = this.gl;

        var uWireframe = this.getUniform("uWireframe");
        if (uWireframe)
            gl.uniform1i(uWireframe, true);

        var uPerVertexColor = this.getUniform("uPerVertexColor");
        if (uPerVertexColor)
            gl.uniform1i(uPerVertexColor, true);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);

        Ketch.enableAttrib(this.graphID, "a_position");

        gl.bindBuffer(gl.ARRAY_BUFFER, this._cbo);

        Ketch.enableAttrib(this.graphID, "a_color", { size: 4 });


        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo);

        gl.drawElements(gl.LINES, this._indices.length, gl.UNSIGNED_SHORT, 0);


    }
    endDraw(): void {
        var gl = this.gl;

        var uWireframe = this.getUniform("uWireframe");
        if (uWireframe)
            gl.uniform1i(uWireframe, false);


        var uPerVertexColor = this.getUniform("uPerVertexColor");
        if (uPerVertexColor)
            gl.uniform1i(uPerVertexColor, false);

        Ketch.disableAttrib(this.graphID, "a_position");
        Ketch.disableAttrib(this.graphID, "a_color");

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

}