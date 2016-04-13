module Shaders{
export class Fragment{
static Particle:string=``;
static Phong:string=`#ifdef GL_ES
precision mediump float;
#endif
uniform float uShininess;
uniform vec3 uLightDirection;

uniform vec4 uLightAmbient;
uniform vec4 uLightDiffuse;
uniform vec4 uLightSpecular;

uniform vec4 uMaterialAmbient;
uniform vec4 uMaterialDiffuse;
uniform vec4 uMaterialSpecular;

varying vec3 vNormal;
varying vec3 vEyeVec;

void main(){

		
        vec3 L= normalize(uLightDirection);
        vec3 N= normalize(vNormal);
        float lambertTerm=dot(N, -L);
        
        vec4 Ia= uLightAmbient*uMaterialAmbient;
        
        vec4 Id=vec4(0.0,0.0,0.0,1.0);
        
        vec4 Is=vec4(0.0,0.0,0.0,1.0);
        
        if(lambertTerm>0.0)
        {
            Id=uLightDiffuse*uMaterialDiffuse*lambertTerm;
            
            vec3 E= normalize(vEyeVec);
            vec3 R= reflect(L, N);
            float specular=pow(max(dot(R,E),0.0), uShininess);
            Is=uLightSpecular*uMaterialSpecular*specular;
        }
        
        vec4 finalColor=Ia+Id+Is;
        finalColor.a=1.0;
    
        gl_FragColor =finalColor;
        
    }


`;
}
export class Vertex{
static Particle:string=``;
static Phong:string=`attribute vec3 a_position;
attribute vec3 a_normal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;


varying vec3 vNormal;
varying vec3 vEyeVec;

void main(){

    vec4 vertex = uMVMatrix * vec4(a_position, 1.0);
	
	

			vNormal = vec3(uNMatrix * vec4(a_normal, 1.0));
			vEyeVec=-vec3(vertex.xyz);   

  gl_Position =uPMatrix * vertex;

}


`;
}
}
