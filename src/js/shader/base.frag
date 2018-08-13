precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex;
uniform float time;
 
void main() {
  // frequency, amplitude, speedは任意の数値
  float speed = 1.25;
  float frequency = 0.04;
  float amplitude = 0.04;

  float offsetX = sin(gl_FragCoord.x * frequency + time * speed) * amplitude ;
  float offsetY = cos(gl_FragCoord.y * frequency + time * speed) * amplitude ;
  vec4 dest = texture2D(uTex, vec2(vUv.x + offsetX + offsetY, vUv.y + offsetX + offsetY));
  vec3 gray = 1.0 - (vec3(dest.r + dest.g + dest.b)/3.0 * 3.0);
  gl_FragColor = vec4(gray ,1.0);
 
}
