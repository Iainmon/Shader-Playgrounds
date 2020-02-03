#include "lib.frag"
#include "noise.frag"

uniform sampler2D u_tex0;

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

vec2 fwarp(in vec2 st);

vec4 program() {

    float scale = 7.; // 15.
    float offset = 70.;
    offset += u_time * 0.5;

    vec2 st = uv * scale + offset;
    // st.y += 3.2;
    // st.x += 7.3;
    vec3 color = vec3(1.0);

    float layer = pattern(fluidWarp(st));
    //vec2 fl = fwarp(fwarp(st) * fwarp(st) * 0.03);
    //float layer = pattern(st);

    int paletteCount = 1;
    float palette = paletteCount * 1.;

    color = vec3(0.4196, 0.4667, 0.502);
    // if (layer > .1 * palette) {
    //     color = vec3(0.4235, 0.5765, 0.6118);
    // }
    if (layer > .1 * palette) {
        color = vec3(0.4235, 0.5765, 0.6118);
    }
    if (layer > .2 * palette) {
        color = vec3(0.6667, 0.5765, 0.3765);
    }
    if (layer > .3 * palette) {
        color = vec3(0.6667, 0.4353, 0.3765);
    }

    // color *= perlin(fl * 2. + slowTime(10.));
    //color = texture2D(u_tex0, fl * 0.2 + 0.2).xyz;

    return vec4(color, 1.0);
}

float pattern(in vec2 st) {

    float offset = 1.;
    // offset *= u_time * 0.5;
    float density = 0.7; // 20.
    //density = tmap(1.7) + .5;

    float l1 = perlin(st + offset ) * .005;
    float l2 = perlin(st + offset * l1) * .05; // .05
    float l3 = perlin(st * density * l2);

    return l3;
    //return perlin(st * density);
}

vec2 fwarpdx(in vec2 p) {
    float h = 0.1;
    float mag = 0.01;

    float u = perlin(p);

    // float dx = pnoise(p + vec2(h, 0.0)) - u;
    // float dy = pnoise(p + vec2(0.0, h)) - u;
    // vec2 v = vec2(dy, -dx);
    // v *= mag * 10.;

    float dx = (perlin(p + vec2(h, 0.0)) - u) / h;
    float dy = (perlin(p + vec2(0.0, h)) - u) / h;
    vec2 v = vec2(dy, -dx);
    v *= mag;
    return v;
}

vec2 fwarp(in vec2 st) {
    vec2 p = st;
    //float t = 0.5 * sin(u_time) + 0.5;
    int iterations = 20;
    
    for(int i = 0; i < iterations; i ++ ) {
        p += fwarpdx(p * .5 * (u_time * 0.025));
    }
    


    return p;
}
