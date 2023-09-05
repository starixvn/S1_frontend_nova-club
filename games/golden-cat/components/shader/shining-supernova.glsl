// Updated from https://www.shadertoy.com/view/XdBSDh#
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;//
vec2 sun;
uniform vec4 iMouse;
#define GRADIENT_Y.1

//
#define SUNCOLOR vec4(1.,.6,.3,0.)

// SET TO CONTROL WITH MOUSE
// #define MOUSE_CONTROL

// DISABLE / ENABLE COLOR CYCLING
//#define COLOR_CYCLING

vec4 suncolor=SUNCOLOR;

float snoise(vec3 uv,float res)
{
    const vec3 s=vec3(1e0,1e2,1e3);
    
    uv*=res;
    
    vec3 uv0=floor(mod(uv,res))*s;
    vec3 uv1=floor(mod(uv+vec3(1.),res))*s;
    
    vec3 f=fract(uv);f=f*f*(3.-2.*f);
    
    vec4 v=vec4(uv0.x+uv0.y+uv0.z,uv1.x+uv0.y+uv0.z,
    uv0.x+uv1.y+uv0.z,uv1.x+uv1.y+uv0.z);
    
    vec4 r=fract(sin(v*1e-1)*1e3);
    float r0=mix(mix(r.x,r.y,f.x),mix(r.z,r.w,f.x),f.y);
    
    r=fract(sin((v+uv1.z-uv0.z)*1e-1)*1e3);
    float r1=mix(mix(r.x,r.y,f.x),mix(r.z,r.w,f.x),f.y);
    
    return mix(r0,r1,f.z)*2.-1.;
}

vec4 sunhalo(vec2 uv)
{
    vec4 col=vec4(0.);
    if(uv.y<GRADIENT_Y)
    {
        return col;
    }
    float limit=(1.+sin((uv.x+sun.x)*3.14159))*.5;
    float l=(limit-uv.y-sun.y);
    float distToSun=length(uv-vec2(.5,.5)+sun);
    
    float r=1.-distToSun;
    r=pow(r,1.1);
    r*=l;
    r*=1.5;
    r=clamp(r,0.,1.);
    
    col=suncolor*r;
    col=clamp(col,0.,1.);
    return col;
}

// vec4 sundisc(vec2 uv)
// {
    //     vec4 col=vec4(0.);
    
    //     if(uv.y<GRADIENT_Y)
    //     {
        //         return col;
    //     }
    
    //     float sunw=.11;
    
    //     // disk
    //     vec2 p=uv-vec2(.5);
    //     float distToSun=length(sun+p);
    //     float r=1.-smoothstep(sunw-.05,sunw,distToSun);
    //     r=clamp(r,0.,1.);
    //     col=suncolor*r;
    
    //     // rays
    //     float an=atan(sun.x+p.x,sun.y+p.y);
    //     vec2 noiseuv=vec2(an,distToSun-u_time*.1);
    //     float r2=1.-smoothstep(sunw-.05,sunw+.10,distToSun);
    //     float rays=mix(snoise(vec3(noiseuv,0.),13.),1.,.84)*r2;
    //     col+=vec4(rays);
    //     col=clamp(col,0.,1.);
    
    //     // texture
    //     float tex=texture(iChannel0,(sun+uv+vec2(u_time*.02,0.))*8.).r;
    //     tex*=r*.8;
    //     col-=tex;
    //     return col;
// }

vec4 horizon(vec2 uv)
{
    vec4 col=vec4(0.);
    
    float d=distance(vec2(0.,uv.y),vec2(0.,GRADIENT_Y));
    float r=smoothstep(.05,0.,d);
    float r2=smoothstep(.2,0.,d);
    
    col.g=r*.4;
    col.r=r*.7;
    //col *= 0.5;
    
    float amount=.4;
    col+=suncolor*r2*amount;
    
    col=clamp(col,0.,1.);
    return col;
}

vec4 ground(vec2 uv)
{
    vec4 col=vec4(0.);
    if(uv.y>GRADIENT_Y)
    {
        return col;
    }
    // ground color
    float d=GRADIENT_Y-length(vec2(0.,GRADIENT_Y)-vec2(0.,uv.y));
    d*=15.;
    d=pow(d,2.);
    
    // falloff
    vec2 p=uv-vec2(.5);
    d*=1.-pow(length(sun+p),.75);
    
    col=suncolor*d;
    return col;
    
}

void main()
{
    gl_FragColor=vec4(1.);
    vec2 uv=gl_FragCoord.xy*2.-u_resolution.xy/u_resolution.xy;
    uv.y/=1.7;
    float sunspeed=.3;
    #ifdef MOUSE_CONTROL
    
    sun=vec2(iMouse.x/u_resolution.x,iMouse.y/u_resolution.y)-vec2(.5);
    #else
    sun=vec2(0.,0.);
    sun.y+=.1+sin(u_time*sunspeed+2.)*.1;
    #endif
    
    sun*=4.;
    #ifdef COLOR_CYCLING
    suncolor.b+=(sin(u_time*.05)+.5)*.5;
    suncolor.r-=(sin(u_time*.05)+.5)*.5;
    #endif
    
    gl_FragColor+=sunhalo(uv);
    gl_FragColor+=horizon(uv);
    gl_FragColor+=ground(uv);
    // gl_FragColor+=sundisc(uv);
}