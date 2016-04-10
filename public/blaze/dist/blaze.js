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
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            gl.generateMipmap(gl.TEXTURE_2D);
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
        function createProgram(gl, shaders) {
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
            setInterval(cb, 500);
        };
        Ketch.addTexture = function (key, texture_id) {
            var view = Ketch._views[key];
            view.textures = view.textures || [];
            view.textures.push(texture_id);
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
                this._diffuse = diffuse ? vec4.create(diffuse) : vec4.create();
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
            Fragment.Main = "#ifdef GL_ES\nprecision mediump float;\n#endif\nuniform float uShininess;\nuniform vec3 uLightDirection;\n\nuniform vec4 uLightAmbient;\nuniform vec4 uLightDiffuse;\nuniform vec4 uLightSpecular;\n\nuniform vec4 uMaterialAmbient;\nuniform vec4 uMaterialDiffuse;\nuniform vec4 uMaterialSpecular;\n\n\nuniform bool uWireframe;\nuniform vec4 uWireframeColor;\n\nvarying vec3 vNormal;\nvarying vec3 vEyeVec;\n\nvoid main(){\n\nif(uWireframe){\n          gl_FragColor =uWireframeColor;\n        \n        }else{\n        vec3 L= normalize(uLightDirection);\n        vec3 N= normalize(vNormal);\n        float lambertTerm=dot(N, -L);\n        \n        vec4 Ia= uLightAmbient*uMaterialAmbient;\n        \n        vec4 Id=vec4(0.0,0.0,0.0,1.0);\n        \n        vec4 Is=vec4(0.0,0.0,0.0,1.0);\n        \n        if(lambertTerm>0.0)\n        {\n            Id=uLightDiffuse*uMaterialDiffuse*lambertTerm;\n            \n            vec3 E= normalize(vEyeVec);\n            vec3 R= reflect(L, N);\n            float specular=pow(max(dot(R,E),0.0), uShininess);\n            Is=uLightSpecular*uMaterialSpecular*specular;\n        }\n        \n        vec4 finalColor=Ia+Id+Is;\n        finalColor.a=1.0;\n    \n        gl_FragColor =finalColor;\n        }\n    }\n\n\n";
            return Fragment;
        }());
        Shaders.Fragment = Fragment;
        var Vertex = (function () {
            function Vertex() {
            }
            Vertex.Main = "attribute vec3 a_position;\nattribute vec3 a_normal;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nuniform mat4 uNMatrix;\n\nuniform bool uWireframe;\n\nvarying vec3 vNormal;\nvarying vec3 vEyeVec;\n\nvoid main(){\n\n    vec4 vertex = uMVMatrix * vec4(a_position, 1.0);\n      if (!uWireframe) {\n   vNormal = vec3(uNMatrix * vec4(a_normal, 1.0));\n   vEyeVec=-vec3(vertex.xyz);   \n   }\n  gl_Position =uPMatrix * vertex;\n\n}\n\n\n";
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
        MeshEntity.prototype.setWireFrame = function (is_wireframe, color) {
            this._wireframe = is_wireframe;
            if (this._wireframe) {
                this._wireframeColor = color;
            }
        };
        MeshEntity.prototype.WireFrame = function () {
            var gl = this.gl;
            var uWireframe = this.getUniform("uWireframe");
            if (uWireframe)
                gl.uniform1i(uWireframe, this._wireframe);
            if (this._wireframe) {
                var uWireframeColor = this.getUniform("uWireframeColor");
                if (uWireframeColor)
                    gl.uniform4fv(uWireframeColor, this._wireframeColor);
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
            this.WireFrame();
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
            this._position = position ? vec4.create(position) : null;
            this._specular = specular ? vec4.create(specular) : null;
            this._direction = direction ? vec3.create(direction) : null;
            this._cutoff = cutoff;
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
            /* if (this._cutoff) {
                 var uCutOff = this.getUniform("uCutOff");
                 if (uCutOff)
                     gl.uniform1f(uCutOff, this._cutoff);
             }*/
        };
        LightEntity.prototype.endDraw = function () {
        };
        return LightEntity;
    }(Entity));
    Blaze.LightEntity = LightEntity;
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
                mat4.multiplyVec4(m, [0, 0, 0, 1], this._position);
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
            this._isDrawing = false;
            Ketch.createView(this._oid);
        }
        Object.defineProperty(SceneGraph.prototype, "scene", {
            get: function () {
                return this._scene;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneGraph.prototype, "isDrawing", {
            get: function () {
                return this._isDrawing;
            },
            enumerable: true,
            configurable: true
        });
        SceneGraph.prototype.Environment = function () {
            var gl = this.gl;
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.clearColor(0, 0, 0, 1);
            gl.clearDepth(1.0);
        };
        SceneGraph.prototype.draw = function () {
            var gl = this.gl;
            this._isDrawing = true;
            gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            this._scene.draw(this._matrixStack);
            this._isDrawing = false;
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
        SceneGraph.prototype.Program = function () {
            Ketch.createProgram(this._oid, {
                fragment: Shaders.Fragment.Main,
                vertex: Shaders.Vertex.Main
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
            if (config.wireframe) {
                var wireframe = config.wireframe;
                meshEntity.setWireFrame(wireframe.is, wireframe.color);
            }
            return meshEntity;
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
        Object.defineProperty(SceneGraph.prototype, "MainCamera", {
            set: function (camera) {
                this._matrixStack.MainCamera = camera;
            },
            enumerable: true,
            configurable: true
        });
        SceneGraph.prototype.startLoader = function (cb) {
            async.eachSeries(this._loaderBuffer, function (item, next) {
                item.loadMesh(function () {
                    console.log(item);
                    next();
                });
            }, cb);
        };
        SceneGraph.prototype.configure = function () {
            var self = this;
            self.Environment();
            self.Program();
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
            'uLightDirection',
            'uLightAmbient',
            'uMaterialAmbient',
            'uLightDiffuse',
            'uMaterialDiffuse',
            'uLightSpecular',
            'uMaterialSpecular',
            'uShininess',
            'uWireframe',
            'uWireframeColor'
        ];
        SceneGraph.ATTRIBUTES = ['a_position', 'a_normal'];
        return SceneGraph;
    }(Renderable));
    Blaze.SceneGraph = SceneGraph;
})(Blaze || (Blaze = {}));
