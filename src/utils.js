export const generarVertices = (segmentos) => {
    const vertices = [];
    const paso = (2 * Math.PI) / segmentos;

    vertices.push(0,0)  //? Centro del circulo

    for (let i = 0; i< segmentos; i++){
        const angulo = i * paso;
        const x = Math.cos(angulo)
        const y = Math.sin(angulo)
        vertices.push(x,y)
    }
    return vertices
}

