#ifdef GL_ES
precision highp float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
varying vec2 vUv;
uniform sampler2D texture;
uniform float scroll;
uniform float alpha;

float snow(vec2 uv,float scale,float noise)
{
	float w=smoothstep(1.,0.1,-uv.y*(scale/10.));
	if(w<.1) {
		return 0.;
	}
	uv+=time/scale;
	uv.y+=(time*2./scale) * (1.0 - resolution.y / noise);
	uv.x+=sin(uv.y+time*.5)/scale * (1.0 - resolution.y / noise);
	uv*=scale;
	vec2 s=floor(uv),f=fract(uv),p;
	float k=3.,d;
	p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(vec2(7,3),vec2(6,5)))*5.))-f;
	d=length(p);
	k=min(d,k);
	k=smoothstep(0.,k,sin(f.x+f.y)*0.01);
    	return k*w;
}

float random(vec2 pos) {
	return fract(sin(dot(pos.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main(void){

    float noise = scroll;
    float r = random(vec2(scroll*0.1));
    if( r > 0.93){
        noise = - 1.0;
        
    }

	vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y); 
	vec3 finalColor=vec3(0);
	float c=smoothstep(1.,0.3,clamp(uv.y*.3+.8,0.,.75));
    float a = 1.0 - resolution.y / noise;
	c = 0.;
	c+=snow(uv,30.,noise)*.3 * a * (noise * -0.001);
	c+=snow(uv,20.,noise)*.5 * a;
	c+=snow(uv,15.,noise)*.8 * a * (noise * -0.001);
	c+=snow(uv,8.,noise) * a;
	c+=snow(uv,6.,noise) * a * (noise * -0.001);
	c+=snow(uv,5.,noise) * a;
	finalColor=(vec3(c));
	gl_FragColor = vec4(finalColor*0.003,a);
}