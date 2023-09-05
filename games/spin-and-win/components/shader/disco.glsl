// precision mediump float;
// uniform vec2 u_resolution;
// uniform float u_time;

// mat2 rotate2d(float angle){
    //     return mat2(cos(angle),-sin(angle),
    //     sin(angle),cos(angle));
// }

// void main()
// {
    //     vec2 uv=gl_gl_FragCoord.xy/u_resolution.xy;
    //     uv.x*=1.5;
    //     uv.x-=.25;
    
    //     float radius=.5;
    //     vec2 center=vec2(.5);
    
    //     //color with gradient
    //     vec2 v=rotate2d(u_time*2.)*uv;
    //     vec3 color=vec3(1.,1.,clamp(.7-v.y*v.x,.3,.8));
    
    //     gl_FragColor=vec4(color,1.);
// }

precision mediump float;
uniform vec2 u_resolution;
varying vec2 vTextureCoord;
uniform float u_time;
#define S smoothstep

float sun(vec2 uv,float battery)
{
    float val=smoothstep(.3,.29,length(uv));
    float bloom=smoothstep(.7,0.,length(uv));
    float cut=3.*sin((uv.y+u_time*.2*(battery+.02))*100.)
    +clamp(uv.y*14.+1.,-6.,6.);
    cut=clamp(cut,0.,1.);
    return clamp(val*cut,0.,1.)+bloom*.6;
}

float grid(vec2 uv,float battery)
{
    vec2 size=vec2(uv.y,uv.y*uv.y*.2)*.01;
    uv+=vec2(0.,u_time*4.*(battery+.05));
    uv=abs(fract(uv)-.5);
    vec2 lines=smoothstep(size,vec2(0.),uv);
    lines+=smoothstep(size*5.,vec2(0.),uv)*.4*battery;
    return clamp(lines.x+lines.y,0.,3.);
}

float dot2(in vec2 v){return dot(v,v);}

float sdTrapezoid(in vec2 p,in float r1,float r2,float he)
{
    vec2 k1=vec2(r2,he);
    vec2 k2=vec2(r2-r1,2.*he);
    p.x=abs(p.x);
    vec2 ca=vec2(p.x-min(p.x,(p.y<0.)?r1:r2),abs(p.y)-he);
    vec2 cb=p-k1+k2*clamp(dot(k1-p,k2)/dot2(k2),0.,1.);
    float s=(cb.x<0.&&ca.y<0.)?-1.:1.;
    return s*sqrt(min(dot2(ca),dot2(cb)));
}

float sdLine(in vec2 p,in vec2 a,in vec2 b)
{
    vec2 pa=p-a,ba=b-a;
    float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);
    return length(pa-ba*h);
}

float sdBox(in vec2 p,in vec2 b)
{
    vec2 d=abs(p)-b;
    return length(max(d,vec2(0)))+min(max(d.x,d.y),0.);
}

float opSmoothUnion(float d1,float d2,float k){
    float h=clamp(.5+.5*(d2-d1)/k,0.,1.);
    return mix(d2,d1,h)-k*h*(1.-h);
}

float sdCloud(in vec2 p,in vec2 a1,in vec2 b1,in vec2 a2,in vec2 b2,float w)
{
    //float lineVal1 = smoothstep(w - 0.0001, w, sdLine(p, a1, b1));
    float lineVal1=sdLine(p,a1,b1);
    float lineVal2=sdLine(p,a2,b2);
    vec2 ww=vec2(w*1.5,0.);
    vec2 left=max(a1+ww,a2+ww);
    vec2 right=min(b1-ww,b2-ww);
    vec2 boxCenter=(left+right)*.5;
    //float boxW = right.x - left.x;
    float boxH=abs(a2.y-a1.y)*.5;
    //float boxVal = sdBox(p - boxCenter, vec2(boxW, boxH)) + w;
    float boxVal=sdBox(p-boxCenter,vec2(.04,boxH))+w;
    
    float uniVal1=opSmoothUnion(lineVal1,boxVal,.05);
    float uniVal2=opSmoothUnion(lineVal2,boxVal,.05);
    
    return min(uniVal1,uniVal2);
}

void main()
{
    vec2 uv=(2.*gl_FragCoord.xy-u_resolution.xy)/u_resolution.y;
    float battery=1.;
    //if (iMouse.x > 1.0 && iMouse.y > 1.0) battery = iMouse.y / u_resolution.y;
    //else battery = 0.8;
    
    //if (abs(uv.x) < (9.0 / 16.0))
    {
        // Grid
        float fog=smoothstep(.1,-.02,abs(uv.y+.2));
        vec3 col=vec3(0.,.1,.2);
        if(uv.y<-.2)
        {
            uv.y=3./(abs(uv.y+.2)+.05);
            uv.x*=uv.y*1.;
            float gridVal=grid(uv,battery);
            col=mix(col,vec3(1.,.5,1.),gridVal);
        }
        else
        {
            float fujiD=min(uv.y*4.5-.5,1.);
            uv.y-=battery*1.1-.51;
            
            vec2 sunUV=uv;
            vec2 fujiUV=uv;
            
            // Sun
            sunUV+=vec2(.75,.2);
            //uv.y -= 1.1 - 0.51;
            col=vec3(1.,.2,1.);
            float sunVal=sun(sunUV,battery);
            
            col=mix(col,vec3(1.,.4,.1),sunUV.y*2.+.2);
            col=mix(vec3(0.,0.,0.),col,sunVal);
            
            // fuji
            float fujiVal=sdTrapezoid(uv+vec2(-.75+sunUV.y*0.,.5),1.75+pow(uv.y*uv.y,2.1),.2,.5);
            float waveVal=uv.y+sin(uv.x*20.+u_time*2.)*.05+.2;
            float wave_width=smoothstep(0.,.01,(waveVal));
            
            // fuji color
            col=mix(col,mix(vec3(0.,0.,.25),vec3(1.,0.,.5),fujiD),step(fujiVal,0.));
            // fuji top snow
            col=mix(col,vec3(1.,.5,1.),wave_width*step(fujiVal,0.));
            // fuji outline
            col=mix(col,vec3(1.,.5,1.),1.-smoothstep(0.,.01,abs(fujiVal)));
            //col = mix( col, vec3(1.0, 1.0, 1.0), 1.0-smoothstep(0.03,0.04,abs(fujiVal)) );
            //col = vec3(1.0, 1.0, 1.0) *(1.0-smoothstep(0.03,0.04,abs(fujiVal)));
            
            // horizon color
            col+=mix(col,mix(vec3(1.,.12,.8),vec3(0.,0.,.2),clamp(uv.y*3.5+3.,0.,1.)),step(0.,fujiVal));
            
            // cloud
            vec2 cloudUV=uv;
            cloudUV.x=mod(cloudUV.x+u_time*.1,4.)-2.;
            float cloudTime=u_time*.5;
            float cloudY=-.5;
            float cloudVal1=sdCloud(cloudUV,
                vec2(.1+sin(cloudTime+140.5)*.1,cloudY),
                vec2(1.05+cos(cloudTime*.9-36.56)*.1,cloudY),
                vec2(.2+cos(cloudTime*.867+387.165)*.1,.25+cloudY),
                vec2(.5+cos(cloudTime*.9675-15.162)*.09,.25+cloudY),.075);
                cloudY=-.6;
                float cloudVal2=sdCloud(cloudUV,
                    vec2(-.9+cos(cloudTime*1.02+541.75)*.1,cloudY),
                    vec2(-.5+sin(cloudTime*.9-316.56)*.1,cloudY),
                    vec2(-1.5+cos(cloudTime*.867+37.165)*.1,.25+cloudY),
                    vec2(-.6+sin(cloudTime*.9675+665.162)*.09,.25+cloudY),.075);
                    
                    float cloudVal=min(cloudVal1,cloudVal2);
                    
                    //col = mix(col, vec3(1.0,1.0,0.0), smoothstep(0.0751, 0.075, cloudVal));
                    col=mix(col,vec3(0.,0.,.2),1.-smoothstep(.075-.0001,.075,cloudVal));
                    col+=vec3(1.,1.,1.)*(1.-smoothstep(0.,.01,abs(cloudVal-.075)));
                }
                
                col+=fog*fog*fog;
                col=mix(vec3(col.r,col.r,col.r)*.5,col,battery*.7);
                
                gl_FragColor=vec4(col,1.);
            }
            //else fragColor = vec4(0.0);
            
        }