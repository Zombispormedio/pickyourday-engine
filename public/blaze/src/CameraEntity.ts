class CameraEntity extends Entity {
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