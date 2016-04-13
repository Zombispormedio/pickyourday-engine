class ParticleEntity extends Entity {

    private _buffer;
    private _pointSize: number;
    private _numItems: number;

    constructor(graph_id: string, pointSize?: number) {
        super(graph_id);
        this._pointSize = pointSize || 1;
        this._buffer = null;
    }

    public configure(data: Array<number>) {
        var gl = this.gl;

        this._buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        this._numItems = data.length;
    }
    public update(data: Array<number>) {
        var gl = this.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        this._numItems = data.length;
    }
    
    
    public set pointSize(v : number) {
        this._pointSize = v;
    }
    


    beginDraw() {

        var gl = this.gl;

        var uPointSize = this.getUniform("uPointSize");
        if (uPointSize)
            gl.uniform1f(uPointSize, this._pointSize);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);

        Ketch.enableAttrib(this.graphID, "a_position");
        gl.drawArrays(gl.POINTS, 0, this._numItems/3);
    }

    endDraw() {
        var gl = this.gl;
        Ketch.disableAttrib(this.graphID, "a_position");
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

    }

}