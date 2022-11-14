uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

uniform vec3 uFogColor;

uniform float uFogNear;
uniform float uFogFar;

varying float vElevation;
varying vec4 vPosition;

void main()
{
  float mixStrength = vElevation * uColorMultiplier + uColorOffset;
  float fogDistance = length(vPosition);
  float fogAmount = smoothstep(uFogNear, uFogFar, fogDistance);
  vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
  vec3 finalColor = mix(color, uFogColor, fogAmount);
  
  gl_FragColor = vec4(vec3(finalColor), 1.0);
}