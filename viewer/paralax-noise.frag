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

const vec2 center = vec2(0.5);

vec4 program() {

    float t = sin(u_time);
    float at = abs(t);
    float nt = u_time * 0.5;

    float scale = 15.;
    float offset = 1.;

    vec2 st = uv * scale + offset;
    vec3 color = vec3(1.0);

    float u = noise(st) * 0.1;

    vec2 ux = noise(st + nt * u);
    vec2 uy = noise(st + nt * u + 1.);
    vec2 uz = noise(st + nt * u + 2.);

    // color.rg *= sin(st * 10. * u); // sin(st + (u * 1090.))
    // color.r *= sin(st * ux); // sin(st + (u * 1090.))
    // color.g *= sin(st * uy); // sin(st + (u * 1090.))
    // color.b *= sin(st * uz);


    color.r *= noise(st * ux);
    color.g *= noise(st * uy);
    color.b *= noise(st * uz);


    return vec4(color, 1.0);
}
