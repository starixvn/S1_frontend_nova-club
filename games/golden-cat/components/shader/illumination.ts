//https://www.shadertoy.com/view/Xlc3D2
export const illumination = `
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 u_resolution;
uniform float u_time;
#define t u_time
#define r u_resolution.xy


float rnd(vec2 p)
{
    float f=fract(sin(dot(p,vec2(12.1234,72.8392))*45123.2));
    return f;
}

float rnd(float w)
{
    float f=fract(sin(w)*1000.);
    return f;
}

float regShape(vec2 p,int N)
{
    float f;
    
    float a=atan(p.x,p.y)+.2;
    float b=6.28319/float(N);
    f=smoothstep(.5,.51,cos(floor(.5+a/b)*b-a)*length(p.xy));
    
    return f;
}
vec3 circle(vec2 p,float size,float decay,vec3 color,vec3 color2,float dist,vec2 mouse)
{
    
    //l is used for making rings.I get the length and pass it through a sinwave
    //but I also use a pow function. pow function + sin function , from 0 and up, = a pulse, at least
    //if you return the max of that and 0.0.
    
    float l=length(p+mouse*(dist*4.))+size/2.;
    
    //l2 is used in the rings as well...somehow...
    float l2=length(p+mouse*(dist*4.))+size/3.;
    
    ///these are circles, big, rings, and  tiny respectively
    float c=max(.01-pow(length(p+mouse*dist),size*1.4),0.)*50.;
    float c1=max(.001-pow(l-.3,1./40.)+sin(l*30.),0.)*3.;
    float c2=max(.04/pow(length(p-mouse*dist/2.+.09)*1.,1.),0.)/20.;
    float s=max(.01-pow(regShape(p*5.+mouse*dist*5.+.9,6),1.),0.)*5.;
    
    color=.5+.5*sin(color);
    color=cos(vec3(.44,.24,.2)*8.+dist*4.)*.5+.5;
    vec3 f=c*color;
    f+=c1*color;
    
    f+=c2*color;
    f+=s*color;
    return f-.01;
}

float sun(vec2 p,vec2 mouse)
{
    float f;
    
    vec2 sunp=p+mouse;
    float sun=1.-length(sunp)*8.;
    return f;
}

void main()
{

    //The Random Light spreading behind
    vec4 color;
    float l,z=t*0.75;

    vec2 uv,p=(gl_FragCoord.xy*1.5-u_resolution.xy)/u_resolution.xy;
    uv=floor(sin(p));
    p-=.5;
    p.x*=r.x/r.y;
    z+=.1;
    l=length(p);
    uv+=p/l*(sin(z)+1.)*floor(sin(l*1.-z));
    color[1]=.01/length(mod(uv,1.)-.1);
    color[0]=.01/length(mod(uv,1.)-.1);


    gl_FragColor = color;



    //Light source at the bottom part
    vec2 sunUV=(gl_FragCoord.xy-u_resolution.xy)/u_resolution.xy;
    sunUV.x*=u_resolution.x/u_resolution.y;
    
    vec2 mm=(gl_FragCoord.xy-u_resolution.xy)/u_resolution.xy;
    
    mm=vec2(0.,-.53);
    
    vec3 circColor=vec3(.9,.2,.1);
    vec3 circColor2=vec3(.3,.1,.9);
    
    //set the background according to the sprite texture
    vec4 colorTexture = texture2D(uSampler, vTextureCoord);

    vec3 colorSunBg = clamp(colorTexture.rgb * sin(u_time*0.25), 0., 0.1);

    //get angle and length of the sun
    float a=atan(sunUV.y-mm.y,sunUV.x-mm.x);
    
    float bright=.1;//+0.1/abs(sin(time/3.))/3.;//add brightness based on how the sun moves so that it is brightest
    
    //multiply by the exponetial e^x ? of 1.0-length which kind of masks the brightness more so that
    //there is a sharper roll of of the light decay from the sun.
    colorSunBg*=exp(1.-length(sunUV-mm))/4.;
    gl_FragColor+=vec4(colorSunBg+colorTexture.rgb, 1.);
}
`;

//https://www.shadertoy.com/view/XsXXDn
