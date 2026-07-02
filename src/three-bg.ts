// Ambient Three.js background: a slow drifting particle field with mouse parallax.
import * as THREE from 'three';

export function initBg(canvas: HTMLCanvasElement): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.z = 22;

  // particle field
  const N = 900;
  const pos = new Float32Array(N * 3);
  const seeds = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 70;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 42;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    seeds[i] = Math.random() * Math.PI * 2;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

  const mat = new THREE.PointsMaterial({
    color: 0xffa94d, size: 0.09, transparent: true, opacity: 0.5,
    depthWrite: false, blending: THREE.AdditiveBlending
  });
  const points = new THREE.Points(geo, mat);
  scene.add(points);

  // faint connective wireframe torus for depth
  const torus = new THREE.Mesh(
    new THREE.TorusKnotGeometry(9, 2.6, 120, 16),
    new THREE.MeshBasicMaterial({ color: 0x332f2a, wireframe: true, transparent: true, opacity: 0.14 })
  );
  torus.position.set(14, -4, -14);
  scene.add(torus);

  let mx = 0, my = 0, tx = 0, ty = 0;
  window.addEventListener('mousemove', (e) => {
    tx = (e.clientX / window.innerWidth - 0.5) * 2;
    ty = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  const resize = () => {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  const clock = new THREE.Clock();
  const p = geo.attributes.position as THREE.BufferAttribute;

  renderer.setAnimationLoop(() => {
    const t = clock.getElapsedTime();
    // gentle vertical bob per-particle
    for (let i = 0; i < N; i++) {
      p.setY(i, p.getY(i) + Math.sin(t * 0.35 + seeds[i]) * 0.0035);
    }
    p.needsUpdate = true;

    points.rotation.y = t * 0.014;
    torus.rotation.x = t * 0.05;
    torus.rotation.y = t * 0.035;

    // mouse parallax easing
    mx += (tx - mx) * 0.03;
    my += (ty - my) * 0.03;
    camera.position.x = mx * 1.6;
    camera.position.y = -my * 1.1;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  });
}
