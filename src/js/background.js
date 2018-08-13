const baseVert = require('./shader/base.vert');
const baseFrag = require('./shader/base.frag');
const texture1 = require('../images/texture1.png');

const THREE = require('three-js')([
  'EffectComposer',
  'OrbitControls',
  'CopyShader',
  'ShaderPass',
  'RenderPass',
  'MaskPass'
]);

//THREE.js用変数
let renderer;
let camera;
let scene;
let light;
let ctx;
let mesh;

//uniform変数
let uTime;

var clock = new THREE.Clock();
let windowW = window.innerWidth;
let windowH = window.innerHeight;
let aspect = windowW / windowH;


export default class Background {

  constructor() {
    this.init();
  }

  //初期化
  init() {
    renderer = new THREE.WebGLRenderer();
    ctx = renderer.context;
    ctx.getShaderInfoLog = function () {
      return ''
    };

    // canvasをbodyに追加
    document.body.appendChild(renderer.domElement);

    // canvasをリサイズ
    renderer.setSize(windowW, windowH);

    // scene作成
    scene = new THREE.Scene();

    light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);


    // camera作成
    camera = new THREE.PerspectiveCamera(75, windowW / windowH, 0.1, 1000);
    camera.position.z = 1;

    this.create();
    this.render();
  }

  //オブジェクトを作成
  create() {

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

    let uvs = new Float32Array([
      0.0, 1.0, //1つ目の頂点のUV座標
      1.0, 1.0, //2つ目の頂点のUV座標
      0.0, 0.0, //3つ目の頂点のUV座標
      1.0, 0.0 //4つ目の頂点のUV座標
    ]);

    //頂点座標
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    //テクスチャ座標
    geometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    //頂点のつなげ順
    geometry.setIndex(new THREE.BufferAttribute(index, 1));

    //マテリアルを設定。シェーダーファイルや、uniform変数を指定
    let material = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: uTime
        },
        uTex: {
          type: 't',
          value: new THREE.TextureLoader().load(texture1)
        }
      },
      vertexShader: baseVert,
      fragmentShader: baseFrag
    });

    mesh = new THREE.Mesh(geometry, material);

    // Meshをシーンに追加
    scene.add(mesh);
  }

  //レンダリング
  render() {
    uTime = clock.getElapsedTime();
    mesh.material.uniforms.time.value = uTime;
    renderer.render(scene, camera);
    requestAnimationFrame(this.render.bind(this));
  }

}
