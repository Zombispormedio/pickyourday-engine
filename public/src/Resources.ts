module Resources {

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