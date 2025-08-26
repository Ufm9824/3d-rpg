// Wait for the page to load before running the script
window.onload = function() {
  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Floor
  const floorGeometry = new THREE.PlaneGeometry(100, 100);
  const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x228b22 });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
  scene.add(floor);

  // Lighting
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 10, 10).normalize();
  scene.add(light);

  // Controls
  const controls = new THREE.PointerLockControls(camera, document.body);
  document.body.addEventListener("click", () => {
    controls.lock();
  });

  scene.add(controls.getObject());

  // Movement variables
  let moveForward = false;
  let moveBackward = false;
  let moveLeft = false;
  let moveRight = false;

  const velocity = new THREE.Vector3();
  const direction = new THREE.Vector3();
  const speed = 10;

  // Event listeners for key press
  document.addEventListener("keydown", (event) => {
    switch (event.code) {
      case "KeyW":
        moveForward = true;
        break;
      case "KeyS":
        moveBackward = true;
        break;
      case "KeyA":
        moveLeft = true;
        break;
      case "KeyD":
        moveRight = true;
        break;
    }
  });

  document.addEventListener("keyup", (event) => {
    switch (event.code) {
      case "KeyW":
        moveForward = false;
        break;
      case "KeyS":
        moveBackward = false;
        break;
      case "KeyA":
        moveLeft = false;
        break;
      case "KeyD":
        moveRight = false;
        break;
    }
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    const delta = 0.016; // Approximate frame duration for 60fps

    velocity.set(0, 0, 0);

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize();

    if (controls.isLocked) {
      velocity.z -= direction.z * speed * delta;
      velocity.x -= direction.x * speed * delta;

      controls.moveRight(-velocity.x);
      controls.moveForward(-velocity.z);
    }

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};
