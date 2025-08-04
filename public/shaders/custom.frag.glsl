varying float vNoise;

void main() {
    vec3 colors[5];
    colors[0] = vec3(1.000, 0.788, 0.910);
    colors[1] = vec3(0.788, 0.910, 1.000);
    colors[2] = vec3(0.824, 0.651, 1.000);
    colors[3] = vec3(0.984, 0.769, 1.000);
    colors[4] = vec3(0.769, 0.914, 1.000);

    float t = clamp(vNoise, 0.0, 1.0) * 4.0;

    int idx = int(floor(t));
    float frac = fract(t);

    vec3 color = mix(colors[idx], colors[min(idx + 1, 4)], frac);

    gl_FragColor = vec4(color, 1.0);
}