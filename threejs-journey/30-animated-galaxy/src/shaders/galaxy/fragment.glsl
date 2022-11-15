varying vec3 vColor;

void main()
{
  // to draw a filled circle
  // float strength = 1.0 - step(0.5, distance(gl_PointCoord, vec2(0.5)));

  // diffuse point
  // float strength = 1.0 - distance(gl_PointCoord, vec2(0.5)) * 2.0;

  // Light point
  float strength = distance(gl_PointCoord, vec2(0.5));
  strength = 1.0 - strength;
  strength = pow(strength, 10.0);

  // Final
  vec3 color = mix(vec3(0.0), vColor, strength);

  gl_FragColor = vec4(color, 1.0);
}