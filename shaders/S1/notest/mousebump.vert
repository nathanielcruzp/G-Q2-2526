#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform int test = 0;
uniform vec3 boundingBoxMin;
uniform vec3 boundingBoxMax;
uniform vec2 mousePosition;
uniform float radius = 300;
uniform vec2 viewport;

vec2 getMousePositionWindowSpace() {
    if(test == 0) return mousePosition;
    if(test == 1) return vec2(400,520);
    if(test == 2) return vec2(600,225);
    if(test == 3) return vec2(200,375);
    return vec2(400,300);
}

void main()
{
    vec3 N = normalize(normalMatrix * normal);
    
    vec3 eyeVec = (modelViewMatrix * vec4(vertex, 1.0)).xyz;
    vec3 boundingBoxDiagonal = boundingBoxMax - boundingBoxMin;
    float diagonal = sqrt((boundingBoxDiagonal.x*boundingBoxDiagonal.x) + (boundingBoxDiagonal.y*boundingBoxDiagonal.y) + (boundingBoxDiagonal.z*boundingBoxDiagonal.z));
    vec3 eyeVecDiagonal = eyeVec * 0.03 * diagonal;
    
    vec2 distMouseVec = vec2(eyeVec.x/viewport.x, eyeVec.y/viewport.y) - getMousePositionWindowSpace();
    float distMouse = sqrt((distMouseVec.x*distMouseVec.x) + (distMouseVec.y*distMouseVec.y));
    
    float t = smoothstep((1-0.8)*distMouse*radius, (1-0.05)*distMouse*radius, eyeVec.x);
    vec3 interpolation = mix(eyeVec, eyeVecDiagonal, t);
    
    frontColor = vec4(mix(vec3(1.0, 1.0, 1.0), vec3(1.0, 0.0, 0.0), t), 1.0) * N.z;
    vtexCoord = texCoord;
    gl_Position = projectionMatrix * vec4(interpolation, 1.0);
}
