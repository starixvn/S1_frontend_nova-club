precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;// mouse pixel coords. xy
#define S smoothstep

vec4 Line(vec2 uv,float speed,float height,vec3 col){
    uv.y+=S(1.,0.,abs(uv.x))*sin(u_time*speed+uv.x*height)*.2;
    return vec4(S(.06*S(.2,.9,abs(uv.x)),0.,abs(uv.y)-.004)*col,1.);
}

void main(){
    vec2 uv=(gl_FragCoord.xy*2.-u_resolution.xy)/u_resolution.y;
    
    gl_FragColor=vec4(0.);
    for(float i=0.;i<=10.;i+=.5){
        float t=i/5.;
        vec3 col=vec3(.2+t*.7,.2+t*.4,.3);
        float height=4.+t;
        float speed=1.+t;
        gl_FragColor+=Line(uv,speed,height,col);
    }
}

// return vec4(smoothstep(.06*smoothstep(.2,.9,abs(uv.x)),0.,abs(uv.y)-.004)*col,1.)*smoothstep(1.,.3,abs(uv.x),1.0);

// gl_FragColor=vec4(color,1.);
