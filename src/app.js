import Background from './js/bgMaster.js';
import {
  TweenMax
} from "gsap";
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

  let windowH = window.innerHeight;
  let articles = document.getElementsByClassName('md_article');
  let navs = $('#nav li');
  let nav = $('#nav');

  //articleの高さを設定
  $.each(articles, function (index, value) {
    value.style.height = windowH + 'px';
    let aninimeElms = $(value).find('.md_aninime');
    $.each(aninimeElms, function (childIndex, childValue) {
      $(childValue).attr('id', 'aninime' + index + '_' + childIndex);
    });
  });

  //スクロールイベント
  $(window).scroll(function (e) {
    let scroll = $(e.target).scrollTop();

    if(scroll > 0){
      nav.show();
    }else{
      nav.hide();
    }

    $.each(articles, function (index, value) {
      //コンテンツの表示
      let elm = $(value);
      let contentTop = elm.offset().top;
      let isShowed = elm.hasClass('isShow');
      let nav = $(navs[index]);

      if ((contentTop + windowH * 0.25) < scroll + windowH && isShowed === false) {
        elm.addClass('isShow');
        showArticle(elm);
      }

      //
      if(contentTop <= scroll && (contentTop + windowH) > scroll){
        if(nav.hasClass('act') === false){
          nav.addClass('act');
        }
      }else{
        if(nav.hasClass('act') === true){
          nav.removeClass('act');
        }
      }
    });
  });

  //リサイズイベント
  $(window).resize(function () {
    windowH = window.innerHeight;
    $('#nav').css({
      top: (windowH - $('#nav').height()) / 2
    });
  });

  //ナビゲーション 
  navs.on('click', function (e,i) {

    if($(this).hasClass('act') === true){
      return false;
    }

    let index = $(this).attr('class').split('nav')[1];

    // スクロールの速度
    let speed = 400; // ミリ秒で記述
    let target = $(articles[index]);
   
    let position = target.offset().top;

    $('html,body').animate({
      scrollTop: position
    }, speed, 'swing',function(){
    });
    return false;
  });

  setTimeout(function(){
    $(window).trigger('scroll');
    $(window).trigger('resize');
  },1500);

}


let showArticle = (elm) => {
  $.each(elm.find('.md_aninime'), function (index) {
    let id = '#' + $(this).attr('id');

    if (index !== 3) {
      TweenMax.to(id, 1.3, {
        width: '100%',
        ease: Expo.easeInOut,
        delay: 0.4 * index
      });
    } else {
      TweenMax.to(id, 2, {
        opacity: 1,
        ease: Expo.easeOut,
        delay: 0.4 * index
      });
    }

  });

}