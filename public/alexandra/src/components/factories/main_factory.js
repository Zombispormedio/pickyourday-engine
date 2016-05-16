angular.module('alexandra')
    .factory('$alexandraMain', function ($alexandraForest, $interval, $alexandraStore, $alexandraModel) {

        return function (id, c) {

            var Tree = $alexandraForest.getTree(id);
            var config = c || {};

            var camera, light, mesh, particle, axis, node_buffer = [], textures = {}, canvas, labels = {}, light_array, light_node;

            return {
                setContext: function (c) {
                    canvas = c;
                    Tree.setContext(c);
                },

                getCanvas: function () {
                    return canvas;
                },

                configureCamera: function () {
                    camera = Tree.createCamera();
                    var camera_config = $alexandraStore.cameras.default;
                    camera.position = camera_config.position;
                    camera.azimuth = camera_config.azimuth;
                    camera.elevation = camera_config.elevation;
                    Tree.MainCamera = camera;
                    Tree.createMainChildNode("Camera", camera);

                },
                configureLights: function () {
                    var self = this;
                    var custom = config.light || {};
                    var _default = $alexandraStore.lights.default;
                    var values = Object.keys(_default).reduce(function (prev, key) {

                        prev[key] = custom[key] || _default[key];

                        return prev;

                    }, {});

                    light = Tree.createLight(values);

                    if (config.engine == "phong_lights") {

                        light_array = Tree.createLightArray();

                        light_array.addLight(light);
                       light_node= Tree.createMainChildNode("LightArray", light_array);
                        self.addLight();

                    } else {
                        light_node=Tree.createMainChildNode("Light", light);
                    }

                },

                addLight: function () {

                    if (config.lightSequence) {
                        config.lightSequence.forEach(function (item) {
                            var l = Tree.createLight(item);
                            light_array.addLight(l);
                        });
                    }

                },

                removeLights: function () {
                    if (light_array) {
                        light_array.removeLights();
                    }
                },
                
                resetLights:function(){
                   
                    Tree.removeMainChildNode(light_node);
                    
                },



                configureTransform: function (item) {
                    var tr = Tree.createTransform();

                    if (item.position) {
                        tr.position = item.position;
                    }

                    if (item.size) {
                        tr.size = item.size;
                    }

                    if (item.rotation) {
                        if (item.rotation.angle) {
                            tr.rotation.angle = item.rotation.angle;
                        }
                        if (item.rotation.axis) {
                            tr.rotation.axis = item.rotation.axis;
                        }
                    }
                    return tr;
                },

                configureMesh: function () {

                    var mesh_config = {};

                    var models = $alexandraStore.models;

                    var _mesh = models[config.type];
                    mesh_config.mesh = _mesh ? _mesh : models.sphere;

                    var materials = $alexandraStore.materials;
                    var _mat = materials[config.colortype];

                    mesh_config.material = _mat ? _mat : materials.default;

                    mesh = Tree.createMesh(mesh_config);

                },


                configureAndBuildCustomMesh: function (items) {
                    var self = this;

                    if (!items) return;
                 

                    function build(item) {

                        var mesh_config = {};
                        mesh_config.mesh = item.mesh;

                        var materials = $alexandraStore.materials;
                        var _mat = materials[config.colortype];

                        mesh_config.material = _mat ? _mat : materials.default;
                        var mesh = Tree.createMesh(mesh_config);

                        var tr = self.configureTransform(item);

                        var trnode = Tree.createMainChildNode("TrMesh", tr);

                        var parent_node;

                        switch (config.colortype) {
                            case "variable":
                                var diffuse = Tree.createDiffuse(item.color);
                                parent_node = trnode.createChildNode("Diffuse", diffuse);
                                break;
                            default:
                                parent_node = trnode;
                        }


                        parent_node.createChildNode("Mesh", mesh);
                        node_buffer.push(trnode);
                        
                       

                    }

                    if (_.isArray(items)) {
                        items.forEach(build);
                    } else {
                        build(items);
                    }
                },


                configureRenderer: function () {
                    var renderConfig = {
                        background: config.background
                    };
                    switch (config.type) {
                        case "particle":
                            renderConfig.typeShader = "Particle";
                            break;
                    }

                    switch (config.engine) {
                        case "particle":
                            renderConfig.typeShader = "Particle";
                            break;

                        case "toon":
                            renderConfig.typeShader = "Toon";
                            break;
                        case "phong_lights":
                            renderConfig.typeShader = "Phong_lights";
                            break;
                        case "phong":
                            renderConfig.typeShader = "Phong";
                            break;
                        case "phong_positional":
                            renderConfig.typeShader = "Phong_positional";
                            break;

                    }
                    
                
                    Tree.configure(renderConfig);

                },

                getCamera: function () {
                    return {
                        getPosition: function () {
                            return camera.position;
                        },
                        changeAzimuth: function (v) {
                            camera.changeAzimuth(v);
                        },
                        changeElevation: function (v) {
                            camera.changeElevation(v);
                        },
                        zoom: function (v) {
                            camera.zoom = v;
                        },
                        setPositionX: function (x) {
                            camera.position[0] += x;
                        },
                        setPositionY: function (y) {
                            camera.position[1] += y;
                        }
                    };
                },

                buildMeshBranch: function (source) {
                    var self = this;
                    source = source || [];
                    if (!_.isArray(source)) return;
                    node_buffer = source.map(function (item) {
                        var tr = self.configureTransform(item);
                        var trnode = Tree.createMainChildNode("TrMesh", tr);
                        var parent_node;

                        switch (config.colortype) {
                            case "variable":
                                var diffuse = Tree.createDiffuse(item.color);
                                parent_node = trnode.createChildNode("Diffuse", diffuse);
                                break;
                            default:
                                parent_node = trnode;
                        }

                        if (config.selector) {
                            var select = Tree.createSelect(item.data);
                            Tree.fillSelector(select);
                            parent_node = parent_node.createChildNode("Select", select);
                        }

                        parent_node.createChildNode("Mesh", mesh);
                        return trnode;

                    });

                },

                configureParticle: function () {
                    config.particle = config.particle || {};
                    particle = Tree.createParticle(config.particle.size || 5);
                },

                configureTextures: function () {

                    var canvas = document.createElement("canvas");
                    var ctx = canvas.getContext("2d");
                    var TextureValue = $alexandraStore.textures;

                    for (var key in TextureValue) {
                        var data = TextureValue[key];
                        var len = data.length;
                        var dimensions = Math.sqrt(len / 4);

                        var imgData = ctx.createImageData(dimensions, dimensions);

                        for (var i = 0; i < len; i += 4) {
                            imgData.data[i + 0] = data[i + 0];
                            imgData.data[i + 1] = data[i + 1];
                            imgData.data[i + 2] = data[i + 2];
                            imgData.data[i + 3] = data[i + 3];
                        }


                        textures[key] = imgData;



                    }

                },

                buildParticle: function (source) {
                    source = source || [];
                    var format_source = source.reduce(function (prev, item) {
                        var position = item.position;
                        for (var i = 0; i < position.length; i++) {
                            prev.push(position[i]);
                        }
                        return prev;
                    }, []);
                    var texture;

                    switch (config.particle.type) {
                        case "fire":
                            texture = textures.Fire;
                            break;
                        case "fog":
                            texture = textures.Fog;
                            break;
                        case "energy":
                            texture = textures.Energy;
                            break;
                        case "smoke":
                            texture = textures.Smoke;
                            break;
                        case "water":
                            texture = textures.Water;
                            break;
                        case "water2":
                            texture = textures.Water2;
                            break;
                        case "drop":
                            texture = textures.Drop;
                            break;
                        default:
                            texture = textures.Default;
                    }


                    particle.configure(format_source, texture);

                    var tr = Tree.createTransform();
                    var trnode = Tree.createMainChildNode("TrParticle", tr);
                    trnode.createChildNode("Particle", particle);
                    node_buffer.push(trnode);

                },
                setConfig: function (new_config) {
                    config = new_config;
                },
                resetParticle: function () {
                    Tree.removeTexture(particle.textureID);
                    particle = null;
                },
                resetMesh: function () {
                    mesh = null;
                },

                reset: function () {
                    if (config.selector) {
                        Tree.clearSelector();
                    }

                    node_buffer.forEach(function (item) {
                        Tree.removeMainChildNode(item);
                    });
                    node_buffer = [];
                },

                configureAxis: function () {
                    axis = Tree.createAxis(config.axisLength);
                    axis.init();

                    var tr = Tree.createTransform();
                    var trnode = Tree.createMainChildNode("TrAxis", tr);
                    trnode.createChildNode("Axis", axis);

                },
                configureGrid: function () {
                    config.gridConfig = config.gridConfig || {};
                    grid = Tree.createGrid(config.gridConfig.dim, config.gridConfig.lines);
                    grid.init();

                    var tr = Tree.createTransform();
                    var trnode = Tree.createMainChildNode("TrGrid", tr);
                    trnode.createChildNode("Grid", grid);

                },

                configureSelector: function () {
                    Tree.createSelector({ width: canvas.width, height: canvas.height })
                },


                createLabelNode: function (label) {
                    var self = this;
                    var mesh_config = {};
                    mesh_config.mesh = $alexandraModel.Text(label.text, {
                        size: label.wordSize || 8,
                        height: label.wordHeight || 0.1
                    });

                    var materials = $alexandraStore.materials;

                    mesh_config.material = materials.variable;

                    var mesh = Tree.createMesh(mesh_config);

                    var tr = self.configureTransform(label);

                    var trnode = Tree.createMainChildNode("TrMesh", tr);

                    var diffuse = Tree.createDiffuse(label.color || [1, 1, 1, 1]);
                    var label_node = trnode.createChildNode("Diffuse", diffuse);

                    label_node.createChildNode("Mesh", mesh);

                    return trnode;
                },

                configureLabelX: function () {
                    var self = this;
             
                    if (labels.x)
                        Tree.removeMainChildNode(labels.x);

                    if (config.LabelX) {
                        var label_x = {};
                        label_x.text = config.LabelX;
                        label_x.color = [1, 1, 0, 1];

                        var c_x = config.LabelXConfig || {};

                        label_x.position = [c_x.nearAxis || 50, c_x.offset || 0, 0];

                        if (c_x.wordSize) {
                            label_x.wordSize = c_x.wordSize;
                        }

                        if (c_x.wordHeight) {
                            label_x.wordHeight = c_x.wordHeight;
                        }

                        labels.x = self.createLabelNode(label_x);
                    }
                },

                configureLabelY: function () {
                    var self = this;
                    if (labels.y)
                        Tree.removeMainChildNode(labels.y);
                    if (config.LabelY) {
                        var label_y = {};
                        label_y.text = config.LabelY;
                        label_y.color = [0, 1, 0, 1];

                        var c_y = config.LabelYConfig || {};

                        label_y.position = [c_y.offset || 0, c_y.nearAxis || 50 * 3, 0];

                        label_y.rotation = {
                            angle: -90,
                            axis: [0, 0, 1]
                        };


                        if (c_y.wordSize) {
                            label_y.wordSize = c_y.wordSize;
                        }

                        if (c_y.wordHeight) {
                            label_y.wordHeight = c_y.wordHeight;
                        }

                        labels.y = self.createLabelNode(label_y);
                    }
                },
                configureLabelZ: function () {
                    var self = this;
                    if (labels.z)
                        Tree.removeMainChildNode(labels.z);
                    if (config.LabelZ) {
                        var label_z = {};
                        label_z.text = config.LabelZ;
                        label_z.color = [0, 0, 1, 1];

                        var c_z = config.LabelZConfig || {};

                        label_z.position = [0, c_z.offset || 0, c_z.nearAxis || 50 * 2];

                        label_z.rotation = {
                            angle: 90,
                            axis: [0, 1, 0]
                        };


                        if (c_z.wordSize) {
                            label_z.wordSize = c_z.wordSize;
                        }

                        if (c_z.wordHeight) {
                            label_z.wordHeight = c_z.wordHeight;
                        }

                        labels.z = self.createLabelNode(label_z);
                    }
                },

                configureLabelOrigin: function () {
                    var self = this;
                    if (labels.o)
                        Tree.removeMainChildNode(labels.o);
                    if (config.OriginLabel) {

                        var label_o = {};
                        label_o.text = "0";
                        label_o.color = [1, 1, 1, 1];

                        var c_o = config.OriginLabelConfig || {};

                        label_o.position = [0, c_o.offset || 0, 0];


                        label_o.wordSize = c_o.wordSize || 5;


                        if (c_o.wordHeight) {
                            label_o.wordHeight = c_o.wordHeight;
                        }

                        labels.o = self.createLabelNode(label_o);


                    }
                },

                configureValueAxisXLabel: function () {
                    var self = this;
                    if (labels.valuesX) {

                        labels.valuesX.forEach(function (item) {
                            Tree.removeMainChildNode(item);
                        });
                    }
                    if (config.ValueAxisXLabel) {
                        labels.valuesX = config.ValueAxisXLabel.map(function (item) {

                            var label_nx = {};

                            label_nx.text = item.label;

                            label_nx.color = [1, 1, 1, 1];

                            var c_nx = config.ValueAxisXLabelConfig || {};
                            label_nx.wordSize = c_nx.wordSize || 5;


                            label_nx.position = [item.value, c_nx.offset || 0, 0];

                            if (c_nx.wordHeight) {
                                label_nx.wordHeight = c_nx.wordHeight;
                            }


                            return self.createLabelNode(label_nx);

                        });
                    }
                },

                configureValueAxisZLabel: function () {
                    var self = this;
                    if (labels.valuesZ) {

                        labels.valuesZ.forEach(function (item) {
                            Tree.removeMainChildNode(item);
                        });
                    }
                    if (config.ValueAxisZLabel) {
                        labels.valuesZ = config.ValueAxisZLabel.map(function (item) {

                            var label_nz = {};

                            label_nz.text = item.label;

                            label_nz.color = [1, 1, 1, 1];

                            var c_nz = config.ValueAxisZLabelConfig || {};
                            label_nz.wordSize = c_nz.wordSize || 5;


                            label_nz.position = [0, c_nz.offset || 0, item.value * 2];

                            label_nz.rotation = {
                                angle: 90,
                                axis: [0, 1, 0]
                            };

                            if (c_nz.wordHeight) {
                                label_nz.wordHeight = c_nz.wordHeight;
                            }


                            return self.createLabelNode(label_nz);

                        });
                    }


                },

                configureValueAxisYLabel: function () {
                    var self = this;
                     if (labels.valuesY) {

                        labels.valuesY.forEach(function (item) {
                            Tree.removeMainChildNode(item);
                        });
                    }
                    if (config.ValueAxisYLabel) {
                        labels.valuesY = config.ValueAxisYLabel.map(function (item) {

                            var label_ny = {};

                            label_ny.text = item.label;

                            label_ny.color = [1, 1, 1, 1];

                            var c_ny = config.ValueAxisYLabelConfig || {};
                            label_ny.wordSize = c_ny.wordSize || 5;


                            label_ny.position = [c_ny.offset || 0, item.value * 2, 0];

                            label_ny.rotation = {
                                angle: -90,
                                axis: [0, 0, 1]
                            };

                            if (c_ny.wordHeight) {
                                label_ny.wordHeight = c_ny.wordHeight;
                            }


                            return self.createLabelNode(label_ny);

                        });
                    }
                },

                configureLabels: function () {
                    var self = this;
                    self.configureLabelX();
                    self.configureLabelY();
                    self.configureLabelZ();

                    self.configureLabelOrigin();
                    self.configureValueAxisXLabel();
                    self.configureValueAxisZLabel();
                    self.configureValueAxisYLabel();

                },


                configureEffects: function () {
                    Tree.createEffects(canvas, config.effect);
                    Tree.setNoiseEffect(textures.Noise);
                },

                setEffect: function () {
                    Tree.setEffect(config.effect);
                },
                
                setUseSelector:function(){
                    if(config.effect != void 0 && config.effect!=="no")config.effect="no";
                    Tree.useSelector=config.selector;
                },


                select: function (pos) {
                    return Tree.select(pos);
                },

                onSelected: function (data) {
                    if (config.onSelected)
                        config.onSelected(data);
                },


                run: function () {
                    $interval(function () {
                        Tree.render();

                    }, 30);
                }


            }
        }
    });