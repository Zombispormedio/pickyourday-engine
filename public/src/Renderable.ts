class Renderable {
    private _graph_id: string;
    constructor(graph_id: string) {
        this._graph_id = graph_id;
    }


    public get graphID(): string {
        return this._graph_id;
    }


    public get gl() {
        return Ketch.getContext(this.graphID);
    }
    
    public get program() {
        return Ketch.getProgram(this.graphID);
    }
    
 
}