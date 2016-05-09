#ifdef GL_ES
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



