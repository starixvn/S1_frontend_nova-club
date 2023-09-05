precision mediump float;
uniform float iFrameRate;// shader frame rate
uniform int iFrame;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
    sin(angle),cos(angle));
}

float variation(vec2 v1,vec2 v2,float strength,float speed){
    return sin(
        dot(normalize(v1),normalize(v2))*strength+u_time*speed
    )/100.;
}

vec3 paintCircle(vec2 uv,vec2 center,float rad,float width){
    
    vec2 diff=center-uv;
    float len=length(diff);
    
    // len += variation(diff, vec2(0.0, 1.0), 5.0, 2.0);
    // len -= variation(diff, vec2(1.0, 0.0), 5.0, 2.0);
    
    float circle=smoothstep(rad-width,rad,len)-smoothstep(rad,rad+width,len);
    return vec3(circle);
}

vec3 paintSquare(vec2 uv,vec2 center,float size,float width){
    vec2 diff=abs(center-uv);
    vec2 halfSize=vec2(size/2.);
    
    vec2 dist=diff-halfSize;
    vec2 d=max(dist,vec2(0.));
    float len=length(d)-width;
    
    float square=step(0.,len);
    return vec3(1.);
}

void main()
{
    vec2 uv=gl_FragCoord.xy/u_resolution.xy;
    uv.x*=1.5;
    uv.x-=.25;
    
    float radius=.5;
    vec2 center=vec2(.5);
    
    //paint color circle
    // color = paintSquare(uv, center, radius, 0.15);
    
    //color with gradient
    vec2 v=rotate2d(u_time*2.)*uv;
    vec3 color=vec3(1.,1.,clamp(.7-v.y*v.x,.3,.8));
    
    //paint white circle
    // color += paintSquare(uv, center, radius, 0.2);
    
    gl_FragColor=vec4(color,1.);
}