module Resources {

    export class MeshBuffers {
        private _vbo; //Vertex Buffer Object;
        private _nbo; //Normal Buffer Object;
        private _ibo; //Index Buffer Object;
        private _tbo; //Texture Coords Buffer Object;
        constructor() {

        }
    }



    export class MeshTexture {
        private _texture;
        private _image;
        constructor() {
            //this._object=gl.createTexture();
            this._image = new Image();
            this._image.onload = this.loadTextureImage();
        }

        setImage(filename: string) {
            this._image.src = filename;
        }

        loadTextureImage() {

        }


        public get texture(): string {
            return this._texture;
        }
    }

    export class MeshMaterial {
        private _ambient: Array<number>;
        private _diffuse: Array<number>;
        private _specular: Array<number>;
        private _shininess: number;
        constructor(ambient?: Array<number>, diffuse?: Array<number>, specular?: Array<number>, shininess?: number) {
            this._ambient = ambient ? vec4.create(ambient) : vec4.create();
            this._diffuse = diffuse ? vec4.create(diffuse) : vec4.create();
            this._specular = specular ? vec4.create(specular) : vec4.create();
            this._shininess = shininess || 200.0;
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


        public get shininess(): number {
            return this._shininess;
        }


        public set shininess(v: number) {
            this._shininess = v;
        }

    }

}