class MeshEntity extends Entity {
    private _material: Resources.MeshMaterial;
    private _texture: Resources.MeshTexture;
    private _buffers: Resources.MeshBuffers;

    constructor(graph_id:string) {
        super(graph_id);
        this._material = null;
        this._texture = null;
        this._buffers = null;
    }

    loadBuffers(filename, cb) {        
        this._buffers = new Resources.MeshBuffers(this.graphID);
        this._buffers.onload = cb;
        this._buffers.src = filename;
    }

    loadTexture(filename, cb) {
        this._texture = new Resources.MeshTexture(this.graphID);
        this._texture.onload = cb;
        this._texture.src = filename;
    }


    public set material(v: Resources.MeshMaterial) {
        this._material = v;
    }

    loadMaterial(filename, cb) {
        this._material = new Resources.MeshMaterial(this.graphID);
        this._material.onload = cb;
        this._material.src = filename;
    }

    loadMesh(config, cb) {
        
        var self = this;
        async.waterfall([
            (next) => {
                if (!config.mesh) {
                    console.log("No Mesh file");
                    return next();
                }
                self.loadBuffers(config.mesh, function() {
                    next();
                });
            },
            (next) => {
                if (!config.texture) {
                    console.log("No Texture file");
                    return next();
                }
                self.loadTexture(config.texture, function() {
                    next();
                });
            },
            (next) => {
                if (!config.material) {
                    console.log("No Material file");
                    return next();
                }
                self.loadMaterial(config.material, function() {
                    next();
                });
            }
        ], (err) => {
            if (err) return console.log(err);
            console.log(this);
            if (cb) cb();
        });



    }

    beginDraw() {

    }

    endDraw() {

    }



}