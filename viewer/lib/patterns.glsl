
// -- Shapes --

float box(vec2 st, vec2 size, float smoothEdges) {
    size = vec2(0.5) - size * 0.5;
    vec2 aa = vec2(smoothEdges * 0.5);
    vec2 uv = smoothstep(size, size + aa, st);
    uv *= smoothstep(size, size + aa, vec2(1.0) - st);
    return uv.x * uv.y;
}

float circle(in vec2 st, float radius) {
    vec2 pos = vec2(0.5) - st;
    radius *= 0.75;
    return 1.0 - smoothstep(radius - (radius * 0.05), radius + (radius * 0.05), dot(pos, pos) * 3.14);
}

// 2., 2.5, .3, .5 -- starting at param size
float radialShape(in vec2 st, float size, float points, float innerRadius, float outerRadius) {
    vec2 pos = vec2(0.5) - st;
    
    size *= 0.75;
    float r = length(pos) * size;
    float a = atan(pos.y, pos.x);
    
    float field = abs(cos(a * points)) * outerRadius + innerRadius;
    
    float shape = 1.0 - smoothstep(field, field + 0.01, r);
    return shape;
}

float flower(in vec2 st, float radius) {
    return radialShape(st, radius, 2.5, .3, .5);
    // return radialShape(st, radius, 2.5, .3, .5);
}

// -- Patterns --

float daimonds(in vec2 st) {
    
    st = rotate(st, PI * 0.25);
    
    return box(st, vec2(0.5), 0.01);
}

float circles(in vec2 st, float radius) {
    return circle(st + vec2(0.0, - 0.5), radius) +
    circle(st + vec2(0.0, 0.5), radius) +
    circle(st + vec2(-0.5, 0.0), radius) +
    circle(st + vec2(0.5, 0.0), radius);
}

float flowers(in vec2 st, float radius) {
    return flower(st + vec2(0.0, - 0.5), radius) +
    flower(st + vec2(0.0, 0.5), radius) +
    flower(st + vec2(-0.5, 0.0), radius) +
    flower(st + vec2(0.5, 0.0), radius);
}