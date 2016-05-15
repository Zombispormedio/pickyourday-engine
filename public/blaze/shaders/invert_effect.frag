#ifdef GL_ES
precision mediump float;
#endif
uniform sampler2D uSampler;

varying vec2 vTextureCoord;

void main(void)
{
    vec4 frameColor = texture2D(uSampler, vTextureCoord);
    gl_FragColor = vec4(1.0-frameColor.r, 1.0-frameColor.g, 1.0-frameColor.b, frameColor.a);
}