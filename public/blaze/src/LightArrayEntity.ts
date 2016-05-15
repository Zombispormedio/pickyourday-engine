class LightArrayEntity extends Entity {
    private _lights: Array<LightEntity>;

    constructor(graph_id: string) {
        super(graph_id);
        this._lights = [];
    }

    addLight(light: LightEntity): void {
        this._lights.push(light);
    }

    getArraysObject(): any {
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
    }

    beginDraw() {
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
    }

}