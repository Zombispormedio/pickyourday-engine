class GridEntity extends Entity {
    private _vertices: Array<number>;
    private _indices: Array<number>;
    private _dimesions: { dim: number, lines: number };

    private _vbo;
    private _ibo;



    constructor(graph_id: string, d: number, e: number) {
        super(graph_id);

        this._dimesions = {
            dim: d || 50, lines: e || 50
        }

    }


    init() {
        var gl = this.gl;

        this.build();

        this._vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._vertices), gl.STATIC_DRAW);


        this._ibo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this._indices), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }


    build() {
        var inc = 2 * this._dimesions.dim /this._dimesions.lines;
        var v = [];
        var i = [];

        for (var l = 0; l <= this._dimesions.lines; l++) {
            v[6 * l] = -this._dimesions.dim;
            v[6 * l + 1] = 0;
            v[6 * l + 2] = -this._dimesions.dim + (l * inc);

            v[6 * l + 3] = this._dimesions.dim;
            v[6 * l + 4] = 0;
            v[6 * l + 5] = -this._dimesions.dim + (l * inc);

            v[6 * (this._dimesions.lines + 1) + 6 * l] = -this._dimesions.dim + (l * inc);
            v[6 * (this._dimesions.lines + 1) + 6 * l + 1] = 0;
            v[6 * (this._dimesions.lines + 1) + 6 * l + 2] = -this._dimesions.dim;

            v[6 * (this._dimesions.lines + 1) + 6 * l + 3] = -this._dimesions.dim + (l * inc);
            v[6 * (this._dimesions.lines + 1) + 6 * l + 4] = 0;
            v[6 * (this._dimesions.lines + 1) + 6 * l + 5] = this._dimesions.dim;

            i[2 * l] = 2 * l;
            i[2 * l + 1] = 2 * l + 1;
            i[2 * (this._dimesions.lines + 1) + 2 * l] = 2 * (this._dimesions.lines + 1) + 2 * l;
            i[2 * (this._dimesions.lines + 1) + 2 * l + 1] = 2 * (this._dimesions.lines + 1) + 2 * l + 1;
        }
        this._vertices = v;
        this._indices = i;
    }




    beginDraw(): void {
        var gl = this.gl;

        var uWireframe = this.getUniform("uWireframe");
        if (uWireframe)
            gl.uniform1i(uWireframe, true);

          var uMaterialDiffuse = this.getUniform("uMaterialDiffuse");
        if (uMaterialDiffuse)
            gl.uniform4fv(uMaterialDiffuse, [0.7,0.7,0.7, 1]);
          

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


        Ketch.disableAttrib(this.graphID, "a_position");


        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

}