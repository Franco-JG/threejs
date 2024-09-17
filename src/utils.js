export const generarVertices = (segmentos) => {
    const vertices = [];
    const paso = (2 * Math.PI) / segmentos;

    vertices.push(0, 0, 0);
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
export const generarIndices = (vertices) => {
    // Crear las caras (triángulos) para la geometría del círculo
    const indices = [];
    const numVertices = vertices.length / 3;
    for (let i = 1; i <= numVertices - 1; i++) {
        // Genera los triángulos entre el centro (índice 0), el vértice actual 'i' 
        // y el siguiente vértice en la circunferencia.
        // Usamos (i % (numVertices - 1)) + 1 para que el último vértice 'i' 
        // se conecte de nuevo al primer vértice del borde, cerrando el polígono.
        indices.push(0, i, (i % (numVertices - 1)) + 1);
    }
    return indices;
}
const anchoVisible = 15;
const alto = 3;
const segmentosX = 30;
const amplitud = 2;
const frecuencia = 1;

export const generarVerticesOnda = (tiempo) => {
    const vertices = [];
    const pasoX = anchoVisible / segmentosX; // Espaciado entre rectángulos en "x"
    const z = 0;  

    for (let i = 0; i <= segmentosX; i++) {
        const x = i * pasoX - anchoVisible / 2;  // Posición fija en el eje X
        const ySuperior = alto / 2 + Math.sin(frecuencia * x + tiempo) * amplitud; // Onda senoidal en Y
        const yInferior = -alto / 2 + Math.sin(frecuencia * x + tiempo) * amplitud;

        vertices.push(x, ySuperior, z);  // Vértice superior izquierdo
        vertices.push(x, yInferior, z);  // Vértice inferior izquierdo
        vertices.push(x + pasoX, ySuperior, z);  // Vértice superior derecho
        vertices.push(x + pasoX, yInferior, z);  // Vértice inferior derecho
    }
    
    return vertices;
}

export const generarIndicesOnda = () => {
    const indices = [];
    for (let i = 0; i < segmentosX; i++) {
        const a = i * 4;      // Vértice superior izquierdo del rectángulo
        const b = a + 1;      // Vértice inferior izquierdo del rectángulo
        const c = a + 2;      // Vértice superior derecho del rectángulo
        const d = a + 3;      // Vértice inferior derecho del rectángulo

        // Triángulo 1 (a, b, c): conecta superior izquierdo, inferior izquierdo, superior derecho
        indices.push(a, b, c);
        // Triángulo 2 (b, d, c): conecta inferior izquierdo, inferior derecho, superior derecho
        indices.push(b, d, c);
    }
    
    return indices;
}
