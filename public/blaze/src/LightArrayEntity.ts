class LightArrayEntity extends Entity {
    private _lights: Array<LightEntity>;

    constructor(graph_id: string) {
        super(graph_id);
        this._lights = [];
    }

    addLight(light: LightEntity): void {
        this._lights.push(light);
    }
    
     removeLights(): void {
        this._lights=[];
    }

    getArraysObject(): any {
        return this._lights.reduce(function (prev, item) {
            var ambient = Array.prototype.slice.call(item.ambient);
            var diffuse = Array.prototype.slice.call(item.diffuse);
            var specular = Array.prototype.slice.call(item.specular);
            var direction = Array.prototype.slice.call(item.direction);
            prev.ambient = prev.ambient.concat(ambient);
            prev.diffuse = prev.diffuse.concat(diffuse);
            prev.specular = prev.specular.concat(specular);
            prev.direction = prev.direction.concat(direction);
            prev.cutoff = prev.cutoff.concat(item.cutoff);
            return prev;
        }, {
                ambient: [],
                diffuse: [],
                specular: [],
                direction: [],
                cutoff: []
            });
    }

    beginDraw() {
        var gl = this.gl;

        if (this._lights.length > 0) {

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
    }

}