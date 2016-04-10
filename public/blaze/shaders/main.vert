attribute vec3 a_position;
attribute vec3 a_normal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform bool uWireframe;

varying vec3 vNormal;
varying vec3 vEyeVec;

void main(){

    vec4 vertex = uMVMatrix * vec4(a_position, 1.0);
      if (!uWireframe) {
   vNormal = vec3(uNMatrix * vec4(a_normal, 1.0));
   vEyeVec=-vec3(vertex.xyz);   
   }
  gl_Position =uPMatrix * vertex;

}


