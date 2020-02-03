#include "lib/runtime.glsl"
#include "lib/noise.glsl"
#include "lib/space.glsl"
#include "lib/patterns.glsl"

#define deepBlue vec3(0.075, 0.114, 0.329)

void program(inout vec3 color) {
    
    vec2 st = uv;
    
    float warp = 0.5 * perlin(st + perlin(st + u_time)) + 0.5;
    
    // color = vec3(st, 0.5);
    color *= vec3(st, 0.5);
    vec2 l0 = st * (0.2 * warp + 2.0);
    
    // st = tile(st, 3.0);
    // float outerFlower = radialShape(st, 3., 3., .3, .5);
    // float innerFlower = radialShape(st, 3., 3., .1, .5);
    // float circle = circle(st, .01);
    // color *= mix(deepBlue, vec3(1.0), circle + outerFlower - innerFlower);

    vec2 l1 = tile(l0, 1.);
    float outerFlower1 = radialShape(l1, 3., 3., .3, .5);
    float innerFlower1 = radialShape(l1, 3., 3., .1, .5);
    float circle1 = circle(l1, .01);
    color *= mix(deepBlue, vec3(1.0), circle1 + outerFlower1 - innerFlower1);
    
    // vec2 l2 = tile(l0, 2.5);
    // float outerFlower2 = radialShape(l2, 3., 2.5, .3, .5);
    // float innerFlower2 = radialShape(l2, 3., 2.5, .1, .5);
    // float circle2 = circle(l2, .01);
    // color *= mix(deepBlue, vec3(1.0), innerFlower2);

    // l0 = tile(l0, 1.);
    // color *= mix(deepBlue, vec3(1.0), circle(l0, .5) - circle(l0, .2));

}

// void program(inout vec3 color) {
    
//     vec2 st = uv;
    
//     float warp = 0.5 * perlin(st + perlin(st + u_time)) + 0.5;
    
//     color = vec3(st, 0.5);
//     // color *= vec3(st * warp, 0.5);
//     st *= 0.2 * warp + 2.0;
    
//     // st = tile(st, 4.0);
//     // color *= flowers(st, 4.);
    
//     st = tile(st, 3.0);
//     float outerFlower = radialShape(st, 3., 3., .3, .5);
//     float innerFlower = radialShape(st, 3., 3., .1, .5);
//     float circle = circle(st, .01);
//     color *= mix(deepBlue, vec3(1.0), circle + outerFlower - innerFlower);

// }


// void program(inout vec3 color) {
    
//     vec2 st = uv;
    
//     float warp = 0.5 * perlin(st + perlin(st + u_time)) + 0.5;
    
//     color = vec3(st, 0.5);
//     color *= vec3(st * warp, 0.5);
//     st *= 0.2 * warp + 2.0;
    
//     // st = tile(st, 4.0);
//     // color *= flowers(st, 4.);
    
//     st = tile(st, 4.0);
//     color *= mix(vec3(0.075, 0.114, 0.329), vec3(1.0), circles(st, 0.2) - circles(st, 0.1));
// }
