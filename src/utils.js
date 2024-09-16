export const generarVertices = (segmentos, epsilon = 1e-10) => {
    const vertices = [];
    const paso = (2 * Math.PI) / segmentos; // Paso en radianes

    vertices.push(0, 0, 0);  // Centro del círculo
    const z = 0;
    for (let i = 0; i < segmentos; i++) {
        const anguloRad = i * paso;
        // const anguloGrados = anguloRad * (180 / Math.PI); // Convertir radianes a grados
        let x = Math.cos(anguloRad);
        let y = Math.sin(anguloRad);
        vertices.push(x, y, z);
    }
    
    return vertices;
}
