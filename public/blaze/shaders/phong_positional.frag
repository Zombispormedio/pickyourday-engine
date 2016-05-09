#ifdef GL_ES
precision mediump float;
#endif

uniform float uShininess;

uniform vec4 uLightAmbient;
uniform vec4 uLightDiffuse;


uniform bool uWireframe;

uniform bool uOffscreen;
uniform vec4 uSelectColor;


uniform vec4 uMaterialDiffuse;


varying vec3 vNormal;
varying vec3 vEyeVec;
varying vec3 vLightDir;
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

       
        vec3 L= normalize(vLightDir);
        vec3 N= normalize(vNormal);
        float lambertTerm=dot(N, -L);
        
        vec4 Ia= uLightAmbient;
        
        vec4 Id=vec4(0.0,0.0,0.0,1.0);
        
        vec4 Is=vec4(0.0,0.0,0.0,1.0);
        
        if(lambertTerm>0.0)
        {
            Id=uMaterialDiffuse*lambertTerm;
            
            vec3 E= normalize(vEyeVec);
            vec3 R= reflect(L, N);
            float specular=pow(max(dot(R,E),0.0), uShininess);
            Is=uLightDiffuse*specular;
        }
        
        vec4 finalColor=Ia+Id+Is;
        finalColor.a=1.0;
    
        gl_FragColor =finalColor;
        
        
}


