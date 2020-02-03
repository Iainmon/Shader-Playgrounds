#include "lib/runtime.glsl"
#include "lib/noise.glsl"
#include "lib/space.glsl"
#include "lib/patterns.glsl"

#define blue vec3(0.075, 0.114, 0.329)


// Palleted domain warping

void program(inout vec3 color) {
    vec2 st = uv;
    vec3 foreground = vec3(st, .65);

    float scale = 10.;
    float zoffset = 0.;

    float mesa = perlin(st * scale) * abs(sin(u_time));
    // mesa = perlin(st + mesa);

    vec3 pallet[4];
    pallet[0] = vec3(0.8549, 0.7294, 0.4863);
    pallet[1] = vec3(0.7686, 0.1569, 0.1569);
    pallet[2] = vec3(0.8863, 0.6039, 0.0745);
    pallet[3] = vec3(0.0275, 0.5882, 0.5412);

    for (int i = 0; i < pallet.length(); i++) {
        float swatch = (mesa * pallet.length()) + pallet.length() / 2;
        if (swatch > i) {
            foreground = pallet[i];
        }
    }

    // color *= mix(blue, foreground, mesa);
    color *= foreground;


}


// void program(inout vec3 color) {
    
//     vec2 st = uv;
    
//     float warp = 0.5 * perlin(st + perlin(st + u_time));
    
//     vec3 flowerColor = vec3(st, 0.65);
//     vec2 l0 = st * (0.1 * warp + 1.0);

//     float t = 2. * sin(u_time) + .5;
//     float nt = .2 * sin(u_time) + .5;

//     vec2 l1 = tile(st, 3.);
//     l1 = rotate(l1, u_time * 2);
//     float outerFlower1 = radialShape(l1, 3., 3., .3, .5);
//     float innerFlower1 = radialShape(l1, 9. * nt, 3., .1, .5);
//     float circle1 = circle(l1, nt * 0.01);

//     color *= mix(blue, flowerColor, circle1 + outerFlower1 - innerFlower1);
    
// }
