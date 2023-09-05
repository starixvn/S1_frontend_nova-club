precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;// mouse pixel coords. xy
#define S smoothstep

vec4 Line(vec2 uv,float speed,float height,vec3 col){
    uv.y+=S(1.,0.,abs(uv.x))*sin(u_time*speed+uv.x*height)*.2;
    return vec4(S(.06*S(.2,.9,abs(uv.x)),0.,abs(uv.y)-.004)*col,1.)*S(1.,.3,abs(uv.x));
}

void main(){
    //Pixel Coordinate is UV, -0.5 willl center the Coordinate
    vec2 uv=(gl_FragCoord.xy*2.-u_resolution.xy)/u_resolution.y;
    
    gl_FragColor=vec4(.1);
    for(float i=0.;i<=10.;i+=.5){
        float t=i/5.;
        gl_FragColor+=Line(uv,1.+t,4.+t,vec3(.2+t*.7,.2+t*.4,.3));
    }
}