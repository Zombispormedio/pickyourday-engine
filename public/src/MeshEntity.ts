class MeshEntity extends Entity {
    private _material: Resources.MeshMaterial;
    private _texture: Resources.MeshTexture;
    private _buffers: Resources.MeshBuffers;

    private _meshfile: string;
    private _materialfile: string;
    private _texturefile: string;

    constructor(graph_id: string, meshfile?: string, materialfile?: string, texturefile?: string) {
        super(graph_id);
        this._material = null;
        this._texture = null;
        this._buffers = null;
        this._meshfile = meshfile || null;
        this._materialfile = materialfile || null;
        this._texturefile = texturefile || null;
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

    loadMesh(cb) {

        var self = this;
        async.waterfall([
            (next) => {
                if (!self._meshfile) {
                    
                    return next();
                }
                self.loadBuffers(self._meshfile, function() {
                    next();
                });
            },
            (next) => {
                if (!this._texturefile) {
                  
                    return next();
                }
                self.loadTexture(self._texturefile, function() {
                    next();
                });
            },
            (next) => {
                if (!self._materialfile) {
                   
                    return next();
                }
                self.loadMaterial(self._materialfile, function() {
                    next();
                });
            }
        ], (err) => {
            if (err) return console.log(err);

            if (cb) cb();
        });



    }

    beginDraw() {
        var gl = this.gl;
       
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffers.vbo);

        Ketch.enableAttrib(this.graphID, "a_position");

        var ivbo = this._buffers.ivbo;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ivbo);

        gl.drawElements(gl.TRIANGLES, ivbo.numItems, gl.UNSIGNED_SHORT, 0);

    }

    endDraw() {
        var gl = this.gl;
        Ketch.disableAttrib(this.graphID, "a_position");
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }



}