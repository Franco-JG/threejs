import '/style.css';
import * as T from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { generarVerticesOnda, generarIndicesOnda } from './utils';

const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;

const scene = new T.Scene();
const camera = new T.PerspectiveCamera(70, aspect, 0.1, 1000);
camera.position.set(0, 0, 10);

const renderer = new T.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const geometry = new T.BufferGeometry();
const material = new T.MeshBasicMaterial({ color: 0xffff00, side: T.DoubleSide, wireframe: true });

// Crear la malla y añadirla a la escena
const mesh = new T.Mesh(geometry, material);
scene.add(mesh);

let tiempo = 0;
let velocidadAnimacion = 0.05

//Actualizamos la geometría
const updateGeometry = () => {
    tiempo = (tiempo + velocidadAnimacion) % (2 * Math.PI); // Ciclo entre 0 y 2*PI

    const vertices = generarVerticesOnda(tiempo);
    const indices = generarIndicesOnda();
    geometry.setAttribute('position', new T.BufferAttribute(new Float32Array(vertices), 3));
    geometry.setIndex(new T.BufferAttribute(new Uint16Array(indices), 1));
};

const animate = () => {
    requestAnimationFrame(animate);
    updateGeometry();
    renderer.render(scene, camera);
};

animate();
