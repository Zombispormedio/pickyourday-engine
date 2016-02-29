module BlazeEngine {
export module WebGLUtils{
     export function getGLContext(canvas) {
        var ctx = null;
        var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];

        for (var i = 0; i < names.length; ++i) {
            try {
                ctx = canvas.getContext(names[i]);
            }
            catch (e) { }
            if (ctx) {
                break;
            }
        }
        if (ctx === null) {
            alert("Could not initialise WebGL");
            return null;
        }
        else {
            return ctx;
        }
    }
}
export module ClassUtils{
    export interface Rotation {
        angle: number;
        axis: Array<number>;
    }
}
export module utils {
    export function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    export function uuid(name) {
        return name + s4() + s4();
    }

    export function normalizeNaN(vec) {
        return vec.map(a=> { if (Number.isNaN(a)) a = 0; return a; })
    }

    export function load(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.addEventListener('load', function() {
            callback(request.responseText);
        });
        request.send();
    }
    
    export function getExtension(str:string){
        var elems=str.split(".");
        return elems[elems.length-1];
    }
    
    export function nowInMilliseconds(){
        return  (new Date()).getTime();
    }



}



export enum CAMERA_TYPE{ORBITING, TRACKING}
export interface IEntity {

    beginDraw(): void;
    endDraw():void;
    
}
export class Entity implements IEntity{
    beginDraw(matrixStack?: MatrixStack): void{
        
    }
    endDraw(matrixStack?: MatrixStack): void{
        
    }
}
export class MatrixStack {
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
export module Resources {

    export class MeshBuffers {
        private _vbo; //Vertex Buffer Object;
        private _nbo; //Normal Buffer Object;
        private _ibo; //Index Buffer Object;
        private _tbo; //Texture Coords Buffer Object;
        private _onload;
        private _src: string;
        constructor() {

        }

        public set onload(cb) {
            this._onload = cb;
        }


        public set src(src: string) {
            var self = this;
            var ext = utils.getExtension(src);

            utils.load(src, function(data) {
                var obj;
                switch (ext) {
                    case "obj": obj = self.parseOBJ(data);
                        break;

                    case "json": obj = self.parseJSON(data);
                        break;

                }
                self.createBuffers(obj);
                if (this._onload) this._onload();
            });


        }

        private parseJSON(data: string): any {
            var obj = {};
            try {
                obj = JSON.parse(data);
            } catch (e) {
                console.log(e);
            }
            return obj;
        }

        private parseOBJ(data: string): any {
            var obj = {
                v: [],
                vn: [],
                vt: [],
                iv: [],
                in: [],
                it: []
            };
            var lines = data.split("\n");

            var vertex = lines.filter(function(a) {
                return a[0] === 'v';
            });

            var index = lines.filter(function(a) {
                return a[0] === 'f';
            });

            vertex.forEach(function(item) {
                var elems = item.replace("\r", "").split(" ");
                var key = elems[0];
                obj[key] = obj[key].concat(elems.slice(1).filter(function(a) {
                    return a !== "";
                }));
            });

            var tempIndex = [];
            index.forEach(function(item) {
                var elems = item.replace("\r", "").replace("f", "").split(" ");
                tempIndex = tempIndex.concat(elems.slice(1).filter(function(a) {
                    return a !== "";
                }));
            });

            tempIndex.forEach(function(item) {
                var elems = item.split("/");
                obj.iv = obj.iv.concat(parseInt(elems[0]) - 1);
                obj.in = obj.in.concat(parseInt(elems[1]) - 1);
                obj.it = obj.it.concat(parseInt(elems[2]) - 1);
            });


            return obj;

        }

        private createBuffers(obj: any): void {

        }


    }



    export class MeshTexture {
        private _texture;
        private _image;
        private _onload;
        constructor() {
            //this._object=gl.createTexture();
            this._image = new Image();

        }



        public set onload(cb) {
            this._onload = cb;
        }

        public set src(filename: string) {
            this._image.onload = this.loadTextureImage(this._onload);
            this._image.src=filename;
        }

        loadTextureImage(cb) {
            return function() {
                
                
                if (cb) cb();
            }
        }


        public get texture(): string {
            return this._texture;
        }
    }

    export class MeshMaterial {
        private _ambient: Array<number>;
        private _diffuse: Array<number>;
        private _specular: Array<number>;
        private _transparent: number;
        private _onload;
        private _src: string;
        
        constructor(ambient?: Array<number>, diffuse?: Array<number>, specular?: Array<number>, shininess?: number) {
            this._ambient = ambient ? vec4.create(ambient) : vec4.create();
            this._diffuse = diffuse ? vec4.create(diffuse) : vec4.create();
            this._specular = specular ? vec4.create(specular) : vec4.create();
            this._transparent = shininess || 200.0;
        }

        public set onload(cb) {
            this._onload = cb;
        }


        public set src(src: string) {

            var self = this;


            utils.load(src, function(data) {
                 var temp=self.parse(data);
                 this._ambient=temp.Ka;
                 this._diffuse=temp.Kd;
                 this._specular=temp.Ks;
                 this._transparent=temp.Ns;
                if (this._onload) this._onload();
            });


        }

        parse(data: string): any {
            var obj = {};
            var keys=["Ka", "Kd", "Ks", "Ns"];
            var lines = data.split("\n");
            lines.forEach(function(line){
                var elems=line.split(" ");
                var key=elems[0];
                if(keys.indexOf(key)>-1){
                    switch(key){
                        case "Ns": obj["Ns"]=elems[1];
                        break;
                        default: obj[key]=elems.slice(1);
                    }
                }
                
            })
            
            return obj;
        }


        get ambient(): Array<number> {
            return this._ambient;
        }


        set ambient(ambient: Array<number>) {
            this._ambient = utils.normalizeNaN(vec4.create(ambient));
        }


        get diffuse(): Array<number> {
            return this._diffuse;
        }


        set diffuse(diffuse: Array<number>) {
            this._diffuse = utils.normalizeNaN(vec4.create(diffuse));
        }


        get specular(): Array<number> {
            return this._specular;
        }


        set specular(specular: Array<number>) {
            this._specular = utils.normalizeNaN(vec4.create(specular));
        }


        public get transparent(): number {
            return this._transparent;
        }


        public set transparent(v: number) {
            this._transparent = v;
        }

    }

}
export class AnimationEntity extends Entity {
    private _frequency: number;
    private _interval_id:number;
    private _callback:any;
    private _intime:number;
    private _times:number;
    private static Count:number=0;
    private static ElapseTime:number;
    constructor(frequency:number, times:number, callback:any ) {
        super();
        this._frequency=frequency;
        this._interval_id=null;
        this._callback=callback;
        
    }
    
    
    onFrame(){
        AnimationEntity.ElapseTime=utils.nowInMilliseconds();
        
        if(AnimationEntity.ElapseTime<5)return;
        var steps=Math.floor(AnimationEntity.ElapseTime/this._frequency);
        while((steps>0)&&(AnimationEntity.Count!=this._times)){
            this._callback();
            steps--;
            AnimationEntity.Count++;
        }
        
        if(AnimationEntity.Count===this._times){
            this.stop();
        }
    }
    
    
    

    start() {
        this._intime=utils.nowInMilliseconds();
        this._interval_id=setInterval(this.onFrame, this._frequency/1000);
    }

    stop() {
        if(this._interval_id)
        clearInterval(this._interval_id);
    }
    
    beginDraw(){
        
    }
    
    endDraw(){
        
    }
}
export class MeshEntity extends Entity {
    private _material: Resources.MeshMaterial;
    private _texture: Resources.MeshTexture;
    private _buffers: Resources.MeshBuffers;

    constructor() {
        super();
        this._material = null;
        this._texture = null;
        this._buffers = null;
    }

    loadBuffers(filename, cb) {
        this._buffers = new Resources.MeshBuffers();
        this._buffers.onload = cb;
        this._buffers.src = filename;
    }

    loadTexture(filename, cb) {
        this._texture = new Resources.MeshTexture();
        this._texture.onload = cb;
        this._texture.src = filename;
    }


    public set material(v: Resources.MeshMaterial) {
        this._material = v;
    }

    loadMaterial(filename, cb) {
        this._material = new Resources.MeshMaterial();
        this._material.onload = cb;
        this._material.src = filename;
    }

    loadMesh(config, cb) {
        var self = this;
        async.waterfall([
            function buffers(next) {
                if (!config.mesh) {
                    console.log("No Mesh file");
                    return next();
                }
                self.loadBuffers(config.mesh, function() {
                    next();
                });
            },
            function texture(next) {
                if (!config.texture) {
                    console.log("No Texture file");
                    return next();
                }
                self.loadTexture(config.texture, function() {
                    next();
                });
            },
            function material(next) {
                if (!config.material) {
                    console.log("No Material file");
                    return next();
                }
                self.loadMaterial(config.material, function() {
                    next();
                });
            }
        ], function(err) {
            if (err) return console.log(err);
            if (cb) cb();
        });



    }

    beginDraw() {

    }
    
    endDraw(){
        
    }



}
export class TransformEntity extends Entity {
    private _matrix: Array<number>;
    private _position: Array<number>;
    private _size: Array<number>;
    private _rotation: ClassUtils.Rotation;
    constructor() {
        super();
        this._matrix = mat4.create();
        this._position = vec3.create();
        this._size = vec3.create([1, 1, 1]);
        this._rotation = { angle: 0, axis: vec3.create() };
    }

    identity() {
        mat4.identity(this._matrix);
    }

    setMatrix(new_matrix: Array<number>) {
        this._matrix = new_matrix;
    }

    transpose() {
        mat4.transpose(this._matrix, this._matrix);
    }


    set position(position: Array<number>) {
        this._position = position;
    }

    get position() {
        return this._position;
    }

    setAbsolutePosition(x: number, y: number, z: number) {
        this._position = [x, y, z];
    }

    translate(x = 0, y = 0, z = 0) {
        var operand1 = this._position;
        var operand2 = vec3.create([x, y, z]);
        vec3.add(operand1, operand2, this._position);
    }


    set size(size: Array<number>) {
        this._size = size;
    }

    get size() {
        return this._size;
    }

    setSize(x: number, y: number, z: number) {
        this._size = [x, y, z];
    }

    scale(x = 0, y = 0, z = 0) {
        var operand1 = this._size;
        var operand2 = vec3.create([x, y, z]);
        vec3.add(operand1, operand2, this._size);
    }



    set rotation(rotation: ClassUtils.Rotation) {
        this._rotation = rotation;
    }

    get rotation() {
        return this._rotation;
    }

    setRotation(angle?: number, axis?: Array<number>) {
        if (angle) this._rotation.angle = angle;
        if (axis) this._rotation.axis = axis;
    }

    setAngle(angle: number) {
        this._rotation.angle = angle;
    }
    setAxis(axis: Array<number>) {
        this._rotation.axis = axis;
    }


    rotateAngle(angle = 0) {
        this._rotation.angle += angle;
    }


    moveAxis(x = 0, y = 0, z = 0) {
        var operand1 = this._rotation.axis;
        var operand2 = vec3.create([x, y, z]);
        vec3.add(operand1, operand2, this._rotation.axis);
    }

    beginDraw(matrixStack: MatrixStack) {
        matrixStack.push();
        matrixStack.makeMV();
        this._matrix = matrixStack.mvMatrix;

        mat4.translate(this._matrix, this._position);

        mat4.scale(this._matrix, this._size);

        var rad = this._rotation.angle * Math.PI / 180;
        mat4.rotate(this._matrix, rad, this._rotation.axis);

    }

    endDraw(matrixStack: MatrixStack) {
        matrixStack.pop();
    }
}


export class LightEntity extends Entity {
    private _ambient: Array<number>;
    private _diffuse: Array<number>;
    private _specular: Array<number>;
    private _position: Array<number>;
    constructor(ambient?: Array<number>, diffuse?: Array<number>, position?: Array<number>, specular?:Array<number>) {
        super();
        this._ambient = ambient ? vec4.create(ambient) : vec4.create();
        this._diffuse = diffuse ? vec4.create(diffuse) : vec4.create();
        this._position = position ? vec4.create(position) : vec4.create();
        this._specular = specular ? vec4.create(specular) : vec4.create();
    }


    get ambient(): Array<number> {
        return this._ambient;
    }


    set ambient(ambient: Array<number>) {
        this._ambient = utils.normalizeNaN(vec4.create(ambient));
    }


    get diffuse(): Array<number> {
        return this._diffuse;
    }


    set diffuse(diffuse: Array<number>) {
        this._diffuse = utils.normalizeNaN(vec4.create(diffuse));
    }
    
    
    get specular(): Array<number> {
        return this._specular;
    }


    set specular(specular: Array<number>) {
        this._specular = utils.normalizeNaN(vec4.create(specular));
    }


    get position(): Array<number> {
        return this._diffuse;
    }


    set position(position: Array<number>) {
        this._position = utils.normalizeNaN(vec3.create(position));
    }
    
    beginDraw(matrixStack: MatrixStack){
        
    }
    
    endDraw(matrixStack: MatrixStack){
        
    }
    
   


}
export class DirectionalLightEntity extends LightEntity {
    private _direction: Array<number>;
    private _cutoff: number;
    constructor(ambient?: Array<number>, diffuse?: Array<number>, position?: Array<number>, direction?: Array<number>, cutoff?: number) {
        super(ambient, diffuse, position);
        this._direction = direction ? vec3.create(direction) : vec3.create();
        this._cutoff = cutoff || 0.5;

    }


    public set direction(direction: Array<number>) {
        this._direction = utils.normalizeNaN(vec3.create(direction));
    }

    public get direction(): Array<number> {
        return this._direction;
    }


    public set cutOff(cutoff: number) {
        this._cutoff = cutoff;
    }


    public get cutOff(): number {
        return this._cutoff;
    }

    beginDraw(matrixStack: MatrixStack) {

    }

    endDraw(matrixStack: MatrixStack) {

    }




}
export class CameraEntity extends Entity {
    private _type: CAMERA_TYPE;
    private _cmatrix: Array<Array<number>>;
    private _up: Array<number>;
    private _right: Array<number>;
    private _normal: Array<number>;
    private _position: Array<number>;
    private _focus: Array<number>;
    private _azimuth: number;
    private _elevation: number;
    private _steps: number;
    private _home: Array<number>;
    
    private _options:{focus: Array<number>, azimuth:number, elevation:number, home:Array<number>};
    

    constructor(options?, type?: CAMERA_TYPE ) {
        super();
        this._type = type || CAMERA_TYPE.ORBITING;
        this._cmatrix = mat4.create();
        this._up = vec3.create();
        this._right = vec3.create();
        this._normal = vec3.create();
        this._position = vec3.create();
        this._focus = vec3.create();
        this._home = vec3.create();
        this._azimuth = 0.0;
        this._elevation = 0.0;
        this._steps = 0;
        this._options=options;
    }


    public set type(type: CAMERA_TYPE) {
        this._type = type;
    }
    
    
    public set home(home: Array<number>) {
        if (home != void 0) {
            this._home = home;
        }
        this.position = this._home;
        this.azimuth = 0;
    }
    


    public set position(p: Array<number>) {
        vec3.set(p, this._position);
        vec3.set(p, this._home);
        this.updateMatrix();
    }


    public set azimuth(azimuth: number) {
        this._azimuth += azimuth - this._azimuth;
        if(this._azimuth>360 || this._azimuth<-360){
            this._azimuth%=360;
        }
        this.updateMatrix();

    }
    
    
    public set focus(f : Array<number>) {
       vec3.set(f, this._focus);
       this.updateMatrix();
    }
    
    
    public set elevation(e : number) {
        this._elevation += e;
        
        if(this._elevation>360 || this._elevation<-360){
            this._elevation%=360;
        }
        this.updateMatrix();
    }
    
    


    applyOrientationMatrix() {
        var m = this._cmatrix;
        mat4.multiplyVec4(m, [1, 0, 0, 0], this._right);
        mat4.multiplyVec4(m, [0, 1, 0, 0], this._up);
        mat4.multiplyVec4(m, [0, 0, 1, 0], this._normal);
    }

    updateMatrix() {
        mat4.identity(this._cmatrix);
        this.applyOrientationMatrix();

        if (this._type === CAMERA_TYPE.TRACKING) {
            mat4.translate(this._cmatrix, this._position);
            mat4.rotateY(this._cmatrix, this._azimuth * Math.PI / 180);
            mat4.rotateX(this._cmatrix, this._elevation * Math.PI / 180);
        } else {
            mat4.rotateY(this._cmatrix, this._azimuth * Math.PI / 180);
            mat4.rotateX(this._cmatrix, this._elevation * Math.PI / 180);
            mat4.translate(this._cmatrix, this._position);
        }

        this.applyOrientationMatrix();

        if (this._type === CAMERA_TYPE.TRACKING) {
            mat4.multiplyVec4(this._cmatrix, [0, 0, 0, 1], this._position);
        }
    }
    
    
    public get modelView() :Array<number> {
        var m=mat4.create();
        mat4.inverse(this._cmatrix, m);
        return m;
    }
    
    beginDraw(){
        this.home=this._options.home;
        this.focus=this._options.focus;
        this.azimuth=this._options.azimuth;
        this.elevation=this._options.elevation;
    }
    
    endDraw(){
        
    }
    
    
    


}
export interface INodeElement {
    _entity: IEntity;
    _childNodes: INodeElement[];
    _parentNode: INodeElement;
    addChildNode(child: INodeElement);
    
}

export class NodeElement implements INodeElement {
    _entity: Entity;
    _childNodes: NodeElement[];
    _parentNode: NodeElement;
    _type: string;
    _oid: string;


    constructor(parent?: NodeElement, type?: string, entity?: Entity) {
        this._parentNode = parent;
        if (this._parentNode) this._parentNode.addChildNode(this);
        this._childNodes = [];
        this._type = type;
        this._oid = utils.uuid(this._type || this.constructor.name);
        this._entity = entity;
    }

    get oid(): string {
        return this._oid;
    }

    get parent(): NodeElement {
        return this._parentNode;
    }

    set entity(entity: Entity) {
        this._entity = entity;
    }

    get entity() {
        return this._entity;
    }

    get childNodes() {
        return this._childNodes;
    }


    addChildNode(child: NodeElement) {
        if (this.indexOf(child) > -1);
        this._childNodes.push(child);
    }
    removeChildNode(child: NodeElement) {
        var index = this.indexOf(child);
        if (index > -1);
        this._childNodes.splice(index, 1);
    }

    getChildNodeByIndex(index: number): NodeElement {
        return this._childNodes[index] || void 0;
    }

    existsChildNode(index: string): boolean {
        return this._childNodes[index] !== void 0;
    }

    delete() {
        this._parentNode.removeChildNode(this);
    }

    createChildNode(type?:string, entity?:Entity): NodeElement {
        return new NodeElement(this, type, entity);
    }

    isRoot(): boolean {
        return this._parentNode === void 0;
    }

    indexOf(child): number {
        var oid = child.oid;
        return _.findIndex(this._childNodes, s => { return s.oid === oid; });
    }

    indexInParent(): number {
        var index = -1;

        if (!this.isRoot()) index = this._parentNode.indexOf(this);
        return index;
    }

    hasSibling(prev?: boolean): boolean {
        var _have = false;
        if (!this.isRoot()) {
            var index = this._parentNode.indexOf(this);

            if (index > -1) {
                if (prev) {
                    if (this._parentNode.getChildNodeByIndex(index - 1)) _have = true;
                } else {
                    if (this._parentNode.getChildNodeByIndex(index + 1)) _have = true;
                }

            }
        }
        return _have;
    }
    nextSibling(): NodeElement {
        var sibling: NodeElement = null;
        if (!this.isRoot() && this.hasSibling()) {
            var index = this._parentNode.indexOf(this);
            sibling = this._parentNode.getChildNodeByIndex(index + 1);
        }

        return sibling;
    }

    previousSibling(): NodeElement {
        var sibling: NodeElement = null;
        if (!this.isRoot() && this.hasSibling(true)) {
            var index = this._parentNode.indexOf(this);
            sibling = this._parentNode.getChildNodeByIndex(index - 1);
        }

        return sibling;
    }

    firstChild(): NodeElement {
        return this.getChildNodeByIndex(0);
    }

    lastChild(): NodeElement {
        return this.getChildNodeByIndex(this._childNodes.length - 1);
    }

    removeChildNodes() {
        this._childNodes = [];
    }

    draw(matrixStack: MatrixStack): void {
        console.log("Drawing: "+this._oid);
        
        if (this._entity) this._entity.beginDraw(matrixStack);
        this._childNodes.forEach(child=> {
            child.draw(matrixStack);
        });

        if (this._entity) this._entity.endDraw(matrixStack);

    }
}
export class SceneGraph {
    private _scene: NodeElement;
    private _isDrawing: boolean;
    private _matrixStack: MatrixStack;
    constructor() {

        this._scene = new NodeElement(void 0, "Scene");
        this._matrixStack= new MatrixStack();
        this._isDrawing = false;
        

    }


    public get scene(): NodeElement {
        return this._scene;
    }


    public get isDrawing(): boolean {
        return this._isDrawing;
    }

    public draw(): void {
        this._isDrawing = true;
        this._scene.draw(this._matrixStack);
        this._isDrawing = false;
    }

    public createMainChildNode(type: string, entity: Entity): NodeElement {
        return this._scene.createChildNode(type, entity);
    }

    public buildDefaultGraph(): void {

        var TrLightNode = this.createMainChildNode("TRLight", new TransformEntity());
        var TrCameraNode = this.createMainChildNode("TRCamera", new TransformEntity());
        var TrMeshNode = this.createMainChildNode("TRMesh", new TransformEntity());


        var LightNode = TrLightNode.createChildNode("Light", new LightEntity());

        var CameraNode = TrCameraNode.createChildNode("Camera", new CameraEntity());

        var MeshNode1 = TrMeshNode.createChildNode("Mesh", new MeshEntity());
        var MeshNode2 = TrMeshNode.createChildNode("Texture", new MeshEntity());

  


    }


}
}