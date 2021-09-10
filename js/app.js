const loader = new THREE.TextureLoader();

function Planet(radius, texture, x, y, z) {
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 32, 16),
    new THREE.MeshLambertMaterial({ map: loader.load(texture) })
  );
  planet.position.set(x, y, z);

  return planet;
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.set(-20, 5, 56);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// resize

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxDistance = 60;

const ambientLight = new THREE.AmbientLight(0x303030);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 20, -20);
scene.add(pointLight);

// Planets

const mercury = Planet(1, "img/mercury.jpg", 0, 0, 0);
scene.add(mercury);

const earth = Planet(2, "img/earth.jpg", 3, 0, 14);
scene.add(earth);

const mars = Planet(1, "img/mars.jpg", -3, 0, 28);
scene.add(mars);

const jupiter = Planet(8, "img/jupiter.jpg", 0, 0, 42);
scene.add(jupiter);

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
};

animate();
