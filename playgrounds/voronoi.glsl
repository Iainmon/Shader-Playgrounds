#version 300 es

#include "lib.glsl"

uniform float u_scale;
uniform float u_minimumDistance;
uniform float u_intensity;
uniform bool u_showDots;
uniform bool u_showGrid;


vec2 random2(vec2 p);

const vec2 center = vec2(0.5);

vec4 program() {
    
    vec3 color = vec3(0.0);
    
    vec2 st = uv;
    st.x *= u_resolution.x / u_resolution.y;
    
    // Scale
    st *= u_scale * 100.0; // 5.0
    
    // Intensity
    float intensity = u_intensity;
    
    // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
    
    float m_dist = u_minimumDistance * 2.0;
    vec2 m_point = vec2(0.0); // Minimum point
    
    for (int j = -1; j <= 1; j ++ ) {
        for (int i = -1; i <= 1; i ++ ) {
            
            vec2 neighbor = vec2(float(i), float(j));
            vec2 point = random2(i_st + neighbor);
            
            // point = 0.5 + 0.5 * sin(u_time + 6.2831 * point);
            
            point = 0.5 + 0.5 * sin(u_time + 6.2831 * point) * intensity;
            
            vec2 diff = neighbor + point - f_st;
            float dist = length(diff);
            
            if (dist < m_dist) {
                m_dist = dist;
                m_point = point;
            }
        }
    }
    
    color += dot(m_point, vec2(0.3, 0.6));

    if (u_showDots) {
        color += 1.0 - step(0.05, m_dist);
    }
    
    if (u_showGrid) {
        color += step(.98, f_st.x) + step(.98, f_st.y);
    }

    vec2 rotated = rotate(center, uv, u_time);
    color *= vec3(rotated, abs(sin(u_time)));
    
    return vec4(color, 1.0);
}

vec2 random2(vec2 p) {
    return fract(
        sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) *
    43758.5453);
}
