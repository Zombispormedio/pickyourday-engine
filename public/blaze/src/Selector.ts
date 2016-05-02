class Selector extends Renderable {
    private _dimensions: { width: number, height: number };
    private _texture;
    private _framebuffer;
    private _renderbuffer;

    constructor(graph_id: string, dimensions: { width: number, height: number }) {
        super(graph_id);
        this._dimensions = dimensions;
        this._framebuffer = null;
        this._renderbuffer = null;
        this._texture = null;
        this.configure();
    }

    configure() {
        var gl = this.gl;
        
        this._texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._dimensions.width, this._dimensions.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

        this._renderbuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this._renderbuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this._dimensions.width, this._dimensions.height);

        this._framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._texture, 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._renderbuffer);

        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    }

    fill(obj: SelectEntity) {
        Ketch.fillSelectorBuffer(this.graphID, obj);
    }

    clear() {
        Ketch.clearSelectorBuffer(this.graphID);
    }

    find(pos: { x: number, y: number }) {
        var gl = this.gl;
        var readout = new Uint8Array(1 * 1 * 4);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer);
        gl.readPixels(pos.x, pos.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, readout);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
       
        var fixed=[].slice.call(readout).map(function(item){
           return parseFloat((item/255).toFixed(2));
        });
        
      
        
      
        return Ketch.getSelectByColor(this.graphID, fixed);

    }

    render(draw) {
        var gl = this.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer);

        var uOffscreen = this.getUniform("uOffscreen");
        gl.uniform1i(uOffscreen, true);

        Ketch.enableOffScreen(this.graphID);

        draw();

        gl.uniform1i(uOffscreen, false);

        Ketch.disableOffScreen(this.graphID);

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    }




};