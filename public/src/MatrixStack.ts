class MatrixStack extends Renderable {
    private _stack: Array<Array<number>>;
    private _mvMatrix: Array<number>;
    private _pMatrix: Array<number>;
    private _nMatrix: Array<number>;
    private _camera: CameraEntity;

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

    public ModelView() {
        if (this._camera) {
            this._mvMatrix = this._camera.modelView;
        } else {
            mat4.identity(this._mvMatrix);
        }

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

    public set MainCamera(camera: CameraEntity) {
        this._camera = camera;
    }


    public Perspective(): void {
        var gl = this.gl;
        mat4.identity(this._pMatrix);
        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0, this._pMatrix);
    }

    public Normal(): void {
        mat4.identity(this._nMatrix);
        mat4.set(this._mvMatrix, this._nMatrix);
        mat4.inverse(this._nMatrix);
        mat4.transpose(this._nMatrix);
    }
    
    public init(){
        this.ModelView();
        this.Perspective();
        this.Normal();
    }

    public setUp() {
        var gl = this.gl;

        this.Normal();

        var mvMatrix = this.getUniform("uMVMatrix");
        if (mvMatrix)
            gl.uniformMatrix4fv(mvMatrix, false, this._mvMatrix);

        var pMatrix = this.getUniform("uPMatrix");
        if (pMatrix)
            gl.uniformMatrix4fv(pMatrix, false, this._pMatrix);

        var nMatrix = this.getUniform("uNMatrix");
        if (nMatrix)
            gl.uniformMatrix4fv(nMatrix, false, this._nMatrix);
    }


}