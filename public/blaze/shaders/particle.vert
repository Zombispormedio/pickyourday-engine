attribute vec3 a_position;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float uPointSize;

void main(void) {
    gl_Position = uPMatrix * uMVMatrix * vec4(a_position.xyz, 1.0);
    gl_PointSize = uPointSize;
}