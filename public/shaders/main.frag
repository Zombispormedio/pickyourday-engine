#ifdef GL_ES
precision mediump float;
#endif



varying vec3 vNormal;
varying vec3 vEyeVec;

void main(){
 
     
        gl_FragColor = vec4(vNormal*vEyeVec,1);
    }


