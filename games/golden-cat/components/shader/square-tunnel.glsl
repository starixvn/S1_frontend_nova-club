precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;

void main()
{
    vec2 p=-1.+2.*gl_FragCoord.xy/u_resolution.xy;
    
    float r=pow(pow(p.x*p.x,16.)+pow(p.y*p.y,16.),1./32.);
    float a=atan(p.y,p.x);
    
    vec2 uv=vec2(u_time+.5/r,a/3.1415927);
    
    float h=sin(32.*uv.y);
    uv.x+=.85*smoothstep(-.1,.1,h);
    
vec3 goldColor = vec3(1.0, 0.84, 0.0); // Shiny gold color
vec3 reflectionColor = vec3(1.0); // Color of the light reflection

// Calculate the reflection factor based on the value of p.x/p.y
float reflectionFactor = smoothstep(0.9, 1.1, abs(p.x/p.y));

// Mix the gold color and the reflection color based on the reflection factor
vec3 col = mix(goldColor, reflectionColor, reflectionFactor);
    
    r*=1.-.3*(smoothstep(0.,.3,h)-smoothstep(.3,.96,h));
    
    gl_FragColor=vec4(col*r*r*1.2,1.);
}