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

    private _options: { focus: Array<number>, azimuth: number, elevation: number, home: Array<number> };


    constructor(graph_id: string, options?, type?: CAMERA_TYPE) {
        super(graph_id);
        this._type = type || CAMERA_TYPE.ORBITING;
        this._cmatrix = mat4.create();
        this._up = vec3.create();
        this._right = vec3.create();
        this._normal = vec3.create();
        this._position = vec3.create();
        this._focus = vec3.create();
        this._home = vec3.create();
        this._azimuth = 0.0;
        this._elevation = 0.0;
        this._steps = 0;
        this._options = options;


    }


    public set type(type: CAMERA_TYPE) {
        this._type = type;
    }


    public set home(home: Array<number>) {
        if (home != void 0) {
            this._home = home;
        }
        this.setPosition(this._home);
        this.azimuth = 0;
        this.elevation = 0;
        this._steps = 0;
    }



    public setPosition(p: Array<number>) {
        vec3.set(p, this._position);

        this.updateMatrix();

    }

    public changeAzimuth(az: number) {
        this._azimuth += az;
        if (this._azimuth > 360 || this._azimuth < -360) {
            this._azimuth %= 360;
        }
        this.updateMatrix();
    }

    public set azimuth(azimuth: number) {
        this.changeAzimuth(azimuth - this._azimuth);

    }


    public set focus(f: Array<number>) {
        vec3.set(f, this._focus);
        this.updateMatrix();
    }


    public changeElevation(el) {
        this._elevation += el;

        if (this._elevation > 360 || this._elevation < -360) {
            this._elevation %= 360;
        }
        this.updateMatrix();
    }

    public set elevation(e: number) {
        this.changeElevation(e - this._elevation);
    }







    public zoom(offset: number) {

        var p = this._position;
        var n = vec3.create();

        var step = offset - this._steps;

        vec3.normalize(this._normal, n);


        var new_position = vec3.create();

        if (this._type === CAMERA_TYPE.TRACKING) {
            new_position.forEach((x, index) => {
                x = p[index] - step * n[index];
            });
        } else {
            new_position.forEach((x, index) => {
                if (index < 2) x = p[index];
                else x = p[index] - step;
            });
        }

        this.setPosition(new_position);
        this._steps = offset;



    }
    applyOrientationMatrix() {
        var m = this._cmatrix;
        mat4.multiplyVec4(m, [1, 0, 0, 0], this._right);
        mat4.multiplyVec4(m, [0, 1, 0, 0], this._up);
        mat4.multiplyVec4(m, [0, 0, 1, 0], this._normal);
    }

    updateMatrix() {
        mat4.identity(this._cmatrix);
       

        if (this._type === CAMERA_TYPE.TRACKING) {
            mat4.translate(this._cmatrix, this._position);
            mat4.rotateY(this._cmatrix, this._azimuth * Math.PI / 180);
            mat4.rotateX(this._cmatrix, this._elevation * Math.PI / 180);
        } else {
            mat4.rotateY(this._cmatrix, this._azimuth * Math.PI / 180);
            mat4.rotateX(this._cmatrix, this._elevation * Math.PI / 180);
            mat4.translate(this._cmatrix, this._position);
        }
        

        this.applyOrientationMatrix();

        if (this._type === CAMERA_TYPE.TRACKING) {
            mat4.multiplyVec4(this._cmatrix, [0, 0, 0, 1], this._position);
        }
    }
    
    
    


    public get modelView(): Array<number> {
        var m = mat4.create();
        mat4.inverse(this._cmatrix, m);
        return m;
    }

    beginDraw() {
        this.home = this._options.home;
        this.focus = this._options.focus;
        this.azimuth = this._options.azimuth;
        this.elevation = this._options.elevation;
    }

    endDraw() {

    }





}