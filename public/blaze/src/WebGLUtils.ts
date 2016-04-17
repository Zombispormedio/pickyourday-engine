module WebGLUtils {
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

            ctx.viewportWidth = canvas.width;
            ctx.viewportHeight = canvas.height;
            return ctx;
        }
    }
    export enum BUFFER_DRAW { STATIC, STREAM, DYNAMIC }

    export function createBuffer(gl, data, is2D?: boolean, type_draw?: WebGLUtils.BUFFER_DRAW) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        switch (type_draw) {
            case WebGLUtils.BUFFER_DRAW.STATIC:
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
                break;
            case WebGLUtils.BUFFER_DRAW.DYNAMIC:
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.DYNAMIC_DRAW);
                break;
            case WebGLUtils.BUFFER_DRAW.STREAM:
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STREAM_DRAW);
                break;
            default: gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        if (is2D) {
            buffer.itemSize = 2;
            buffer.numItems = data.length / 2;
        } else {
            buffer.itemSize = 3;
            buffer.numItems = data.length / 3;
        }



        return buffer;
    }

    export function createIndexBuffer(gl, data, type_draw?: WebGLUtils.BUFFER_DRAW) {

        var indexBuffer = gl.createBuffer(gl.ELEMENT_ARRAY_BUFFER);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        switch (type_draw) {
            case WebGLUtils.BUFFER_DRAW.STATIC:
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
                break;
            case WebGLUtils.BUFFER_DRAW.DYNAMIC:
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.DYNAMIC_DRAW);
                break;
            case WebGLUtils.BUFFER_DRAW.STREAM:
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STREAM_DRAW);
                break;
            default: gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
        }
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        indexBuffer.itemSize = 1;
        indexBuffer.numItems = data.length;

        return indexBuffer;

    }
    export function createTexture(gl, data) {
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.bindTexture(gl.TEXTURE_2D, null);
        return texture;
    }
    export function createShader(gl, type, shaderSource) {
        var shader = gl.createShader(type);

        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }
    export function createProgram(gl, shaders) {
        var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, shaders.fragment);
        var vertexShader = createShader(gl, gl.VERTEX_SHADER, shaders.vertex);

        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS))
              console.log(gl.getProgramInfoLog(program));

        gl.useProgram(program);

        return program;

    }

    export interface AttribPointer {
        size: number,
        normalized: boolean,
        stride: number,
        offset: number
    }


}