#version 300 es

#include "lib.glsl"

vec4 program() {
    
    vec3 color = vec3(
        abs(cos(st.x + mx.x)),
        abs(sin(st.y + mx.y)),
        abs(sin(u_time))
    );
    
    return vec4(color, 1.0);
    
}