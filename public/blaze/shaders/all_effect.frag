#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D uSampler;
uniform float uTime;
uniform sampler2D uNoiseSampler;
uniform vec2 uInverseTextureSize;

varying vec2 vTextureCoord;

const float speed = 15.0;
const float magnitude = 0.015;

const float grainIntensity = 0.1;
const float scrollSpeed = 4000.0;

vec4 offsetLookup(float xOff, float yOff) {
    return texture2D(uSampler, vec2(vTextureCoord.x + xOff*uInverseTextureSize.x, vTextureCoord.y + yOff*uInverseTextureSize.y));
}

void main(){

     vec4 frameColor = offsetLookup(-4.0, 0.0) * 0.05;
    frameColor += offsetLookup(-3.0, 0.0) * 0.09;
    frameColor += offsetLookup(-2.0, 0.0) * 0.12;
    frameColor += offsetLookup(-1.0, 0.0) * 0.15;
    frameColor += offsetLookup(0.0, 0.0) * 0.16;
    frameColor += offsetLookup(1.0, 0.0) * 0.15;
    frameColor += offsetLookup(2.0, 0.0) * 0.12;
    frameColor += offsetLookup(3.0, 0.0) * 0.09;
    frameColor += offsetLookup(4.0, 0.0) * 0.05;
    
    vec4 grain=texture2D(uNoiseSampler, vTextureCoord*2.0+uTime*scrollSpeed*uInverseTextureSize);
     
      frameColor +=texture2D(uSampler, vTextureCoord)-(grain*grainIntensity);
          vec2 wavyCoord;
    wavyCoord.s=vTextureCoord.s+(sin(uTime+vTextureCoord.t*speed)*magnitude);
    wavyCoord.t=vTextureCoord.t+(sin(uTime+vTextureCoord.s*speed)*magnitude);
    
    frameColor+=texture2D(uSampler, wavyCoord);
    gl_FragColor=frameColor;
}