module utils {
    export function getGLContext(canvas) {
        var ctx = null;
        var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];

        for (var i = 0; i < names.length; ++i) {
            try {
                ctx = canvas.getContext(names[i]);
            }
            catch (e) { }
            if (ctx) {
                break;
            }
        }
        if (ctx === null) {
            alert("Could not initialise WebGL");
            return null;
        }
        else {
            return ctx;
        }
    }
    export function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    export function uuid(name) {
        return name + s4() + s4();
    }
    export interface Rotation {
        angle: number;
        axis: Array<number>;
    }
    export function normalizeNaN(vec){
        return vec.map(a=>{if(Number.isNaN(a))a=0; return a;})
    }

}


