

import Background from './js/background.js';
import {TweenMax} from "gsap";
import './css/sass/normalize.scss';
import './css/sass/app.scss';


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
  //背景画像を表示
  new Background();

  //articleの高さを設定
  let windowH = window.innerHeight;
  let articles = document.getElementsByClassName('md_main_article');
  

  for(let i=0,j = articles.length; i < j;i ++){
    articles[i].style.height = windowH - 100 + 'px';
  }
  //$('.md_main_article')
  showTitle();
}

let showTitle = ()=>{
  TweenMax.set('#md_title_1_1',{ x: 200,opacity: 0});
  TweenMax.to('#md_title_1_1', 1.5, { x: 0, opacity: 1,ease: Expo.easeOut ,delay:1.0});
  TweenMax.set('#md_title_1_2',{ x: 200,opacity: 0});
  TweenMax.to('#md_title_1_2', 1.5, { x: 0, opacity: 1,ease: Expo.easeOut ,delay:2.0});
}
