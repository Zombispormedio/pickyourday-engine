module Resources {

    export class MeshBuffers extends Renderable {
        private _vbo; //Vertex Buffer Object;
        private _nbo; //Normal Buffer Object;
        private _tbo; //Texture Coords Buffer Object;
        private _ivbo; //Index Vertex Buffer Object;
        private _inbo;//Index Normal Buffer Object;
        private _itbo; //Index Texture Coords Buffer Object

        private _onload;
        private _src: string;
        constructor(graph_id: string) {
            super(graph_id);
        }

        public set onload(cb) {
            this._onload = cb;
        }


        public set src(src: string) {
            var self = this;
            var ext = utils.getExtension(src);



            utils.load(src, (data) => {

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

            var vertex = lines.filter((a) => {
                return a[0] === 'v';
            });

            var index = lines.filter((a) => {
                return a[0] === 'f';
            });
            vertex.forEach((item) => {
                var elems = item.replace("\r", "").split(" ");
                var key = elems[0];
                obj[key] = obj[key].concat(elems.slice(1).filter((a) => {
                    return a !== "";
                }));
            });

            var tempIndex = [];
            index.forEach((item) => {
                var elems = item.replace("\r", "").replace("f", "").split(" ");
                tempIndex = tempIndex.concat(elems.slice(1).filter((a) => {
                    return a !== "";
                }));
            });


            tempIndex.forEach((item) => {
                var elems = item.split("/");
                obj.iv.push(parseInt(elems[0]) - 1);
                obj.in.push(parseInt(elems[1]) - 1);
                obj.it.push(parseInt(elems[2]) - 1);
            });

            return obj;

        }


        public createBuffers(obj: any): void {
            var gl = this.gl;

            _.defaults(obj, {
                v: [],
                vn: [],
                vt: [],
                iv: [],
                in: [],
                it: []
            });

            function createBuffer(data) {
                return WebGLUtils.createBuffer(gl, data);
            }
            if (obj.v.length > 0)
                this._vbo = createBuffer(obj.v);


            if (obj.v.length > 0 && obj.iv.length > 0) {
                this._nbo = createBuffer(utils.calculateNormals(obj.v, obj.iv));
            }



            if (obj.vt.length > 0) {
                this._tbo = WebGLUtils.createBuffer(gl, obj.vt, true);
            }



            function createIndexBuffer(data) {
                return WebGLUtils.createIndexBuffer(gl, data);
            }

            if (obj.iv.length > 0)
                this._ivbo = createIndexBuffer(obj.iv);

            if (obj.in.length > 0)
                this._inbo = createIndexBuffer(obj.in);

            if (obj.it.length > 0)
                this._itbo = createIndexBuffer(obj.it);


        }

        public get vbo(): string {
            return this._vbo;
        }

        public get nbo(): string {
            return this._nbo;
        }

        public get tbo(): string {
            return this._tbo;
        }

        public get ivbo(): string {
            return this._ivbo;
        }

        public get inbo(): string {
            return this._inbo;
        }

        public get itbo(): string {
            return this._itbo;
        }



    }

    export class MeshTexture extends Renderable {
        private _texture;
        private _image;
        private _onload;
        private _oid: string;
        constructor(graph_id: string) {
            super(graph_id);
            this._image = new Image();
            this._oid = utils.uuid(this.constructor.name);
        }



        public set onload(cb) {
            this._onload = cb;
        }

        public set src(filename: string) {
            this._image.onload = this.loadTextureImage(this._onload);
            this._image.src = filename;
        }

        loadTextureImage(cb) {
            var self = this;
            return () => {

                this._texture = WebGLUtils.createTexture(self.gl, self._image);
                Ketch.addTexture(self.graphID, self._oid);

                if (cb) cb();
            }
        }


        public get content(): string {
            return this._texture;
        }
    }

    export class MeshMaterial extends Renderable {
        private _ambient: Array<number>;
        private _diffuse: Array<number>;
        private _specular: Array<number>;
        private _shininess: number;
        private _onload;
        private _src: string;

        constructor(graph_id: string, ambient?: Array<number>, diffuse?: Array<number>, specular?: Array<number>, shininess?: number) {
            super(graph_id);
            this._ambient = ambient ? vec4.create(ambient) : vec4.create();
            this._diffuse = diffuse ? vec4.create(diffuse) : vec4.create();
            this._specular = specular ? vec4.create(specular) : vec4.create();
            this._shininess = shininess || 200.0;
        }

        public set onload(cb) {
            this._onload = cb;
        }


        public set src(src: string) {

            var self = this;

            utils.load(src, (data) => {
                var temp = self.parse(data);
                this._ambient = temp.Ka;
                this._diffuse = temp.Kd;
                this._specular = temp.Ks;
                this.shininess = temp.Ns;
                if (this._onload) this._onload();
            });


        }

        parse(data: string): any {
            var obj = {};
            var keys = ["Ka", "Kd", "Ks", "Ns"];
            var lines = data.split("\n");
            lines.forEach(function(line) {
                var elems = line.split(" ");
                var key = elems[0];
                if (keys.indexOf(key) > -1) {
                    switch (key) {
                        case "Ns": obj["Ns"] = Number(elems[1]);
                            break;
                        default: {
                            var temp = elems.slice(1).map(function(a) { return Number(a) });
                            temp.push(1.0);
                            obj[key] = temp;
                        }
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


        public get shininess(): number {
            return this._shininess;
        }


        public set shininess(v: number) {
            this._shininess = v;
        }

    }

}