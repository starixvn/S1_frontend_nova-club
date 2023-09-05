export const movingFrameV1 = `
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float u_time;

void main() {
  vec4 color = texture2D(uSampler, vTextureCoord);

  // Calculate the circular movement of the light direction
  float radius = 0.5; // Adjust the radius of the circular movement
  float speed = 0.5; // Adjust the speed of the circular movement
  float angle = u_time * speed;
  vec3 lightDirection = normalize(vec3(0.5, 0.5, 1.0));
  
  float lightness = dot(color.rgb, lightDirection);

  // Add animation to the color
  float animation = sin(u_time * 0.1) * 0.5 + 0.5;
  vec3 lightYellow = vec3(1.0, 1.0, 0.5);
  vec3 gold = vec3(1.0, 0.3, 0.0);
  vec3 animatedColor = mix(lightYellow, gold, animation);

  // Apply glowing effect
  float glowStrength = sin(u_time*0.1); // Adjust the strength of the glow
  vec3 glowColor = vec3(1.0, 0.5, 1);
  vec3 glowingColor = mix(animatedColor, lightYellow, glowStrength);

  gl_FragColor = vec4(glowingColor * lightness, color.a);
  
}`;
