#ifdef GL_ES
precision mediump float;
#endif

attribute vec2 a_position;
attribute vec2 a_texture_coords;

varying vec2 vTextureCoord;

void main(){
    vTextureCoord=a_texture_coords;

    gl_Position=vec4(a_position, 0.0,1.0);
    
}