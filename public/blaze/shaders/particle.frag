#ifdef GL_ES
precision mediump float;
#endif
uniform bool uWireframe;

uniform sampler2D uSampler;

varying vec4 vColor;


bool isBlack(vec4 color){
return color.r==0.0 &&color.g==0.0&&color.b==0.0;
}
void main(void) { 
     if(uWireframe){
         gl_FragColor = vColor;
        }else{
    gl_FragColor = texture2D(uSampler, gl_PointCoord);
    if(gl_FragColor.a < 0.5 || isBlack(gl_FragColor)) discard;
    }
}