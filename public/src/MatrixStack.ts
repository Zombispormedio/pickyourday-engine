class MatrixStack extends Renderable {
    private _stack: Array<Array<number>>;
    private _mvMatrix: Array<number>;
    private _pMatrix: Array<number>;
    private _nMatrix: Array<number>;

    constructor(graph_id: string) {
        super(graph_id);
        this._stack = [];
        this._mvMatrix = mat4.create();
        this._pMatrix = mat4.create();
        this._nMatrix = mat4.create();
    }

    push(): void {
        var copy = mat4.create();
        mat4.set(this._mvMatrix, copy);
        this._stack.push(copy);
    }

    pop(): void {
        if (this._stack.length == 0)
            throw "invalid popMatrix";
        this._mvMatrix = this._stack.pop();
    }

    makeMV() {
        mat4.identity(this._mvMatrix);
    }
    get mvMatrix(): Array<number> {
        return this._mvMatrix;
    }

    get pMatrix(): Array<number> {
        return this._pMatrix;
    }

    get nMatrix(): Array<number> {
        return this._nMatrix;
    }

    public getUniform(key: string) {
        return Ketch.getUniform(this.graphID, key);
    }

    public Perspective(): void {
        var gl=this.gl;
        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0, this._pMatrix);
    }

    public setUp() {
        var gl = this.gl;
       
        var mvMatrix = this.getUniform("uMVMatrix");
        if (mvMatrix)
            gl.uniformMatrix4fv(mvMatrix, false, this._mvMatrix);

        var pMatrix = this.getUniform("uPMatrix");
        if (pMatrix)
            gl.uniformMatrix4fv(pMatrix, false, this._pMatrix);
    }


}