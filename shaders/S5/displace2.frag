#version 330 core

in vec4 frontColor;
in vec2 st;
out vec4 fragColor;

uniform sampler2D heightMap;
uniform float smoothness = 25.0;
uniform mat3 normalMatrix;

void main()
{
    float epsilon = 1.0/128.0;
    float altura = texture(heightMap, st).r;
    float alturaX = texture(heightMap, st + vec2(epsilon, 0.0)).r;
    float alturaY = texture(heightMap, st + vec2(0.0, epsilon)).r;
    
    vec2 G = vec2(alturaX - altura, alturaY - altura) / epsilon;
    vec3 N_obj = normalize(vec3(-G.x, -G.y, smoothness));
    vec3 N_eye = normalize(normalMatrix * N_obj);
    fragColor = vec4(vec3(N_eye.z), 1.0);
}
