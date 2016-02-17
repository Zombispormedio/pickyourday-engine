var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BlazeEngine;
(function (BlazeEngine) {
    var Entity = (function () {
        function Entity() {
        }
        Entity.prototype.beginDraw = function (matrixStack) {
        };
        Entity.prototype.endDraw = function (matrixStack) {
        };
        return Entity;
    })();
    BlazeEngine.Entity = Entity;
    var MatrixStack = (function () {
        function MatrixStack() {
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
        MatrixStack.prototype.makeMV = function () {
            mat4.identity(this._mvMatrix);
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
        return MatrixStack;
    })();
    BlazeEngine.MatrixStack = MatrixStack;
    var AnimationEntity = (function (_super) {
        __extends(AnimationEntity, _super);
        function AnimationEntity() {
            _super.apply(this, arguments);
        }
        return AnimationEntity;
    })(Entity);
    BlazeEngine.AnimationEntity = AnimationEntity;
    var MeshEntity = (function (_super) {
        __extends(MeshEntity, _super);
        function MeshEntity() {
            _super.apply(this, arguments);
        }
        return MeshEntity;
    })(Entity);
    BlazeEngine.MeshEntity = MeshEntity;
    var TextureEntity = (function (_super) {
        __extends(TextureEntity, _super);
        function TextureEntity() {
            _super.apply(this, arguments);
        }
        return TextureEntity;
    })(Entity);
    BlazeEngine.TextureEntity = TextureEntity;
    var TransformEntity = (function (_super) {
        __extends(TransformEntity, _super);
        function TransformEntity() {
            _super.call(this);
            this._matrix = mat4.create();
            this._position = vec3.create();
            this._size = vec3.create([1, 1, 1]);
            this._rotation = { angle: 0, axis: vec3.create() };
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
            matrixStack.makeMV();
            this._matrix = matrixStack.mvMatrix;
            mat4.translate(this._matrix, this._position);
            mat4.scale(this._matrix, this._size);
            var rad = this._rotation.angle * Math.PI / 180;
            mat4.rotate(this._matrix, rad, this._rotation.axis);
        };
        TransformEntity.prototype.endDraw = function (matrixStack) {
            matrixStack.pop();
        };
        return TransformEntity;
    })(Entity);
    BlazeEngine.TransformEntity = TransformEntity;
    var LightEntity = (function (_super) {
        __extends(LightEntity, _super);
        function LightEntity(ambient, diffuse, position) {
            _super.call(this);
            this._ambient = ambient ? vec4.create(ambient) : vec4.create();
            this._diffuse = diffuse ? vec4.create(diffuse) : vec4.create();
            this._position = position ? vec4.create(position) : vec4.create();
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
        return LightEntity;
    })(Entity);
    BlazeEngine.LightEntity = LightEntity;
    var DirectionalLightEntity = (function (_super) {
        __extends(DirectionalLightEntity, _super);
        function DirectionalLightEntity() {
            _super.apply(this, arguments);
        }
        return DirectionalLightEntity;
    })(LightEntity);
    BlazeEngine.DirectionalLightEntity = DirectionalLightEntity;
    var PositionalLightEntity = (function (_super) {
        __extends(PositionalLightEntity, _super);
        function PositionalLightEntity() {
            _super.apply(this, arguments);
        }
        return PositionalLightEntity;
    })(LightEntity);
    BlazeEngine.PositionalLightEntity = PositionalLightEntity;
    var CameraEntity = (function (_super) {
        __extends(CameraEntity, _super);
        function CameraEntity() {
            _super.apply(this, arguments);
        }
        return CameraEntity;
    })(Entity);
    BlazeEngine.CameraEntity = CameraEntity;
    var OrbitCameraEntity = (function (_super) {
        __extends(OrbitCameraEntity, _super);
        function OrbitCameraEntity() {
            _super.apply(this, arguments);
        }
        return OrbitCameraEntity;
    })(CameraEntity);
    BlazeEngine.OrbitCameraEntity = OrbitCameraEntity;
    var TrackingCameraEntity = (function (_super) {
        __extends(TrackingCameraEntity, _super);
        function TrackingCameraEntity() {
            _super.apply(this, arguments);
        }
        return TrackingCameraEntity;
    })(CameraEntity);
    BlazeEngine.TrackingCameraEntity = TrackingCameraEntity;
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
            if (this.indexOf(child) > -1)
                ;
            this._childNodes.push(child);
        };
        NodeElement.prototype.removeChildNode = function (child) {
            var index = this.indexOf(child);
            if (index > -1)
                ;
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
            console.log("Drawing: " + this._oid);
            if (this._entity)
                this._entity.beginDraw(matrixStack);
            this._childNodes.forEach(function (child) {
                child.draw(matrixStack);
            });
            if (this._entity)
                this._entity.endDraw(matrixStack);
        };
        return NodeElement;
    })();
    BlazeEngine.NodeElement = NodeElement;
    var SceneGraph = (function () {
        function SceneGraph() {
            this._scene = new NodeElement(void 0, "Scene");
            this._matrixStack = new MatrixStack();
            this._isDrawing = false;
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
        SceneGraph.prototype.draw = function () {
            this._isDrawing = true;
            this._scene.draw(this._matrixStack);
            this._isDrawing = false;
        };
        SceneGraph.prototype.createMainChildNode = function (type, entity) {
            return this._scene.createChildNode(type, entity);
        };
        SceneGraph.prototype.buildDefaultGraph = function () {
            var TrLightNode = this.createMainChildNode("TRLight", new TransformEntity());
            var TrCameraNode = this.createMainChildNode("TRCamera", new TransformEntity());
            var TrMeshNode = this.createMainChildNode("TRMesh", new TransformEntity());
            var LightNode = TrLightNode.createChildNode("Light", new LightEntity());
            var CameraNode = TrCameraNode.createChildNode("Camera", new CameraEntity());
            var MeshNode1 = TrMeshNode.createChildNode("Mesh", new MeshEntity());
            var TextureNode = TrMeshNode.createChildNode("Texture", new TextureEntity());
            var MeshNode2 = TextureNode.createChildNode("Mesh", new MeshEntity());
        };
        return SceneGraph;
    })();
    BlazeEngine.SceneGraph = SceneGraph;
    var utils;
    (function (utils) {
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
                return ctx;
            }
        }
        utils.getGLContext = getGLContext;
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        utils.s4 = s4;
        function uuid(name) {
            return name + s4() + s4();
        }
        utils.uuid = uuid;
        function normalizeNaN(vec) {
            return vec.map(function (a) { if (Number.isNaN(a))
                a = 0; return a; });
        }
        utils.normalizeNaN = normalizeNaN;
    })(utils = BlazeEngine.utils || (BlazeEngine.utils = {}));
})(BlazeEngine || (BlazeEngine = {}));

