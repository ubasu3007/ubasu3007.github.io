import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);
document.body.appendChild( renderer.domElement );

//haumea

const haumeaTexture = new THREE.TextureLoader().load('assets/haumea.jpg')
const haumea = new THREE.Mesh(
    new THREE.SphereGeometry(5, 31, 31),
    new THREE.MeshStandardMaterial({ map: haumeaTexture })
);

//makemake

const makemakeTexture = new THREE.TextureLoader().load('assets/makemake.jpg')
const makemake = new THREE.Mesh(
    new THREE.SphereGeometry(5, 31, 31),
    new THREE.MeshStandardMaterial({ map: makemakeTexture })
);

//exo1

const exo1Texture = new THREE.TextureLoader().load('assets/exo1.jpg')
const exo1 = new THREE.Mesh(
    new THREE.SphereGeometry(5, 31, 31),
    new THREE.MeshStandardMaterial({ map: exo1Texture })
);

haumea.position.set(5, -2, -10);
scene.add( haumea );
scene.add( makemake, exo1 );
makemake.position.set(-25, 13, -30);
exo1.position.set(-140, 60, -90);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('assets/space.jpg');
scene.background = spaceTexture;

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-30,30, 30);

const ambientLight = new THREE.AmbientLight(0xffffff)
ambientLight.position.set(0,0,0);

scene.add( pointLight, ambientLight );

// camera.position.x = -8;
// camera.position.y = 3;
// camera.position.z = 20;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  haumea.rotation.x += 0.0001;
  haumea.rotation.y += 0.01;

  makemake.rotation.x += 0.0003;
  makemake.rotation.y -= 0.0075;

  exo1.rotation.x += 0.0005;
  exo1.rotation.y += 0.0067;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();



function animate() {
  requestAnimationFrame( animate );


  haumea.rotation.x += 0.0001;
  haumea.rotation.y += 0.01;

  makemake.rotation.x += 0.0003;
  makemake.rotation.y -= 0.0075;

  exo1.rotation.x += 0.0005;
  exo1.rotation.y += 0.0067;


  renderer.render( scene, camera );
}

animate();
