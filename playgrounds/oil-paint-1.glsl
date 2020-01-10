#version 300 es

#include "lib.glsl"

uniform float u_scale;
uniform float u_minimumDistance;
uniform float u_intensity;
uniform bool u_showDots;
uniform bool u_showGrid;

uniform sampler2D u_texture_1;


vec2 random2(vec2 p);

const vec2 center = vec2(0.5);

const int radius = 1;
const int intensities = 20;

vec3 sampleTexture(vec2 coordinate) {
    return texture(u_texture_1, coordinate.xy).xyz;
}

vec3 averageKernel(vec2 coordinate, int radius) {

    vec3 sum = vec3(0.0);

    for (int y = -radius; y <= radius; y++) {
        for (int x = -radius; x <= radius; x++) {
            vec2 sampleOffset = vec2(x, y) / u_resolution.xy;
            vec2 sampleLocation = coordinate + sampleOffset;
            vec3 color = sampleTexture(sampleLocation);
            sum += color / 3.0;
        }
    }

    vec3 average = sum / float(radius * radius);
    return average;
}

vec4 program() {
    
    // vec3 color = sampleTexture(uv * abs(sin(u_time))); // texture(u_texture_1, uv.xy).xyz;
    // vec3 color = averageKernel(uv.xy, 3);
    vec3 color = averageKernel(uv * abs(sin(u_time)), 3);

    return vec4(color, 1.0);
}

vec2 random2(vec2 p) {
    return fract(
        sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) *
    43758.5453);
}





