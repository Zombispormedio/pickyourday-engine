attribute vec3 a_position;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
void main(){

  gl_Position =/* uPMatrix * uMVMatrix **/ vec4(a_position, 1.0);
        
    }


