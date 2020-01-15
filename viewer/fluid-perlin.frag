#include "lib.frag"
#include "noise.frag"

// vec2 fluidWarp(in vec2 st);
// vec2 fluidWarpSlope(in vec2 p);

const vec2 center = vec2(0.5);

// float tmap(float scale) {
//     return .5 * sin(u_time * scale) + .5;
// }
// float slowTime(float speed) {
//     return u_time * (1. / speed);
// }

vec4 program() {
    
    float scale = 5.0; // 15.
    float offset = 0.0;
    offset += u_time * 0.1;
    
    vec2 st = uv * scale + offset;
    vec3 color = vec3(1.0);
    
    vec2 fl = fluidWarp(st);
    
    // color *= perlin(st * 10.);
    color.r *= perlin(fl * 10.0 + slowTime(1.));
    color.g *= perlin(fl * 10.0 + slowTime(2.));
    color.b *= perlin(fl * 10.0 + slowTime(3.));
    color *= perlin(fl) * 2.;

    return vec4(color, 1.0);
}

// vec2 fluidWarp(in vec2 st) {
//     vec2 p = st;
//     //float t = 0.5 * sin(u_time) + 0.5;
//     int iterations = 100;
    
//     for(int i = 0; i < iterations; i ++ ) {
//         p += fluidWarpSlope(p);
//     }
    
//     return p;
// }


// // Optimise this
// vec2 fluidWarpSlope(in vec2 p) {
//     float h = 0.1;
//     float mag = 0.01;

//     float u = perlin(p);
//     float dx = perlin(p + vec2(h, 0.0)) - u;
//     float dy = perlin(p + vec2(0.0, h)) - u;
//     vec2 v = vec2(dy, -dx);
//     v *= mag * 10.;
//     return v;
// }


// vec2 perlinSlope(in vec2 p) {
//     float h = 0.1;
//     float mag = 0.01;
//     float dx = (perlin(p + vec2(h, 0.0)) - perlin(p)) / h;
//     float dy = (perlin(p + vec2(0.0, h)) - perlin(p)) / h;
//     return vec2(dy * mag, -dx * mag);
// }