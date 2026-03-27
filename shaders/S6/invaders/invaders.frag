#version 330 core

in vec4 frontColor;
in vec2 vtexCoord;

out vec4 fragColor;

uniform sampler2D colormap;

void main()
{
    vec2 st = vtexCoord;
    st.x = st.x * 15.0;
    st.y = st.y * 14.0;

    int x = int(floor(st.x));
    int y = int(floor(st.y));

    vec2 offset = fract(st);
    
    vec2 sprite = vec2(-1.0, -1.0);

    if (y == 1 && x == 6) {
        sprite = vec2(3.0, 1.0); //cañón
    }
    else if (y == 2 && (x == 1 || x == 5 || x == 9 || x == 13)) {
        sprite = vec2(3.0, 0.0); //escudos
    }
    else if (y == 4 && x > 0 && x < 14) {
        sprite = vec2(0.0, 0.0); //rojo esquina
    }
    else if (y == 5 && x > 0 && x < 14) {
        sprite = vec2(0.0, 1.0); //amarillo
    }
    else if (y == 6 && x > 0 && x < 14) {
        sprite = vec2(0.0, 2.0); //verde sobre amarillo
    }
    else if (y == 7 && x > 0 && x < 14) {
        sprite = vec2(0.0, 3.0); //calavera celeste
    }
    else if (y == 8 && x > 0 && x < 14) {
        sprite = vec2(1.0, 0.0); //pulpo rojo
    }
    else if (y == 9 && x > 0 && x < 14) {
        sprite = vec2(1.0, 1.0); //azul encima de pulpo rojo
    }
    else if (y == 10 && x > 0 && x < 14) {
        sprite = vec2(1.0, 2.0); //moradito
    }
    else if (y == 11 && x > 0 && x < 14) {
        sprite = vec2(1.0, 3.0); //calavera verde
    }
    else if (y == 12 && x > 0 && x < 14) {
        sprite = vec2(2.0, 0.0); //azul oscuro (casi no se ve)
    }

    if (sprite.x >= 0.0) {
        vec2 finalTexCoord = (sprite + offset) / 4.0;
        fragColor = texture(colormap, finalTexCoord);
    } else {
        fragColor = vec4(0.0, 0.0, 0.0, 1.0); 
    }
}
