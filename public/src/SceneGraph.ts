class SceneGraph {
    private _scene: NodeElement;
    private _isDrawing: boolean;
    private _matrixStack: MatrixStack;
    private _oid:string;
    constructor() {

        this._scene = new NodeElement(void 0, "Scene");
        this._matrixStack= new MatrixStack();
        this._isDrawing = false;
        this._oid=utils.uuid();

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
    
    
    public get oid() : string {
        return this._oid;
    }
    
    
    public setContext(canvas){
        Ketch.setCanvasToContext(this.oid,canvas);
        
    }
    
    
    

    public buildDefaultGraph(): void {
        var mesh=new MeshEntity(this.oid);
        this.createMainChildNode("Mesh", mesh);
        
        mesh.loadMesh({
            mesh:"data/picky.obj", material:"data/test.mtl", texture:"data/webgl.png"
        }, function(){
            console.log("Loaded");
            
        });

       /* var TrLightNode = this.createMainChildNode("TRLight", new TransformEntity(this.oid));
        var TrCameraNode = this.createMainChildNode("TRCamera", new TransformEntity(this.oid));
        var TrMeshNode = this.createMainChildNode("TRMesh", new TransformEntity(this.oid));


        var LightNode = TrLightNode.createChildNode("Light", new LightEntity(this.oid));

        var CameraNode = TrCameraNode.createChildNode("Camera", new CameraEntity(this.oid));

        var MeshNode1 = TrMeshNode.createChildNode("Mesh", new MeshEntity(this.oid));
        var MeshNode2 = TrMeshNode.createChildNode("Mesh", new MeshEntity(this.oid));*/

  


    }


}