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

    float scale = 20.; // 15.
    float offset = 7.;
    // offset += u_time * 0.005;

    vec2 st = uv * scale + offset;
    st.y += 3.2;
    st.x += 7.3;
    vec3 color = vec3(1.0);

    float layer = pattern(st);

    int paletteCount = 2;
    float palette = paletteCount * 1.;

    color = vec3(0.549, 0.8941, 0.7216);
    if (layer > .1 * palette) {
        color = vec3(0.4314, 0.8314, 0.6667);
    }
    if (layer > .2 * palette) {
        color = vec3(0.3451, 0.7608, 0.5882);
    }
    if (layer > .3 * palette) {
        color = vec3(0.3216, 0.7137, 0.5843);
    }


    return vec4(color, 1.0);
}


float pattern(in vec2 st) {

    float offset = 1.;
    // offset *= u_time * 0.5;
    float density = 10.; // 20.

    // float l1 = noise(st + offset) * .05;
    // float l2 = noise(st * density * l1);
    float l1 = noise(st + offset) * .005;
    float l2 = noise(st + offset * l1) * .05;
    float l3 = noise(st * density * l2);

    // return l2;
    return l3;
}