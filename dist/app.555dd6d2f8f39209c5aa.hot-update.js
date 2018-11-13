webpackHotUpdateyodda("app",{

/***/ "./src/js/RenderGift.js":
/*!******************************!*\
  !*** ./src/js/RenderGift.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RenderGift; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RenderGift =
/*#__PURE__*/
function () {
  function RenderGift(opts) {
    _classCallCheck(this, RenderGift);

    var self = this;
    self.el = opts.el;
    self.canvas = self.el.querySelector('.scene');
    self.modelName = opts.model;
    self.callback = opts.callback;
    self.number = 12;
    self.scale = 5;
    self.model;
    var size = self.getParentSize(self.el);
    self.renderer = self.getRenderer(self.canvas, size);
    self.camera = self.getCamera();
    self.gui = new dat.GUI();
    self.loadModel(self.modelName).then(function (object) {
      return self.setupObject(object);
    }).then(function (object) {
      self.model = object;
      self.model.scale.set(self.scale, self.scale, self.scale);
      self.model.position.set(0, 0, 0);
      self.model.rotation.set(Math.PI / 8, Math.PI / 4, 0);
      self.model.castShadow = true;
      var scene = self.getScene();
      self.scene = scene;
      self.scene.add(self.model); // some experiment

      var duplicate = self.model.clone(true);
      duplicate.scale.set(self.scale, self.scale, self.scale);
      duplicate.position.set(2, 0, 0);
      duplicate.rotation.set(Math.PI / 8, Math.PI / 4, 0);
      duplicate.castShadow = true;
      self.scene.add(duplicate);
      var duplicate1 = self.model.clone(true);
      duplicate1.scale.set(self.scale, self.scale, self.scale);
      duplicate1.position.set(-2, 0, 0);
      duplicate1.rotation.set(Math.PI / 8, Math.PI / 4, 0);
      duplicate1.castShadow = true;
      self.scene.add(duplicate1); // end of experiment;

      self.getBoxGrid(self.model, 3, 0.2);
      self.update(scene);
    });
  }

  _createClass(RenderGift, [{
    key: "getBoxGrid",
    value: function getBoxGrid(model, amount, separationMultiplier) {
      for (var i = 0; i < amount; i++) {
        var obj = model.clone(true);
        obj.position.x = i * separationMultiplier;
        obj.position.y = i * separationMultiplier;
        obj.position.z = 0;
        obj.scale.set(self.scale, self.scale, self.scale);
        obj.rotation.set(Math.PI / 8, Math.PI / 4, 0);
        obj.castShadow = true;
        self.scene.add(obj);

        for (var j = 1; j < amount; j++) {
          var obj = model.clone(true);
          obj.scale.set(self.scale, self.scale, self.scale);
          obj.rotation.set(Math.PI / 8, Math.PI / 4, 0);
          obj.castShadow = true;
          obj.position.x = i * separationMultiplier;
          obj.position.y = i * separationMultiplier;
          obj.position.z = 0;
          self.scene.add(obj);
        }
      } // group.position.x = -(separationMultiplier * (amount - 1)) / 2;
      // group.position.z = -(separationMultiplier * (amount - 1)) / 2;
      //
      // return group;

    }
  }, {
    key: "getParentSize",
    value: function getParentSize(parentElement) {
      var self = this;

      var _parentElement$getBou = parentElement.getBoundingClientRect(),
          width = _parentElement$getBou.width,
          height = _parentElement$getBou.height;

      return {
        width: width,
        height: height
      };
    }
  }, {
    key: "loadModel",
    value: function loadModel(name) {
      var self = this;
      return new Promise(function (resolve, reject) {
        new THREE.GLTFLoader().load("models/".concat(name, ".gltf"), function (object) {
          resolve(object.scene);
        }, // on progress
        function (xhr) {
          if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
          }
        }, // on error
        function (xhr) {
          // console.log(xhr);
          reject;
        });
      });
    }
  }, {
    key: "setupObject",
    value: function setupObject(object) {
      object.traverse(function (child) {
        child.receiveShadow = true;
        child.castShadow = true;
      });
      return object;
    }
  }, {
    key: "getRenderer",
    value: function getRenderer(canvas, size) {
      var self = this;
      var scale = self.scale;
      var width = size.width,
          height = size.height;
      var renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0xffffff);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      return renderer;
    }
  }, {
    key: "getCamera",
    value: function getCamera() {
      var self = this;
      var scale = self.scale,
          renderer = self.renderer; // Use this for orthographic camera

      var _renderer$domElement = renderer.domElement,
          width = _renderer$domElement.width,
          height = _renderer$domElement.height;
      var fov = 45;
      var aspect = renderer.domElement.width / renderer.domElement.height;
      var near = 0.01;
      var far = 1000;
      var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(0, 0, 30);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      return camera;
    }
  }, {
    key: "getScene",
    value: function getScene() {
      var self = this;
      var camera = self.camera,
          scale = self.scale,
          model = self.model;
      var renderer = self.renderer; // Setup

      var scene = new THREE.Scene();
      var bgColor = 0xffffff;
      scene.background = new THREE.Color(bgColor);
      camera.zoom = 1.5;
      camera.updateProjectionMatrix(); // Lights

      var hemiLight = self.getHemiLight();
      hemiLight.name = "hemiLight";
      scene.add(hemiLight);
      var ambientLight = self.getAmbientLight(0xffffff, 1);
      ambientLight.name = "ambientLight";
      scene.add(ambientLight);
      var spotLight = self.getSpotLight(0xffffff, 0.4, 100, Math.PI / 3);
      spotLight.name = "spotLight";
      scene.add(spotLight); //
      // const directionalLight = self.getDirectionalLight(0xffffff, 1);
      // directionalLight.name = "directionalLight";
      // scene.add(directionalLight);

      var thisSpotlight = self.gui.addFolder('spotlight'); // lights.add(ambientLight, 'intensity', 0, 1);

      thisSpotlight.add(spotLight.rotation, 'x', -Math.PI, Math.PI);
      thisSpotlight.add(spotLight.rotation, 'y', -Math.PI, Math.PI);
      thisSpotlight.add(spotLight.rotation, 'z', -Math.PI, Math.PI);
      thisSpotlight.add(spotLight.position, 'x', -100, 100);
      thisSpotlight.add(spotLight.position, 'y', -100, 100);
      thisSpotlight.add(spotLight.position, 'z', -100, 100);
      var plane = self.getPlane(1000, 1000, 0x4c95eb);
      plane.name = "plane";
      plane.receiveShadow = true;
      var thisPlane = self.gui.addFolder('plane');
      thisPlane.add(plane.rotation, 'x', -Math.PI, Math.PI);
      thisPlane.add(plane.rotation, 'y', -Math.PI, Math.PI);
      thisPlane.add(plane.rotation, 'z', -Math.PI, Math.PI);
      scene.add(plane);
      return scene;
    }
  }, {
    key: "getHemiLight",
    value: function getHemiLight() {
      var light = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF);
      light.position.set(0, 50, 0);
      return light;
    }
  }, {
    key: "getAmbientLight",
    value: function getAmbientLight(color, intensity) {
      var light = new THREE.AmbientLight(color, intensity);
      light.position.set(0, 0, 50);
      return light;
    }
  }, {
    key: "getDirectionalLight",
    value: function getDirectionalLight(color, intensity) {
      var light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-4, 11, 22);
      light.castShadow = true;
      light.shadow.bias = 0.001;
      light.shadow.mapSize.width = 2048;
      light.shadow.mapSize.height = 2048;
      return light;
    }
  }, {
    key: "getSpotLight",
    value: function getSpotLight(color, intensity, distance, angle) {
      // SpotLight( color : Integer, intensity : Float, distance : Float, angle : Radians, penumbra : Float, decay : Float )
      var light = new THREE.SpotLight(color, intensity, distance, angle);
      light.position.set(-8.7, 17.8, 27);
      light.castShadow = true;
      light.shadow.bias = 0.001;
      light.shadow.mapSize.width = 2048;
      light.shadow.mapSize.height = 2048;
      return light;
    }
  }, {
    key: "getPlane",
    value: function getPlane(w, h, color) {
      var geometry = new THREE.PlaneBufferGeometry(w, w, h, h);
      var material = new THREE.MeshStandardMaterial({
        color: color
      });
      var mesh = new THREE.Mesh(geometry, material);
      mesh.receiveShadow = true;
      mesh.rotation.x = -1.17;
      return mesh;
    }
  }, {
    key: "update",
    value: function update(scene) {
      var self = this;
      var renderer = self.renderer,
          camera = self.camera;
      renderer.render(scene, camera);
      requestAnimationFrame(function () {
        self.update(scene); // self.callback;
      });
    }
  }]);

  return RenderGift;
}();



/***/ })

})
//# sourceMappingURL=app.555dd6d2f8f39209c5aa.hot-update.js.map