varying float vNoise;

void main() {
    vec3 colors[5];
    colors[0] = vec3(0.678, 0.847, 0.902);
    colors[1] = vec3(1.000, 0.753, 0.796);
    colors[2] = vec3(0.608, 0.792, 0.882);
    colors[3] = vec3(0.957, 0.682, 0.725); 
    colors[4] = vec3(0.729, 0.871, 0.933);

    float t = clamp(vNoise, 0.0, 1.0) * 10.0;

    int idx = int(floor(t));
    float frac = fract(t);

    vec3 color = mix(colors[idx], colors[min(idx + 1, 4)], frac);

    gl_FragColor = vec4(color, 1.0);
}