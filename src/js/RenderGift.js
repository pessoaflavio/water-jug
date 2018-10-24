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
    self.gui = new dat.GUI();

    self.loadModel(self.modelName)
      .then(object => self.setupObject(object))
      .then(object => {
        self.model = object;
        self.model.scale.set(self.scale, self.scale, self.scale);
        self.model.position.set(0, 0, 0);
        self.model.rotation.set(Math.PI / 8, Math.PI / 4, 0);
        self.model.castShadow = true;
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
        new THREE.OBJLoader().setMaterials(materials).load(`models/${name}.obj`,
          // new THREE.FBXLoader().load(`models/${name}.FBX`,
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
  setupObject(object) {
    object.traverse(function(child) {
      child.receiveShadow = true;

    })
    return object;
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
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 30);
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

    const ambientLight = self.getAmbientLight(0xffffff, 1);
    ambientLight.name = "ambientLight";
    scene.add(ambientLight);

    const spotLight = self.getSpotLight(0xffffff, 1, 100, Math.PI / 8);
    spotLight.name = "spotLight";
    scene.add(spotLight);

    // const thisSpotlight = self.gui.addFolder('spotlight');
    // // lights.add(ambientLight, 'intensity', 0, 1);
    // thisSpotlight.add(spotLight.rotation, 'x', -Math.PI, Math.PI);
    // thisSpotlight.add(spotLight.rotation, 'y', -Math.PI, Math.PI);
    // thisSpotlight.add(spotLight.rotation, 'z', -Math.PI, Math.PI);
    // thisSpotlight.add(spotLight.position, 'x', -100, 100);
    // thisSpotlight.add(spotLight.position, 'y', -100, 100);
    // thisSpotlight.add(spotLight.position, 'z', -100, 100);


    const plane = self.getPlane(1000, 1000, 0xADD8E6);
    plane.name = "plane";
    plane.receiveShadow = true;

    const thisPlane = self.gui.addFolder('plane');
    thisPlane.add(plane.rotation, 'x', -Math.PI, Math.PI);
    thisPlane.add(plane.rotation, 'y', -Math.PI, Math.PI);
    thisPlane.add(plane.rotation, 'z', -Math.PI, Math.PI);

    scene.add(plane);

    scene.add(self.model);
    console.log(self.model)
    return scene;
  }
  getHemiLight() {
    const light = new THREE.HemisphereLight(0xFFFFFF, 0xFF69B4);
    light.position.set(0, 50, 0);
    return light;
  }
  getAmbientLight(color, intensity) {
    const light = new THREE.AmbientLight(color, intensity);
    return light;
  }
  getSpotLight(color, intensity, distance, angle) {
    // SpotLight( color : Integer, intensity : Float, distance : Float, angle : Radians, penumbra : Float, decay : Float )
    const light = new THREE.SpotLight(color, intensity, distance, angle);
    light.position.set(0, 46, 44);
    light.castShadow = true;
    light.shadow.bias = 0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    return light;
  }
  getPlane(w, h, color) {
    var geometry = new THREE.PlaneGeometry(w, h);
    var material = new THREE.MeshBasicMaterial({
      color
    });
    var mesh = new THREE.Mesh(
      geometry,
      material
    );

    mesh.rotation.x = -Math.PI / 4;

    return mesh;
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