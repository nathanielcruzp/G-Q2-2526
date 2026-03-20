#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;
out vec3 viewSpacePos;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

void main()
{
    frontColor = vec4(color,1.0);
    vtexCoord = texCoord;
    vec4 viewSpacePos4 = modelViewMatrix * vec4(vertex, 1.0);
    viewSpacePos = viewSpacePos4.xyz;
    gl_Position = projectionMatrix * viewSpacePos4;
}
