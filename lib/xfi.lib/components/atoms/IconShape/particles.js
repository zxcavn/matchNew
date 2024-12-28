import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler';

class ParticlesObject {
  constructor(particles) {
    this.particles = particles || 100000;
    this.geometry = new THREE.BufferGeometry();
    this.geometry.morphAttributes.position = [];
    this.geometry.setAttribute('local_tick', new THREE.Float32BufferAttribute(performance.now(), 1));
  }

  AddGeometry(geometry, scale, particles) {
    scale = scale || 1;
    let pCount = particles || this.particles;
    let mesh = new MeshSurfaceSampler(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial())).build();
    let pos = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      let newPosition = new THREE.Vector3();

      mesh.sample(newPosition, new THREE.Vector3());
      pos.set([newPosition.x * scale, newPosition.y * scale, newPosition.z * scale], i * 3);
    }

    if (this.geometry.morphAttributes.position.length == 0)
      this.geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    this.geometry.morphAttributes.position.push(new THREE.Float32BufferAttribute(pos, 3));
  }

  GeometryDepth(camera) {
    let min = Infinity;
    let max = -Infinity;

    if (this.geometry.attributes.position) {
      const v = this.geometry.attributes.position.array;
      const cpos = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);

      for (let i = 0; i < v.length; i += 3) {
        let dp = cpos.distanceTo(new THREE.Vector3(v[i], v[i + 1], v[i + 2]));

        if (dp < min) min = dp;

        if (dp > max) max = dp;
      }
    }

    return { min: min, max: max };
  }

  GeometrySize() {
    let boundingBox = new THREE.Box3().setFromBufferAttribute();

    return {
      width: boundingBox.max.x - boundingBox.min.x,
      height: boundingBox.max.y - boundingBox.min.y,
      depth: boundingBox.max.z - boundingBox.min.z,
    };
  }

  CustomShader(action, init) {
    this.shader_action = action;
    this.shader_tag = init;
  }

  CreateParticles(size, color, texture) {
    let options = {
      size: size || 0.03,
      color: color || 0xffffff,
      sizeAttenuation: true,
      depthTest: 0.0001,
      transparent: true,
      fog: true,
    };

    if (texture) {
      options.map = texture;
      options.alphaMap = texture;
      options.alphaTest = 0.1;
      options.alphaToCoverage = true;
    }

    const mat = new THREE.PointsMaterial(options);

    mat.morphTargets = true;

    if (this.shader_action) {
      const x = mat.onBeforeCompile;

      mat.onBeforeCompile = shader => {
        this.shader_action(shader);
        if (x) x();

        if (this.shader_tag) {
          this.shader_tag(mat, shader);
        }
      };
    }

    return new THREE.Points(this.geometry, mat);
  }

  CreateMesh(material) {
    return new THREE.Points(this.geometry, material);
  }

  Count() {
    return this.geometry.morphAttributes.position.length;
  }
}

export { ParticlesObject };
