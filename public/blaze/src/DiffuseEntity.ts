class DiffuseEntity extends Entity {
    private _value: Array<number>;

    constructor(graph_id: string, v?: Array<number>) {
        super(graph_id);
        this._value=v;
        
    }

    public set value(v: Array<number>) {
        this._value = v;
    }
    
    
    public get value() : Array<number> {
        return this._value;
    }
    


    beginDraw() {
        var gl=this.gl;
  
        var uMaterialDiffuse = this.getUniform("uMaterialDiffuse");
        if (uMaterialDiffuse)
            gl.uniform4fv(uMaterialDiffuse, this._value);
    }

    endDraw() {

    }
}