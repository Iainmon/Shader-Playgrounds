#version 300 es

#include "lib.glsl"

uniform float u_scale;
uniform float u_minimumDistance;
uniform float u_intensity;
uniform bool u_showDots;
uniform bool u_showGrid;

// uniform sampler2D u_texture_0;
uniform sampler2D u_texture_1;

int intensity(vec3 color);

const vec2 center = vec2(0.5);

const int radius = 9;
const int intensities = 50;

vec4 program() {
    
    float[intensities] levelPopularities;
    vec3[intensities] levelColorSums;

    for (int y = -radius; y <= radius; y++) {
        for (int x = -radius; x <= radius; x++) {

            vec2 offset = vec2(x, y) / u_resolution.xy;
            // vec2 location = uv.xy + offset;
            vec3 color = texture(u_texture_1, uv.xy + offset).xyz;

            int intensityLevel = intensity(color);

            levelPopularities[intensityLevel] += 1.0;
            levelColorSums[intensityLevel] += color;
        }
    }
    int maxIntensityIndex = 0;
    float largestValue = 0.;
    for (int i = 0; i < intensities; i++) {
        if (levelPopularities[i] > largestValue) {
            maxIntensityIndex = i;
            largestValue = levelPopularities[i];
        }
    }

    float popularity = largestValue;
    vec3 color = levelColorSums[maxIntensityIndex] / popularity;

    return vec4(color, 1.0);
}

 int intensity(vec3 color) {
    float average = ( color.x + color.y + color.z ) / 3.0;
    return int(average * float(intensities));
}