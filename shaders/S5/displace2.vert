#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec2 st;

uniform mat4 modelViewProjectionMatrix;

uniform sampler2D heightMap;
uniform float scale = 0.05;

void main()
{
    st = 0.49 * vertex.xy + vec2(0.5);
    float r = texture(heightMap, st).r;
    vec3 newVertex = vertex + normal * (scale * r);
    gl_Position = modelViewProjectionMatrix * vec4(newVertex, 1.0);
}
