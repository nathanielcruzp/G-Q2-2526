#version 330 core

in vec4 frontColor;
in vec3 viewSpacePos;
out vec4 fragColor;

void main()
{
    vec3 dx = dFdx(viewSpacePos);
    vec3 dy = dFdy(viewSpacePos);
    vec3 normal = normalize(cross(dx,dy));
    fragColor = vec4(frontColor*normal.z);
}
