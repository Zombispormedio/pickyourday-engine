module Shaders{
export class Fragment{
static Particle:string=`#ifdef GL_ES
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
}`;
static Phong:string=`#ifdef GL_ES
precision mediump float;
#endif
uniform float uShininess;
uniform vec3 uLightDirection;

uniform vec4 uLightAmbient;
uniform vec4 uLightDiffuse;
uniform vec4 uLightSpecular;

uniform bool uWireframe;

uniform bool uOffscreen;
uniform vec4 uSelectColor;

uniform vec4 uMaterialAmbient;
uniform vec4 uMaterialDiffuse;
uniform vec4 uMaterialSpecular;

varying vec3 vNormal;
varying vec3 vEyeVec;
varying vec4 vColor;

void main(){

        if(uWireframe){
            gl_FragColor = vColor;
            return;
        }
      

        if(uOffscreen){
            gl_FragColor=uSelectColor;
            return;
        }

       
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
static Toon:string=`#ifdef GL_ES
precision mediump float;
#endif

uniform float uShininess;
uniform vec3 uLightDirection;

uniform mat4 uMVMatrix;

uniform vec4 uLightAmbient;
uniform vec4 uLightDiffuse;
uniform vec4 uMaterialDiffuse;

uniform bool uWireframe;

uniform bool uOffscreen;
uniform vec4 uSelectColor;

varying vec4 vColor;

varying vec3 vNormal;
varying vec3 vVertex;

void main(){

       if(uWireframe){
            gl_FragColor = vColor;
            return;
        }
      

        if(uOffscreen){
            gl_FragColor=uSelectColor;
            return;
        }

        vec4 color0=vec4(uMaterialDiffuse.rgb,1.0);
        vec4 color1=vec4(0.0,0.0,0.0, 1.0);
        vec4 color2=vec4(uMaterialDiffuse.rgb, 1.0);
        
        vec3 N= vNormal;
        vec3 L = normalize(uLightDirection);
        
        vec4 eyePos= uMVMatrix*vec4(0.0,0.0,0.0,1.0);
        
        vec3 EyeVert = normalize(-eyePos.xyz);
        
        vec3 EyeLight=normalize(L+EyeVert);
        
        float sil= max(dot(N, EyeVert), 0.0);
        
        if( sil<0.4){
            gl_FragColor=color1;
        }else{
             gl_FragColor=color0;
             
             float spec=pow(max(dot(N, EyeLight), 0.0), uShininess);
             
             if(spec<0.2) gl_FragColor*=0.8;
             else gl_FragColor=color2;
             
             float diffuse=max(dot(N, L), 0.0);
             if(diffuse<0.5)gl_FragColor*=0.8;
        }





}



`;
}
export class Vertex{
static Particle:string=`#ifdef GL_ES
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
}`;
static Phong:string=`#ifdef GL_ES
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


`;
static Toon:string=`#ifdef GL_ES
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
varying vec3 vVertex;
varying vec4 vColor;

void main(){
    
    vec4 normal= uNMatrix * vec4(a_normal,1.0);
    
     if(uWireframe){
	 
	 	if(uPerVertexColor){
	 		 vColor=a_color;
	 	}else{
	 		vColor=uMaterialDiffuse;
	 	}
	 
	
	 }else{
    
    vNormal=normal.xyz;
    vVertex=a_position;
    }
    
    gl_Position=uPMatrix*uMVMatrix*vec4(a_position, 1.0);
    
    
    
    

}`;
}
}
