#ifdef GL_ES
precision mediump float;
#endif
attribute vec3 a_position;
attribute vec4 a_color;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float uPointSize;

uniform bool uWireframe;
uniform bool uPerVertexColor;
uniform vec4 uMaterialDiffuse;


varying vec4 vColor;

void main(void) {

 if(uWireframe){
	 
	 	if(uPerVertexColor){
	 		 vColor=a_color;
	 	}else{
	 		vColor=uMaterialDiffuse;
	 	}
	 
	
	 }
    
    gl_Position = uPMatrix * uMVMatrix * vec4(a_position.xyz, 1.0);
    gl_PointSize = uPointSize;
}