import { Box } from '@mui/material';
import { useEffectOnce } from '@xfi/hooks';
import React, { useRef } from 'react';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import StepLoader from './loader';
import { MODELS } from './models';
import { ParticlesObject } from './particles';
import { headerShader } from './shaders';

// In CSP img-src must have data:
const PARTICLE_IMG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFuSURBVHgB7ZbdTcNAEIRnHSJFIg/ugHSAW0gFtEYrVBBBBS7h6MAvSEghXmYdTKIoiGgnkJd80sknS76d/fUBVwTqldexIFBB4ANo1sACApIAm6DGBA0EbiDgPhjvICAJMIbfDA4BLQKGO4hoAsQCDLQijBRwKa2YFnC78u/qf+dIQJK0ANszOkW+FdMCvNoZ7at8LSgRWBzbJ875nSiyyHOEOrw1Lg6hh9Ewn4Ut+eQ9ivVo2R3d29LaU862fSNfc71hXOrKcB9tRkMxbBZIwG8Lvy2DQMfrKI6933ZLGyZodaCm5ovOhKr+UUyPrue5fjC6T0pBEG1n2wOaIQV2kALfpoAOFEayndHQ6OWfMH/2x/mL+7C4R5J8G9LTY/t/E8AiLeM+igtJ0gLWm51RF+4EaQGzPaOn9vxZBUSFR+6V/AfqjahARBPA6YZLXsk42VqKkKamJIDed7bR0iBdybDZ/lwgIEVgeoYivPIJBTuAalN6o24AAAAOZVhJZk1NACoAAAAIAAAAAAAAANJTkwAAAABJRU5ErkJggg==';

interface ExtendedPointsMaterial extends THREE.PointsMaterial {
  shader_data?: THREE.Shader;
}

export type FigureType = keyof typeof MODELS;

const IconShape = ({
  figureType,
  width,
  height,
  cameraFov = 60,
  className,
}: {
  figureType: FigureType;
  width: number;
  height: number;
  cameraFov?: number;
  className?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffectOnce(() => {
    if (typeof window === 'undefined') return;

    if (!canvasRef.current || !containerRef.current) return;

    const view = containerRef.current;

    const opt = { antialias: false, alpha: true, canvas: canvasRef.current };

    const renderer = new THREE.WebGLRenderer(opt);

    renderer.setSize(width, height);

    renderer.setClearColor(0x000000, 0);
    view.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(cameraFov, 1, 2.5, 600);

    const loader = new GLTFLoader();
    const p = new ParticlesObject(25000);

    camera.position.x = 4;
    camera.position.y = -1;
    camera.position.z = 47.111;
    camera.rotation.x = 0.0199;
    camera.rotation.y = 0.032;
    camera.rotation.z = -0.0026;

    scene.add(camera);

    const texture = new THREE.TextureLoader().load(PARTICLE_IMG);

    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    let requestAnimationFrameId: number;
    let isAnimationCanceled = false;

    p.CustomShader(
      (sh: THREE.Shader) => headerShader(sh),
      (material: ExtendedPointsMaterial, shader: THREE.Shader) => {
        const dp = p.GeometryDepth(camera);

        shader.uniforms.min_distance = { value: dp.min };

        shader.uniforms.max_distance = { value: dp.max };

        shader.uniforms.local_tick = { value: 10 };

        shader.uniforms.cursor = { value: new THREE.Vector3(-100, -100, 0) };

        material.shader_data = shader;
        material.map!.minFilter = THREE.LinearFilter;
      }
    );

    new StepLoader(
      (geo_arr: THREE.Object3D[][]) => {
        geo_arr.forEach(e =>
          e.forEach(g => {
            if (g instanceof THREE.Mesh && g.name === figureType.replaceAll(' ', '_')) {
              p.AddGeometry(g.geometry, 27);
            }
          })
        );

        const points = p.CreateParticles(0.6, 0xffffff, texture);

        scene.add(points);

        const clock = new THREE.Clock();

        const animate = () => {
          if (isAnimationCanceled) return;

          const elapsedTime = clock.getElapsedTime();

          if (points && points.material) {
            const material = points.material as ExtendedPointsMaterial;

            if (material.shader_data) {
              const program = renderer.getContext().getParameter(renderer.getContext().CURRENT_PROGRAM);

              if (program) {
                material.shader_data.uniforms.local_tick.value = elapsedTime * 10000;

                const dp = p.GeometryDepth(camera);

                material.shader_data.uniforms.min_distance.value = dp.min;

                material.shader_data.uniforms.max_distance.value = dp.max;
              }
            }
          }

          renderer.render(scene, camera);
          requestAnimationFrameId = requestAnimationFrame(animate);
        };

        animate();
      },
      (src: string, end: (children: THREE.Object3D[]) => void) => {
        loader.load(src, (gltf: GLTF) => end([...gltf.scene.children]));
      }
    )
      .Add(MODELS[figureType as FigureType])
      .Go();

    return () => {
      isAnimationCanceled = true;

      if (requestAnimationFrameId) {
        cancelAnimationFrame(requestAnimationFrameId);
      }

      const gl = renderer.getContext();
      const loseContextExt = gl.getExtension('WEBGL_lose_context');

      if (loseContextExt) {
        loseContextExt.loseContext();
      }

      cleanUpResources(renderer, scene);

      view.removeChild(renderer.domElement);
    };
  });

  return (
    <Box
      ref={containerRef}
      className={className}
      sx={{ position: 'relative', width: width / 2, height: height / 2, overflow: 'hidden' }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', top: '-50%', left: '-38%' }} />
    </Box>
  );
};

export default IconShape;

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

const cleanUpResources = (renderer: THREE.WebGLRenderer, scene: THREE.Scene) => {
  renderer.dispose();
  scene.traverse(object => {
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
  scene.clear();
};
