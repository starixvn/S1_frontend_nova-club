export const goldenPattern = `
precision mediump float;
varying vec2 vTextureCoord;
uniform vec2 u_resolution;
uniform sampler2D uSampler;
uniform float u_time;

#define AA 2

float calc(vec2 p,float time)
{
    // non p dependent
    float ltime=.5-.5*cos(time*.06);
    float zoom=pow(.9,50.*ltime);
    vec2 cen=vec2(.2655,.301)+zoom*.8*cos(4.+2.*ltime);
    
    vec2 c=vec2(-.745,.186)-.045*zoom*(1.-ltime*.5);
    
    //
    p=(2.*p-u_resolution.xy)/u_resolution.y;
    vec2 z=cen+(p-cen)*zoom;
    
    #if 0
    // full derivatives version
    vec2 dz=vec2(1.,0.);
    for(int i=0;i<256;i++)
    {
        dz=2.*vec2(z.x*dz.x-z.y*dz.y,z.x*dz.y+z.y*dz.x);
        z=vec2(z.x*z.x-z.y*z.y,2.*z.x*z.y)+c;
        if(dot(z,z)>200.)break;
    }
    float d=sqrt(dot(z,z)/dot(dz,dz))*log(dot(z,z));
    
    #else
    // only derivative length version
    float ld2=1.;
    float lz2=dot(z,z);
    for(int i=0;i<256;i++)
    {
        ld2*=4.*lz2;
        z=vec2(z.x*z.x-z.y*z.y,2.*z.x*z.y)+c;
        lz2=dot(z,z);
        if(lz2>200.)break;
    }
    float d=sqrt(lz2/ld2)*log(lz2);
    
    #endif
    
    return sqrt(clamp((150./zoom)*d,0.,1.));
}

void main()
{
    vec4 color = texture2D(uSampler, vTextureCoord);
    #if 0
    float scol=calc(vTextureCoord,u_time);
    #else
    
    float scol=0.;
    for(int j=0;j<AA;j++)
    for(int i=0;i<AA;i++)
    {
        vec2 of=-.5+vec2(float(i),float(j))/float(AA);
        scol+=calc(vTextureCoord.xy+of,u_time);
    }
    scol/=float(AA*AA);
    
    #endif
    
    vec3 vcol=pow(vec3(scol),vec3(.9,1.1,1.4));
    vcol = vcol * vec3(1.0, 0.843, 0.0); 
    
    vec2 uv=(vTextureCoord.xy-u_resolution.xy)/u_resolution.xy;
    vcol*=.7+.3*pow(16.*uv.x*uv.y*(1.-uv.x)*(1.-uv.y),.25);
    
    color =vec4(vcol,1.);
    gl_FragColor=color;
}

`;
