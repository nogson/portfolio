precision highp float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform sampler2D uTex3;
uniform float time;
uniform float scroll;
 
void main() {
  float alp = 0.0;
  vec4 texture1 = texture2D(uTex1, vec2(vUv.x, vUv.y));
  vec4 texture2 = texture2D(uTex2, vec2(vUv.x, vUv.y));
  vec4 texture3 = texture2D(uTex3, vec2(vUv.x, vUv.y));

  if(time * 0.5 < 1.0){
    gl_FragColor = (texture1 + texture2) * (time * 0.5);
  }else{
    gl_FragColor = (texture1 + texture2);
  }

  
 
}
