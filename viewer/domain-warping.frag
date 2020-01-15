#include "lib.frag"

uniform float u_scale;
uniform float u_minimumDistance;
uniform float u_intensity;
uniform bool u_showDots;
uniform bool u_showGrid;

float rand(in vec2 st) {
    return fract(sin(dot(st, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u * u * (3.0 - 2.0 * u);
    
    float res =
    mix(mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
    mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
    return res * res;
}

#define NUM_OCTAVES 5

float fbm(in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), - sin(0.5), cos(0.50));
    for(int i = 0; i < NUM_OCTAVES; ++ i) {
        v += a * noise(_st);
        _st = rot * _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

const vec2 center = vec2(0.5);

vec4 program() {

    float t = sin(u_time);
    float at = abs(t);
    float nt = u_time * 0.05;

    float scale = 4.;
    float offset = 1.;

    vec2 st = uv * scale + offset;
    vec3 color = vec3(1.0);
    
    
    vec2 q = vec2(fbm(st + vec2(0.0, 0.0)), fbm(st + vec2(5.2, 1.3)));
    q *= 1.5; // Change me
    
    // Middle layer uses scaled-down-time
    vec2 r = vec2(fbm(st + q + vec2(3.7, 5.6) * nt), fbm(st + q + vec2(7.1, 4.8)));
    r *= 1.; // Change me
    
    vec2 s = vec2(fbm(st + r + vec2(1.6, 7.2)), fbm(st + r + vec2(4.5, 4.7)));
    s *= 2.; // Change me

    float grey = fbm(st * fbm(st + s));
    color *= grey;
    
    float dis = t * 0.5;
    dis = 0.0;
    
    color.r *= fbm(q + dis);
    color.g *= fbm(r + dis);
    color.b *= fbm(s + dis);


    color *= 4.; // Change me
    
    // color *= fbm(q + grey + nt) * 3.5;
    
    return vec4(color, 1.0);
}
