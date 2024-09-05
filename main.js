import './style.css'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

const scene = new THREE.Scene()
const axes = new THREE.AxesHelper(5)
//? scene.add(axes)

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
renderer.shadowMap.enabled = true;  //! Activamos las sombras en el renderer
document.body.appendChild(renderer.domElement)

//* HDRI
// const loader = new RGBELoader();
// console.log(loader)
// loader.load('dancing_hall_2k.hdr', function(texture) {
//     texture.mapping = THREE.EquirectangularReflectionMapping;
//     scene.background = texture;
//     scene.environment = texture;
// });

//* Controles para arrastrar la vista de cámara
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.enableZoom = true;

//* Creación del punto de luz (foco)
const light = new THREE.PointLight(0xffffff, 100, 100);
light.position.set(-2,7,-2)
light.castShadow = true;  //! Activamos la proyección de sombras para la luz
scene.add(light)

const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
// ? scene.add( pointLightHelper );

//! Ajustes de sombras para la luz
light.shadow.mapSize.width = 512;  
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;

//* Creación del plano 
const planeGeometry = new THREE.PlaneGeometry(20,20)
const planeMaterial =  new THREE.MeshStandardMaterial({ color: 0x4a6270}) //! Usamos MeshStandardMaterial para que soporte sombras
const plane = new THREE.Mesh(planeGeometry,planeMaterial)
plane.rotateX(Math.PI /180 * -90)
plane.receiveShadow = true;  //! El plano debe recibir sombras
scene.add(plane)

//* Creacion del cubo
const cubeGeometry =  new THREE.BoxGeometry(2,2,2)
const cubeMaterial = new THREE.MeshStandardMaterial({color: new THREE.Color("rgb(211, 145, 227)")}) //! Cambiamos a MeshStandardMaterial
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cube.position.set(0,2,0) 
cube.castShadow = true;  //! El cubo proyectará sombras
scene.add(cube)

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

animate()