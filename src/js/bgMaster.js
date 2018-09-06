import Bg1 from './Bg1.js';
import Bg2 from './Bg2.js';
// import Bg3 from './Bg3.js';


const baseVert = require('./shader/bgMaster.vert');
const baseFrag = require('./shader/bgMaster.frag');
const texture1 = require('../assets/images/texture1.png');
const texture2 = require('../assets/images/texture1.png');


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
let uTime = 0;
let uScroll = 0;
let uIndex = 0;
let uAlpha = 0;

var clock = new THREE.Clock();
let windowW = window.innerWidth;
let windowH = window.innerHeight;
let sectionH;
let aspect = windowW / windowH;
let documentH = document.body.clientHeight;
let articles = document.getElementsByClassName('md_article');


export default class Background {

  constructor() {
    this.init();
  }

  //初期化
  init() {
    renderer = new THREE.WebGLRenderer();
    ctx = renderer.context;

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

    //ボックスのサイズ
    sectionH = documentH / (articles.length - 1);

    //背景を作る
    this.createTextuer();

    //テクスチャをレンダリング
    this.create();
    this.render();

    //スクロールイベント
    $(window).scroll(function (e) {
      uScroll = $(e.target).scrollTop();
      this.bg1.scroll = uScroll;
      this.bg2.scroll = uScroll;
      // this.bg3.scroll = uScroll;

    }.bind(this));

    //リサイズイベント
    $(window).resize(function (e) {
      windowW = window.innerWidth;
      windowH = window.innerHeight;

      this.bg1.windowSize = {
        windowH: windowH,
        windowW: windowW
      };

      this.bg2.windowSize = {
        windowH: windowH,
        windowW: windowW
      };

      // this.bg3.windowSize = {
      //   windowH: windowH,
      //   windowW: windowW
      // };

      // レンダラーのサイズを調整する
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(windowW, windowH);

      // カメラのアスペクト比を正す
      camera.aspect = windowW / windowH;
      camera.updateProjectionMatrix();

    }.bind(this));

  }

  createTextuer() {
    //テクスチャ1
    this.bg1 = new Bg1(renderer, windowW, windowH, sectionH);
    this.texture1 = this.bg1.texture;
    this.bg1.windowSize = {
      windowH: windowH,
      windowW: windowW
    };
    //テクスチャ2
    this.bg2 = new Bg2(renderer, windowW, windowH, sectionH);
    this.texture2 = this.bg2.texture;
    this.bg2.windowSize = {
      windowH: windowH,
      windowW: windowW
    };
    // //テクスチャ3
    // this.bg3 = new Bg3(renderer, windowW, windowH, sectionH);
    // this.texture3 = this.bg3.texture;
    // this.bg3.windowSize = {
    //   windowH: windowH,
    //   windowW: windowW
    // };
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
        scroll: {
          type: 'f',
          value: uScroll
        },
        resolution:{
          type:'v2',
          value:new THREE.Vector2(windowW,windowH)
        },
        docsize:{
          type:'v2',
          value:new THREE.Vector2($(document).width(),$(document).height())
        },
        uTex1: {
          type: 't',
          value: this.texture1
        },
        uTex2: {
          type: 't',
          value: this.texture2
        },
        // uTex3: {
        //   type: 't',
        //   value: this.texture3
        // }
      },
      vertexShader: baseVert,
      fragmentShader: baseFrag,
      transparent: true
    });

    mesh = new THREE.Mesh(geometry, material);

    // Meshをシーンに追加
    scene.add(mesh);
  }

  //レンダリング
  render() {
    uTime = clock.getElapsedTime();
    mesh.material.uniforms.time.value = uTime;
    mesh.material.uniforms.scroll.value = uScroll;
    renderer.render(scene, camera);
    requestAnimationFrame(this.render.bind(this));
  }

}