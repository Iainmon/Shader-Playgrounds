#include "lib/runtime.glsl"
#include "lib/noise.glsl"
#include "lib/space.glsl"
#include "lib/patterns.glsl"

void program(inout vec3 color) {

    // float scale = 7.;
    // float offset = 70.;
    // offset += u_time * 0.5;

    // vec2 st = uv * scale + offset;

    vec2 st = uv;
        color = vec3(st, 0.5);
    // // st = tile(st, 4.);
    // st = rotate(st, PI * 0.25);

    // // color *= box(st, vec2(.7), 0.7);
    float warp = .5*perlin(st + perlin(st + u_time)) + .5;
    st *= .2 * warp + 2.;
    st = tile(st, 4.);

    color *= circles(st, .3);

    // rotate(st, vec2(0.5),sin(u_time));

    //color *= perlin(st);
}
