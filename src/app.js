const baseVert = require('./js/shader/base.vert');
const baseFrag = require('./js/shader/base.frag');

// import './css/sass/app.scss';

const THREE = require('three-js')([
  'EffectComposer',
  'OrbitControls',
  'CopyShader',
  'ShaderPass',
  'RenderPass',
  'MaskPass'
]);


let notWebGL = function () {
    // webGL非対応時の記述
    console.log('this browser does not support webGL')
};

if (document.getElementsByTagName('html')[0].classList.contains('no-webgl')) {
    notWebGL();
}

// three.jsのとき
try {
    let renderer = new THREE.WebGLRenderer();
} catch (e) {
    notWebGL();
}


window.onload = function () {

    var renderer;
    var camera, scene;
    var theta = 0;
    var clock = new THREE.Clock();
    var composer;
    var customPass;

    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var aspect = windowWidth / windowHeight;
    var videoTexture;
    var video;

    //uniform用
    var distortion = 0.0;
    var distortion2 = 0.0;
    var scrollSpeed = 0.0;
    var time = 0.0;

    //audio関連の変数
    let context;
    let analyser;
    let bufferLength;
    let dataArray;
    let source;
    let fftSize;


    //audioInit();
    init();

    function init() {
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
    
      // rendererの作成
      let renderer = new THREE.WebGLRenderer();
      
      // canvasをbodyに追加
      document.body.appendChild(renderer.domElement);
    
      // canvasをリサイズ
      renderer.setSize(windowWidth, windowHeight);
    
      // scene作成
      let scene = new THREE.Scene();
      
      // camera作成
      let camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 1000);
      camera.position.z = 100;
    
      // Geometry作成
      let geometry = new THREE.PlaneBufferGeometry(100, 100);
      
      // Material作成
      let material = new THREE.ShaderMaterial({
        vertexShader: baseVert,
        fragmentShader: baseFrag,
        uniforms:{
          uColor: {type: "c", value: new THREE.Color(0xFF0000)}
        }
      });
      
      // Mesh作成
      let mesh = new THREE.Mesh(geometry,material);
    
      // Meshをシーンに追加
      scene.add(mesh);
    
      // draw
      renderer.render(scene, camera);


        render();
    }

    

    function render() {
      renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
};