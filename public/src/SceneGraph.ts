class SceneGraph extends Renderable {
    private _scene: NodeElement;
    private _isDrawing: boolean;
    private _matrixStack: MatrixStack;
    private _oid: string;

    private _shaders: Resources.Shaders;
    private _loaderBuffer: Array<MeshEntity>;

    private static FRAGMENT_SOURCE = "shaders/main.frag";
    private static VERTEX_SOURCE = "shaders/main.vert";
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
        'uShininess'
    ];
    private static ATTRIBUTES = ['a_position', 'a_normal'];




    constructor() {
        var oid = utils.uuid();
        super(oid);
        this._oid = oid;
        this._shaders = new Resources.Shaders();
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




    public createMesh(config: { mesh?: string, texture?: string, material?: string }): MeshEntity {
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

    public createCamera(options: { focus: Array<number>, azimuth: number, elevation: number, home: Array<number> }, type?: CAMERA_TYPE) {
        return new CameraEntity(this.oid, options, type);
    }


    public set MainCamera(camera: CameraEntity) {
        this._matrixStack.MainCamera = camera;
    }



    public loadAllMeshObjects(cb) {
        async.eachSeries(this._loaderBuffer, (item, next) => {
            item.loadMesh(() => {
                console.log(item);
                next();
            });
        }, cb);
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
                self.loadAllMeshObjects(() => {
                    next();
                })
            }
        ], (err) => {

            Ketch.setAttributeLocations(this._oid, SceneGraph.ATTRIBUTES);
            Ketch.setUniformLocations(this._oid, SceneGraph.UNIFORMS);

            this._matrixStack.init();
            
            if (cb) cb();
        })
    }


}