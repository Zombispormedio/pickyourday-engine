class SceneGraph {
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