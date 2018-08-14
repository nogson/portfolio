precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform float time;
uniform float scroll;
uniform float uIndex;
uniform float uAlpha;
 
void main() {
  // frequency, amplitude, speedは任意の数値
  float speed = 1.25;
  float frequency = 0.04 ;
  float amplitude = 0.04;

  float offsetX = sin(gl_FragCoord.x * frequency + time * speed + scroll * 0.01) * amplitude ;
  float offsetY = cos(gl_FragCoord.y * frequency + time * speed - scroll * 0.01) * amplitude;
  vec4 texture1 = texture2D(uTex1, vec2(vUv.x + offsetX + offsetY, vUv.y + offsetX + offsetY));
  texture1 = vec4(1.0 - (vec3(texture1.r + texture1.g + texture1.b)/3.0 * 3.0),1.0);



  gl_FragColor = texture1;
 
}
