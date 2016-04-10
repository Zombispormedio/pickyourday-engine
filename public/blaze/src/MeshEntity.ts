class MeshEntity extends Entity {
    private _material: Resources.MeshMaterial;
    private _texture: Resources.MeshTexture;
    private _buffers: Resources.MeshBuffers;
    private _wireframe: Boolean;
    private _wireframeColor: Array<Number>;

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
                console.log("Loading Buffers");
                self.loadBuffers(self._meshfile, () => {
                    console.log("Loaded Buffers");
                    next();
                });
            },
            (next) => {
                if (!this._texturefile) {

                    return next();
                }
                console.log("Loading Texture");
                self.loadTexture(self._texturefile, () => {
                    console.log("Loaded Texture");
                    next();
                });
            },
            (next) => {
                if (!self._materialfile) {

                    return next();
                }
                console.log("Loading Material");
                self.loadMaterial(self._materialfile, () => {
                    console.log("Loaded Material");
                    next();
                });
            }
        ], (err) => {
            if (err) return console.log(err);

            if (cb) cb();
        });



    }


    public loadMeshByObject(obj) {
        this._buffers = new Resources.MeshBuffers(this.graphID);
        this._buffers.createBuffers(obj);
    }

    public loadMaterialByObject(obj) {
        this._material = new Resources.MeshMaterial(this.graphID);

        if (obj.ambient) {
            this._material.ambient = obj.ambient;
        }

        if (obj.specular) {
            this._material.specular = obj.specular;
        }

        if (obj.diffuse) {
            this._material.diffuse = obj.diffuse;
        }

        if (obj.shininess) {
            this._material.shininess = obj.shininess;
        }

    }


    public setWireFrame(is_wireframe: Boolean, color: Array<Number>) {
        this._wireframe = is_wireframe;
        if (this._wireframe) {
            this._wireframeColor = color;
        }
    }


    public WireFrame() {
        var gl = this.gl;
        var uWireframe = this.getUniform("uWireframe");
        if (uWireframe)
            gl.uniform1i(uWireframe, this._wireframe);
        if (this._wireframe) {
            var uWireframeColor = this.getUniform("uWireframeColor");
            if (uWireframeColor)
                gl.uniform4fv(uWireframeColor, this._wireframeColor);
        }
    }

    public setMaterialUniforms() {
        if (this._material) {

            var gl = this.gl;

            if (this._material.ambient) {
                var uMaterialAmbient = this.getUniform("uMaterialAmbient");
                if (uMaterialAmbient)
                    gl.uniform4fv(uMaterialAmbient, this._material.ambient);
            }

            if (this._material.diffuse) {
                var uMaterialDiffuse = this.getUniform("uMaterialDiffuse");
                if (uMaterialDiffuse)
                    gl.uniform4fv(uMaterialDiffuse, this._material.diffuse);
            }

            if (this._material.specular) {
                var uMaterialSpecular = this.getUniform("uMaterialSpecular");
                if (uMaterialSpecular)
                    gl.uniform4fv(uMaterialSpecular, this._material.specular);
            }

            if (this._material.shininess) {

                var uShininess = this.getUniform("uShininess");
                if (uShininess)
                    gl.uniform1f(uShininess, this._material.shininess);
            }

        }
    }



    beginDraw() {

        var gl = this.gl;

        this.setMaterialUniforms();
        this.WireFrame();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffers.vbo);

        Ketch.enableAttrib(this.graphID, "a_position");

        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffers.nbo);

        Ketch.enableAttrib(this.graphID, "a_normal");

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


    /*
        public setTextureUniforms() {
            var gl = this.gl;
            var useTexture = this.getUniform("useTexture");
             if (this._texture) {
                 gl.uniform1f(useTexture, true);
                 gl.bindBuffer(gl.ARRAY_BUFFER, this._buffers.tbo);
                 Ketch.enableAttrib(this.graphID, "a_texture_coords");
                 Ketch.Texture(this.graphID, this._texture.content);
             } else {
                 gl.uniform1f(useTexture, false);
             }
        }*/

}