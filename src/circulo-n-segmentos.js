import '/style.css';
import * as T from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { generarIndices, generarVertices } from "./utils";

const renderSize = 500;
const scene = new T.Scene();

const camera = new T.PerspectiveCamera(70, 1, 0.1, 1000);
camera.position.set(0,0,5);

const renderer = new T.WebGLRenderer();
renderer.setSize(renderSize,renderSize);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const vertices = generarVertices(5);

// Crear un buffer geometry
const geometry = new T.BufferGeometry();

// Crear un buffer attribute para los vértices
const positions = new Float32Array(vertices);
geometry.setAttribute('position', new T.BufferAttribute(positions, 3));

// Crear las caras (triángulos) para la geometría del círculo
const indices = generarIndices(vertices);

// Crear un buffer attribute para los índices
geometry.setIndex(new T.BufferAttribute(new Uint16Array(indices), 1));

const material = new T.MeshBasicMaterial({ color: 0xffff00, side: T.DoubleSide });

const circleMesh = new T.Mesh(geometry, material);

scene.add(circleMesh);

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
};

animate();
