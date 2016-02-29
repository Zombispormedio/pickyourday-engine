class Ketch {
    private static _views=[];
    static setCanvasToContext(key, canvas){
        var context=WebGLUtils.getGLContext(canvas);
        Ketch.setContext(key, context);
    }
    
    static setContext(key, context){
        Ketch._views[key]=context;
    }
    
    static getContext(key){
        return Ketch._views[key];
    }
}