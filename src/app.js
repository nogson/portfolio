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
  
} catch (e) {
  notWebGL();
}


window.onload = function () {
  let renderer ,camera, scene,light,ctx;
 
  var clock = new THREE.Clock();


  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let aspect = windowWidth / windowHeight;

  init();

  function init() {
    renderer = new THREE.WebGLRenderer();
      ctx = renderer.context;
    ctx.getShaderInfoLog = function () { return '' };

    // canvasをbodyに追加
    document.body.appendChild(renderer.domElement);

    // canvasをリサイズ
    renderer.setSize(windowWidth, windowHeight);

    // scene作成
    scene = new THREE.Scene();

    light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);


    // camera作成
    camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 1000);
    camera.position.z = 10;


    //Geometryを作成
    let geometry = new THREE.BufferGeometry();

    //頂点座標
    let vertices = new Float32Array([-1.0 * aspect, 1.0, 0.0,
      1.0 * aspect, 1.0, 0.0, -1.0 * aspect, -1.0, 0.0,
      1.0 * aspect, -1.0, 0.0

    ]);

    //頂点インデックス
    let index = new Uint32Array([
      0, 2, 1,
      1, 2, 3
    ]);

    //頂点座標
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    //頂点のつなげ順
    geometry.setIndex(new THREE.BufferAttribute(index, 1));

    //マテリアルを設定。シェーダーファイルや、uniform変数を指定
    let material = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: baseVert,
      fragmentShader: baseFrag
    });

    let mesh = new THREE.Mesh(geometry, material);

    // Meshをシーンに追加
    scene.add(mesh);

    render();
  }



  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
};