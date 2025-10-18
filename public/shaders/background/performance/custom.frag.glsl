varying float vNoise;
varying vec2 vUv;
uniform float uTime;
uniform float uSpeed;

// Faster 2D noise alternative
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
    vec3 colors[5];
    colors[0] = vec3(0.678, 0.847, 0.902);
    colors[1] = vec3(1.000, 0.678, 0.729);
    colors[2] = vec3(0.725, 0.616, 0.812);
    colors[3] = vec3(0.973, 0.729, 0.467);
    colors[4] = vec3(0.537, 0.741, 0.855);

    // Reduced from 3 to 2 octaves for better performance
    float colorNoise = 0.0;
    float scale = 0.15;

    // Pre-calculate time-based values
    float t1 = uTime * uSpeed * 0.05;
    float t2 = uTime * uSpeed * 0.2;

    // First octave
    vec2 coord1 = vUv * vec2(20.0 * scale, 12.0 * scale);
    float n1 = noise2D(vec2(coord1.x * 0.4 + t1, coord1.y * 0.6 + t2));
    colorNoise += n1 * 0.5;

    // Second octave
    scale *= 1.5;
    vec2 coord2 = vUv * vec2(20.0 * scale, 12.0 * scale);
    float t3 = uTime * uSpeed * 1.65;
    float t4 = uTime * uSpeed * 2.2;
    float n2 = noise2D(vec2(coord2.x * 0.4 + t3, coord2.y * 0.6 + t4 + 50.0));
    colorNoise += n2 * 0.5;

    colorNoise = colorNoise * 0.5 + 0.5;
    float t = colorNoise * 5.0;

    int idx = int(floor(t));
    float frac = fract(t);

    vec3 color = mix(colors[idx], colors[min(idx + 1, 4)], frac);

    gl_FragColor = vec4(color, 1.0);
}