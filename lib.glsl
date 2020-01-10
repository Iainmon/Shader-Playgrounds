precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_texture_0;
uniform vec3 u_camera;

out vec4 outputColot;

vec2 coord(in vec2 p) {
    p = p / u_resolution.xy;
    if (u_resolution.x > u_resolution.y) {
        p.x *= u_resolution.x / u_resolution.y;
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
    }else {
        p.y *= u_resolution.y / u_resolution.x;
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
    }
    p -= 0.5;
    p *= vec2(-1.0, 1.0);
    return p;
}
#define uv gl_FragCoord.xy / u_resolution.xy
#define mx coord(u_mouse)
#define rx 1.0 / min(u_resolution.x, u_resolution.y)

void setup();
vec4 program();
void main() {
    // gl_FragColor = program();
    outputColot = program();
}

vec2 rotate(vec2 origin, vec2 position, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    
    position.x -= origin.x;
    position.y -= origin.y;
    
    float xnew = position.x * c - position.y * s;
    float ynew = position.x * s + position.y * c;
    
    return vec2(xnew + origin.x, ynew + origin.y);
}