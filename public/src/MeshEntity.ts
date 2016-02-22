class MeshEntity extends Entity{
   private _meshFilename: string;
   private _textureFilename:string;
   private _material:Resources.MeshMaterial;
   private _texture: Resouces.MeshTexture;
   private _buffers: Resouces.MeshBuffers;

   constructor(meshFilename:string, textureFilename:string){
       super();
       this._meshFilename=meshFilename;
       this._textureFilename=textureFilename;
       this._material=null;
       this._texture=null;
       this._buffers=null;  
   }
   
   
   public set meshFilename(v : string) {
       this._meshFilename = v;
   }
   
   
   public set textureFilename(v : string) {
       this._textureFilename = v;
   }
   
   loadBuffers(cb){
       this._buffers=new Resources.MeshBuffers();
       this._buffers.onload=cb;
       this._buffers.src=this._meshFilename;
   }
   
   
}