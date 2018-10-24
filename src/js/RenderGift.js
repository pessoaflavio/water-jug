var OBJLoader = require('../../libs/OBJLoader.js');
var MTLLoader = require('../../libs/MTLLoader.js');

export default class RenderGift {
  constructor(opts) {
    const self = this;
    self.el = opts.el;
    self.canvas = self.el.querySelector('.scene');
    self.modelName = opts.model;
    self.scale = 10;
    self.model;

    const size = self.getParentSize(self.el);
    self.renderer = self.getRenderer(self.canvas, size);
    self.camera = self.getCamera();

    self.loadModel(self.modelName)
      .then(object => {
        console.log(object);
        self.model = object;
        const scene = self.getScene();
        self.scene = scene;
        self.update(scene);
      })


  }
  getParentSize(parentElement) {
    const self = this;
    const {
      width,
      height
    } = parentElement.getBoundingClientRect();
    return {
      width,
      height
    };
  }
  loadModel(name) {
    const self = this;
    return new Promise((resolve, reject) => {
      new THREE.MTLLoader().load(`models/${name}.mtl`, function(materials) {
        materials.baseUrl = `models/`;
        materials.preload();
        console.log('materials', materials)
        new THREE.OBJLoader().setMaterials(materials).load(`models/${name}.obj`,
          function(object) {
            resolve(object)
          },
          // on progress
          function(xhr) {
            if (xhr.lengthComputable) {
              var percentComplete = xhr.loaded / xhr.total * 100;
            }
          },
          // on error
          function(xhr) {
            // console.log(xhr);
            reject;
          }
        );
      })
    })
  }
  getRenderer(canvas, size) {
    const self = this;
    const {
      scale
    } = self;
    const {
      width,
      height
    } = size;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff);
    renderer.shadowMap.enabled = true;

    return renderer;
  }
  getCamera() {
    const self = this;
    const {
      scale,
      renderer
    } = self;

    // Use this for orthographic camera
    const {
      width,
      height
    } = renderer.domElement;

    const fov = 45;
    const aspect = renderer.domElement.width / renderer.domElement.height;
    const near = 0.01;
    const far = 5000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    return camera;
  }
  getScene() {
    const self = this;
    const {
      camera,
      scale,
      model
    } = self;

    const {
      renderer
    } = self;

    // Setup
    const scene = new THREE.Scene();
    const bgColor = 0xffffff;
    scene.background = new THREE.Color(bgColor);

    camera.zoom = 1.5;
    camera.updateProjectionMatrix();

    // Lights
    const hemiLight = self.getHemiLight();
    hemiLight.name = "hemiLight";
    scene.add(hemiLight);
    scene.add(self.model);
    return scene;
  }
  getHemiLight() {
    const light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 200, 0);
    return light;
  }
  update(scene) {
    const self = this;
    const {
      renderer,
      camera,
    } = self;
    renderer.render(scene, camera);
    requestAnimationFrame(() => {
      self.update(scene);
    });
  }
}