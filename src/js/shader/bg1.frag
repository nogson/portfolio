precision mediump float;

varying vec2 vUv;
uniform sampler2D texture;
uniform float time;
uniform float scroll;
uniform float alpha;
 
void main() {
  // frequency, amplitude, speedは任意の数値
  float speed = 1.25;
  float frequency = 0.04 ;
  float amplitude = 0.04;

  float offsetX = sin(gl_FragCoord.x * frequency + time * speed + scroll * 0.01) * amplitude ;
  float offsetY = cos(gl_FragCoord.y * frequency + time * speed - scroll * 0.01) * amplitude;
  vec3 color = texture2D(texture, vec2(vUv.x + offsetX + offsetY, vUv.y + offsetX + offsetY)).rgb;
  color = 1.0 - vec3(color.r + color.g + color.b)/3.0 * 3.0;

  gl_FragColor = vec4(color,alpha);
 
}
