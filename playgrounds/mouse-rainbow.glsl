#version 300 es

#include "lib.glsl"

const vec2 center = vec2(0.5);

vec4 program() {

    vec2 st = uv;
    st.x *= u_resolution.x / u_resolution.y;

    vec3 color = vec3(0.0);
    //color = vec3(st.x, st.y, abs(sin(u_time)));

    vec2 rotatedUV = rotate(center, uv, - atan(u_mouse.y - 0.5, u_mouse.x - 0.5));
    color = vec3(rotatedUV, abs(sin(u_time)));

    return vec4(color, 1.0);


}