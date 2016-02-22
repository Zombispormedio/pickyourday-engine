class LightEntity extends Entity {
    private _ambient: Array<number>;
    private _diffuse: Array<number>;
    private _specular: Array<number>;
    private _position: Array<number>;
    constructor(ambient?: Array<number>, diffuse?: Array<number>, position?: Array<number>, specular?:Array<number>) {
        super();
        this._ambient = ambient ? vec4.create(ambient) : vec4.create();
        this._diffuse = diffuse ? vec4.create(diffuse) : vec4.create();
        this._position = position ? vec4.create(position) : vec4.create();
        this._specular = specular ? vec4.create(specular) : vec4.create();
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
    
    beginDraw(matrixStack: MatrixStack){
        
    }
    
    endDraw(matrixStack: MatrixStack){
        
    }
    
   


}