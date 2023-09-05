export const movingFrameV2 = `  precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float u_time;
uniform vec2 u_resolution;


void main() {
  vec4 color = texture2D(uSampler, vTextureCoord);
  vec2 p = (gl_FragCoord.xy-u_resolution.xy)/u_resolution.y;
  float tau = 3.1415926535*2.0;
  float a = atan(p.x,p.y);
  float r = length(p);
  vec2 uv = vec2(a/tau,r);

//get the color
float xCol = (uv.x - (u_time / 3.0)) * 4.0;
xCol = mod(xCol, 3.0);
vec3 horColour = color.rgb;

if (xCol < 1.0) {
  
  color.r += 1.0 - xCol;
  horColour.g += xCol;
}
else if (xCol < 2.0) {
  
  xCol -= 1.0;
  horColour.g += 1.0 - xCol;
  horColour.b += xCol;
}
else {
  
  xCol -= 1.0;
  horColour.b += 1.0 - xCol;
  horColour.r += xCol;
}

// draw color beam
uv = uv;
float beamWidth = (0.7+0.5*cos(uv.x*tau*0.15*floor(cos(u_time)))) * abs(1.0 / (30.0 * uv.y));
vec3 horBeam = vec3(beamWidth);
gl_FragColor =color*8.*vec4(((horBeam) * horColour), 1.0);

}`;
//https://www.shadertoy.com/view/XdlSDs
