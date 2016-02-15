class MatrixStack {
    private _stack: Array<Array<number>>;
    private _mvMatrix: Array<number>;
    private _pMatrix: Array<number>;
    private _nMatrix: Array<number>;

    constructor() {
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

}