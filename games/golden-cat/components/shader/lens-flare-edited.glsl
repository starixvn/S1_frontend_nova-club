// Updated from https://www.shadertoy.com/view/XdBSDh#
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;

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
    
    color=.3+.5*sin(color);
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

vec3 goldPalaceColor(vec3 color,vec2 uv){
    vec3 gold=vec3(1.,.84,0.);
    vec3 palace=vec3(1.0, 1.0, 0.5);
    
    // Calculate the gradient factor based on the y-coordinate
    float gradientFactor=uv.y*sin(u_time);
    
    // Mix the colors based on the gradient factor
    vec3 mixedColor=mix(gold,palace*sin(u_time),gradientFactor);
    
    // Apply the mixed color to the original color
    vec3 finalColor=color+mixedColor;
    
    return finalColor;
}

void main()
{
    vec2 uv=gl_FragCoord.xy/u_resolution.xy-.5;
    //uv=uv*2.-1.0;
    uv.x*=u_resolution.x/u_resolution.y;
    
    vec2 mm=gl_FragCoord.xy/u_resolution.xy-.5;
    // mm.x*=u_resolution.x/u_resolution.y;
    
    // if(iMouse.z<1.)
    // {
        //
        
    // }
    mm=vec2(0,0);
    
    vec3 circColor=vec3(.9,.2,.1);
    vec3 circColor2=vec3(.3,.1,.9);
    
    //now to make the sky not black
    float i=2.;
    
    // vec3 color=mix(vec3(.3,.2,.02)/.9,vec3(.2,.5,.8),uv.y)*3.-.52*sin(u_time);
    vec3 color=goldPalaceColor(vec3(.3,.2,.02)/.9,uv);
    
    //this calls the function which adds three circle types every time through the loop based on parameters I
    //got by trying things out. rnd i*2000. and rnd i*20 are just to help randomize things more
    for(float i=0.;i<10.;i++){
        
        color+=circle(uv,pow(rnd(i*2000.)*1.8,2.)+1.41,0.,circColor+i,circColor2+i,rnd(i*20.)*3.+.2-.5,mm);
    }
    //get angle and length of the sun (uv - mouse)
    float a=atan(uv.y-mm.y,uv.x-mm.x);
    float l=max(1.-length(uv-mm)-.84,0.);
    
    float bright=.1;//+0.1/abs(sin(time/3.))/3.;//add brightness based on how the sun moves so that it is brightest
    //when it is lined up with the center
    
    //add the sun with the frill things
    color+=max(.1/pow(length(uv-mm)*5.,5.),0.)*abs(sin(a*5.+cos(a*9.)))/20.;
    color+=max(.1/pow(length(uv-mm)*10.,1./20.),.0)+abs(sin(a*3.+cos(a*9.)))/8.*(abs(sin(a*9.)))/1.;
    //add another sun in the middle (to make it brighter)  with the20color I want, and bright as the numerator.
    color+=(max(bright/pow(length(uv-mm)*4.,1./2.),0.)*4.)*vec3(.2,.21,.3)*4.;
    // * (0.5+.5*sin(vec3(0.4, 0.2, 0.1) + vec3(a*2., 00., a*3.)+1.3));
    
    //multiply by the exponetial e^x ? of 1.0-length which kind of masks the brightness more so that
    //there is a sharper roll of of the light decay from the sun.
    color*=exp(1.-length(uv-mm))/5.;
    gl_FragColor=vec4(color,1.);
}