#version 330 core

in vec4 frontColor;
in vec2 vtexCoord;
out vec4 fragColor;

uniform sampler2D explosion;

uniform float time;
uniform float slice = 1/30;

vec2 offset = vec2(1/8,1/6);

void main()
{
    //0 de 0,0 a 1/8,1/6
    //0 de 0 a slice (tiempo)
    
    //1 de 1/8,1/6 a 2/8,1/6
    //1 de 1slice a 2slice (tiempo)
    
    vec2 newVtexCoord = vtexCoord;
    vec4 newFrontColor = frontColor*texture(explosion, newVtexCoord);
    fragColor = newFrontColor/**newFrontColor.a*/;
}
