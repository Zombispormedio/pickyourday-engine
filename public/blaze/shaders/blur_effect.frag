#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D uSampler;
uniform vec2 uInverseTextureSize;

varying vec2 vTextureCoord;

vec4 offsetLookup(float xOff, float yOff){

    float x=vTextureCoord.x+xOff*uInverseTextureSize.x;
    float y=vTextureCoord.y+yOff*uInverseTextureSize.y;
    return texture2D(uSampler, vec2(x, y));

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

    gl_FragColor = frameColor;


    
}