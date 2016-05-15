#ifdef GL_ES
precision mediump float;
#endif

const int NumLights=16;

uniform float uShininess;
uniform vec3 uLightDirection[NumLights];
uniform float uCutOff[NumLights];

uniform vec4 uLightAmbient[NumLights];
uniform vec4 uLightDiffuse[NumLights];
uniform vec4 uLightSpecular[NumLights];

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

        vec4 finalColor=vec4(0.0,0.0,0.0,1.0);
        for(int i=0; i<NumLights;i++){
        
        vec3 L= normalize(uLightDirection[i]);
        vec3 N= normalize(vNormal);
        float lambertTerm=dot(N, -L);
        
        vec4 Ia= uLightAmbient[i]*uMaterialAmbient;
        
        vec4 Id=vec4(0.0,0.0,0.0,1.0);
        
        vec4 Is=vec4(0.0,0.0,0.0,1.0);
        
        if(lambertTerm>uCutOff[i])
        {
            Id=uLightDiffuse[i]*uMaterialDiffuse*lambertTerm;
            
            vec3 E= normalize(vEyeVec);
            vec3 R= reflect(L, N);
            float specular=pow(max(dot(R,E),0.0), uShininess);
            Is=uLightSpecular[i]*uMaterialSpecular*specular;
        }
        
        finalColor+=Ia+Id+Is;
        
        }
        finalColor.a=1.0;
    
        gl_FragColor =finalColor;
        
        
}


