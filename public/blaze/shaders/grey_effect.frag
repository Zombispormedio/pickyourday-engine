#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D uSampler;

varying vec2 vTextureCoord;

void main(void)
{
    vec4 frameColor = texture2D(uSampler, vTextureCoord);
    float luminance = frameColor.r * 0.3 + frameColor.g * 0.59 + frameColor.b * 0.11;
    gl_FragColor = vec4(luminance, luminance, luminance, frameColor.a);
}