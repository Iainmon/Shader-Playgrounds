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
    float nt = u_time * 0.05; // Normalized time

    float scale = 3.;
    float offset = 1.;

    vec2 st = uv * scale + offset;
    vec3 color = vec3(0.0);

    // Layer offset values are arbitrary

    vec2 q = vec2(fbm(st + vec2(5.1, 3.0)), fbm(st + vec2(5.2, 1.3)));
    q *= 5.0; // Layer weight
    // Middle layer (r) uses scaled-down-time (nt)
    vec2 r = vec2(fbm(st + q + vec2(3.7, 5.6) * nt), fbm(st + q + vec2(7.1, 4.8)));
    r *= .5;
    vec2 s = vec2(fbm(st + r + vec2(1.6, 7.2)), fbm(st + r + vec2(4.5, 4.7) * nt * 0.6));
    s *= 1.2;
    

    vec2 row = uv;

    // Warp the domains
    row.y += fbm(s + nt + fbm(uv + s));
    // row.y += fbm(fbm(uv + s)); // Original one
    // row.y += fbm(fbm(uv + q + nt));
    // row.y += fbm( uv + fbm(uv * q + nt));
    // row.y += fbm(s + nt + fbm(uv + s));
    // row.y += fbm(uv + s);

    row *= 8.; // Ring/layer density


    // Apply the colors
    color = mix(vec3(0.7333, 0.4863, 0.1216), vec3(0.5451, 0.2588, 0.1725), sin(row.y * 2.6));
    color = mix(color, vec3(0.3412, 0.6078, 0.7608), -sin(row.y * 1.4 + 10.1) * 0.6 );

    return vec4(color, 1.0);
}
