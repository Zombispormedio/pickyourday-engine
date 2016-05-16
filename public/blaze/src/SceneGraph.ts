class SceneGraph extends Renderable {
    private _scene: NodeElement;
    private _matrixStack: MatrixStack;
    private _selector: Selector;
    private _effects: Effects;
    private _useSelector:Boolean;

    private _oid: string;

    private _loaderBuffer: Array<MeshEntity>;

    private static UNIFORMS = [
        'uPMatrix',
        'uMVMatrix',
        'uNMatrix',
        "uLightPosition",
        'uLightDirection',
        "uCutOff",
        'uLightAmbient',
        'uMaterialAmbient',
        'uLightDiffuse',
        'uMaterialDiffuse',
        'uLightSpecular',
        'uMaterialSpecular',
        'uShininess',
        'uPointSize',
        "uSampler",
        "uWireframe",
        "uPerVertexColor",
        "uSelectColor",
        "uOffscreen",
        "uInverseTextureSize",
        "uNoiseSampler",
        "uTime"
    ];
    private static ATTRIBUTES = ['a_position', 'a_normal', "a_color", "a_texture_coords"];

    constructor() {
        var oid = utils.uuid();
        super(oid);
        this._oid = oid;
        this._scene = new NodeElement(void 0, "Scene");
        this._matrixStack = new MatrixStack(this._oid);
        this._loaderBuffer = [];
        Ketch.createView(this._oid);
        this._selector = null;
        this._effects = null;
        this._useSelector=false;

    }


    public get scene(): NodeElement {
        return this._scene;
    }




    public Environment(b?: Array<number>) {
        var gl = this.gl;
        b = b || [];

        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.clearColor(b[0] || 0, b[1] || 0, b[2] || 0, 1);
        gl.clearDepth(1.0);
    }

    public render(): void {

        if (this._effects&&this._effects.type!=="no") {
      
            this.drawWithEffects();


        } else {
            this.drawScene();

        }

    }

    public drawScene(): void {
        var gl = this.gl;
        this.useProgram();
        var draw = (function () {
            gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            this._scene.draw(this._matrixStack);
        }).bind(this);

        if (this._selector &&   this._useSelector) {
            
            this._selector.render(draw);
        }

        draw();
    }

    public drawWithEffects(): void {
        this._effects.Size();
        this._effects.bindFrameBuffer();

        this.drawScene();

        this._effects.unbindFrameBuffer();

        this._effects.Bind();
        this._effects.draw();
    }

    public useProgram() {
        Ketch.useProgram(this.oid);
    }

    public createMainChildNode(type: string, entity: Entity): NodeElement {
        return this._scene.createChildNode(type, entity);
    }

    public removeMainChildNode(node: NodeElement) {
        this._scene.removeChildNode(node);
    }


    public get oid(): string {
        return this._oid;
    }


    public setContext(canvas) {
        Ketch.setCanvasToContext(this.oid, canvas);

    }

    public Program(type?: string) {
        type = type || "Phong";

        Ketch.createProgram(this._oid, {
            fragment: Shaders.Fragment[type] || Shaders.Fragment["Phong"],
            vertex: Shaders.Vertex[type] || Shaders.Vertex["Phong"]
        });
    }




    public createMesh(config?: { mesh?, material?, texture?}): MeshEntity {
        var meshEntity = new MeshEntity(this.oid);

        if (config.mesh) {
            meshEntity.loadMeshByObject(config.mesh);
        }

        if (config.material) {
            meshEntity.loadMaterialByObject(config.material);
        }

        return meshEntity;
    }
    public createDiffuse(v: Array<number>): DiffuseEntity {
        return new DiffuseEntity(this.oid, v);
    }

    public createMeshByLoader(config: { mesh?: string, texture?: string, material?: string }): MeshEntity {
        var mesh = new MeshEntity(this.oid, config.mesh, config.material, config.texture);
        this._loaderBuffer.push(mesh);
        return mesh;
    }

    public createTransform(position?: Array<number>, size?: Array<number>, rotation?: ClassUtils.Rotation): TransformEntity {
        return new TransformEntity(this.oid, position, size, rotation);
    }

    public createLight(config: { ambient?: Array<number>, diffuse?: Array<number>, specular?: Array<number>, position?: Array<number>, direction?: Array<number>, cutoff?: number }): LightEntity {
        return new LightEntity(this.oid, config.ambient, config.diffuse, config.position, config.specular, config.direction, config.cutoff);
    }

    public createCamera(type?: CAMERA_TYPE): CameraEntity {
        return new CameraEntity(this.oid, type);
    }

    public createParticle(pointSize?: number): ParticleEntity {
        return new ParticleEntity(this.oid, pointSize);
    }

    public createAxis(length?: number): AxisEntity {
        return new AxisEntity(this.oid, length);
    }

    public createGrid(dim?: number, lines?: number): GridEntity {
        return new GridEntity(this.oid, dim, lines);
    }

    public createSelect(data: any): SelectEntity {
        return new SelectEntity(this.oid, data);
    }

    public createSelector(dimensions: { height: number, width: number }) {
        
        this._selector = new Selector(this.oid, dimensions);
          this._useSelector=true;
    }
    
    
    public set useSelector(v : Boolean) {
        this._useSelector = v;
    }
    

    public fillSelector(obj: SelectEntity) {
        if (this._selector) {
            this._selector.fill(obj);
        }
    }

    public clearSelector(obj: SelectEntity) {
        if (this._selector) {
            this._selector.clear();
        }
    }

    public select(pos: { x: number, y: number }) {
        if (this._selector) {
            return this._selector.find(pos);
        }
    }


    public createEffects(canvas, type?: string) {
        this._effects = new Effects(this.oid, canvas, type);
      
    }

    public setNoiseEffect(texture) {
        if (this._effects)
            this._effects.setNoiseTexture(texture);
    }

    public setEffect(type) {
        if (this._effects)
            this._effects.setEffect(type);
    }
    
    public createLightArray(){
        return new LightArrayEntity(this.oid);
    }
  

    public set MainCamera(camera: CameraEntity) {
        this._matrixStack.MainCamera = camera;
    }

    public removeTexture(id) {
        Ketch.removeTexture(this.oid, id);
    }

    public startLoader(cb) {
        async.eachSeries(this._loaderBuffer, (item, next) => {
            item.loadMesh(() => {
                console.log(item);
                next();
            });
        }, cb);
    }

    public configure(config?: { typeShader?: string, background?: Array<number> }) {
        var self = this;
        config = config || {};

        self.Environment(config.background)
        self.Program(config.typeShader);

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