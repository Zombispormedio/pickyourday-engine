#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D uSampler;
uniform sampler2D uNoiseSampler;
uniform vec2 uInverseTextureSize;
uniform float uTime;

varying vec2 vTextureCoord;

const float grainIntensity = 0.1;
const float scrollSpeed = 4000.0;


void main()
{
    vec4 frameColor=texture2D(uSampler, vTextureCoord);
    vec4 grain=texture2D(uNoiseSampler, vTextureCoord*2.0+uTime*scrollSpeed*uInverseTextureSize);
    gl_FragColor=frameColor-(grain*grainIntensity);

}