precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 u_resolution;
uniform float u_time;
#define t u_time
#define r u_resolution.xy

void main()
{
    // vec4 color = texture2D(uSampler, vTextureCoord);
    // vec4 color;
    
    vec3 c;
    float l,z=t*.75;
    for(int i=0;i<2;i++){
        vec2 uv,p=(gl_FragCoord.xy*3.-u_resolution.xy)/r;
        uv=floor(sin(p));
        p-=.5;
        p.x*=r.x/r.y;
        z+=.1;
        l=length(p);
        uv+=p/l*(sin(z)+1.)*floor(sin(l*1.-z));
        c[i]=.01/length(mod(uv,1.)-.1);
    }
    // color += vec4(color/l,t);
    gl_FragColor=vec4(c/l,t);
}