class SceneGraph extends Renderable {
    private _scene: NodeElement;
    private _isDrawing: boolean;
    private _matrixStack: MatrixStack;
    private _oid: string;

    private _loaderBuffer: Array<MeshEntity>;

    private static UNIFORMS = [
        'uPMatrix',
        'uMVMatrix',
        'uNMatrix',
        'uLightDirection',
        'uLightAmbient',
        'uMaterialAmbient',
        'uLightDiffuse',
        'uMaterialDiffuse',
        'uLightSpecular',
        'uMaterialSpecular',
        'uShininess',
        'uWireframe',
        'uWireframeColor'
    ];
    private static ATTRIBUTES = ['a_position', 'a_normal'];

    constructor() {
        var oid = utils.uuid();
        super(oid);
        this._oid = oid;
        this._scene = new NodeElement(void 0, "Scene");
        this._matrixStack = new MatrixStack(this._oid);
        this._loaderBuffer = [];
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

    public draw(): void {
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
    
    public removeMainChildNode(node:NodeElement){
        this._scene.removeChildNode(node);
    }


    public get oid(): string {
        return this._oid;
    }


    public setContext(canvas) {
        Ketch.setCanvasToContext(this.oid, canvas);

    }

    private Program() {
        Ketch.createProgram(this._oid, {
            fragment: Shaders.Fragment.Main,
            vertex: Shaders.Vertex.Main
        });
    }

    public createMesh(config?:{mesh?, material?, texture?, wireframe?:{is:Boolean, color:Array<Number>} }): MeshEntity {
        var meshEntity = new MeshEntity(this.oid);
        
        if(config.mesh){
            meshEntity.loadMeshByObject(config.mesh);
        }
        
        if(config.material){
            meshEntity.loadMaterialByObject(config.material);
        }
        
        if(config.wireframe){
            var wireframe=config.wireframe;
            meshEntity.setWireFrame(wireframe.is, wireframe.color);
        }
        
        return meshEntity;
    }


    public createMeshByLoader(config: { mesh?: string, texture?: string, material?: string }): MeshEntity {
        var mesh = new MeshEntity(this.oid, config.mesh, config.material, config.texture);
        this._loaderBuffer.push(mesh);
        return mesh;
    }

    public createTransform(position?: Array<number>, size?: Array<number>, rotation?: ClassUtils.Rotation) {
        return new TransformEntity(this.oid, position, size, rotation);
    }

    public createLight(config: { ambient?: Array<number>, diffuse?: Array<number>, specular?: Array<number>, position?: Array<number>, direction?: Array<number>, cutoff?: number }) {
        return new LightEntity(this.oid, config.ambient, config.diffuse, config.position, config.specular, config.direction, config.cutoff);
    }

    public createCamera(type?: CAMERA_TYPE) {
        return new CameraEntity(this.oid, type);
    }


    public set MainCamera(camera: CameraEntity) {
        this._matrixStack.MainCamera = camera;
    }



    public startLoader(cb) {
        async.eachSeries(this._loaderBuffer, (item, next) => {
            item.loadMesh(() => {
                console.log(item);
                next();
            });
        }, cb);
    }

    public configure() {
        var self = this;

        self.Environment()
        self.Program();

        Ketch.setAttributeLocations(self._oid, SceneGraph.ATTRIBUTES);
        Ketch.setUniformLocations(self._oid, SceneGraph.UNIFORMS);
        this._matrixStack.init();
    }


    public configureWithLoader(cb) {
        var self = this;

        self.configure();

        self.startLoader(cb);

    }


}