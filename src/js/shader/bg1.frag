#ifdef GL_ES
precision highp float;
#endif

#define NUM_OCTAVES 8

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
varying vec2 vUv;
uniform sampler2D texture;
uniform float scroll;
uniform float alpha;


mat3 rotX(float a) {
	float c = cos(a);
	float s = sin(a);
	return mat3(
		1, 0, 0,
		0, c, -s,
		0, s, c
	);
}
mat3 rotY(float a) {
	float c = cos(a);
	float s = sin(a);
	return mat3(
		c, 0, -s,
		0, 1, 0,
		s, 0, c
	);
}

float random(vec2 pos) {
	return fract(sin(dot(pos.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 pos) {
	vec2 i = floor(pos);
	vec2 f = fract(pos);
	float a = random(i + vec2(0.0, 0.0));
	float b = random(i + vec2(1.0, 0.0));
	float c = random(i + vec2(0.0, 1.0));
	float d = random(i + vec2(1.0, 1.0));
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 pos) {
	float v = 0.0;
	float a = 0.5;
	float mat = 0.0;

	//回転行列
	mat2 rot = mat2(cos(mat), sin(mat), -sin(mat), cos(mat));
	for (int i=0; i<NUM_OCTAVES; i++) {
		v += a * noise(pos);
		pos = rot * pos * 2.0;
		//a *= 0.5 + sin(time * 0.25)*0.1;
		a *= 0.5;
	}
	return v ;
}


void main(void) {
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

	float t = 0.0;
	float d;		
	vec2 q = vec2(0.0);
	q.x = fbm(p + vec2(1.0));
	q.y = fbm(p + vec2(1.0));
	
	vec2 r = vec2(0.0);
	r.x = fbm(p + 1.0 * q + 0.15 * time + (scroll * 0.001))+ (scroll * 0.0001) + noise(vec2(scroll))* 0.01;
	r.y = fbm(p + 1.0 * q + 0.126 * time+ (scroll * 0.001))+ (scroll * 0.0001)+ noise(vec2(scroll))* 0.01;
	
	float f = fbm(p + r);
	vec3 color = mix(
		vec3(0.101961, 0.619608, 1.666667),
		vec3(0.666667, 0.666667, 1.498039),
		clamp((f * f) * 4.0, 0.0, 1.0)
	);

	color = vec3((color.x + color.y + color.z)*0.5);

	color = 1.0 - (f *f * f + 0.6 * f * f + 0.5 * f) * color;

	// if(color.r > 0.1 && color.r < 0.11){
	// 		color = color * alpha + vec3(1.0) * (1.0 - alpha);
	// }else{
	// 		color = color * alpha + vec3(0.0) * (1.0 - alpha);
	// }		
	
	gl_FragColor = vec4(color, 1.0);
}


