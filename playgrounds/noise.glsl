#version 300 es

#include "lib.glsl"

uniform float u_scale;
uniform float u_minimumDistance;
uniform float u_intensity;
uniform bool u_showDots;
uniform bool u_showGrid;

float random(in vec2 _st);
float noise(in vec2 _st);
float fbm(in vec2 _st);

const vec2 center = vec2(0.5);

vec4 program() {
    vec2 st = uv * 3.0;
    vec3 color = vec3(1.0);
    
    color *= fbm(st);
    
    return vec4(color, 1.0);
}

float noise(in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);
    
    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    
    // vec2 u = f * f * (3.0 - 2.0 * f);
    // return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    
    vec2 u = smoothstep(0.0, 1.0, f);
    
    float lr0 = mix(a, b, u.x);
    float lr1 = mix(c, d, u.x);
    return mix(lr0, lr1, u.y);
}

#define NUM_OCTAVES 6

float fbm(in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), - sin(0.5), cos(0.50));
    for(int i = 0; i < NUM_OCTAVES; ++ i) {
        v += a * noise(_st);
        //_st = rot * _st * 2.0 + shift;
        _st = _st * 2.0;
        a *= 0.5;
    }
    return v;
}

float random(in vec2 _st) {
    return fract(sin(dot(_st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}