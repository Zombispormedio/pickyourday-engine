module Resources {

    export class MeshBuffers {
        private _vbo; //Vertex Buffer Object;
        private _nbo; //Normal Buffer Object;
        private _ibo; //Index Buffer Object;
        private _tbo; //Texture Coords Buffer Object;
        private _onload;
        private _src:string;
        constructor() {

        }
        
        public set onload(cb) {
            this._onload = cb;
        }
        
        
        public set src(src : string) {
         
         
            if(this._onload)this._onload();
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
        }

        loadTextureImage(cb) {
            return function(){
                
                
                if(cb)cb();
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
        private _shininess: number;
        private _onload;
        private _src:string;
        constructor(ambient?: Array<number>, diffuse?: Array<number>, specular?: Array<number>, shininess?: number) {
            this._ambient = ambient ? vec4.create(ambient) : vec4.create();
            this._diffuse = diffuse ? vec4.create(diffuse) : vec4.create();
            this._specular = specular ? vec4.create(specular) : vec4.create();
            this._shininess = shininess || 200.0;
        }
        
        public set onload(cb) {
            this._onload = cb;
        }
        
        
        public set src(src : string) {
         
         
            if(this._onload)this._onload();
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