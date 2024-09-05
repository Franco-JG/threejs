import './style.css'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

const scene = new THREE.Scene()
const axes = new THREE.AxesHelper(5)
// axes.rotateY(Math.PI /180 * -45)
scene.add(axes)

//* Creación de la cámara
const fov = 75
const width =  window.innerWidth
const height = window.innerHeight 
const aspect = width / height
const near = 0.1
const far = 1000
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.set(8,9,8)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

//* HDRI
const loader = new RGBELoader();
loader.load('dancing_hall_2k.hdr', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
});

//* Controles para arrastrar la vista de cámara
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.enableZoom = true;

//* Creación del plano
const planeGeometry = new THREE.PlaneGeometry(10,10)
const planeMaterial =  new THREE.MeshBasicMaterial({ color: 0x4a6270})
const plane = new THREE.Mesh(planeGeometry,planeMaterial)
// plane.rotateX(Math.PI /180 * -90)
plane.rotateX(THREE.MathUtils.degToRad(-90))
scene.add(plane)

//* Creacion del cubo
const cubeGeometry =  new THREE.BoxGeometry(2,2,2)
const cubeMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color("rgb(211, 145, 227)")})
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cube.position.set(0,1,0)
scene.add(cube)

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

animate()