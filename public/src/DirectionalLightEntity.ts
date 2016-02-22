class DirectionalLightEntity extends LightEntity {
    private _direction: Array<number>;
    private _cutoff: number;
    constructor(ambient?: Array<number>, diffuse?: Array<number>, position?: Array<number>, direction?: Array<number>, cutoff?: number) {
        super(ambient, diffuse, position);
        this._direction = direction ? vec3.create(direction) : vec3.create();
        this._cutoff = cutoff || 0.5;

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

    beginDraw(matrixStack: MatrixStack) {

    }

    endDraw(matrixStack: MatrixStack) {

    }




}