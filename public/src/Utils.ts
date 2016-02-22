module utils {
    export function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    export function uuid(name) {
        return name + s4() + s4();
    }
    
    export function normalizeNaN(vec){
        return vec.map(a=>{if(Number.isNaN(a))a=0; return a;})
    }

}


