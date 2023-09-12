// tweakpane
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import { Pane } from 'tweakpane';

// three-js
import {
  WebGLRenderer,
  sRGBEncoding,
  Scene,
  PerspectiveCamera,
  CubeTextureLoader,
  ShaderMaterial,
  IcosahedronGeometry,
  Mesh
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// shaders
import fsh from './shaders/fragment-shader.glsl';
import vsh from './shaders/vertex-shader.glsl';

// assets
import frontz from './assets/sunset0-front+z.png';
import backz from './assets/sunset1-back-z.png';
import leftx from './assets/sunset2-left+x.png';
import rightx from './assets/sunset3-right-x.png';
import upy from './assets/sunset4-up+y.png';
import downy from './assets/sunset5-down-y.png';

class ThreeJSWebTemplate {
  constructor() {}

  async initialize() {
    this.threejs_ = new WebGLRenderer();
    this.threejs_.outputEncoding = sRGBEncoding; // SRGBColorSpace
    document.body.appendChild(this.threejs_.domElement);

    window.addEventListener(
      'resize',
      () => {
        this.onWindowResize_();
      },
      false
    );

    this.scene_ = new Scene();

    this.camera_ = new PerspectiveCamera(60, 1920.0 / 1080.0, 0.1, 1000.0);
    this.camera_.position.set(1, 0, 5);

    const controls = new OrbitControls(this.camera_, this.threejs_.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    const loader = new CubeTextureLoader();
    const texture = loader.load([leftx, rightx, upy, downy, frontz, backz]);
    this.scene_.background = texture;

    await this.setupProject_();

    this.tweakpane_ = new Pane({ title: 'tweaks' });
    this.tweakpane_.registerPlugin(EssentialsPlugin);
    this.fpsGraph_ = this.tweakpane_.addBlade({
      view: 'fpsgraph',

      label: 'fpsgraph',
      lineCount: 2
    });

    this.previousRAF_ = null;
    this.onWindowResize_();
    this.raf_();
  }

  async setupProject_() {
    const material = new ShaderMaterial({
      uniforms: {
        specMap: { value: this.scene_.background },
        time: { value: 0.0 }
      },
      vertexShader: vsh,
      fragmentShader: fsh
    });

    this.material_ = material;

    const geometry = new IcosahedronGeometry(1, 128);
    const mesh = new Mesh(geometry, material);
    this.scene_.add(mesh);

    this.totalTime_ = 0;
  }

  onWindowResize_() {
    this.threejs_.setSize(window.innerWidth, window.innerHeight);

    this.camera_.aspect = window.innerWidth / window.innerHeight;
    this.camera_.updateProjectionMatrix();
  }

  raf_() {
    requestAnimationFrame((t) => {
      if (this.previousRAF_ === null) {
        this.previousRAF_ = t;
      }

      this.step_(t - this.previousRAF_);

      this.fpsGraph_.begin();
      this.threejs_.render(this.scene_, this.camera_);
      this.fpsGraph_.end();

      this.raf_();
      this.previousRAF_ = t;
    });
  }

  step_(timeElapsed) {
    const timeElapsedS = timeElapsed * 0.001;
    this.totalTime_ += timeElapsedS;

    this.material_.uniforms.time.value = this.totalTime_;
  }
}

let APP_ = null;

window.addEventListener('DOMContentLoaded', async () => {
  APP_ = new ThreeJSWebTemplate();
  await APP_.initialize();
});
