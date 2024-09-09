import '/style.css'
import * as T from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { generarVertices } from "./utils";

const scene = new T.Scene()
scene.background = new T.Color(0xb5b5b5)
console.log(scene.background);
const axes = new T.AxesHelper(5)
console.log(axes)
scene.add(axes)

const camera =  new T.PerspectiveCamera(70,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(8,9,8)

const renderer = new T.WebGLRenderer;
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.enableZoom = false;

const vertices = generarVertices(5);
console.log(vertices);

const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    controls.update()
}

animate()