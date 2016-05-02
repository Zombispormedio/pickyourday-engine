class SelectEntity extends Entity {
    private _color: Array<number>;
    private _data: any;

    constructor(graph_id: string, data: any) {
        super(graph_id);
        this._color = this.generateUniqueColor();

        this._data = data;
    }


    public get data(): any {
        return this._data;
    }


    public get color(): Array<number> {
        return this._color;
    }


    private generateUniqueColor(): Array<number> {
        var color: Array<number>;

        var contains = (function (color): boolean {
            return Ketch.getSelectByColor(this.graphID, color)!=void 0;
        }).bind(this);
        var found: boolean = true;
        while (found) {
            color = [Number(Math.random().toFixed(2)), Number(Math.random().toFixed(2)), Number(Math.random().toFixed(2)), 1.0];

            found = contains(color);
        }

        return color;
    }

    beginDraw() {
     
        if (Ketch.isOffScreen(this.graphID)) {
            var gl = this.gl;
           

            var uSelectColor = this.getUniform("uSelectColor");
            if (uSelectColor)
                gl.uniform4fv(uSelectColor, this._color);

        }

    }

    endDraw() {

    }


}