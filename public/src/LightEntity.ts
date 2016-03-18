class LightEntity extends Entity {
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

       /* if (this._ambient) {
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
        }*/

       /* if (this._direction) {
            var uDirection = this.getUniform("uLightDirection");
            if (uDirection)
                gl.uniform3fv(uDirection, this._direction);
        }*/

       /* if (this._cutoff) {
            var uCutOff = this.getUniform("uCutOff");
            if (uCutOff)
                gl.uniform1f(uCutOff, this._cutoff);
        }*/
    }

    endDraw() {

    }




}