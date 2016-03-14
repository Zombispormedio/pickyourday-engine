class SceneGraph extends Renderable {
    private _scene: NodeElement;
    private _isDrawing: boolean;
    private _matrixStack: MatrixStack;
    private _oid: string;

    private _shaders: Resources.Shaders;

    private static FRAGMENT_SOURCE = "shaders/main.frag";
    private static VERTEX_SOURCE = "shaders/main.vert";
    private static UNIFORMS = ["uPMatrix", "uMVMatrix"];
    private static ATTRIBUTES = ['a_position'];




    constructor() {
        var oid = utils.uuid();
        super(oid);
        this._oid = oid;
        this._shaders = new Resources.Shaders();
        this._scene = new NodeElement(void 0, "Scene");
        this._matrixStack = new MatrixStack(this._oid);
        this._isDrawing = false;
        Ketch.createView(this._oid);
    }


    public get scene(): NodeElement {
        return this._scene;
    }


    public get isDrawing(): boolean {
        return this._isDrawing;
    }

    public Environment() {
        var gl = this.gl;
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.clearColor(0, 0, 0, 1);
        gl.clearDepth(1.0);
    }

    public draw():void{
     
            var gl = this.gl;
            this._isDrawing = true;
            gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            this._scene.draw(this._matrixStack);
            this._isDrawing = false;
        

    }

    public createMainChildNode(type: string, entity: Entity): NodeElement {
        return this._scene.createChildNode(type, entity);
    }


    public get oid(): string {
        return this._oid;
    }


    public setContext(canvas) {
        Ketch.setCanvasToContext(this.oid, canvas);

    }

    private loadProgram(cb, shaders_config?) {
        if (!shaders_config) {
            shaders_config = {
                fragment: SceneGraph.FRAGMENT_SOURCE,
                vertex: SceneGraph.VERTEX_SOURCE
            }
        }


        async.waterfall([
            next => {


                this._shaders.fragment.onload = () => {
                    next()
                };
                this._shaders.fragment.src = shaders_config.fragment || SceneGraph.FRAGMENT_SOURCE;


            },
            next => {
                this._shaders.vertex.onload = () => {
                    next()
                };
                this._shaders.vertex.src = shaders_config.vertex || SceneGraph.VERTEX_SOURCE;

            }
        ], (err) => {
            if (err) return console.log(err);

            Ketch.createProgram(this._oid, this._shaders.Sources);


            if (cb) cb();
        });
    }


    public buildDefaultGraph(): void {

        var mesh = this.createMesh({ mesh: "data/picky.obj", material: "data/test.mtl", texture: "data/webgl.png" });
        this.createMainChildNode("Mesh", mesh);

        /* var TrLightNode = this.createMainChildNode("TRLight", new TransformEntity(this.oid));
         var TrCameraNode = this.createMainChildNode("TRCamera", new TransformEntity(this.oid));
         var TrMeshNode = this.createMainChildNode("TRMesh", new TransformEntity(this.oid));
 
 
         var LightNode = TrLightNode.createChildNode("Light", new LightEntity(this.oid));
 
         var CameraNode = TrCameraNode.createChildNode("Camera", new CameraEntity(this.oid));
 
         var MeshNode1 = TrMeshNode.createChildNode("Mesh", new MeshEntity(this.oid));
         var MeshNode2 = TrMeshNode.createChildNode("Mesh", new MeshEntity(this.oid));*/




    }


    public createMesh(config: { mesh: string, texture: string, material: string }): MeshEntity {
        return new MeshEntity(this.oid, config.mesh, config.material, config.texture);
    }

    public createTransform(position?: Array<number>, size?: Array<number>, rotation?: ClassUtils.Rotation) {
        return new TransformEntity(this.oid, position, size, rotation);
    }




    public configure(cb) {
        var self = this;
        var gl = this.gl;

        self.Environment()
        async.waterfall([
            (next) => {
                self.loadProgram(next);
            },
            (next) => {
                var mesh = this._scene.childNodes[0].entity;
                mesh.loadMesh(() => {
                    console.log(mesh);
                    next();
                });
            }
        ], (err) => {

            Ketch.setAttributeLocations(this._oid, SceneGraph.ATTRIBUTES);
            Ketch.setUniformLocations(this._oid, SceneGraph.UNIFORMS);


            if (cb) cb();
        })
    }


}