export const spiral = `
precision mediump float;
varying vec2 vTextureCoord;
uniform vec3 u_resolution;
uniform sampler2D uSampler;
uniform float time;
#define S smoothstep

vec4 Line(vec2 uv,float speed,float height,vec3 col){
    uv.y+=S(1.,0.,abs(uv.x))*sin(time*.5*speed+uv.x*height)*.2;
    return vec4(S(.06*S(.2,.9,abs(uv.x)),0.,abs(uv.y)-.004)*col,1.);
}

void main(void){
    vec2 uv=(gl_FragCoord.xy+2.-u_resolution.xy)/u_resolution.xy;

    gl_FragColor=vec4(.1);
    for(float i=0.;i<=10.;i+=.5){
        float t=i/5.;
        vec3 col=vec3(.2+t*.7,.2+t*.4,.3);
        float height=4.;
        float speed=1.+t;

        gl_FragColor+=Line(uv,speed,height,col);
    }
}
`;
