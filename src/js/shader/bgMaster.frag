precision highp float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform sampler2D uTex3;
uniform float time;
uniform float scroll;
uniform vec2 docsize;

float random(vec2 pos) {
	return fract(sin(dot(pos.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  float alp = 0.0;
  vec4 texture1 = texture2D(uTex1, vec2(vUv.x, vUv.y));
  vec4 texture2 = texture2D(uTex1, vec2(vUv.x + sin(time)*0.01 , vUv.y+ sin(time)*0.03));
  vec4 texture3 = texture2D(uTex1, vec2(vUv.x + cos(time)*0.03, vUv.y+ cos(time)*0.01));
  
  vec4 color = vec4(0.0);
  if(time * 0.5 < 1.0){
    color =vec4(texture1.r , texture2.g , texture3.b,1.0) * (time * 0.5);
  }else{
    color =vec4(texture1.r , texture2.g , texture3.b,1.0);
  }

  gl_FragColor = color;
 
}
