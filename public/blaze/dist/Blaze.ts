module Blaze {
export module WebGLUtils {
    export function getGLContext(canvas) {
        var ctx = null;
        var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];

        for (var i = 0; i < names.length; ++i) {
            try {
                ctx = canvas.getContext(names[i]);
            }
            catch (e) { }
            if (ctx) {
                break;
            }
        }
        if (ctx === null) {
            alert("Could not initialise WebGL");
            return null;
        }
        else {

            ctx.viewportWidth = canvas.width;
            ctx.viewportHeight = canvas.height;
            return ctx;
        }
    }
    export enum BUFFER_DRAW { STATIC, STREAM, DYNAMIC }

    export function createBuffer(gl, data, is2D?: boolean, type_draw?: WebGLUtils.BUFFER_DRAW) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        switch (type_draw) {
            case WebGLUtils.BUFFER_DRAW.STATIC:
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
                break;
            case WebGLUtils.BUFFER_DRAW.DYNAMIC:
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.DYNAMIC_DRAW);
                break;
            case WebGLUtils.BUFFER_DRAW.STREAM:
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STREAM_DRAW);
                break;
            default: gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        if (is2D) {
            buffer.itemSize = 2;
            buffer.numItems = data.length / 2;
        } else {
            buffer.itemSize = 3;
            buffer.numItems = data.length / 3;
        }



        return buffer;
    }

    export function createIndexBuffer(gl, data, type_draw?: WebGLUtils.BUFFER_DRAW) {

        var indexBuffer = gl.createBuffer(gl.ELEMENT_ARRAY_BUFFER);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        switch (type_draw) {
            case WebGLUtils.BUFFER_DRAW.STATIC:
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
                break;
            case WebGLUtils.BUFFER_DRAW.DYNAMIC:
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.DYNAMIC_DRAW);
                break;
            case WebGLUtils.BUFFER_DRAW.STREAM:
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STREAM_DRAW);
                break;
            default: gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
        }
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        indexBuffer.itemSize = 1;
        indexBuffer.numItems = data.length;

        return indexBuffer;

    }
    export function createTexture(gl, data) {
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.bindTexture(gl.TEXTURE_2D, null);
        return texture;
    }
    export function createShader(gl, type, shaderSource) {
        var shader = gl.createShader(type);

        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }
    export function createProgram(gl, shaders) {
        var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, shaders.fragment);
        var vertexShader = createShader(gl, gl.VERTEX_SHADER, shaders.vertex);

        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS))
              console.log(gl.getProgramInfoLog(program));

        gl.useProgram(program);

        return program;

    }

    export interface AttribPointer {
        size: number,
        normalized: boolean,
        stride: number,
        offset: number
    }


}
export module ClassUtils{
    export interface Rotation {
        angle: number;
        axis: Array<number>;
    }
   
}
export module utils {
    export function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    export function uuid(name?) {
        var id = s4() + s4();
        return name ? name + id : id;
    }

    export function normalizeNaN(vec) {
        return vec.map(a => { if (Number.isNaN(a)) a = 0; return a; })
    }

    export function load(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.addEventListener('load', () => {
            callback(request.responseText);
        });
        request.send();
    }

    export function getExtension(str: string) {
        var elems = str.split(".");
        return elems[elems.length - 1];
    }

    export function nowInMilliseconds() {
        return (new Date()).getTime();
    }

    export function degToRad(d) {
        return d * Math.PI / 180;
    }


    export function calculateNormals(vs, ind) {
        var x = 0;
        var y = 1;
        var z = 2;

        var ns = [];
        for (var i = 0; i < vs.length; i++) { //for each vertex, initialize normal x, normal y, normal z
            ns[i] = 0.0;
        }

        for (var i = 0; i < ind.length; i = i + 3) { //we work on triads of vertices to calculate normals so i = i+3 (i = indices index)
            var v1 = [];
            var v2 = [];
            var normal = [];
            //p1 - p0
            v1[x] = vs[3 * ind[i + 1] + x] - vs[3 * ind[i] + x];
            v1[y] = vs[3 * ind[i + 1] + y] - vs[3 * ind[i] + y];
            v1[z] = vs[3 * ind[i + 1] + z] - vs[3 * ind[i] + z];
            // p0 - p1
            v2[x] = vs[3 * ind[i + 2] + x] - vs[3 * ind[i + 1] + x];
            v2[y] = vs[3 * ind[i + 2] + y] - vs[3 * ind[i + 1] + y];
            v2[z] = vs[3 * ind[i + 2] + z] - vs[3 * ind[i + 1] + z];
            //p2 - p1
            // v1[x] = vs[3*ind[i+2]+x] - vs[3*ind[i+1]+x];
            // v1[y] = vs[3*ind[i+2]+y] - vs[3*ind[i+1]+y];
            // v1[z] = vs[3*ind[i+2]+z] - vs[3*ind[i+1]+z];
            // p0 - p1
            // v2[x] = vs[3*ind[i]+x] - vs[3*ind[i+1]+x];
            // v2[y] = vs[3*ind[i]+y] - vs[3*ind[i+1]+y];
            // v2[z] = vs[3*ind[i]+z] - vs[3*ind[i+1]+z];
            //cross product by Sarrus Rule
            normal[x] = v1[y] * v2[z] - v1[z] * v2[y];
            normal[y] = v1[z] * v2[x] - v1[x] * v2[z];
            normal[z] = v1[x] * v2[y] - v1[y] * v2[x];

            // ns[3*ind[i]+x] += normal[x];
            // ns[3*ind[i]+y] += normal[y];
            // ns[3*ind[i]+z] += normal[z];
            for (var j = 0; j < 3; j++) { //update the normals of that triangle: sum of vectors
                ns[3 * ind[i + j] + x] = ns[3 * ind[i + j] + x] + normal[x];
                ns[3 * ind[i + j] + y] = ns[3 * ind[i + j] + y] + normal[y];
                ns[3 * ind[i + j] + z] = ns[3 * ind[i + j] + z] + normal[z];
            }
        }
        //normalize the result
        for (var i = 0; i < vs.length; i = i + 3) { //the increment here is because each vertex occurs with an offset of 3 in the array (due to x, y, z contiguous values)

            var nn = [];
            nn[x] = ns[i + x];
            nn[y] = ns[i + y];
            nn[z] = ns[i + z];

            var len = Math.sqrt((nn[x] * nn[x]) + (nn[y] * nn[y]) + (nn[z] * nn[z]));
            if (len == 0) len = 0.00001;

            nn[x] = nn[x] / len;
            nn[y] = nn[y] / len;
            nn[z] = nn[z] / len;

            ns[i + x] = nn[x];
            ns[i + y] = nn[y];
            ns[i + z] = nn[z];
        }

        return ns;
    }



}



export enum CAMERA_TYPE{ORBITING, TRACKING}
export class Ketch {
    private static _views = {};
    static setCanvasToContext(key, canvas) {
        var context = WebGLUtils.getGLContext(canvas);
        Ketch.setContext(key, context);
    }

    static setContext(key, context) {
        Ketch._views[key].context = context;
    }

    static getContext(key) {
        return Ketch._views[key].context;
    }

    static createProgram(key, shaders) {
        var gl = Ketch.getContext(key);
        var program = WebGLUtils.createProgram(gl, shaders);
        Ketch.setProgram(key, program);
    }
    static setProgram(key, program) {
        Ketch._views[key].program = program;
    }
    static getProgram(key) {
        return Ketch._views[key].program;
    }

    static createView(key) {
        Ketch._views[key] = {};
    }

    static setAttributeLocations(key, attribs_names) {
        var view = Ketch._views[key];
        var gl = view.context;
        var prg = view.program;


        view.attribs = attribs_names.reduce(function(prev, attr) {
            prev[attr] = gl.getAttribLocation(prg, attr);
            return prev;
        }, {});

    }

    static getAttrib(view_key, attr_key) {
        return Ketch._views[view_key].attribs[attr_key];
    }

    static getUniform(view_key, uniform_key) {
        return Ketch._views[view_key].uniforms[uniform_key];
    }

    static setUniformLocations(key, uniform_names) {
        var view = Ketch._views[key];
        var gl = view.context;
        var prg = view.program;


        view.uniforms = uniform_names.reduce(function(prev, attr) {
            prev[attr] = gl.getUniformLocation(prg, attr);
            return prev;
        }, {});
    }

    static enableAttrib(view_key, attr_key, pointer?: WebGLUtils.AttribPointer) {
        var index = Ketch.getAttrib(view_key, attr_key);

        var gl = Ketch.getContext(view_key);

        gl.enableVertexAttribArray(index);

        if (pointer) {
            gl.vertexAttribPointer(index, pointer.size || 3, gl.FLOAT, pointer.normalized || false, pointer.stride || 0, pointer.offset || 0);
        } else {
            gl.vertexAttribPointer(index, 3, gl.FLOAT, false, 0, 0);
        }
    }

    static disableAttrib(view_key, attr_key) {
        var index = Ketch.getAttrib(view_key, attr_key);
        var gl = Ketch.getContext(view_key);
        gl.disableVertexAttribArray(index);
    }

    static renderLoop(cb) {
        setInterval(cb, 30);
    }


    static addTexture(key, texture_id) {
        var view = Ketch._views[key];
        view.textures = view.textures || [];
        view.textures.push(texture_id);
    }
    
    static removeTexture(key, texture_id) {
        var view = Ketch._views[key];
        view.textures = view.textures || [];
        var index=view.textures.indexOf(texture_id)
        view.textures.splice(index, 1);
        console.log(view.textures)
    }
    static activeTexture(key, texture_id, texture) {
        var view = Ketch._views[key];
        var gl = view.context;
        var prg = view.program;

        var index = view.textures.indexOf(texture_id);

        if (index > -1) {
            gl.activeTexture(index === 0 ? gl.TEXTURE0 : gl.TEXTURE0 + index);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            var uSampler = Ketch.getUniform(key, "uSampler");
            gl.uniform1i(uSampler, index);
        }
    }

}
export class Renderable {
    private _graph_id: string;
    constructor(graph_id: string) {
        this._graph_id = graph_id;
    }


    public get graphID(): string {
        return this._graph_id;
    }


    public get gl() {
        return Ketch.getContext(this.graphID);
    }

    public get program() {
        return Ketch.getProgram(this.graphID);
    }
    public getUniform(key: string) {
        return Ketch.getUniform(this.graphID, key);
    }

}
export class Entity extends Renderable {
    constructor(graph_id:string){
        super(graph_id);
    }
    
    beginDraw(matrixStack?: MatrixStack): void{
        
    }
    endDraw(matrixStack?: MatrixStack): void{
        
    }
}
export class MatrixStack extends Renderable {
    private _stack: Array<Array<number>>;
    private _mvMatrix: Array<number>;
    private _pMatrix: Array<number>;
    private _nMatrix: Array<number>;
    private _camera: CameraEntity;

    constructor(graph_id: string) {
        super(graph_id);
        this._stack = [];
        this._mvMatrix = mat4.create();
        this._pMatrix = mat4.create();
        this._nMatrix = mat4.create();
    }

    push(): void {
        var copy = mat4.create();
        mat4.set(this._mvMatrix, copy);
        this._stack.push(copy);
    }

    pop(): void {
        if (this._stack.length == 0)
            throw "invalid popMatrix";
        this._mvMatrix = this._stack.pop();
    }

    public ModelView() {
        if (this._camera) {
            this._mvMatrix = this._camera.modelView;
        } else {
            mat4.identity(this._mvMatrix);
        }

    }
    get mvMatrix(): Array<number> {
        return this._mvMatrix;
    }

    get pMatrix(): Array<number> {
        return this._pMatrix;
    }

    get nMatrix(): Array<number> {
        return this._nMatrix;
    }

    public set MainCamera(camera: CameraEntity) {
        this._camera = camera;
    }


    public Perspective(): void {
        var gl = this.gl;
        mat4.identity(this._pMatrix);
        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0, this._pMatrix);
    }

    public Normal(): void {
        mat4.identity(this._nMatrix);
        mat4.set(this._mvMatrix, this._nMatrix);
        mat4.inverse(this._nMatrix);
        mat4.transpose(this._nMatrix);
    }
    
    public init(){
        this.ModelView();
        this.Perspective();
        this.Normal();
    }

    public setUp() {
        var gl = this.gl;

        this.Normal();

        var mvMatrix = this.getUniform("uMVMatrix");
        if (mvMatrix)
            gl.uniformMatrix4fv(mvMatrix, false, this._mvMatrix);

        var pMatrix = this.getUniform("uPMatrix");
        if (pMatrix)
            gl.uniformMatrix4fv(pMatrix, false, this._pMatrix);

        var nMatrix = this.getUniform("uNMatrix");
        if (nMatrix)
            gl.uniformMatrix4fv(nMatrix, false, this._nMatrix);
    }


}
export module Resources {

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
            this._diffuse = diffuse ? vec4.create(diffuse) : void 0;
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
export module Shaders{
export class Fragment{
static Particle:string=`#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D uSampler;

bool isBlack(vec4 color){
return color.r==0.0 &&color.g==0.0&&color.b==0.0;
}
void main(void) { 
    gl_FragColor = texture2D(uSampler, gl_PointCoord);
    if(gl_FragColor.a < 0.5 || isBlack(gl_FragColor)) discard;
}`;
static Phong:string=`#ifdef GL_ES
precision mediump float;
#endif
uniform float uShininess;
uniform vec3 uLightDirection;

uniform vec4 uLightAmbient;
uniform vec4 uLightDiffuse;
uniform vec4 uLightSpecular;

uniform vec4 uMaterialAmbient;
uniform vec4 uMaterialDiffuse;
uniform vec4 uMaterialSpecular;

varying vec3 vNormal;
varying vec3 vEyeVec;

void main(){

		
        vec3 L= normalize(uLightDirection);
        vec3 N= normalize(vNormal);
        float lambertTerm=dot(N, -L);
        
        vec4 Ia= uLightAmbient*uMaterialAmbient;
        
        vec4 Id=vec4(0.0,0.0,0.0,1.0);
        
        vec4 Is=vec4(0.0,0.0,0.0,1.0);
        
        if(lambertTerm>0.0)
        {
            Id=uLightDiffuse*uMaterialDiffuse*lambertTerm;
            
            vec3 E= normalize(vEyeVec);
            vec3 R= reflect(L, N);
            float specular=pow(max(dot(R,E),0.0), uShininess);
            Is=uLightSpecular*uMaterialSpecular*specular;
        }
        
        vec4 finalColor=Ia+Id+Is;
        finalColor.a=1.0;
    
        gl_FragColor =finalColor;
        
}


`;
}
export class Vertex{
static Particle:string=`attribute vec3 a_position;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float uPointSize;

void main(void) {
    gl_Position = uPMatrix * uMVMatrix * vec4(a_position.xyz, 1.0);
    gl_PointSize = uPointSize;
}`;
static Phong:string=`attribute vec3 a_position;
attribute vec3 a_normal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;


varying vec3 vNormal;
varying vec3 vEyeVec;

void main(){

    vec4 vertex = uMVMatrix * vec4(a_position, 1.0);
	vNormal = vec3(uNMatrix * vec4(a_normal, 1.0));
	vEyeVec=-vec3(vertex.xyz);   
	gl_Position =uPMatrix * vertex;

}


`;
}
}

export class AnimationEntity extends Entity {
    private _frequency: number;
    private _interval_id:number;
    private _callback:any;
    private _intime:number;
    private _times:number;
    private static Count:number=0;
    private static ElapseTime:number;
    constructor(graph_id:string, frequency:number, times:number, callback:any ) {
        super(graph_id);
        this._frequency=frequency;
        this._interval_id=null;
        this._callback=callback;
        
    }
    
    
    onFrame(){
        AnimationEntity.ElapseTime=utils.nowInMilliseconds();
        
        if(AnimationEntity.ElapseTime<5)return;
        var steps=Math.floor(AnimationEntity.ElapseTime/this._frequency);
        while((steps>0)&&(AnimationEntity.Count!=this._times)){
            this._callback();
            steps--;
            AnimationEntity.Count++;
        }
        
        if(AnimationEntity.Count===this._times){
            this.stop();
        }
    }
    
    
    

    start() {
        this._intime=utils.nowInMilliseconds();
        this._interval_id=setInterval(this.onFrame, this._frequency/1000);
    }

    stop() {
        if(this._interval_id)
        clearInterval(this._interval_id);
    }
    
    beginDraw(){
        
    }
    
    endDraw(){
        
    }
}
export class MeshEntity extends Entity {
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
export class TransformEntity extends Entity {
    private _matrix: Array<number>;
    private _position: Array<number>;
    private _size: Array<number>;
    private _rotation: ClassUtils.Rotation;
    constructor(graph_id: string, position?: Array<number>, size?: Array<number>, rotation?: ClassUtils.Rotation) {
        super(graph_id);
        this._matrix = mat4.create();
        this._position = position || vec3.create();
        this._size = size || vec3.create([1, 1, 1]);
        this._rotation = rotation || { angle: 0, axis: vec3.create() };
    }

    identity() {
        mat4.identity(this._matrix);
    }

    setMatrix(new_matrix: Array<number>) {
        this._matrix = new_matrix;
    }

    transpose() {
        mat4.transpose(this._matrix, this._matrix);
    }


    set position(position: Array<number>) {
        this._position = position;
    }

    get position() {
        return this._position;
    }

    setAbsolutePosition(x: number, y: number, z: number) {
        this._position = [x, y, z];
    }

    translate(x = 0, y = 0, z = 0) {
        var operand1 = this._position;
        var operand2 = vec3.create([x, y, z]);
        vec3.add(operand1, operand2, this._position);
    }


    set size(size: Array<number>) {
        this._size = size;
    }

    get size() {
        return this._size;
    }

    setSize(x: number, y: number, z: number) {
        this._size = [x, y, z];
    }

    scale(x = 0, y = 0, z = 0) {
        var operand1 = this._size;
        var operand2 = vec3.create([x, y, z]);
        vec3.add(operand1, operand2, this._size);
    }



    set rotation(rotation: ClassUtils.Rotation) {
        this._rotation = rotation;
    }

    get rotation() {
        return this._rotation;
    }

    setRotation(angle?: number, axis?: Array<number>) {
        if (angle) this._rotation.angle = angle;
        if (axis) this._rotation.axis = axis;
    }

    setAngle(angle: number) {
        this._rotation.angle = angle;
    }
    setAxis(axis: Array<number>) {
        this._rotation.axis = axis;
    }


    rotateAngle(angle = 0) {
        this._rotation.angle += angle;
    }


    moveAxis(x = 0, y = 0, z = 0) {
        var operand1 = this._rotation.axis;
        var operand2 = vec3.create([x, y, z]);
        vec3.add(operand1, operand2, this._rotation.axis);
    }

    beginDraw(matrixStack: MatrixStack) {
        matrixStack.push();
        matrixStack.ModelView();
        this._matrix = matrixStack.mvMatrix;

        if (this._position != void 0)
            mat4.translate(this._matrix, this._position);

        if (this._size != void 0)
            mat4.scale(this._matrix, this._size);

        if (this._rotation != void 0) {
            var rad = this._rotation.angle * Math.PI / 180;
            mat4.rotate(this._matrix, rad, this._rotation.axis);
        }

        matrixStack.setUp();

    }

    endDraw(matrixStack: MatrixStack) {
        matrixStack.pop();
    }
}


export class LightEntity extends Entity {
    private _ambient: Array<number>;
    private _diffuse: Array<number>;
    private _specular: Array<number>;
    private _position: Array<number>;
    private _direction: Array<number>;
    private _cutoff: number;

    constructor(graph_id: string, ambient?: Array<number>, diffuse?: Array<number>, position?: Array<number>, specular?: Array<number>,  direction?: Array<number>, cutoff?: number) {
        super(graph_id);
        this._ambient = ambient ? vec4.create(ambient) : null;
        this._diffuse = diffuse ? vec4.create(diffuse) : null;
        this._position = position ? vec4.create(position) : null;
        this._specular = specular ? vec4.create(specular) : null;
        this._direction = direction ? vec3.create(direction) : null;
        this._cutoff = cutoff;
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


    get position(): Array<number> {
        return this._diffuse;
    }


    set position(position: Array<number>) {
        this._position = utils.normalizeNaN(vec3.create(position));
    }

    public set direction(direction: Array<number>) {
        this._direction = utils.normalizeNaN(vec3.create(direction));
    }

    public get direction(): Array<number> {
        return this._direction;
    }


    public set cutOff(cutoff: number) {
        this._cutoff = cutoff;
    }


    public get cutOff(): number {
        return this._cutoff;
    }

    beginDraw() {
        var gl = this.gl;

        if (this._ambient) {
            var uLightAmbient = this.getUniform("uLightAmbient");
            if (uLightAmbient)
                gl.uniform4fv(uLightAmbient, this._ambient);
        }

        if (this._diffuse) {
            var uLightDiffuse = this.getUniform("uLightDiffuse");
            if (uLightDiffuse)
                gl.uniform4fv(uLightDiffuse, this._diffuse);
        }

        if (this._specular) {
            var uLightSpecular = this.getUniform("uLightSpecular");
            if (uLightSpecular)
                gl.uniform4fv(uLightSpecular, this._specular);
        }

        if (this._position) {
            var uLightPosition = this.getUniform("uLightPosition");
            if (uLightPosition)
                gl.uniform3fv(uLightPosition, this._position);
        }

        if (this._direction) {
            var uDirection = this.getUniform("uLightDirection");
            if (uDirection)
                gl.uniform3fv(uDirection, this._direction);
        }

       /* if (this._cutoff) {
            var uCutOff = this.getUniform("uCutOff");
            if (uCutOff)
                gl.uniform1f(uCutOff, this._cutoff);
        }*/
    }

    endDraw() {

    }




}
export class DiffuseEntity extends Entity {
    private _value: Array<number>;

    constructor(graph_id: string, v?: Array<number>) {
        super(graph_id);
        this._value=v;
        
    }

    public set value(v: Array<number>) {
        this._value = v;
    }
    
    
    public get value() : Array<number> {
        return this._value;
    }
    


    beginDraw() {
        var gl=this.gl;
  
        var uMaterialDiffuse = this.getUniform("uMaterialDiffuse");
        if (uMaterialDiffuse)
            gl.uniform4fv(uMaterialDiffuse, this._value);
    }

    endDraw() {

    }
}
export class ParticleEntity extends Entity {

    private _buffer;
    private _pointSize: number;
    private _numItems: number;
    private _texture;
    private _texture_id: string;

    constructor(graph_id: string, pointSize?: number) {
        super(graph_id);
        this._pointSize = pointSize || 1;
        this._buffer = null;
        this._texture_id="";
    }

    public configure(data_mesh: Array<number>, data_texture: Array<number>) {
        var gl = this.gl;

        this._buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data_mesh), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        this._numItems = data_mesh.length;
       
        
        this._texture_id = utils.uuid("Texture");
        this._texture = WebGLUtils.createTexture(gl, data_texture);
        Ketch.addTexture(this.graphID, this._texture_id);

    }
    public update(data: Array<number>) {
        var gl = this.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        this._numItems = data.length;
    }


    
    public get textureID() : string {
        return this._texture_id;
    }
    

    public set pointSize(v: number) {
        this._pointSize = v;
    }
    
    public resetTexture()

    beginDraw() {

        var gl = this.gl;

        var uPointSize = this.getUniform("uPointSize");
        if (uPointSize)
            gl.uniform1f(uPointSize, this._pointSize);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
        Ketch.enableAttrib(this.graphID, "a_position");
        
        
        Ketch.activeTexture(this.graphID, this._texture_id, this._texture);
        
        gl.drawArrays(gl.POINTS, 0, this._numItems / 3);
    }

    endDraw() {
        var gl = this.gl;
        Ketch.disableAttrib(this.graphID, "a_position");
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

    }

}
export class CameraEntity extends Entity {
    private _type: CAMERA_TYPE;
    private _cmatrix: Array<Array<number>>;
    private _up: Array<number>;
    private _right: Array<number>;
    private _normal: Array<number>;
    private _position: Array<number>;
    private _focus: Array<number>;
    private _azimuth: number;
    private _elevation: number;
    private _steps: number;
    private _home: Array<number>;




    constructor(graph_id: string, type?: CAMERA_TYPE) {
        super(graph_id);
        this._type = type || CAMERA_TYPE.ORBITING;
        this._cmatrix = mat4.create();
        mat4.identity(this._cmatrix);
        this._up = vec3.create();
        this._right = vec3.create();
        this._normal = vec3.create();
        this._position = vec3.create();

        this._azimuth = 0.0;
        this._elevation = 0.0;
        this._steps = 0;



    }


    public set type(type: CAMERA_TYPE) {
        this._type = type;
    }


    public set position(pos: Array<number>) {
        this._position = pos;
    }


    public get position(): Array<number> {
        return this._position;
    }

    public set azimuth(az: number) {
        var temp_az = az - this._azimuth;
       
        this.changeAzimuth(temp_az);
    }
    
    public changeAzimuth(az: number){
         this._azimuth += az;

        if (this._azimuth > 360 || this._azimuth < -360) {
            this._azimuth = this._azimuth % 360;
        }
    }

    public get azimuth(): number {
        return this._azimuth;
    }

    public get elevation(): number {
        return this._elevation;
    }


    public set elevation(el: number) {
        var temp_el = el - this._elevation;
       
        this.changeElevation(temp_el);
    }
    
    public changeElevation(el:number){
         this._elevation += el;

        if (this._elevation > 360 || this._elevation < -360) {
            this._elevation = this._elevation % 360;
        }
    }

    public set zoom(offset:number) {
        var p = vec3.create();
        var n = vec3.create();

        p = this.position;

        var step = offset - this._steps;

        vec3.normalize(this._normal, n);

        var new_position = vec3.create();

        if (this._type === CAMERA_TYPE.TRACKING) {
            new_position[0] = p[0] - step * n[0];
            new_position[1] = p[1] - step * n[1];
            new_position[2] = p[2] - step * n[2];
        } else {
            new_position[0] = p[0];
            new_position[1] = p[1];
            new_position[2] = p[2]-step;
        }
        
        this.position=new_position;
        
        this._steps=offset;

    }
    
  
    public get zoom() : number {
        return this._steps;
    }
    



    public calculateOrientation() {
        var m = this._cmatrix;

        mat4.multiplyVec4(m, [1, 0, 0, 0], this._right);
        mat4.multiplyVec4(m, [0, 1, 0, 0], this._up);
        mat4.multiplyVec4(m, [0, 0, 1, 0], this._normal);
    }


    public beginDraw() {
        mat4.identity(this._cmatrix);

        this.calculateOrientation();


        if (this._type === CAMERA_TYPE.TRACKING) {
            mat4.translate(this._cmatrix, this._position);
            mat4.rotateY(this._cmatrix, this._azimuth * Math.PI / 180);
            mat4.rotateX(this._cmatrix, this._elevation * Math.PI / 180);
        } else {
            mat4.rotateY(this._cmatrix, this._azimuth * Math.PI / 180);
            mat4.rotateX(this._cmatrix, this._elevation * Math.PI / 180);
            mat4.translate(this._cmatrix, this._position);
        }

        this.calculateOrientation();

        if (this._type === CAMERA_TYPE.TRACKING) {
            mat4.multiplyVec4(m, [0, 0, 0, 1], this._position);
        }
    }



    public get modelView(): Array<number> {
        var m = mat4.create();

        mat4.inverse(this._cmatrix, m);
        return m;
    }



    endDraw() {

    }





}
export interface INodeElement {
    _entity: Entity;
    _childNodes: INodeElement[];
    _parentNode: INodeElement;
    addChildNode(child: INodeElement);
    
}

export class NodeElement implements INodeElement {
    _entity: Entity;
    _childNodes: NodeElement[];
    _parentNode: NodeElement;
    _type: string;
    _oid: string;


    constructor(parent?: NodeElement, type?: string, entity?: Entity) {
        this._parentNode = parent;
        if (this._parentNode) this._parentNode.addChildNode(this);
        this._childNodes = [];
        this._type = type;
        this._oid = utils.uuid(this._type || this.constructor.name);
        this._entity = entity;
    }

    get oid(): string {
        return this._oid;
    }

    get parent(): NodeElement {
        return this._parentNode;
    }

    set entity(entity: Entity) {
        this._entity = entity;
    }

    get entity() {
        return this._entity;
    }

    get childNodes() {
        return this._childNodes;
    }


    addChildNode(child: NodeElement) {
     
        this._childNodes.push(child);
    }
    removeChildNode(child: NodeElement) {
        var index = this.indexOf(child);
        if (index > -1)
        this._childNodes.splice(index, 1);
    }

    getChildNodeByIndex(index: number): NodeElement {
        return this._childNodes[index] || void 0;
    }

    existsChildNode(index: string): boolean {
        return this._childNodes[index] !== void 0;
    }

    delete() {
        this._parentNode.removeChildNode(this);
    }

    createChildNode(type?:string, entity?:Entity): NodeElement {
        return new NodeElement(this, type, entity);
    }

    isRoot(): boolean {
        return this._parentNode === void 0;
    }

    indexOf(child): number {
        var oid = child.oid;
        return _.findIndex(this._childNodes, s => { return s.oid === oid; });
    }

    indexInParent(): number {
        var index = -1;

        if (!this.isRoot()) index = this._parentNode.indexOf(this);
        return index;
    }

    hasSibling(prev?: boolean): boolean {
        var _have = false;
        if (!this.isRoot()) {
            var index = this._parentNode.indexOf(this);

            if (index > -1) {
                if (prev) {
                    if (this._parentNode.getChildNodeByIndex(index - 1)) _have = true;
                } else {
                    if (this._parentNode.getChildNodeByIndex(index + 1)) _have = true;
                }

            }
        }
        return _have;
    }
    nextSibling(): NodeElement {
        var sibling: NodeElement = null;
        if (!this.isRoot() && this.hasSibling()) {
            var index = this._parentNode.indexOf(this);
            sibling = this._parentNode.getChildNodeByIndex(index + 1);
        }

        return sibling;
    }

    previousSibling(): NodeElement {
        var sibling: NodeElement = null;
        if (!this.isRoot() && this.hasSibling(true)) {
            var index = this._parentNode.indexOf(this);
            sibling = this._parentNode.getChildNodeByIndex(index - 1);
        }

        return sibling;
    }

    firstChild(): NodeElement {
        return this.getChildNodeByIndex(0);
    }

    lastChild(): NodeElement {
        return this.getChildNodeByIndex(this._childNodes.length - 1);
    }

    removeChildNodes() {
        this._childNodes = [];
    }

    draw(matrixStack: MatrixStack): void {
       
        if (this._entity) this._entity.beginDraw(matrixStack);
        
        for(var i=0;i<this._childNodes.length;i++){
            var child=this._childNodes[i];
            child.draw(matrixStack);
        }

        if (this._entity) this._entity.endDraw(matrixStack);

    }
}
export class SceneGraph extends Renderable {
    private _scene: NodeElement;
    private _isDrawing: boolean;
    private _matrixStack: MatrixStack;
    private _oid: string;

    private _loaderBuffer: Array<MeshEntity>;

    private static UNIFORMS = [
        'uPMatrix',
        'uMVMatrix',
        'uNMatrix',
        'uLightDirection',
        'uLightAmbient',
        'uMaterialAmbient',
        'uLightDiffuse',
        'uMaterialDiffuse',
        'uLightSpecular',
        'uMaterialSpecular',
        'uShininess',
        'uPointSize',
        "uSampler"
    ];
    private static ATTRIBUTES = ['a_position', 'a_normal'];

    constructor() {
        var oid = utils.uuid();
        super(oid);
        this._oid = oid;
        this._scene = new NodeElement(void 0, "Scene");
        this._matrixStack = new MatrixStack(this._oid);
        this._loaderBuffer = [];
        this._isDrawing = false;
        Ketch.createView(this._oid);
    }


    public get scene(): NodeElement {
        return this._scene;
    }


    public get isDrawing(): boolean {
        return this._isDrawing;
    }

    public Environment() {
        var gl = this.gl;
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.clearColor(0, 0, 0, 1);
        gl.clearDepth(1.0);
    }

    public draw(): void {
        var gl = this.gl;
        this._isDrawing = true;
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        this._scene.draw(this._matrixStack);
        this._isDrawing = false;
    }

    public createMainChildNode(type: string, entity: Entity): NodeElement {
        return this._scene.createChildNode(type, entity);
    }

    public removeMainChildNode(node: NodeElement) {
        this._scene.removeChildNode(node);
    }


    public get oid(): string {
        return this._oid;
    }


    public setContext(canvas) {
        Ketch.setCanvasToContext(this.oid, canvas);

    }

    public Program(type?: string) {
        type = type || "Phong";

        Ketch.createProgram(this._oid, {
            fragment: Shaders.Fragment[type],
            vertex: Shaders.Vertex[type]
        });
    }

    public createMesh(config?: { mesh?, material?, texture?}): MeshEntity {
        var meshEntity = new MeshEntity(this.oid);

        if (config.mesh) {
            meshEntity.loadMeshByObject(config.mesh);
        }

        if (config.material) {
            meshEntity.loadMaterialByObject(config.material);
        }


        return meshEntity;
    }
    public createDiffuse(v: Array<number>) {
        return new DiffuseEntity(this.oid, v);
    }

    public createMeshByLoader(config: { mesh?: string, texture?: string, material?: string }): MeshEntity {
        var mesh = new MeshEntity(this.oid, config.mesh, config.material, config.texture);
        this._loaderBuffer.push(mesh);
        return mesh;
    }

    public createTransform(position?: Array<number>, size?: Array<number>, rotation?: ClassUtils.Rotation) {
        return new TransformEntity(this.oid, position, size, rotation);
    }

    public createLight(config: { ambient?: Array<number>, diffuse?: Array<number>, specular?: Array<number>, position?: Array<number>, direction?: Array<number>, cutoff?: number }) {
        return new LightEntity(this.oid, config.ambient, config.diffuse, config.position, config.specular, config.direction, config.cutoff);
    }

    public createCamera(type?: CAMERA_TYPE) {
        return new CameraEntity(this.oid, type);
    }

    public createParticle(pointSize?: number) {
        return new ParticleEntity(this.oid, pointSize);
    }


    public set MainCamera(camera: CameraEntity) {
        this._matrixStack.MainCamera = camera;
    }

    public removeTexture(id){
        Ketch.removeTexture(this.oid, id);
    }

    public startLoader(cb) {
        async.eachSeries(this._loaderBuffer, (item, next) => {
            item.loadMesh(() => {
                console.log(item);
                next();
            });
        }, cb);
    }

    public configure(config?: { typeShader?: string }) {
        var self = this;
        config = config || {};

        self.Environment()
        self.Program(config.typeShader);

        Ketch.setAttributeLocations(self._oid, SceneGraph.ATTRIBUTES);
        Ketch.setUniformLocations(self._oid, SceneGraph.UNIFORMS);
        this._matrixStack.init();
    }


    public configureWithLoader(cb) {
        var self = this;

        self.configure();

        self.startLoader(cb);

    }


}
}