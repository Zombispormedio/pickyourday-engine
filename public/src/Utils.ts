module utils {
    export function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    export function uuid(name) {
        return name + s4() + s4();
    }

    export function normalizeNaN(vec) {
        return vec.map(a=> { if (Number.isNaN(a)) a = 0; return a; })
    }

    export function load(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.addEventListener('load', function() {
            callback(request.responseText);
        });
        request.send();
    }
    
    export function getExtension(str:string){
        var elems=str.split(".");
        return elems[elems.length-1];
    }
    
    export function nowInMilliseconds(){
        return  (new Date()).getTime();
    }



}


