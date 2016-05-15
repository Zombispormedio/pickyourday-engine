#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 a_position;
attribute vec3 a_normal;
attribute vec4 a_color;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform bool uWireframe;
uniform bool uPerVertexColor;
uniform vec4 uMaterialDiffuse;

varying vec3 vNormal;
varying vec3 vEyeVec;
varying vec4 vColor;

void main(){

    vec4 vertex = uMVMatrix * vec4(a_position, 1.0);
	
	
	 if(uWireframe){
	 
	 	if(uPerVertexColor){
	 		 vColor=a_color;
	 	}else{
	 		vColor=uMaterialDiffuse;
	 	}
	 
	
	 }else{
	
	vNormal = vec3(uNMatrix * vec4(a_normal, 1.0));
	vEyeVec=-vec3(vertex.xyz);  
	
	}
	 
	gl_Position =uPMatrix * vertex;

}


