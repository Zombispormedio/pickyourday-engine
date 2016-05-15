var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Blaze;
(function (Blaze) {
    var WebGLUtils;
    (function (WebGLUtils) {
        function getGLContext(canvas) {
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
        WebGLUtils.getGLContext = getGLContext;
        (function (BUFFER_DRAW) {
            BUFFER_DRAW[BUFFER_DRAW["STATIC"] = 0] = "STATIC";
            BUFFER_DRAW[BUFFER_DRAW["STREAM"] = 1] = "STREAM";
            BUFFER_DRAW[BUFFER_DRAW["DYNAMIC"] = 2] = "DYNAMIC";
        })(WebGLUtils.BUFFER_DRAW || (WebGLUtils.BUFFER_DRAW = {}));
        var BUFFER_DRAW = WebGLUtils.BUFFER_DRAW;
        function createBuffer(gl, data, is2D, type_draw) {
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
            }
            else {
                buffer.itemSize = 3;
                buffer.numItems = data.length / 3;
            }
            return buffer;
        }
        WebGLUtils.createBuffer = createBuffer;
        function createIndexBuffer(gl, data, type_draw) {
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
        WebGLUtils.createIndexBuffer = createIndexBuffer;
        function createTexture(gl, data) {
            var texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.bindTexture(gl.TEXTURE_2D, null);
            return texture;
        }
        WebGLUtils.createTexture = createTexture;
        function createShader(gl, type, shaderSource) {
            var shader = gl.createShader(type);
            gl.shaderSource(shader, shaderSource);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.log(gl.getShaderInfoLog(shader));
                return null;
            }
            return shader;
        }
        WebGLUtils.createShader = createShader;
        function createFragmentShader(gl, shaderSource) {
            return createShader(gl, gl.FRAGMENT_SHADER, shaderSource);
        }
        WebGLUtils.createFragmentShader = createFragmentShader;
        function createVertexShader(gl, shaderSource) {
            return createShader(gl, gl.VERTEX_SHADER, shaderSource);
        }
        WebGLUtils.createVertexShader = createVertexShader;
        function createProgram(gl, shaders) {
            var fragmentShader = createFragmentShader(gl, shaders.fragment);
            var vertexShader = createVertexShader(gl, shaders.vertex);
            var program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS))
                console.log(gl.getProgramInfoLog(program));
            return program;
        }
        WebGLUtils.createProgram = createProgram;
    })(WebGLUtils = Blaze.WebGLUtils || (Blaze.WebGLUtils = {}));
    var utils;
    (function (utils) {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        utils.s4 = s4;
        function uuid(name) {
            var id = s4() + s4();
            return name ? name + id : id;
        }
        utils.uuid = uuid;
        function normalizeNaN(vec) {
            return vec.map(function (a) { if (Number.isNaN(a))
                a = 0; return a; });
        }
        utils.normalizeNaN = normalizeNaN;
        function load(url, callback) {
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.addEventListener('load', function () {
                callback(request.responseText);
            });
            request.send();
        }
        utils.load = load;
        function getExtension(str) {
            var elems = str.split(".");
            return elems[elems.length - 1];
        }
        utils.getExtension = getExtension;
        function nowInMilliseconds() {
            return (new Date()).getTime();
        }
        utils.nowInMilliseconds = nowInMilliseconds;
        function degToRad(d) {
            return d * Math.PI / 180;
        }
        utils.degToRad = degToRad;
        function calculateNormals(vs, ind) {
            var x = 0;
            var y = 1;
            var z = 2;
            var ns = [];
            for (var i = 0; i < vs.length; i++) {
                ns[i] = 0.0;
            }
            for (var i = 0; i < ind.length; i = i + 3) {
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
                for (var j = 0; j < 3; j++) {
                    ns[3 * ind[i + j] + x] = ns[3 * ind[i + j] + x] + normal[x];
                    ns[3 * ind[i + j] + y] = ns[3 * ind[i + j] + y] + normal[y];
                    ns[3 * ind[i + j] + z] = ns[3 * ind[i + j] + z] + normal[z];
                }
            }
            //normalize the result
            for (var i = 0; i < vs.length; i = i + 3) {
                var nn = [];
                nn[x] = ns[i + x];
                nn[y] = ns[i + y];
                nn[z] = ns[i + z];
                var len = Math.sqrt((nn[x] * nn[x]) + (nn[y] * nn[y]) + (nn[z] * nn[z]));
                if (len == 0)
                    len = 0.00001;
                nn[x] = nn[x] / len;
                nn[y] = nn[y] / len;
                nn[z] = nn[z] / len;
                ns[i + x] = nn[x];
                ns[i + y] = nn[y];
                ns[i + z] = nn[z];
            }
            return ns;
        }
        utils.calculateNormals = calculateNormals;
    })(utils = Blaze.utils || (Blaze.utils = {}));
    (function (CAMERA_TYPE) {
        CAMERA_TYPE[CAMERA_TYPE["ORBITING"] = 0] = "ORBITING";
        CAMERA_TYPE[CAMERA_TYPE["TRACKING"] = 1] = "TRACKING";
    })(Blaze.CAMERA_TYPE || (Blaze.CAMERA_TYPE = {}));
    var CAMERA_TYPE = Blaze.CAMERA_TYPE;
    var Ketch = (function () {
        function Ketch() {
        }
        Ketch.setCanvasToContext = function (key, canvas) {
            var context = WebGLUtils.getGLContext(canvas);
            Ketch.setContext(key, context);
        };
        Ketch.setContext = function (key, context) {
            Ketch._views[key].context = context;
        };
        Ketch.getContext = function (key) {
            return Ketch._views[key].context;
        };
        Ketch.createProgram = function (key, shaders) {
            var gl = Ketch.getContext(key);
            var program = WebGLUtils.createProgram(gl, shaders);
            Ketch.setProgram(key, program);
        };
        Ketch.setProgram = function (key, program) {
            Ketch._views[key].program = program;
        };
        Ketch.getProgram = function (key) {
            return Ketch._views[key].program;
        };
        Ketch.useProgram = function (key) {
            var view = Ketch._views[key];
            var gl = view.context;
            var prg = view.program;
            gl.useProgram(prg);
        };
        Ketch.createView = function (key) {
            Ketch._views[key] = {};
        };
        Ketch.setAttributeLocations = function (key, attribs_names) {
            var view = Ketch._views[key];
            var gl = view.context;
            var prg = view.program;
            view.attribs = attribs_names.reduce(function (prev, attr) {
                prev[attr] = gl.getAttribLocation(prg, attr);
                return prev;
            }, {});
        };
        Ketch.getAttrib = function (view_key, attr_key) {
            return Ketch._views[view_key].attribs[attr_key];
        };
        Ketch.getUniform = function (view_key, uniform_key) {
            return Ketch._views[view_key].uniforms[uniform_key];
        };
        Ketch.setUniformLocations = function (key, uniform_names) {
            var view = Ketch._views[key];
            var gl = view.context;
            var prg = view.program;
            view.uniforms = uniform_names.reduce(function (prev, attr) {
                prev[attr] = gl.getUniformLocation(prg, attr);
                return prev;
            }, {});
        };
        Ketch.enableAttrib = function (view_key, attr_key, pointer) {
            var index = Ketch.getAttrib(view_key, attr_key);
            var gl = Ketch.getContext(view_key);
            gl.enableVertexAttribArray(index);
            if (pointer) {
                gl.vertexAttribPointer(index, pointer.size || 3, gl.FLOAT, pointer.normalized || false, pointer.stride || 0, pointer.offset || 0);
            }
            else {
                gl.vertexAttribPointer(index, 3, gl.FLOAT, false, 0, 0);
            }
        };
        Ketch.disableAttrib = function (view_key, attr_key) {
            var index = Ketch.getAttrib(view_key, attr_key);
            var gl = Ketch.getContext(view_key);
            gl.disableVertexAttribArray(index);
        };
        Ketch.renderLoop = function (cb) {
            setInterval(cb, 30);
        };
        Ketch.addTexture = function (key, texture_id) {
            var view = Ketch._views[key];
            view.textures = view.textures || [];
            view.textures.push(texture_id);
        };
        Ketch.removeTexture = function (key, texture_id) {
            var view = Ketch._views[key];
            view.textures = view.textures || [];
            var index = view.textures.indexOf(texture_id);
            view.textures.splice(index, 1);
        };
        Ketch.activeTexture = function (key, texture_id, texture) {
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
        };
        Ketch.isOffScreen = function (view_key) {
            return Ketch._views[view_key].offscreen;
        };
        Ketch.enableOffScreen = function (view_key) {
            Ketch._views[view_key].offscreen = true;
        };
        Ketch.disableOffScreen = function (view_key) {
            Ketch._views[view_key].offscreen = true;
        };
        Ketch.fillSelectorBuffer = function (view_key, obj) {
            var view = Ketch._views[view_key];
            view.selectObjects = view.selectObjects || [];
            view.selectObjects.push(obj);
        };
        Ketch.clearSelectorBuffer = function (view_key) {
            var view = Ketch._views[view_key];
            view.selectObjects = [];
        };
        Ketch.getSelectByColor = function (view_key, color) {
            var view = Ketch._views[view_key];
            view.selectObjects = view.selectObjects || [];
            return _.find(view.selectObjects, function (o) {
                return _.isEqual(o.color, color);
            });
        };
        Ketch._views = {};
        return Ketch;
    }());
    Blaze.Ketch = Ketch;
    var Renderable = (function () {
        function Renderable(graph_id) {
            this._graph_id = graph_id;
        }
        Object.defineProperty(Renderable.prototype, "graphID", {
            get: function () {
                return this._graph_id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Renderable.prototype, "gl", {
            get: function () {
                return Ketch.getContext(this.graphID);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Renderable.prototype, "program", {
            get: function () {
                return Ketch.getProgram(this.graphID);
            },
            enumerable: true,
            configurable: true
        });
        Renderable.prototype.getUniform = function (key) {
            return Ketch.getUniform(this.graphID, key);
        };
        return Renderable;
    }());
    Blaze.Renderable = Renderable;
    var Entity = (function (_super) {
        __extends(Entity, _super);
        function Entity(graph_id) {
            _super.call(this, graph_id);
        }
        Entity.prototype.beginDraw = function (matrixStack) {
        };
        Entity.prototype.endDraw = function (matrixStack) {
        };
        return Entity;
    }(Renderable));
    Blaze.Entity = Entity;
    var MatrixStack = (function (_super) {
        __extends(MatrixStack, _super);
        function MatrixStack(graph_id) {
            _super.call(this, graph_id);
            this._stack = [];
            this._mvMatrix = mat4.create();
            this._pMatrix = mat4.create();
            this._nMatrix = mat4.create();
        }
        MatrixStack.prototype.push = function () {
            var copy = mat4.create();
            mat4.set(this._mvMatrix, copy);
            this._stack.push(copy);
        };
        MatrixStack.prototype.pop = function () {
            if (this._stack.length == 0)
                throw "invalid popMatrix";
            this._mvMatrix = this._stack.pop();
        };
        MatrixStack.prototype.ModelView = function () {
            if (this._camera) {
                this._mvMatrix = this._camera.modelView;
            }
            else {
                mat4.identity(this._mvMatrix);
            }
        };
        Object.defineProperty(MatrixStack.prototype, "mvMatrix", {
            get: function () {
                return this._mvMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatrixStack.prototype, "pMatrix", {
            get: function () {
                return this._pMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatrixStack.prototype, "nMatrix", {
            get: function () {
                return this._nMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatrixStack.prototype, "MainCamera", {
            set: function (camera) {
                this._camera = camera;
            },
            enumerable: true,
            configurable: true
        });
        MatrixStack.prototype.Perspective = function () {
            var gl = this.gl;
            mat4.identity(this._pMatrix);
            mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0, this._pMatrix);
        };
        MatrixStack.prototype.Normal = function () {
            mat4.identity(this._nMatrix);
            mat4.set(this._mvMatrix, this._nMatrix);
            mat4.inverse(this._nMatrix);
            mat4.transpose(this._nMatrix);
        };
        MatrixStack.prototype.init = function () {
            this.ModelView();
            this.Perspective();
            this.Normal();
        };
        MatrixStack.prototype.setUp = function () {
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
        };
        return MatrixStack;
    }(Renderable));
    Blaze.MatrixStack = MatrixStack;
    var Resources;
    (function (Resources) {
        var MeshBuffers = (function (_super) {
            __extends(MeshBuffers, _super);
            function MeshBuffers(graph_id) {
                _super.call(this, graph_id);
            }
            Object.defineProperty(MeshBuffers.prototype, "onload", {
                set: function (cb) {
                    this._onload = cb;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MeshBuffers.prototype, "src", {
                set: function (src) {
                    var _this = this;
                    var self = this;
                    var ext = utils.getExtension(src);
                    utils.load(src, function (data) {
                        var obj;
                        switch (ext) {
                            case "obj":
                                obj = self.parseOBJ(data);
                                break;
                            case "json":
                                obj = self.parseJSON(data);
                                break;
                        }
                        self.createBuffers(obj);
                        if (_this._onload)
                            _this._onload();
                    });
                },
                enumerable: true,
                configurable: true
            });
            MeshBuffers.prototype.parseJSON = function (data) {
                var obj = {};
                try {
                    obj = JSON.parse(data);
                }
                catch (e) {
                    console.log(e);
                }
                return obj;
            };
            MeshBuffers.prototype.parseOBJ = function (data) {
                var obj = {
                    v: [],
                    vn: [],
                    vt: [],
                    iv: [],
                    in: [],
                    it: []
                };
                var lines = data.split("\n");
                var vertex = lines.filter(function (a) {
                    return a[0] === 'v';
                });
                var index = lines.filter(function (a) {
                    return a[0] === 'f';
                });
                vertex.forEach(function (item) {
                    var elems = item.replace("\r", "").split(" ");
                    var key = elems[0];
                    obj[key] = obj[key].concat(elems.slice(1).filter(function (a) {
                        return a !== "";
                    }));
                });
                var tempIndex = [];
                index.forEach(function (item) {
                    var elems = item.replace("\r", "").replace("f", "").split(" ");
                    tempIndex = tempIndex.concat(elems.slice(1).filter(function (a) {
                        return a !== "";
                    }));
                });
                tempIndex.forEach(function (item) {
                    var elems = item.split("/");
                    obj.iv.push(parseInt(elems[0]) - 1);
                    obj.in.push(parseInt(elems[1]) - 1);
                    obj.it.push(parseInt(elems[2]) - 1);
                });
                return obj;
            };
            MeshBuffers.prototype.createBuffers = function (obj) {
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
            };
            Object.defineProperty(MeshBuffers.prototype, "vbo", {
                get: function () {
                    return this._vbo;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MeshBuffers.prototype, "nbo", {
                get: function () {
                    return this._nbo;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MeshBuffers.prototype, "tbo", {
                get: function () {
                    return this._tbo;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MeshBuffers.prototype, "ivbo", {
                get: function () {
                    return this._ivbo;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MeshBuffers.prototype, "inbo", {
                get: function () {
                    return this._inbo;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MeshBuffers.prototype, "itbo", {
                get: function () {
                    return this._itbo;
                },
                enumerable: true,
                configurable: true
            });
            return MeshBuffers;
        }(Renderable));
        Resources.MeshBuffers = MeshBuffers;
        var MeshTexture = (function (_super) {
            __extends(MeshTexture, _super);
            function MeshTexture(graph_id) {
                _super.call(this, graph_id);
                this._image = new Image();
                this._oid = utils.uuid(this.constructor.name);
            }
            Object.defineProperty(MeshTexture.prototype, "onload", {
                set: function (cb) {
                    this._onload = cb;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MeshTexture.prototype, "src", {
                set: function (filename) {
                    this._image.onload = this.loadTextureImage(this._onload);
                    this._image.src = filename;
                },
                enumerable: true,
                configurable: true
            });
            MeshTexture.prototype.loadTextureImage = function (cb) {
                var _this = this;
                var self = this;
                return function () {
                    _this._texture = WebGLUtils.createTexture(self.gl, self._image);
                    Ketch.addTexture(self.graphID, self._oid);
                    if (cb)
                        cb();
                };
            };
            Object.defineProperty(MeshTexture.prototype, "content", {
                get: function () {
                    return this._texture;
                },
                enumerable: true,
                configurable: true
            });
            return MeshTexture;
        }(Renderable));
        Resources.MeshTexture = MeshTexture;
        var MeshMaterial = (function (_super) {
            __extends(MeshMaterial, _super);
            function MeshMaterial(graph_id, ambient, diffuse, specular, shininess) {
                _super.call(this, graph_id);
                this._ambient = ambient ? vec4.create(ambient) : vec4.create();
                this._diffuse = diffuse ? vec4.create(diffuse) : void 0;
                this._specular = specular ? vec4.create(specular) : vec4.create();
                this._shininess = shininess || 200.0;
            }
            Object.defineProperty(MeshMaterial.prototype, "onload", {
                set: function (cb) {
                    this._onload = cb;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MeshMaterial.prototype, "src", {
                set: function (src) {
                    var _this = this;
                    var self = this;
                    utils.load(src, function (data) {
                        var temp = self.parse(data);
                        _this._ambient = temp.Ka;
                        _this._diffuse = temp.Kd;
                        _this._specular = temp.Ks;
                        _this.shininess = temp.Ns;
                        if (_this._onload)
                            _this._onload();
                    });
                },
                enumerable: true,
                configurable: true
            });
            MeshMaterial.prototype.parse = function (data) {
                var obj = {};
                var keys = ["Ka", "Kd", "Ks", "Ns"];
                var lines = data.split("\n");
                lines.forEach(function (line) {
                    var elems = line.split(" ");
                    var key = elems[0];
                    if (keys.indexOf(key) > -1) {
                        switch (key) {
                            case "Ns":
                                obj["Ns"] = Number(elems[1]);
                                break;
                            default: {
                                var temp = elems.slice(1).map(function (a) { return Number(a); });
                                temp.push(1.0);
                                obj[key] = temp;
                            }
                        }
                    }
                });
                return obj;
            };
            Object.defineProperty(MeshMaterial.prototype, "ambient", {
                get: function () {
                    return this._ambient;
                },
                set: function (ambient) {
                    this._ambient = utils.normalizeNaN(vec4.create(ambient));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MeshMaterial.prototype, "diffuse", {
                get: function () {
                    return this._diffuse;
                },
                set: function (diffuse) {
                    this._diffuse = utils.normalizeNaN(vec4.create(diffuse));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MeshMaterial.prototype, "specular", {
                get: function () {
                    return this._specular;
                },
                set: function (specular) {
                    this._specular = utils.normalizeNaN(vec4.create(specular));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MeshMaterial.prototype, "shininess", {
                get: function () {
                    return this._shininess;
                },
                set: function (v) {
                    this._shininess = v;
                },
                enumerable: true,
                configurable: true
            });
            return MeshMaterial;
        }(Renderable));
        Resources.MeshMaterial = MeshMaterial;
    })(Resources = Blaze.Resources || (Blaze.Resources = {}));
    var Shaders;
    (function (Shaders) {
        var Fragment = (function () {
            function Fragment() {
            }
            Fragment.All_effect = "#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform sampler2D uSampler;\nuniform float uTime;\nuniform sampler2D uNoiseSampler;\nuniform vec2 uInverseTextureSize;\n\nvarying vec2 vTextureCoord;\n\nconst float speed = 15.0;\nconst float magnitude = 0.015;\n\nconst float grainIntensity = 0.1;\nconst float scrollSpeed = 4000.0;\n\nvec4 offsetLookup(float xOff, float yOff) {\n    return texture2D(uSampler, vec2(vTextureCoord.x + xOff*uInverseTextureSize.x, vTextureCoord.y + yOff*uInverseTextureSize.y));\n}\n\nvoid main(){\n\n     vec4 frameColor = offsetLookup(-4.0, 0.0) * 0.05;\n    frameColor += offsetLookup(-3.0, 0.0) * 0.09;\n    frameColor += offsetLookup(-2.0, 0.0) * 0.12;\n    frameColor += offsetLookup(-1.0, 0.0) * 0.15;\n    frameColor += offsetLookup(0.0, 0.0) * 0.16;\n    frameColor += offsetLookup(1.0, 0.0) * 0.15;\n    frameColor += offsetLookup(2.0, 0.0) * 0.12;\n    frameColor += offsetLookup(3.0, 0.0) * 0.09;\n    frameColor += offsetLookup(4.0, 0.0) * 0.05;\n    \n    vec4 grain=texture2D(uNoiseSampler, vTextureCoord*2.0+uTime*scrollSpeed*uInverseTextureSize);\n     \n      frameColor +=texture2D(uSampler, vTextureCoord)-(grain*grainIntensity);\n          vec2 wavyCoord;\n    wavyCoord.s=vTextureCoord.s+(sin(uTime+vTextureCoord.t*speed)*magnitude);\n    wavyCoord.t=vTextureCoord.t+(sin(uTime+vTextureCoord.s*speed)*magnitude);\n    \n    frameColor+=texture2D(uSampler, wavyCoord);\n    gl_FragColor=frameColor;\n}";
            Fragment.Blur_effect = "#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform sampler2D uSampler;\nuniform vec2 uInverseTextureSize;\n\nvarying vec2 vTextureCoord;\n\nvec4 offsetLookup(float xOff, float yOff) {\n    return texture2D(uSampler, vec2(vTextureCoord.x + xOff*uInverseTextureSize.x, vTextureCoord.y + yOff*uInverseTextureSize.y));\n}\n\nvoid main(void)\n{\n    vec4 frameColor = offsetLookup(-4.0, 0.0) * 0.05;\n    frameColor += offsetLookup(-3.0, 0.0) * 0.09;\n    frameColor += offsetLookup(-2.0, 0.0) * 0.12;\n    frameColor += offsetLookup(-1.0, 0.0) * 0.15;\n    frameColor += offsetLookup(0.0, 0.0) * 0.16;\n    frameColor += offsetLookup(1.0, 0.0) * 0.15;\n    frameColor += offsetLookup(2.0, 0.0) * 0.12;\n    frameColor += offsetLookup(3.0, 0.0) * 0.09;\n    frameColor += offsetLookup(4.0, 0.0) * 0.05;\n\n    gl_FragColor = frameColor;\n}";
            Fragment.Film_effect = "#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform sampler2D uSampler;\nuniform sampler2D uNoiseSampler;\nuniform vec2 uInverseTextureSize;\nuniform float uTime;\n\nvarying vec2 vTextureCoord;\n\nconst float grainIntensity = 0.1;\nconst float scrollSpeed = 4000.0;\n\n\nvoid main()\n{\n    vec4 frameColor=texture2D(uSampler, vTextureCoord);\n    vec4 grain=texture2D(uNoiseSampler, vTextureCoord*2.0+uTime*scrollSpeed*uInverseTextureSize);\n    gl_FragColor=frameColor-(grain*grainIntensity);\n\n}";
            Fragment.Grey_effect = "#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform sampler2D uSampler;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    vec4 frameColor = texture2D(uSampler, vTextureCoord);\n    float luminance = frameColor.r * 0.3 + frameColor.g * 0.59 + frameColor.b * 0.11;\n    gl_FragColor = vec4(luminance, luminance, luminance, frameColor.a);\n}";
            Fragment.Invert_effect = "#ifdef GL_ES\nprecision mediump float;\n#endif\nuniform sampler2D uSampler;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    vec4 frameColor = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = vec4(1.0-frameColor.r, 1.0-frameColor.g, 1.0-frameColor.b, frameColor.a);\n}";
            Fragment.No_effect = "#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nvoid main(){\n    vec4 frameColor=texture2D(uSampler, vTextureCoord);\n    \n    gl_FragColor=frameColor;\n\n}\n";
            Fragment.Particle = "#ifdef GL_ES\nprecision mediump float;\n#endif\nuniform bool uWireframe;\n\nuniform sampler2D uSampler;\n\nvarying vec4 vColor;\n\n\nbool isBlack(vec4 color){\nreturn color.r==0.0 &&color.g==0.0&&color.b==0.0;\n}\nvoid main(void) { \n     if(uWireframe){\n         gl_FragColor = vColor;\n        }else{\n    gl_FragColor = texture2D(uSampler, gl_PointCoord);\n    if(gl_FragColor.a < 0.5 || isBlack(gl_FragColor)) discard;\n    }\n}";
            Fragment.Phong = "#ifdef GL_ES\nprecision mediump float;\n#endif\nuniform float uShininess;\nuniform vec3 uLightDirection;\n\nuniform vec4 uLightAmbient;\nuniform vec4 uLightDiffuse;\nuniform vec4 uLightSpecular;\n\nuniform bool uWireframe;\n\nuniform bool uOffscreen;\nuniform vec4 uSelectColor;\n\nuniform vec4 uMaterialAmbient;\nuniform vec4 uMaterialDiffuse;\nuniform vec4 uMaterialSpecular;\n\nvarying vec3 vNormal;\nvarying vec3 vEyeVec;\nvarying vec4 vColor;\n\nvoid main(){\n\n        if(uWireframe){\n            gl_FragColor = vColor;\n            return;\n        }\n      \n\n        if(uOffscreen){\n            gl_FragColor=uSelectColor;\n            return;\n        }\n\n       \n        vec3 L= normalize(uLightDirection);\n        vec3 N= normalize(vNormal);\n        float lambertTerm=dot(N, -L);\n        \n        vec4 Ia= uLightAmbient*uMaterialAmbient;\n        \n        vec4 Id=vec4(0.0,0.0,0.0,1.0);\n        \n        vec4 Is=vec4(0.0,0.0,0.0,1.0);\n        \n        if(lambertTerm>0.0)\n        {\n            Id=uLightDiffuse*uMaterialDiffuse*lambertTerm;\n            \n            vec3 E= normalize(vEyeVec);\n            vec3 R= reflect(L, N);\n            float specular=pow(max(dot(R,E),0.0), uShininess);\n            Is=uLightSpecular*uMaterialSpecular*specular;\n        }\n        \n        vec4 finalColor=Ia+Id+Is;\n        finalColor.a=1.0;\n    \n        gl_FragColor =finalColor;\n        \n        \n}\n\n\n";
            Fragment.Phong_lights = "#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform int uNumLights;\n\nuniform float uShininess;\nuniform vec3 uLightDirection[uNumLights];\nuniform float uCutOff[uNumLights];\n\nuniform vec4 uLightAmbient[uNumLights];\nuniform vec4 uLightDiffuse[uNumLights];\nuniform vec4 uLightSpecular[uNumLights];\n\nuniform bool uWireframe;\n\nuniform bool uOffscreen;\nuniform vec4 uSelectColor;\n\nuniform vec4 uMaterialAmbient;\nuniform vec4 uMaterialDiffuse;\nuniform vec4 uMaterialSpecular;\n\nvarying vec3 vNormal;\nvarying vec3 vEyeVec;\nvarying vec4 vColor;\n\nvoid main(){\n\n        if(uWireframe){\n            gl_FragColor = vColor;\n            return;\n        }\n      \n\n        if(uOffscreen){\n            gl_FragColor=uSelectColor;\n            return;\n        }\n\n        vec4 finalColor=vec4(0.0,0.0,0.0,1.0);\n        for(int i=0; i<uNumLights;i++){\n        \n        vec3 L= normalize(uLightDirection[i]);\n        vec3 N= normalize(vNormal);\n        float lambertTerm=dot(N, -L);\n        \n        vec4 Ia= uLightAmbient[i]*uMaterialAmbient;\n        \n        vec4 Id=vec4(0.0,0.0,0.0,1.0);\n        \n        vec4 Is=vec4(0.0,0.0,0.0,1.0);\n        \n        if(lambertTerm>uCutOff[i])\n        {\n            Id=uLightDiffuse[i]*uMaterialDiffuse*lambertTerm;\n            \n            vec3 E= normalize(vEyeVec);\n            vec3 R= reflect(L, N);\n            float specular=pow(max(dot(R,E),0.0), uShininess);\n            Is=uLightSpecular[i]*uMaterialSpecular*specular;\n        }\n        \n        finalColor+=Ia+Id+Is;\n        \n        }\n        finalColor.a=1.0;\n    \n        gl_FragColor =finalColor;\n        \n        \n}\n\n\n";
            Fragment.Phong_positional = "#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform float uShininess;\n\nuniform vec4 uLightAmbient;\nuniform vec4 uLightDiffuse;\n\n\nuniform bool uWireframe;\n\nuniform bool uOffscreen;\nuniform vec4 uSelectColor;\n\n\nuniform vec4 uMaterialDiffuse;\n\n\nvarying vec3 vNormal;\nvarying vec3 vEyeVec;\nvarying vec3 vLightDir;\nvarying vec4 vColor;\n\nvoid main(){\n\n        if(uWireframe){\n            gl_FragColor = vColor;\n            return;\n        }\n      \n\n        if(uOffscreen){\n            gl_FragColor=uSelectColor;\n            return;\n        }\n\n       \n        vec3 L= normalize(vLightDir);\n        vec3 N= normalize(vNormal);\n        float lambertTerm=dot(N, -L);\n        \n        vec4 Ia= uLightAmbient;\n        \n        vec4 Id=vec4(0.0,0.0,0.0,1.0);\n        \n        vec4 Is=vec4(0.0,0.0,0.0,1.0);\n        \n        if(lambertTerm>0.0)\n        {\n            Id=uMaterialDiffuse*lambertTerm;\n            \n            vec3 E= normalize(vEyeVec);\n            vec3 R= reflect(L, N);\n            float specular=pow(max(dot(R,E),0.0), uShininess);\n            Is=uLightDiffuse*specular;\n        }\n        \n        vec4 finalColor=Ia+Id+Is;\n        finalColor.a=1.0;\n    \n        gl_FragColor =finalColor;\n        \n        \n}\n\n\n";
            Fragment.Toon = "#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform float uShininess;\nuniform vec3 uLightDirection;\n\nuniform mat4 uMVMatrix;\n\nuniform vec4 uLightAmbient;\nuniform vec4 uLightDiffuse;\nuniform vec4 uMaterialDiffuse;\n\nuniform bool uWireframe;\n\nuniform bool uOffscreen;\nuniform vec4 uSelectColor;\n\nvarying vec4 vColor;\n\nvarying vec3 vNormal;\nvarying vec3 vVertex;\n\nvoid main(){\n\n       if(uWireframe){\n            gl_FragColor = vColor;\n            return;\n        }\n      \n\n        if(uOffscreen){\n            gl_FragColor=uSelectColor;\n            return;\n        }\n\n        vec4 color0=vec4(uMaterialDiffuse.rgb,1.0);\n        vec4 color1=vec4(0.0,0.0,0.0, 1.0);\n        vec4 color2=vec4(uMaterialDiffuse.rgb, 1.0);\n        \n        vec3 N= vNormal;\n        vec3 L = normalize(uLightDirection);\n        \n        vec4 eyePos= uMVMatrix*vec4(0.0,0.0,0.0,1.0);\n        \n        vec3 EyeVert = normalize(-eyePos.xyz);\n        \n        vec3 EyeLight=normalize(L+EyeVert);\n        \n        float sil= max(dot(N, EyeVert), 0.0);\n        \n        if( sil<0.4){\n            gl_FragColor=color1;\n        }else{\n             gl_FragColor=color0;\n             \n             float spec=pow(max(dot(N, EyeLight), 0.0), uShininess);\n             \n             if(spec<0.2) gl_FragColor*=0.8;\n             else gl_FragColor=color2;\n             \n             float diffuse=max(dot(N, L), 0.0);\n             if(diffuse<0.5)gl_FragColor*=0.8;\n        }\n\n\n\n\n\n}\n\n\n\n";
            Fragment.Wavy_effect = "#ifdef GL_ES\nprecision mediump float;\n#endif\n\n\nuniform sampler2D uSampler;\nuniform float uTime;\n\nvarying vec2 vTextureCoord;\n\nconst float speed = 15.0;\nconst float magnitude = 0.015;\n\nvoid main(){\n    \n    vec2 wavyCoord;\n    wavyCoord.s=vTextureCoord.s+(sin(uTime+vTextureCoord.t*speed)*magnitude);\n    wavyCoord.t=vTextureCoord.t+(sin(uTime+vTextureCoord.s*speed)*magnitude);\n    \n    vec4 frameColor=texture2D(uSampler, wavyCoord);\n    gl_FragColor=frameColor;\n\n\n}";
            return Fragment;
        }());
        Shaders.Fragment = Fragment;
        var Vertex = (function () {
            function Vertex() {
            }
            Vertex.Effect = "#ifdef GL_ES\nprecision mediump float;\n#endif\n\nattribute vec2 a_position;\nattribute vec2 a_texture_coords;\n\nvarying vec2 vTextureCoord;\n\nvoid main(){\n    vTextureCoord=a_texture_coords;\n\n    gl_Position=vec4(a_position, 0.0,1.0);\n    \n}";
            Vertex.Particle = "#ifdef GL_ES\nprecision mediump float;\n#endif\nattribute vec3 a_position;\nattribute vec4 a_color;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nuniform float uPointSize;\n\nuniform bool uWireframe;\nuniform bool uPerVertexColor;\nuniform vec4 uMaterialDiffuse;\n\n\nvarying vec4 vColor;\n\nvoid main(void) {\n\n if(uWireframe){\n\t \n\t \tif(uPerVertexColor){\n\t \t\t vColor=a_color;\n\t \t}else{\n\t \t\tvColor=uMaterialDiffuse;\n\t \t}\n\t \n\t\n\t }\n    \n    gl_Position = uPMatrix * uMVMatrix * vec4(a_position.xyz, 1.0);\n    gl_PointSize = uPointSize;\n}";
            Vertex.Phong = "#ifdef GL_ES\nprecision mediump float;\n#endif\n\nattribute vec3 a_position;\nattribute vec3 a_normal;\nattribute vec4 a_color;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nuniform mat4 uNMatrix;\n\nuniform bool uWireframe;\nuniform bool uPerVertexColor;\nuniform vec4 uMaterialDiffuse;\n\nvarying vec3 vNormal;\nvarying vec3 vEyeVec;\nvarying vec4 vColor;\n\nvoid main(){\n\n    vec4 vertex = uMVMatrix * vec4(a_position, 1.0);\n\t\n\t\n\t if(uWireframe){\n\t \n\t \tif(uPerVertexColor){\n\t \t\t vColor=a_color;\n\t \t}else{\n\t \t\tvColor=uMaterialDiffuse;\n\t \t}\n\t \n\t\n\t }else{\n\t\n\tvNormal = vec3(uNMatrix * vec4(a_normal, 1.0));\n\tvEyeVec=-vec3(vertex.xyz);  \n\t\n\t}\n\t \n\tgl_Position =uPMatrix * vertex;\n\n}\n\n\n";
            Vertex.Phong_lights = "#ifdef GL_ES\nprecision mediump float;\n#endif\n\nattribute vec3 a_position;\nattribute vec3 a_normal;\nattribute vec4 a_color;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nuniform mat4 uNMatrix;\n\nuniform bool uWireframe;\nuniform bool uPerVertexColor;\nuniform vec4 uMaterialDiffuse;\n\nvarying vec3 vNormal;\nvarying vec3 vEyeVec;\nvarying vec4 vColor;\n\nvoid main(){\n\n    vec4 vertex = uMVMatrix * vec4(a_position, 1.0);\n\t\n\t\n\t if(uWireframe){\n\t \n\t \tif(uPerVertexColor){\n\t \t\t vColor=a_color;\n\t \t}else{\n\t \t\tvColor=uMaterialDiffuse;\n\t \t}\n\t \n\t\n\t }else{\n\t\n\tvNormal = vec3(uNMatrix * vec4(a_normal, 1.0));\n\tvEyeVec=-vec3(vertex.xyz);  \n\t\n\t}\n\t \n\tgl_Position =uPMatrix * vertex;\n\n}\n\n\n";
            Vertex.Phong_positional = "#ifdef GL_ES\nprecision mediump float;\n#endif\n\nattribute vec3 a_position;\nattribute vec3 a_normal;\nattribute vec4 a_color;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nuniform mat4 uNMatrix;\n\nuniform vec3 uLightPosition;\n\nuniform bool uWireframe;\nuniform bool uPerVertexColor;\nuniform vec4 uMaterialDiffuse;\n\nvarying vec3 vNormal;\nvarying vec3 vEyeVec;\nvarying vec3 vLightDir;\n\nvarying vec4 vColor;\n\nvoid main(){\n\n    vec4 vertex = uMVMatrix * vec4(a_position, 1.0);\n\t\n\t\n\t if(uWireframe){\n\t \n\t \tif(uPerVertexColor){\n\t \t\t vColor=a_color;\n\t \t}else{\n\t \t\tvColor=uMaterialDiffuse;\n\t \t}\n\t \n\t\n\t }else{\n\t\n\tvNormal = vec3(uNMatrix * vec4(a_normal, 1.0));\n    vLightDir=vertex.xyz-uLightPosition;  \n\tvEyeVec=-vec3(vertex.xyz);  \n\t\n\t}\n\t \n\tgl_Position =uPMatrix * vertex;\n\n}\n\n\n";
            Vertex.Toon = "#ifdef GL_ES\nprecision mediump float;\n#endif\n\nattribute vec3 a_position;\nattribute vec3 a_normal;\nattribute vec4 a_color;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nuniform mat4 uNMatrix;\n\nuniform bool uWireframe;\nuniform bool uPerVertexColor;\nuniform vec4 uMaterialDiffuse;\n\nvarying vec3 vNormal;\nvarying vec3 vVertex;\nvarying vec4 vColor;\n\nvoid main(){\n    \n    vec4 normal= uNMatrix * vec4(a_normal,1.0);\n    \n     if(uWireframe){\n\t \n\t \tif(uPerVertexColor){\n\t \t\t vColor=a_color;\n\t \t}else{\n\t \t\tvColor=uMaterialDiffuse;\n\t \t}\n\t \n\t\n\t }else{\n    \n    vNormal=normal.xyz;\n    vVertex=a_position;\n    }\n    \n    gl_Position=uPMatrix*uMVMatrix*vec4(a_position, 1.0);\n    \n    \n    \n    \n\n}";
            return Vertex;
        }());
        Shaders.Vertex = Vertex;
    })(Shaders = Blaze.Shaders || (Blaze.Shaders = {}));
    var AnimationEntity = (function (_super) {
        __extends(AnimationEntity, _super);
        function AnimationEntity(graph_id, frequency, times, callback) {
            _super.call(this, graph_id);
            this._frequency = frequency;
            this._interval_id = null;
            this._callback = callback;
        }
        AnimationEntity.prototype.onFrame = function () {
            AnimationEntity.ElapseTime = utils.nowInMilliseconds();
            if (AnimationEntity.ElapseTime < 5)
                return;
            var steps = Math.floor(AnimationEntity.ElapseTime / this._frequency);
            while ((steps > 0) && (AnimationEntity.Count != this._times)) {
                this._callback();
                steps--;
                AnimationEntity.Count++;
            }
            if (AnimationEntity.Count === this._times) {
                this.stop();
            }
        };
        AnimationEntity.prototype.start = function () {
            this._intime = utils.nowInMilliseconds();
            this._interval_id = setInterval(this.onFrame, this._frequency / 1000);
        };
        AnimationEntity.prototype.stop = function () {
            if (this._interval_id)
                clearInterval(this._interval_id);
        };
        AnimationEntity.prototype.beginDraw = function () {
        };
        AnimationEntity.prototype.endDraw = function () {
        };
        AnimationEntity.Count = 0;
        return AnimationEntity;
    }(Entity));
    Blaze.AnimationEntity = AnimationEntity;
    var MeshEntity = (function (_super) {
        __extends(MeshEntity, _super);
        function MeshEntity(graph_id, meshfile, materialfile, texturefile) {
            _super.call(this, graph_id);
            this._material = null;
            this._texture = null;
            this._buffers = null;
            this._meshfile = meshfile || null;
            this._materialfile = materialfile || null;
            this._texturefile = texturefile || null;
        }
        MeshEntity.prototype.loadBuffers = function (filename, cb) {
            this._buffers = new Resources.MeshBuffers(this.graphID);
            this._buffers.onload = cb;
            this._buffers.src = filename;
        };
        MeshEntity.prototype.loadTexture = function (filename, cb) {
            this._texture = new Resources.MeshTexture(this.graphID);
            this._texture.onload = cb;
            this._texture.src = filename;
        };
        Object.defineProperty(MeshEntity.prototype, "material", {
            set: function (v) {
                this._material = v;
            },
            enumerable: true,
            configurable: true
        });
        MeshEntity.prototype.loadMaterial = function (filename, cb) {
            this._material = new Resources.MeshMaterial(this.graphID);
            this._material.onload = cb;
            this._material.src = filename;
        };
        MeshEntity.prototype.loadMesh = function (cb) {
            var _this = this;
            var self = this;
            async.waterfall([
                function (next) {
                    if (!self._meshfile) {
                        return next();
                    }
                    console.log("Loading Buffers");
                    self.loadBuffers(self._meshfile, function () {
                        console.log("Loaded Buffers");
                        next();
                    });
                },
                function (next) {
                    if (!_this._texturefile) {
                        return next();
                    }
                    console.log("Loading Texture");
                    self.loadTexture(self._texturefile, function () {
                        console.log("Loaded Texture");
                        next();
                    });
                },
                function (next) {
                    if (!self._materialfile) {
                        return next();
                    }
                    console.log("Loading Material");
                    self.loadMaterial(self._materialfile, function () {
                        console.log("Loaded Material");
                        next();
                    });
                }
            ], function (err) {
                if (err)
                    return console.log(err);
                if (cb)
                    cb();
            });
        };
        MeshEntity.prototype.loadMeshByObject = function (obj) {
            this._buffers = new Resources.MeshBuffers(this.graphID);
            this._buffers.createBuffers(obj);
        };
        MeshEntity.prototype.loadMaterialByObject = function (obj) {
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
        };
        MeshEntity.prototype.setMaterialUniforms = function () {
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
        };
        MeshEntity.prototype.beginDraw = function () {
            var gl = this.gl;
            this.setMaterialUniforms();
            gl.bindBuffer(gl.ARRAY_BUFFER, this._buffers.vbo);
            Ketch.enableAttrib(this.graphID, "a_position");
            gl.bindBuffer(gl.ARRAY_BUFFER, this._buffers.nbo);
            Ketch.enableAttrib(this.graphID, "a_normal");
            var ivbo = this._buffers.ivbo;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ivbo);
            gl.drawElements(gl.TRIANGLES, ivbo.numItems, gl.UNSIGNED_SHORT, 0);
        };
        MeshEntity.prototype.endDraw = function () {
            var gl = this.gl;
            Ketch.disableAttrib(this.graphID, "a_position");
            Ketch.disableAttrib(this.graphID, "a_normal");
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        };
        return MeshEntity;
    }(Entity));
    Blaze.MeshEntity = MeshEntity;
    var TransformEntity = (function (_super) {
        __extends(TransformEntity, _super);
        function TransformEntity(graph_id, position, size, rotation) {
            _super.call(this, graph_id);
            this._matrix = mat4.create();
            this._position = position || vec3.create();
            this._size = size || vec3.create([1, 1, 1]);
            this._rotation = rotation || { angle: 0, axis: vec3.create() };
        }
        TransformEntity.prototype.identity = function () {
            mat4.identity(this._matrix);
        };
        TransformEntity.prototype.setMatrix = function (new_matrix) {
            this._matrix = new_matrix;
        };
        TransformEntity.prototype.transpose = function () {
            mat4.transpose(this._matrix, this._matrix);
        };
        Object.defineProperty(TransformEntity.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (position) {
                this._position = position;
            },
            enumerable: true,
            configurable: true
        });
        TransformEntity.prototype.setAbsolutePosition = function (x, y, z) {
            this._position = [x, y, z];
        };
        TransformEntity.prototype.translate = function (x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            var operand1 = this._position;
            var operand2 = vec3.create([x, y, z]);
            vec3.add(operand1, operand2, this._position);
        };
        Object.defineProperty(TransformEntity.prototype, "size", {
            get: function () {
                return this._size;
            },
            set: function (size) {
                this._size = size;
            },
            enumerable: true,
            configurable: true
        });
        TransformEntity.prototype.setSize = function (x, y, z) {
            this._size = [x, y, z];
        };
        TransformEntity.prototype.scale = function (x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            var operand1 = this._size;
            var operand2 = vec3.create([x, y, z]);
            vec3.add(operand1, operand2, this._size);
        };
        Object.defineProperty(TransformEntity.prototype, "rotation", {
            get: function () {
                return this._rotation;
            },
            set: function (rotation) {
                this._rotation = rotation;
            },
            enumerable: true,
            configurable: true
        });
        TransformEntity.prototype.setRotation = function (angle, axis) {
            if (angle)
                this._rotation.angle = angle;
            if (axis)
                this._rotation.axis = axis;
        };
        TransformEntity.prototype.setAngle = function (angle) {
            this._rotation.angle = angle;
        };
        TransformEntity.prototype.setAxis = function (axis) {
            this._rotation.axis = axis;
        };
        TransformEntity.prototype.rotateAngle = function (angle) {
            if (angle === void 0) { angle = 0; }
            this._rotation.angle += angle;
        };
        TransformEntity.prototype.moveAxis = function (x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            var operand1 = this._rotation.axis;
            var operand2 = vec3.create([x, y, z]);
            vec3.add(operand1, operand2, this._rotation.axis);
        };
        TransformEntity.prototype.beginDraw = function (matrixStack) {
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
        };
        TransformEntity.prototype.endDraw = function (matrixStack) {
            matrixStack.pop();
        };
        return TransformEntity;
    }(Entity));
    Blaze.TransformEntity = TransformEntity;
    var LightEntity = (function (_super) {
        __extends(LightEntity, _super);
        function LightEntity(graph_id, ambient, diffuse, position, specular, direction, cutoff) {
            _super.call(this, graph_id);
            this._ambient = ambient ? vec4.create(ambient) : null;
            this._diffuse = diffuse ? vec4.create(diffuse) : null;
            this._position = position ? vec3.create(position) : null;
            this._specular = specular ? vec4.create(specular) : null;
            this._direction = direction ? vec3.create(direction) : null;
            this._cutoff = cutoff || 0.0;
        }
        Object.defineProperty(LightEntity.prototype, "ambient", {
            get: function () {
                return this._ambient;
            },
            set: function (ambient) {
                this._ambient = utils.normalizeNaN(vec4.create(ambient));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LightEntity.prototype, "diffuse", {
            get: function () {
                return this._diffuse;
            },
            set: function (diffuse) {
                this._diffuse = utils.normalizeNaN(vec4.create(diffuse));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LightEntity.prototype, "specular", {
            get: function () {
                return this._specular;
            },
            set: function (specular) {
                this._specular = utils.normalizeNaN(vec4.create(specular));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LightEntity.prototype, "position", {
            get: function () {
                return this._diffuse;
            },
            set: function (position) {
                this._position = utils.normalizeNaN(vec3.create(position));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LightEntity.prototype, "direction", {
            get: function () {
                return this._direction;
            },
            set: function (direction) {
                this._direction = utils.normalizeNaN(vec3.create(direction));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LightEntity.prototype, "cutOff", {
            get: function () {
                return this._cutoff;
            },
            set: function (cutoff) {
                this._cutoff = cutoff;
            },
            enumerable: true,
            configurable: true
        });
        LightEntity.prototype.beginDraw = function () {
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
            if (this._cutoff) {
                var uCutOff = this.getUniform("uCutOff");
                if (uCutOff)
                    gl.uniform1f(uCutOff, this._cutoff);
            }
        };
        LightEntity.prototype.endDraw = function () {
        };
        return LightEntity;
    }(Entity));
    Blaze.LightEntity = LightEntity;
    var DiffuseEntity = (function (_super) {
        __extends(DiffuseEntity, _super);
        function DiffuseEntity(graph_id, v) {
            _super.call(this, graph_id);
            this._value = v;
        }
        Object.defineProperty(DiffuseEntity.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (v) {
                this._value = v;
            },
            enumerable: true,
            configurable: true
        });
        DiffuseEntity.prototype.beginDraw = function () {
            var gl = this.gl;
            var uMaterialDiffuse = this.getUniform("uMaterialDiffuse");
            if (uMaterialDiffuse)
                gl.uniform4fv(uMaterialDiffuse, this._value);
        };
        DiffuseEntity.prototype.endDraw = function () {
        };
        return DiffuseEntity;
    }(Entity));
    Blaze.DiffuseEntity = DiffuseEntity;
    var ParticleEntity = (function (_super) {
        __extends(ParticleEntity, _super);
        function ParticleEntity(graph_id, pointSize) {
            _super.call(this, graph_id);
            this._pointSize = pointSize || 1;
            this._buffer = null;
            this._texture_id = "";
        }
        ParticleEntity.prototype.configure = function (data_mesh, data_texture) {
            var gl = this.gl;
            this._buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data_mesh), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            this._numItems = data_mesh.length;
            this._texture_id = utils.uuid("Texture");
            this._texture = WebGLUtils.createTexture(gl, data_texture);
            Ketch.addTexture(this.graphID, this._texture_id);
        };
        ParticleEntity.prototype.update = function (data) {
            var gl = this.gl;
            gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            this._numItems = data.length;
        };
        Object.defineProperty(ParticleEntity.prototype, "textureID", {
            get: function () {
                return this._texture_id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParticleEntity.prototype, "pointSize", {
            set: function (v) {
                this._pointSize = v;
            },
            enumerable: true,
            configurable: true
        });
        ParticleEntity.prototype.beginDraw = function () {
            var gl = this.gl;
            var uPointSize = this.getUniform("uPointSize");
            if (uPointSize)
                gl.uniform1f(uPointSize, this._pointSize);
            gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
            Ketch.enableAttrib(this.graphID, "a_position");
            Ketch.activeTexture(this.graphID, this._texture_id, this._texture);
            gl.drawArrays(gl.POINTS, 0, this._numItems / 3);
        };
        ParticleEntity.prototype.endDraw = function () {
            var gl = this.gl;
            Ketch.disableAttrib(this.graphID, "a_position");
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
        };
        return ParticleEntity;
    }(Entity));
    Blaze.ParticleEntity = ParticleEntity;
    var LightArrayEntity = (function (_super) {
        __extends(LightArrayEntity, _super);
        function LightArrayEntity(graph_id) {
            _super.call(this, graph_id);
            this._lights = [];
        }
        LightArrayEntity.prototype.addLight = function (light) {
            this._lights.push(light);
        };
        LightArrayEntity.prototype.getArraysObject = function () {
            return this._lights.reduce(function (prev, item) {
                prev.ambient = prev.ambient.concat(item.ambient);
                prev.diffuse = prev.diffuse.concat(item.diffuse);
                prev.specular = prev.specular.concat(item.specular);
                prev.direction = prev.direction.concat(item.direction);
                prev.cutoff = prev.cutOff.concat(item.cutoff);
                return prev;
            }, {
                ambient: [],
                diffuse: [],
                specular: [],
                direction: [],
                cutoff: []
            });
        };
        LightArrayEntity.prototype.beginDraw = function () {
            var gl = this.gl;
            if (this._lights.length > 0) {
                var uNumLights = this.getUniform("uNumLights");
                if (uNumLights)
                    gl.uniform1(uNumLights, this._lights.length);
                var lights = this.getArraysObject();
                if (lights.ambient) {
                    var uLightAmbient = this.getUniform("uLightAmbient");
                    if (uLightAmbient)
                        gl.uniform4fv(uLightAmbient, lights.ambient);
                }
                if (lights.diffuse) {
                    var uLightDiffuse = this.getUniform("uLightDiffuse");
                    if (uLightDiffuse)
                        gl.uniform4fv(uLightDiffuse, lights.diffuse);
                }
                if (lights.specular) {
                    var uLightSpecular = this.getUniform("uLightSpecular");
                    if (uLightSpecular)
                        gl.uniform4fv(uLightSpecular, lights.specular);
                }
                if (lights.direction) {
                    var uDirection = this.getUniform("uLightDirection");
                    if (uDirection)
                        gl.uniform3fv(uDirection, lights.direction);
                }
                if (lights.cutoff) {
                    var uCutOff = this.getUniform("uCutOff");
                    if (uCutOff)
                        gl.uniform1f(uCutOff, lights.cutoff);
                }
            }
        };
        return LightArrayEntity;
    }(Entity));
    Blaze.LightArrayEntity = LightArrayEntity;
    var CameraEntity = (function (_super) {
        __extends(CameraEntity, _super);
        function CameraEntity(graph_id, type) {
            _super.call(this, graph_id);
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
        Object.defineProperty(CameraEntity.prototype, "type", {
            set: function (type) {
                this._type = type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CameraEntity.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (pos) {
                this._position = pos;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CameraEntity.prototype, "azimuth", {
            get: function () {
                return this._azimuth;
            },
            set: function (az) {
                var temp_az = az - this._azimuth;
                this.changeAzimuth(temp_az);
            },
            enumerable: true,
            configurable: true
        });
        CameraEntity.prototype.changeAzimuth = function (az) {
            this._azimuth += az;
            if (this._azimuth > 360 || this._azimuth < -360) {
                this._azimuth = this._azimuth % 360;
            }
        };
        Object.defineProperty(CameraEntity.prototype, "elevation", {
            get: function () {
                return this._elevation;
            },
            set: function (el) {
                var temp_el = el - this._elevation;
                this.changeElevation(temp_el);
            },
            enumerable: true,
            configurable: true
        });
        CameraEntity.prototype.changeElevation = function (el) {
            this._elevation += el;
            if (this._elevation > 360 || this._elevation < -360) {
                this._elevation = this._elevation % 360;
            }
        };
        Object.defineProperty(CameraEntity.prototype, "zoom", {
            get: function () {
                return this._steps;
            },
            set: function (offset) {
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
                }
                else {
                    new_position[0] = p[0];
                    new_position[1] = p[1];
                    new_position[2] = p[2] - step;
                }
                this.position = new_position;
                this._steps = offset;
            },
            enumerable: true,
            configurable: true
        });
        CameraEntity.prototype.calculateOrientation = function () {
            var m = this._cmatrix;
            mat4.multiplyVec4(m, [1, 0, 0, 0], this._right);
            mat4.multiplyVec4(m, [0, 1, 0, 0], this._up);
            mat4.multiplyVec4(m, [0, 0, 1, 0], this._normal);
        };
        CameraEntity.prototype.beginDraw = function () {
            mat4.identity(this._cmatrix);
            this.calculateOrientation();
            if (this._type === CAMERA_TYPE.TRACKING) {
                mat4.translate(this._cmatrix, this._position);
                mat4.rotateY(this._cmatrix, this._azimuth * Math.PI / 180);
                mat4.rotateX(this._cmatrix, this._elevation * Math.PI / 180);
            }
            else {
                mat4.rotateY(this._cmatrix, this._azimuth * Math.PI / 180);
                mat4.rotateX(this._cmatrix, this._elevation * Math.PI / 180);
                mat4.translate(this._cmatrix, this._position);
            }
            this.calculateOrientation();
            if (this._type === CAMERA_TYPE.TRACKING) {
                mat4.multiplyVec4(this._cmatrix, [0, 0, 0, 1], this._position);
            }
        };
        Object.defineProperty(CameraEntity.prototype, "modelView", {
            get: function () {
                var m = mat4.create();
                mat4.inverse(this._cmatrix, m);
                return m;
            },
            enumerable: true,
            configurable: true
        });
        CameraEntity.prototype.endDraw = function () {
        };
        return CameraEntity;
    }(Entity));
    Blaze.CameraEntity = CameraEntity;
    var AxisEntity = (function (_super) {
        __extends(AxisEntity, _super);
        function AxisEntity(graph_id, d) {
            _super.call(this, graph_id);
            d = d || 100;
            this._vertices = [0.0, 0.0, 0.0, d, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, d, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, d];
            this._indices = [0, 1, 2, 3, 4, 5];
            this._colors = [1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1];
        }
        AxisEntity.prototype.init = function () {
            var gl = this.gl;
            this._vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._vertices), gl.STATIC_DRAW);
            this._ibo = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this._indices), gl.STATIC_DRAW);
            this._cbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this._cbo);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._colors), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        };
        AxisEntity.prototype.beginDraw = function () {
            var gl = this.gl;
            var uWireframe = this.getUniform("uWireframe");
            if (uWireframe)
                gl.uniform1i(uWireframe, true);
            var uPerVertexColor = this.getUniform("uPerVertexColor");
            if (uPerVertexColor)
                gl.uniform1i(uPerVertexColor, true);
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
            Ketch.enableAttrib(this.graphID, "a_position");
            gl.bindBuffer(gl.ARRAY_BUFFER, this._cbo);
            Ketch.enableAttrib(this.graphID, "a_color", { size: 4 });
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo);
            gl.drawElements(gl.LINES, this._indices.length, gl.UNSIGNED_SHORT, 0);
        };
        AxisEntity.prototype.endDraw = function () {
            var gl = this.gl;
            var uWireframe = this.getUniform("uWireframe");
            if (uWireframe)
                gl.uniform1i(uWireframe, false);
            var uPerVertexColor = this.getUniform("uPerVertexColor");
            if (uPerVertexColor)
                gl.uniform1i(uPerVertexColor, false);
            Ketch.disableAttrib(this.graphID, "a_position");
            Ketch.disableAttrib(this.graphID, "a_color");
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        };
        return AxisEntity;
    }(Entity));
    Blaze.AxisEntity = AxisEntity;
    var GridEntity = (function (_super) {
        __extends(GridEntity, _super);
        function GridEntity(graph_id, d, e) {
            _super.call(this, graph_id);
            this._dimesions = {
                dim: d || 50, lines: e || 50
            };
        }
        GridEntity.prototype.init = function () {
            var gl = this.gl;
            this.build();
            this._vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._vertices), gl.STATIC_DRAW);
            this._ibo = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this._indices), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        };
        GridEntity.prototype.build = function () {
            var inc = 2 * this._dimesions.dim / this._dimesions.lines;
            var v = [];
            var i = [];
            for (var l = 0; l <= this._dimesions.lines; l++) {
                v[6 * l] = -this._dimesions.dim;
                v[6 * l + 1] = -0.5;
                v[6 * l + 2] = -this._dimesions.dim + (l * inc);
                v[6 * l + 3] = this._dimesions.dim;
                v[6 * l + 4] = -0.5;
                v[6 * l + 5] = -this._dimesions.dim + (l * inc);
                v[6 * (this._dimesions.lines + 1) + 6 * l] = -this._dimesions.dim + (l * inc);
                v[6 * (this._dimesions.lines + 1) + 6 * l + 1] = -0.5;
                v[6 * (this._dimesions.lines + 1) + 6 * l + 2] = -this._dimesions.dim;
                v[6 * (this._dimesions.lines + 1) + 6 * l + 3] = -this._dimesions.dim + (l * inc);
                v[6 * (this._dimesions.lines + 1) + 6 * l + 4] = -0.5;
                v[6 * (this._dimesions.lines + 1) + 6 * l + 5] = this._dimesions.dim;
                i[2 * l] = 2 * l;
                i[2 * l + 1] = 2 * l + 1;
                i[2 * (this._dimesions.lines + 1) + 2 * l] = 2 * (this._dimesions.lines + 1) + 2 * l;
                i[2 * (this._dimesions.lines + 1) + 2 * l + 1] = 2 * (this._dimesions.lines + 1) + 2 * l + 1;
            }
            this._vertices = v;
            this._indices = i;
        };
        GridEntity.prototype.beginDraw = function () {
            var gl = this.gl;
            var uWireframe = this.getUniform("uWireframe");
            if (uWireframe)
                gl.uniform1i(uWireframe, true);
            var uMaterialDiffuse = this.getUniform("uMaterialDiffuse");
            if (uMaterialDiffuse)
                gl.uniform4fv(uMaterialDiffuse, [0.7, 0.7, 0.7, 1]);
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
            Ketch.enableAttrib(this.graphID, "a_position");
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo);
            gl.drawElements(gl.LINES, this._indices.length, gl.UNSIGNED_SHORT, 0);
        };
        GridEntity.prototype.endDraw = function () {
            var gl = this.gl;
            var uWireframe = this.getUniform("uWireframe");
            if (uWireframe)
                gl.uniform1i(uWireframe, false);
            Ketch.disableAttrib(this.graphID, "a_position");
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        };
        return GridEntity;
    }(Entity));
    Blaze.GridEntity = GridEntity;
    var SelectEntity = (function (_super) {
        __extends(SelectEntity, _super);
        function SelectEntity(graph_id, data) {
            _super.call(this, graph_id);
            this._color = this.generateUniqueColor();
            this._data = data;
        }
        Object.defineProperty(SelectEntity.prototype, "data", {
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectEntity.prototype, "color", {
            get: function () {
                return this._color;
            },
            enumerable: true,
            configurable: true
        });
        SelectEntity.prototype.generateUniqueColor = function () {
            var color;
            var contains = (function (color) {
                return Ketch.getSelectByColor(this.graphID, color) != void 0;
            }).bind(this);
            var found = true;
            while (found) {
                color = [Number(Math.random().toFixed(2)), Number(Math.random().toFixed(2)), Number(Math.random().toFixed(2)), 1.0];
                found = contains(color);
            }
            return color;
        };
        SelectEntity.prototype.beginDraw = function () {
            if (Ketch.isOffScreen(this.graphID)) {
                var gl = this.gl;
                var uSelectColor = this.getUniform("uSelectColor");
                if (uSelectColor)
                    gl.uniform4fv(uSelectColor, this._color);
            }
        };
        SelectEntity.prototype.endDraw = function () {
        };
        return SelectEntity;
    }(Entity));
    Blaze.SelectEntity = SelectEntity;
    var Selector = (function (_super) {
        __extends(Selector, _super);
        function Selector(graph_id, dimensions) {
            _super.call(this, graph_id);
            this._dimensions = dimensions;
            this._framebuffer = null;
            this._renderbuffer = null;
            this._texture = null;
            this.configure();
        }
        Selector.prototype.configure = function () {
            var gl = this.gl;
            this._texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this._texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._dimensions.width, this._dimensions.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            this._renderbuffer = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, this._renderbuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this._dimensions.width, this._dimensions.height);
            this._framebuffer = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._texture, 0);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._renderbuffer);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        };
        Selector.prototype.fill = function (obj) {
            Ketch.fillSelectorBuffer(this.graphID, obj);
        };
        Selector.prototype.clear = function () {
            Ketch.clearSelectorBuffer(this.graphID);
        };
        Selector.prototype.find = function (pos) {
            var gl = this.gl;
            var readout = new Uint8Array(1 * 1 * 4);
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer);
            gl.readPixels(pos.x, pos.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, readout);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            var fixed = [].slice.call(readout).map(function (item) {
                return parseFloat((item / 255).toFixed(2));
            });
            var obj = Ketch.getSelectByColor(this.graphID, fixed);
            return obj ? obj.data : void 0;
        };
        Selector.prototype.render = function (draw) {
            var gl = this.gl;
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer);
            var uOffscreen = this.getUniform("uOffscreen");
            gl.uniform1i(uOffscreen, true);
            Ketch.enableOffScreen(this.graphID);
            draw();
            gl.uniform1i(uOffscreen, false);
            Ketch.disableOffScreen(this.graphID);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        };
        return Selector;
    }(Renderable));
    Blaze.Selector = Selector;
    ;
    var Effects = (function (_super) {
        __extends(Effects, _super);
        function Effects(graph_id, canvas, type) {
            _super.call(this, graph_id);
            this._texture = null;
            this._framebuffer = null;
            this._renderbuffer = null;
            this._vbo = null;
            this._tbo = null;
            this._shader = null;
            this._uniforms = null;
            this._attribs = null;
            this._noisetexture = null;
            this._start = Date.now();
            this._canvas = canvas;
            this._type = type || "no";
            this.configure();
            this.Geometry();
            this.setEffect();
        }
        Effects.prototype.configure = function () {
            var gl = this.gl;
            var width = this._canvas.width;
            var height = this._canvas.height;
            this._texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this._texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            this._renderbuffer = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, this._renderbuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
            this._framebuffer = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._texture, 0);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._renderbuffer);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        };
        Effects.prototype.Geometry = function () {
            var gl = this.gl;
            var vertices = [
                -1.0, -1.0,
                1.0, -1.0,
                -1.0, 1.0,
                -1.0, 1.0,
                1.0, -1.0,
                1.0, 1.0
            ];
            var textureCoords = [
                0.0, 0.0,
                1.0, 0.0,
                0.0, 1.0,
                0.0, 1.0,
                1.0, 0.0,
                1.0, 1.0
            ];
            this._vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            this._tbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this._tbo);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
        };
        Effects.prototype.setEffect = function (type) {
            this._type = type || this._type;
            var gl = this.gl;
            var source = {};
            source.vertex = Shaders.Vertex["Effect"];
            switch (this._type) {
                case "all":
                    source.fragment = Shaders.Fragment["All_effect"];
                    break;
                case "invert":
                    source.fragment = Shaders.Fragment["Invert_effect"];
                    break;
                case "grey":
                    source.fragment = Shaders.Fragment["Grey_effect"];
                    break;
                case "blur":
                    source.fragment = Shaders.Fragment["Blur_effect"];
                    break;
                case "film":
                    source.fragment = Shaders.Fragment["Film_effect"];
                    break;
                case "wavy":
                    source.fragment = Shaders.Fragment["Wavy_effect"];
                    break;
                case "no":
                default:
                    source.fragment = Shaders.Fragment["No_effect"];
            }
            if (this._shader) {
                gl.deleteProgram(this._shader);
            }
            this._shader = WebGLUtils.createProgram(gl, source);
            var count;
            this._attribs = {};
            count = gl.getProgramParameter(this._shader, gl.ACTIVE_ATTRIBUTES);
            for (var i = 0; i < count; i++) {
                var attrib = gl.getActiveAttrib(this._shader, i);
                this._attribs[attrib.name] = gl.getAttribLocation(this._shader, attrib.name);
            }
            this._uniforms = {};
            count = gl.getProgramParameter(this._shader, gl.ACTIVE_UNIFORMS);
            for (var i = 0; i < count; i++) {
                var uniform = gl.getActiveUniform(this._shader, i);
                this._uniforms[uniform.name] = gl.getUniformLocation(this._shader, uniform.name);
            }
        };
        Effects.prototype.Size = function () {
            var gl = this.gl;
            var width = this._canvas.width;
            var height = this._canvas.height;
            gl.bindTexture(gl.TEXTURE_2D, this._texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, this._renderbuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        };
        Effects.prototype.setNoiseTexture = function (data_texture) {
            var gl = this.gl;
            this._noisetexture = WebGLUtils.createTexture(gl, data_texture);
        };
        Effects.prototype.Bind = function () {
            var gl = this.gl;
            var width = this._canvas.width;
            var height = this._canvas.height;
            gl.useProgram(this._shader);
            gl.enableVertexAttribArray(this._attribs.a_position);
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
            gl.vertexAttribPointer(this._attribs.a_position, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(this._attribs.a_texture_coords);
            gl.bindBuffer(gl.ARRAY_BUFFER, this._tbo);
            gl.vertexAttribPointer(this._attribs.a_texture_coords, 2, gl.FLOAT, false, 0, 0);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this._texture);
            gl.uniform1i(this._uniforms.uSampler, 0);
            if (this._uniforms.uTime) {
                gl.uniform1f(this._uniforms.uTime, (Date.now() - this._start) / 1000.0);
            }
            if (this._uniforms.uInverseTextureSize) {
                gl.uniform2f(this._uniforms.uInverseTextureSize, 1.0 / width, 1.0 / height);
            }
            if (this._uniforms.uNoiseSampler && this._noisetexture) {
                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, this._noisetexture);
                gl.uniform1i(this._uniforms.uNoiseSampler, 1);
            }
        };
        Effects.prototype.bindFrameBuffer = function () {
            var gl = this.gl;
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer);
        };
        Effects.prototype.unbindFrameBuffer = function () {
            var gl = this.gl;
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        };
        Effects.prototype.draw = function () {
            var gl = this.gl;
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.disableVertexAttribArray(this._attribs.a_position);
            gl.disableVertexAttribArray(this._attribs.a_texture_coords);
        };
        return Effects;
    }(Renderable));
    Blaze.Effects = Effects;
    var NodeElement = (function () {
        function NodeElement(parent, type, entity) {
            this._parentNode = parent;
            if (this._parentNode)
                this._parentNode.addChildNode(this);
            this._childNodes = [];
            this._type = type;
            this._oid = utils.uuid(this._type || this.constructor.name);
            this._entity = entity;
        }
        Object.defineProperty(NodeElement.prototype, "oid", {
            get: function () {
                return this._oid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeElement.prototype, "parent", {
            get: function () {
                return this._parentNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeElement.prototype, "entity", {
            get: function () {
                return this._entity;
            },
            set: function (entity) {
                this._entity = entity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeElement.prototype, "childNodes", {
            get: function () {
                return this._childNodes;
            },
            enumerable: true,
            configurable: true
        });
        NodeElement.prototype.addChildNode = function (child) {
            this._childNodes.push(child);
        };
        NodeElement.prototype.removeChildNode = function (child) {
            var index = this.indexOf(child);
            if (index > -1)
                this._childNodes.splice(index, 1);
        };
        NodeElement.prototype.getChildNodeByIndex = function (index) {
            return this._childNodes[index] || void 0;
        };
        NodeElement.prototype.existsChildNode = function (index) {
            return this._childNodes[index] !== void 0;
        };
        NodeElement.prototype.delete = function () {
            this._parentNode.removeChildNode(this);
        };
        NodeElement.prototype.createChildNode = function (type, entity) {
            return new NodeElement(this, type, entity);
        };
        NodeElement.prototype.isRoot = function () {
            return this._parentNode === void 0;
        };
        NodeElement.prototype.indexOf = function (child) {
            var oid = child.oid;
            return _.findIndex(this._childNodes, function (s) { return s.oid === oid; });
        };
        NodeElement.prototype.indexInParent = function () {
            var index = -1;
            if (!this.isRoot())
                index = this._parentNode.indexOf(this);
            return index;
        };
        NodeElement.prototype.hasSibling = function (prev) {
            var _have = false;
            if (!this.isRoot()) {
                var index = this._parentNode.indexOf(this);
                if (index > -1) {
                    if (prev) {
                        if (this._parentNode.getChildNodeByIndex(index - 1))
                            _have = true;
                    }
                    else {
                        if (this._parentNode.getChildNodeByIndex(index + 1))
                            _have = true;
                    }
                }
            }
            return _have;
        };
        NodeElement.prototype.nextSibling = function () {
            var sibling = null;
            if (!this.isRoot() && this.hasSibling()) {
                var index = this._parentNode.indexOf(this);
                sibling = this._parentNode.getChildNodeByIndex(index + 1);
            }
            return sibling;
        };
        NodeElement.prototype.previousSibling = function () {
            var sibling = null;
            if (!this.isRoot() && this.hasSibling(true)) {
                var index = this._parentNode.indexOf(this);
                sibling = this._parentNode.getChildNodeByIndex(index - 1);
            }
            return sibling;
        };
        NodeElement.prototype.firstChild = function () {
            return this.getChildNodeByIndex(0);
        };
        NodeElement.prototype.lastChild = function () {
            return this.getChildNodeByIndex(this._childNodes.length - 1);
        };
        NodeElement.prototype.removeChildNodes = function () {
            this._childNodes = [];
        };
        NodeElement.prototype.draw = function (matrixStack) {
            if (this._entity)
                this._entity.beginDraw(matrixStack);
            for (var i = 0; i < this._childNodes.length; i++) {
                var child = this._childNodes[i];
                child.draw(matrixStack);
            }
            if (this._entity)
                this._entity.endDraw(matrixStack);
        };
        return NodeElement;
    }());
    Blaze.NodeElement = NodeElement;
    var SceneGraph = (function (_super) {
        __extends(SceneGraph, _super);
        function SceneGraph() {
            var oid = utils.uuid();
            _super.call(this, oid);
            this._oid = oid;
            this._scene = new NodeElement(void 0, "Scene");
            this._matrixStack = new MatrixStack(this._oid);
            this._loaderBuffer = [];
            Ketch.createView(this._oid);
            this._selector = null;
            this._effects = null;
        }
        Object.defineProperty(SceneGraph.prototype, "scene", {
            get: function () {
                return this._scene;
            },
            enumerable: true,
            configurable: true
        });
        SceneGraph.prototype.Environment = function (b) {
            var gl = this.gl;
            b = b || [];
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.clearColor(b[0] || 0, b[1] || 0, b[2] || 0, 1);
            gl.clearDepth(1.0);
        };
        SceneGraph.prototype.render = function () {
            if (this._effects) {
                this.drawWithEffects();
            }
            else {
                this.drawScene();
            }
        };
        SceneGraph.prototype.drawScene = function () {
            var gl = this.gl;
            this.useProgram();
            var draw = (function () {
                gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                this._scene.draw(this._matrixStack);
            }).bind(this);
            if (this._selector) {
                this._selector.render(draw);
            }
            draw();
        };
        SceneGraph.prototype.drawWithEffects = function () {
            this._effects.Size();
            this._effects.bindFrameBuffer();
            this.drawScene();
            this._effects.unbindFrameBuffer();
            this._effects.Bind();
            this._effects.draw();
        };
        SceneGraph.prototype.useProgram = function () {
            Ketch.useProgram(this.oid);
        };
        SceneGraph.prototype.createMainChildNode = function (type, entity) {
            return this._scene.createChildNode(type, entity);
        };
        SceneGraph.prototype.removeMainChildNode = function (node) {
            this._scene.removeChildNode(node);
        };
        Object.defineProperty(SceneGraph.prototype, "oid", {
            get: function () {
                return this._oid;
            },
            enumerable: true,
            configurable: true
        });
        SceneGraph.prototype.setContext = function (canvas) {
            Ketch.setCanvasToContext(this.oid, canvas);
        };
        SceneGraph.prototype.Program = function (type) {
            type = type || "Phong";
            Ketch.createProgram(this._oid, {
                fragment: Shaders.Fragment[type] || Shaders.Fragment["Phong"],
                vertex: Shaders.Vertex[type] || Shaders.Vertex["Phong"]
            });
        };
        SceneGraph.prototype.createMesh = function (config) {
            var meshEntity = new MeshEntity(this.oid);
            if (config.mesh) {
                meshEntity.loadMeshByObject(config.mesh);
            }
            if (config.material) {
                meshEntity.loadMaterialByObject(config.material);
            }
            return meshEntity;
        };
        SceneGraph.prototype.createDiffuse = function (v) {
            return new DiffuseEntity(this.oid, v);
        };
        SceneGraph.prototype.createMeshByLoader = function (config) {
            var mesh = new MeshEntity(this.oid, config.mesh, config.material, config.texture);
            this._loaderBuffer.push(mesh);
            return mesh;
        };
        SceneGraph.prototype.createTransform = function (position, size, rotation) {
            return new TransformEntity(this.oid, position, size, rotation);
        };
        SceneGraph.prototype.createLight = function (config) {
            return new LightEntity(this.oid, config.ambient, config.diffuse, config.position, config.specular, config.direction, config.cutoff);
        };
        SceneGraph.prototype.createCamera = function (type) {
            return new CameraEntity(this.oid, type);
        };
        SceneGraph.prototype.createParticle = function (pointSize) {
            return new ParticleEntity(this.oid, pointSize);
        };
        SceneGraph.prototype.createAxis = function (length) {
            return new AxisEntity(this.oid, length);
        };
        SceneGraph.prototype.createGrid = function (dim, lines) {
            return new GridEntity(this.oid, dim, lines);
        };
        SceneGraph.prototype.createSelect = function (data) {
            return new SelectEntity(this.oid, data);
        };
        SceneGraph.prototype.createSelector = function (dimensions) {
            this._selector = new Selector(this.oid, dimensions);
        };
        SceneGraph.prototype.fillSelector = function (obj) {
            if (this._selector) {
                this._selector.fill(obj);
            }
        };
        SceneGraph.prototype.clearSelector = function (obj) {
            if (this._selector) {
                this._selector.clear();
            }
        };
        SceneGraph.prototype.select = function (pos) {
            if (this._selector) {
                return this._selector.find(pos);
            }
        };
        SceneGraph.prototype.createEffects = function (canvas, type) {
            this._effects = new Effects(this.oid, canvas, type);
        };
        SceneGraph.prototype.setNoiseEffect = function (texture) {
            if (this._effects)
                this._effects.setNoiseTexture(texture);
        };
        SceneGraph.prototype.setEffect = function (type) {
            if (this._effects)
                this._effects.setEffect(type);
        };
        SceneGraph.prototype.createLightArray = function () {
            return new LightArrayEntity(this.oid);
        };
        Object.defineProperty(SceneGraph.prototype, "MainCamera", {
            set: function (camera) {
                this._matrixStack.MainCamera = camera;
            },
            enumerable: true,
            configurable: true
        });
        SceneGraph.prototype.removeTexture = function (id) {
            Ketch.removeTexture(this.oid, id);
        };
        SceneGraph.prototype.startLoader = function (cb) {
            async.eachSeries(this._loaderBuffer, function (item, next) {
                item.loadMesh(function () {
                    console.log(item);
                    next();
                });
            }, cb);
        };
        SceneGraph.prototype.configure = function (config) {
            var self = this;
            config = config || {};
            self.Environment(config.background);
            self.Program(config.typeShader);
            Ketch.setAttributeLocations(self._oid, SceneGraph.ATTRIBUTES);
            Ketch.setUniformLocations(self._oid, SceneGraph.UNIFORMS);
            this._matrixStack.init();
        };
        SceneGraph.prototype.configureWithLoader = function (cb) {
            var self = this;
            self.configure();
            self.startLoader(cb);
        };
        SceneGraph.UNIFORMS = [
            'uPMatrix',
            'uMVMatrix',
            'uNMatrix',
            "uLightPosition",
            'uLightDirection',
            "uCutOff",
            'uLightAmbient',
            'uMaterialAmbient',
            'uLightDiffuse',
            'uMaterialDiffuse',
            'uLightSpecular',
            'uMaterialSpecular',
            'uShininess',
            'uPointSize',
            "uSampler",
            "uWireframe",
            "uPerVertexColor",
            "uSelectColor",
            "uOffscreen",
            "uInverseTextureSize",
            "uNoiseSampler",
            "uTime",
            "uNumLights"
        ];
        SceneGraph.ATTRIBUTES = ['a_position', 'a_normal', "a_color", "a_texture_coords"];
        return SceneGraph;
    }(Renderable));
    Blaze.SceneGraph = SceneGraph;
})(Blaze || (Blaze = {}));
