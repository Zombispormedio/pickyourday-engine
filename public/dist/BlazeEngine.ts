module BlazeEngine {
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
export class AnimationEntity extends Entity{
   
}
export class MeshEntity extends Entity{
   
}
export class TextureEntity extends Entity{
   
}
export class TransformEntity extends Entity {
    private _matrix: Array<number>;
    private _position: Array<number>;
    private _size: Array<number>;
    private _rotation: utils.Rotation;
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



    set rotation(rotation: utils.Rotation) {
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
    private _position: Array<number>;
    constructor(ambient?: Array<number>, diffuse?: Array<number>, position?: Array<number>) {
        super();
        this._ambient = ambient ? vec4.create(ambient) : vec4.create();
        this._diffuse = diffuse ? vec4.create(diffuse) : vec4.create();
        this._position = position ? vec4.create(position) : vec4.create();

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

    get position(): Array<number> {
        return this._diffuse;
    }


    set position(position: Array<number>) {
        this._position = utils.normalizeNaN(vec3.create(position));
    }


}
export class DirectionalLightEntity extends LightEntity{
   
}
export class PositionalLightEntity extends LightEntity{
   
}
export class CameraEntity extends Entity{
   
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
        var TextureNode = TrMeshNode.createChildNode("Texture", new TextureEntity());

        var MeshNode2 = TextureNode.createChildNode("Mesh", new MeshEntity());


    }


}
export module utils {
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
    export function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    export function uuid(name) {
        return name + s4() + s4();
    }
    export interface Rotation {
        angle: number;
        axis: Array<number>;
    }
    export function normalizeNaN(vec){
        return vec.map(a=>{if(Number.isNaN(a))a=0; return a;})
    }

}



}
