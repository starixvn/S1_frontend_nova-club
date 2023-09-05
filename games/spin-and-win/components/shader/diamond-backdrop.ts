export const diamondBackdrop = `
precision mediump float;
uniform vec2 u_resolution;
uniform float time;// mouse pixel coords. xy

float Hash(vec2 P){
    return fract(cos(dot(P,vec2(91.52,-74.27)))*939.24);
}

float Value(vec2 P){
    vec2 F=floor(P);
    vec2 S=P-F;
    vec4 M=(S*S*(3.-S-S)).xyxy;
    M=M*vec4(-1,-1,1,1)+vec4(1,1,0,0);
    return(Hash(F+vec2(0,0))*M.x+Hash(F+vec2(1,0))*M.z)*M.y+
    (Hash(F+vec2(0,1))*M.x+Hash(F+vec2(1,1))*M.z)*M.w;
}

float Noise(vec2 P){
    return
    .6*Value(P*8.)+
    .4*Value(P*16.)+
    .3*Value(P*32.)+
    .2*Value(P*64.);
}

float mat(vec2 uv,vec2 offset){
    return Noise(uv*vec2(6.,20.)+offset);
}

float ndot(vec2 a,vec2 b){return a.x*b.x-a.y*b.y;}

float sdRhombus(in vec2 p,in vec2 b){
    vec2 q=abs(p);
    float h=clamp((-2.*ndot(q,b)+ndot(b,b))/dot(b,b),-1.,1.);
    float d=length(q-.5*b*vec2(1.-h,1.+h));
    return d*sign(q.x*b.y+q.y*b.x-b.x*b.y);
}

float sdCircle(vec2 p,float r){
    return length(p)-r;
}

float opSmoothUnion(float d1,float d2,float k){
    float h=clamp(.5+.5*(d2-d1)/k,0.,1.);
    return mix(d2,d1,h)-k*h*(1.-h);
}

float sdDiamond(vec2 p){
    return opSmoothUnion(sdRhombus(p,vec2(.2,1.)),sdCircle(p,.2),.1);
}

vec4 over(in vec4 a,in vec4 b){
    return mix(a,b,1.-a.w);
}

mat2 rot(float a){
    float c=cos(a);
    float s=sin(a);
    return mat2(c,-s,s,c);
}

vec4 diamonds(vec2 uv,float angle){
    vec2 p=vec2(uv);
    mat2 r=rot(angle);
    p=fract(p)*2.-1.;
    p*=r;
    float d=sdDiamond(p);
    float a=smoothstep(.01,.0,d);
    float zp=smoothstep(.0,.1,-d);
    float zh=smoothstep(.0,.1,-sdDiamond(p+vec2(.01,.0)));
    float zv=smoothstep(.0,.1,-sdDiamond(p+vec2(.0,.01)));
    return zp+zh+zv==0.
    ?vec4(0,0,0,a)
    :vec4(normalize(vec3(zp-zh,zp-zv,zp)),a);
}

vec3 light(vec3 lp,vec3 lc,vec3 n,vec2 uv){
    vec3 ld=vec3(lp.xy-uv,lp.z-n.z);
    float l=length(ld);
    return lc*pow(max(.0,dot(n,ld/l)),4.)/l;
}

void main(){
    vec2 uv=(gl_FragCoord.xy*2.-u_resolution.xy)/u_resolution.xy;
    
    float n0=mat(uv,vec2(.0));
    float n1=mat(uv,vec2(.001,.000));
    float n2=mat(uv,vec2(.000,.001));
    
    vec4 c=vec4(.0);
    vec4 d0=diamonds(uv*3.+.0,.78539);
    vec4 d1=diamonds(uv*3.+.5,-.78539);
    float a=max(d0.w,d1.w);
    vec3 n=(d0.xyz+d1.xyz)*a+vec3(n0-n1,n0-n2,n0)*.6*(1.-a*.6);

    float t=time;
    mat2 m0=rot(t*1.4+.4)*sin(t*.4+.2);
    mat2 m1=rot(-t*1.4+.7)*sin(t*.6+.5);
    mat2 m2=rot(t*1.4+.9)*cos(t*.8+.9);
    
    // light colors
    // vec3 l0c=vec3(1.,.3,1.);
    vec3 l1c=vec3(.1,.3,1.);
    // vec3 l2c=vec3(.1,1.,1.);
    // light positions
    // vec3 l0v=vec3(vec2(.11,5.)*m0,1.5);
    vec3 l1v=vec3(vec2(1.,2.)*m1,1.5);
    // vec3 l2v=vec3(vec2(.00,1.)*m2,1.5);
    // light intensity
    // float li0=pow(distance(uv,l0v.xy),-1.4);
    float li1=pow(distance(uv,l1v.xy),-1.4);
    // float li2=pow(distance(uv,l2v.xy),-1.4);
    
    vec3 rc=vec3(.05+n0*n0*n0*n0*.1);
    rc+=pow(max(.0,n.z),2.)*.12;
    // rc+=light(l0v,l0c,n,uv);
    rc+=light(l1v,l1c,n,uv);
    // rc+=light(l2v,l2c,n,uv);
    c=over(vec4(rc,1.),c);
    
    // light dots
    // c.rgb+=l0c*li0*.004+li0*n0*.008;
    c.rgb+=l1c*li1*.004+li1*n0*.008;
    // c.rgb+=l2c*li2*.004+li2*n0*.008;
    
    gl_FragColor=c;
}`;
