export const generarVertices = (segmentos, epsilon = 1e-10) => {
    const vertices = [];
    const paso = (2 * Math.PI) / segmentos; // Paso en radianes

    vertices.push(0, 0, 0);  // Centro del círculo
    const z = 0;
    for (let i = 0; i <= segmentos; i++) {
        const anguloRad = i * paso;
        const anguloGrados = anguloRad * (180 / Math.PI); // Convertir radianes a grados
        let x = Math.cos(anguloRad);
        let y = Math.sin(anguloRad);
        
        // Reemplazar valores pequeños con cero
        // if (Math.abs(x) < epsilon) x = 0;
        // if (Math.abs(y) < epsilon) y = 0;

        vertices.push(x, y, z);
        console.log(`Ángulo: ${anguloGrados.toFixed(2)}°\n x: ${x}\n y: ${y}\n z: ${z}`);
    }
    return vertices;
}
