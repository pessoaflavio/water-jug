export default class RenderGift {
  constructor(opts) {
    const self = this;
    self.el = opts.el;
    self.canvas = self.el.querySelector('.scene');
    self.modelName = opts.model;
    self.callback = opts.callback;
    self.number = opts.amount;
    self.scale = 5;
    self.cameraPos = {
      x: 0,
      y: 5,
      z: 7
    }
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
        self.model.rotation.set(0, Math.PI / 4, 0);
        self.model.castShadow = true;
        const scene = self.getScene();
        self.scene = scene;
        self.scene.add(self.model);
        // here is where the multiplying magic happen
        self.animateCamera()
        self.update(scene);
      })
  }
  animateCamera() {
    const self = this;
    self.cameraDelay = new TWEEN.Tween(self.cameraPos)
      .to(self.cameraPos, 5000)
      .onUpdate(() => {});

    self.cameraTween = new TWEEN.Tween(self.cameraPos)
      .to({
        x: Math.sqrt(self.number),
        y: Math.sqrt(self.number) * 8,
        z: Math.sqrt(self.number) * 4
      }, 2000)
      .onStart(function() {
        self.multiplyGift(self.number);
        self.scene.getObjectByName("spotLight").position.set(-Math.sqrt(self.number) * 4, Math.sqrt(self.number) * 4, Math.sqrt(self.number) * 4)
      })
      .easing(TWEEN.Easing.Exponential.InOut)
      .onUpdate(() => {
        self.camera.position.set(self.cameraPos.x, self.cameraPos.y, self.cameraPos.z)
        self.camera.lookAt(new THREE.Vector3(0, 0, 0));
      });

    self.cameraDelay.chain(self.cameraTween);
    self.cameraDelay.start();
  }
  multiplyGift(amount) {
    const self = this;
    var x = 0,
      y = 0,
      max = 0;
    var xInc = 0,
      yInc = 0;

    for (var i = 0; i < amount; ++i) {
      // console.log(i + ": (" + x + "," + y + ")");

      var obj = self.model.clone(true);
      obj.position.x = x * 4;
      obj.position.z = y * 4;
      obj.scale.set(self.scale, self.scale, self.scale);
      obj.castShadow = true;
      self.scene.add(obj);
      if (max > 0) {
        if (x === max && y === max) { // go down
          xInc = 0;
          yInc = -1;
        } else if (x === max && y === -max) { // go left
          xInc = -1;
          yInc = 0;
        } else if (x === -max && y === -max) { // go up
          xInc = 0;
          yInc = 1;
        } else if (x === -max && y === max) { // go right
          xInc = 1;
          yInc = 0;
        }

        x += xInc;
        y += yInc;
      }

      if (x === 0 && y === max) {
        // go to next tier
        ++max;
        xInc = 1;
        yInc = 0;
        x = 0;
        y = max;
      }
    }
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
      new THREE.GLTFLoader().load(`models/${name}.gltf`,
        function(object) {
          resolve(object.scene);
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
  }
  setupObject(object) {
    object.traverse(function(child) {
      child.receiveShadow = true;
      child.castShadow = true;

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
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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
    camera.position.set(self.cameraPos.x, self.cameraPos.y, self.cameraPos.z);
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

    const spotLight = self.getSpotLight(0xffffff, 0.4, 100, Math.PI / 3);
    spotLight.name = "spotLight";
    spotLight.position.y = 10;
    spotLight.position.z = 10;
    scene.add(spotLight);


    const thisSpotlight = self.gui.addFolder('spotlight');
    // lights.add(ambientLight, 'intensity', 0, 1);
    thisSpotlight.add(spotLight.rotation, 'x', -Math.PI, Math.PI);
    thisSpotlight.add(spotLight.rotation, 'y', -Math.PI, Math.PI);
    thisSpotlight.add(spotLight.rotation, 'z', -Math.PI, Math.PI);
    thisSpotlight.add(spotLight.position, 'x', -100, 100);
    thisSpotlight.add(spotLight.position, 'y', -100, 100);
    thisSpotlight.add(spotLight.position, 'z', -100, 100);


    const plane = self.getPlane(1000, 1000, 0x4c95eb);
    plane.name = "plane";
    plane.receiveShadow = true;

    // const thisPlane = self.gui.addFolder('plane');
    // thisPlane.add(plane.rotation, 'x', -Math.PI, Math.PI);
    // thisPlane.add(plane.rotation, 'y', -Math.PI, Math.PI);
    // thisPlane.add(plane.rotation, 'z', -Math.PI, Math.PI);
    // thisPlane.add(plane.position, 'x', -10, 10);
    // thisPlane.add(plane.position, 'y', -10, 10);
    // thisPlane.add(plane.position, 'z', -10, 10);


    scene.add(plane);
    return scene;
  }
  getHemiLight() {
    const light = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF);
    light.position.set(0, 50, 0);
    return light;
  }
  getAmbientLight(color, intensity) {
    const light = new THREE.AmbientLight(color, intensity);
    light.position.set(0, 0, 50);
    return light;
  }
  getDirectionalLight(color, intensity) {
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-4, 11, 22);
    light.castShadow = true;
    light.shadow.bias = 0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    return light;
  }
  getSpotLight(color, intensity, distance, angle) {
    // SpotLight( color : Integer, intensity : Float, distance : Float, angle : Radians, penumbra : Float, decay : Float )
    const light = new THREE.SpotLight(color, intensity, distance, angle);
    light.position.set(-8.7, 17.8, 27);
    light.castShadow = true;
    light.shadow.bias = 0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    return light;
  }
  getPlane(w, h, color) {
    var geometry = new THREE.PlaneBufferGeometry(w, w, h, h);
    var material = new THREE.MeshStandardMaterial({
      color: color
    })
    var mesh = new THREE.Mesh(
      geometry,
      material
    );

    mesh.receiveShadow = true;

    mesh.rotation.x = -Math.PI / 2;

    return mesh;
  }
  update(scene) {
    const self = this;
    const {
      renderer,
      camera,
    } = self;
    renderer.render(scene, camera);
    TWEEN.update();
    requestAnimationFrame(() => {
      self.update(scene);
    });
  }
}