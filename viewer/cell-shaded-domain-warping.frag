#include "lib.frag"

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

float pattern(in vec2 st);

const vec2 center = vec2(0.5);

vec4 program() {

    float scale = 15.;
    float offset = 1.;

    vec2 st = uv * scale + offset;
    vec3 color = vec3(1.0);

    float layer = pattern(st);

    float thresh = abs( sin(u_time * 0.5) * .9);
    float range = floor(layer * 2. + thresh); // Swatch id/loaction/bounds

    if (range <= 1.) {
        color = vec3(0.8588, 0.4941, 0.0118);
    } else if (range <= 2.) {
        color = vec3(0.8196, 0.7412, 0.6235);
    } else {
        color = vec3(0.102, 0.5255, 0.6549);
    }

    color.r *= floor(layer + thresh);
    color.g *= floor(layer + thresh);
    color.b *= floor(layer + thresh);

    // color *= noise(layer);
    // color *= layer;

    return vec4(color, 1.0);
}


float pattern(in vec2 st) {

    float offset = 1.;
    float density = 30.;

    float l1 = noise(st + offset) * .1;
    float l2 = noise(st * density * l1);

    return l2;
}