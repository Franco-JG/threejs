import './style.css'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const scene = new THREE.Scene()
const axes = new THREE.AxesHelper(5)
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
renderer.shadowMap.enabled = true;  //! Activamos las sombras en el renderer
document.body.appendChild(renderer.domElement)

//* HDRI
const loaderHDRI = new RGBELoader();
loaderHDRI.load('cannon_1k.hdr', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
});

//* Controles para arrastrar la vista de cámara
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.enableZoom = true;

//* Creación del punto de luz (foco)
const light = new THREE.PointLight(0xffffff, 300, 100);
light.position.set(-2,10,-2)
light.castShadow = true;  //! Activamos la proyección de sombras para la luz
scene.add(light)

const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
scene.add( pointLightHelper );

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
const sphereGeometry =  new THREE.SphereGeometry(2, 32, 32)
const sphereMaterial = new THREE.MeshStandardMaterial({
  metalness: 1,
  roughness: 0,
  envMapIntensity: 10,  // Controlar la intensidad del reflejo del mapa de entorno

}) //! Cambiamos a MeshStandardMaterial
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.set(0,2,-3) 
sphere.castShadow = true;  //! El cubo proyectará sombras
console.log(sphereMaterial);
scene.add(sphere)

//* Carga del .obj
const loader = new OBJLoader();
loader.load(
  'x-garraP - v4.obj',
  (object) => {
    object.traverse((child) => {
      if (child.isMesh) {
        child.position.set(0,2,6)
        child.castShadow = true;    // Habilitar que el objeto proyecte sombra
        // child.receiveShadow = true; // Opcional: puede recibir sombras también
      }
    });
    scene.add(object);  // Añadir el objeto cargado a la escena
  }
  ,
  (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% cargado .obj'); // Progreso de carga
  },
  (error) => {
    console.log('Ocurrió un error al cargar el OBJ:', error);  // Manejo de errores
  }
);

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

animate()