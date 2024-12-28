import * as THREE from 'three';

import {
  COLOR_ICON_SHADERS,
  COLOR_ICON_SHADERS_POINT_SIZE_DESKTOP,
  COLOR_ICON_SHADERS_POINT_SIZE_MOBILE,
  DOT_ICON_SHADERS,
  DOT_ICON_SHADERS_POINT_SIZE_DESKTOP,
  DOT_ICON_SHADERS_POINT_SIZE_MOBILE,
  FRAGMENT_SHADER,
} from './shaders';

// In CSP img-src must have data:
const TOKEN_IMAGE =
  'data:image/webp;base64,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';
const getRandomPoint = (r: number, v: THREE.Vector3) => {
  const angle = Math.random() * Math.PI * 10;
  const u = Math.random() - 1;

  v.x = Math.cos(angle) * Math.sqrt(1 - Math.pow(u, 10)) * r;
  v.y = Math.sin(angle) * Math.sqrt(1 - Math.pow(u, 10)) * r;
  v.z = u * r;
};

export type AnimationOptions = Partial<{
  cameraPosition: Partial<{ x: number; y: number }>;
}>;

const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    const context =
      canvas.getContext('webgl') || canvas.getContext('webgl2') || canvas.getContext('experimental-webgl');

    return Boolean(context);
  } catch {
    return false;
  }
};

const checkWebGLError = (renderer: THREE.WebGLRenderer) => {
  const gl = renderer.getContext();
  const error = gl.getError();

  if (error !== gl.NO_ERROR) {
    console.error(`WebGL Error: ${error}`);

    return true;
  }
  return false;
};

const cleanMaterial = (material: THREE.Material) => {
  material.dispose();

  // Dispose of texture if present
  for (const key in material) {
    const value = (material as any)[key];

    if (value && typeof value === 'object' && 'minFilter' in value) {
      (value as THREE.Texture)?.dispose?.();
    }
  }
};

const cleanUpResources = (renderer?: THREE.WebGLRenderer, scene?: THREE.Scene) => {
  renderer?.dispose();
  scene?.traverse(object => {
    if ((object as THREE.Mesh).isMesh) {
      const mesh = object as THREE.Mesh;

      mesh.geometry.dispose();

      if (Array.isArray(mesh.material)) {
        mesh.material.forEach(material => cleanMaterial(material));
      } else {
        cleanMaterial(mesh.material);
      }
    }
  });
};

export const startAnimation = (canvasElement: HTMLCanvasElement, { cameraPosition }: AnimationOptions = {}) => {
  const back = canvasElement.closest('div');

  if (!isWebGLAvailable()) {
    throw new Error('WebGL is not supported');
  }

  if (!back) return;
  let camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer,
    clock: THREE.Clock,
    particles: THREE.Object3D<THREE.Object3DEventMap>,
    particles2: THREE.Object3D<THREE.Object3DEventMap>,
    dotWithIcon: THREE.ShaderMaterial | undefined,
    colorDot: THREE.ShaderMaterial | undefined;

  const isMobile = Math.min(window.screen.width, window.innerWidth) < 441;
  const particleCount = isMobile ? 6000 : 10000;
  const tokensCount = isMobile ? 40 : 60;
  const radius = isMobile ? 1000 : 1800;
  const animationSpeed = {
    icons: {
      rotation: 0.0007,
      depth: 0.045,
    },
    dots: {
      rotation: 0.0003,
      depth: 0.01,
    },
  };

  let requestAnimationFrameId: number;
  let isAnimationCanceled = false;

  const resizeListener = () => {
    const rect = back.getBoundingClientRect();

    camera.aspect = rect.width / rect.height; //window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(rect.width, rect.height);
  };

  const init = async () => {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = isMobile ? 700 : 600;

    if (cameraPosition) {
      camera.position.x = cameraPosition.x || 0;
      camera.position.y = cameraPosition.y || 0;
    }

    scene = new THREE.Scene();
    clock = new THREE.Clock();

    // texture

    const loader = new THREE.TextureLoader();
    const sprite = await loader.loadAsync(TOKEN_IMAGE);

    sprite.flipY = false;

    // materials

    dotWithIcon = new THREE.ShaderMaterial({
      uniforms: {
        map: {
          value: sprite,
        },
        globalTime: {
          value: 0,
        },
        baseColor: {
          value: new THREE.Color(0x00ffff),
        },
      },
      vertexShader:
        DOT_ICON_SHADERS + `${isMobile ? DOT_ICON_SHADERS_POINT_SIZE_MOBILE : DOT_ICON_SHADERS_POINT_SIZE_DESKTOP}`,

      fragmentShader: FRAGMENT_SHADER,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true,
    });

    colorDot = new THREE.ShaderMaterial({
      uniforms: {
        map: {
          value: sprite,
        },
        globalTime: {
          value: 0,
        },
        baseColor: {
          value: new THREE.Color(0x00ffff),
        },
      },
      vertexShader:
        COLOR_ICON_SHADERS +
        `${isMobile ? COLOR_ICON_SHADERS_POINT_SIZE_MOBILE : COLOR_ICON_SHADERS_POINT_SIZE_DESKTOP}`,

      fragmentShader: FRAGMENT_SHADER,

      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true,
    });

    // geometry
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    const times = [];

    const point = new THREE.Vector3();
    const color = new THREE.Color(0x00ffff);

    for (let i = 0; i < particleCount; i++) {
      getRandomPoint(radius, point);
      vertices.push(point.x, point.y, point.z);
      colors.push(color.r, color.g, color.b);
      times.push(i / particleCount);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('time', new THREE.Float32BufferAttribute(times, 1));

    const geometry2 = new THREE.BufferGeometry();
    const vertices2 = [];
    const colors2 = [];
    const times2 = [];

    for (let i = 0; i < tokensCount; i++) {
      getRandomPoint(radius, point);
      vertices2.push(point.x, point.y, point.z);
      colors2.push(color.r, color.g, color.b);
      times2.push(i / tokensCount);
    }

    geometry2.setAttribute('position', new THREE.Float32BufferAttribute(vertices2, 3));
    geometry2.setAttribute('color', new THREE.Float32BufferAttribute(colors2, 3));
    geometry2.setAttribute('time', new THREE.Float32BufferAttribute(times2, 1));

    // particles
    particles = new THREE.Points(geometry, dotWithIcon);
    scene.add(particles);
    particles2 = new THREE.Points(geometry2, colorDot);
    particles2.position.z = -50;
    scene.add(particles2);
    scene.position.x = -4;
    scene.position.y = 20;

    renderer = new THREE.WebGLRenderer({
      canvas: canvasElement || undefined,
      antialias: false,
      alpha: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);

    if (!back) return;
    const rect = back.getBoundingClientRect();

    camera.aspect = rect?.width / rect.height; //window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(rect.width, rect.height);

    window.addEventListener('resize', resizeListener, false);

    animate();
  };

  const animate = () => {
    if (isAnimationCanceled) return;

    if (!canvasElement) return;
    const r = canvasElement.getBoundingClientRect();

    if (r.top - r.height > window.innerHeight) {
      setTimeout(() => (requestAnimationFrameId = requestAnimationFrame(animate)), 30);

      return;
    }

    if (checkWebGLError(renderer)) {
      cleanUpResources(renderer, scene);

      return;
    }

    requestAnimationFrameId = requestAnimationFrame(animate);
    const delta = clock.getDelta();

    dotWithIcon && (dotWithIcon.uniforms.globalTime.value += delta * animationSpeed.dots.depth);
    colorDot && (colorDot.uniforms.globalTime.value += delta * animationSpeed.icons.depth);
    particles.rotation.z += animationSpeed.icons.rotation;
    particles2.rotation.z += animationSpeed.dots.rotation;

    try {
      renderer.render(scene, camera);
    } catch (e) {
      console.error(e);
    }
  };

  init().then(animate).catch(console.error);

  return () => {
    isAnimationCanceled = true;

    if (requestAnimationFrameId) {
      cancelAnimationFrame(requestAnimationFrameId);
    }

    window.removeEventListener('resize', resizeListener, false);

    cleanUpResources(renderer, scene);
  };
};
