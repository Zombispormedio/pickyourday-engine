#ifdef GL_ES
precision mediump float;
#endif


uniform sampler2D uSampler;
uniform float uTime;

varying vec2 vTextureCoord;

const float speed = 15.0;
const float magnitude = 0.015;

void main(){
    
    vec2 wavyCoord;
    wavyCoord.s=vTextureCoord.s+(sin(uTime+vTextureCoord.t*speed)*magnitude);
    wavyCoord.t=vTextureCoord.t+(sin(uTime+vTextureCoord.s*speed)*magnitude);
    
    vec4 frameColor=texture2D(uSampler, wavyCoord);
    gl_FragColor=frameColor;


}