import '/style.css'
import * as T from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { generarVertices } from "./utils";

const scene = new T.Scene()
scene.background = new T.Color
// scene.background = new T.Color(0xb5b5b5)
const axes = new T.AxesHelper(5)
// scene.add(axes)

const camera =  new T.PerspectiveCamera(70,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(8,9,8)

const renderer = new T.WebGLRenderer;
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const vertices = generarVertices(5);
// console.log(vertices);
//!
// Crear un buffer geometry
const geometry = new T.BufferGeometry();

// Crear un buffer attribute para los vértices
const positions = new Float32Array(vertices);
geometry.setAttribute('position', new T.BufferAttribute(positions, 3));

// Crear el material para el círculo
const material = new T.MeshBasicMaterial({ color: 0xffff00, side: T.DoubleSide });

// Crear la malla
const circleMesh = new T.Mesh(geometry, material);
console.log(circleMesh.geometry);
// Configuración de la escena
scene.add(circleMesh);

const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    controls.update()
}

animate()