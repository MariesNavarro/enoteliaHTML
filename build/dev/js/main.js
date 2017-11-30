/*
version 0.3
*/
function _(el){return document.getElementById(el); }
function __(el){return document.getElementsByClassName(el); }

var headT =  document.getElementsByTagName("head")[0],
    linkCSS  = document.createElement('link');
    linkCSS.rel  = 'stylesheet';
    linkCSS.type = 'text/css';

var textIntro =__('textIntro'),
    btnCata = __('btnCata'),
    textCata = __('textCata'),
    iconCata = __('iconCata'),
    phoneBtn = __('phoneBtn');

var lHeader = _('logitpoHeader'),
    tHeader = _('textoHeader'),
    btnMobile = _('btnMobile'),
    menuMobile = _('menuMobile'),
    menutexto = _('menutexto'),
    menuIconId = _('menuIconId'),
    menuIconClose = _('menuIconClose'),
    logotipoFijo = _('logotipoFijo'),
    phonePop = _('phonePop'),
    logoH = lHeader.offsetWidth,
    textH = tHeader.offsetHeight,
    scrollT = document.body.srollTop;

var left = logotipoFijo.offsetLeft;
logotipoFijo.style.top = left + "px";

var percentage = _('percentage');
var loadingWrap = _('loadingWrap');
var loadingLogo = _('loadingLogo');
var loadFinished = 0;
var vinosFinished = 0;
var init, v;
var xhrList = [];
var urlList = [];
var urlVinos = [];
var xhrVinos = [];

var vinosLoaded = false;
var logoComplete = false;
var checkMobile = false;


window.onload = function(){
  checkLoad();
  logoLoad();
  if(bowser.mobile || bowser.tablet || /SymbianOS/.test(window.navigator.userAgent)) checkMobile = true;
      if(checkMobile){
        for(var i = 0; i<phoneBtn.length; i++){
          phoneBtn[i].setAttribute('href', 'tel:55006787');
        }
        console.log("Mobile");
      }else{
        for(var i = 0; i<phoneBtn.length; i++){
          phoneBtn[i].setAttribute('onclick', 'phoneDesktop(1)');
        }
        console.log("Desktop");
      }
}

function phoneDesktop(c){
  if(c == 1){
    phonePop.style.display = "block";
    setTimeout(function(){ phonePop.style.opacity = "1"; },300);
  }
  if(c == 2){
    phonePop.style.opacity = "0";
    setTimeout(function(){ phonePop.style.display = "none"; },500);
  }
}


function checkLoad(){
  for( i = 1; i <= 9; i++){
    urlVinos.push('img/b'+i+'.jpg');
  }

  for(var i=0; i<urlVinos.length; i++){
    xhrVinos[i] = new XMLHttpRequest();
    xhrVinos[i].open('GET', urlVinos[i], true);
    xhrVinos[i].responseType = "blob";
    xhrVinos[i].onload = function (e){
      if(this.readyState == 4){
        vinosFinished++;
        var num = Math.round(vinosFinished * 11.112 );
        percentage.style.height = num + "%";
        if(vinosFinished == 9){
        vinosLoaded = true;
        }
      }
    }
    xhrVinos[i].send();
  } //xhrVinos
}

function logoLoad(){
   var app = new PIXI.Application(400, 400,{antialias: false, transparent: true, resolution: 1});
   app.view.style.position = "absolute";
   app.view.style.top = "0";
   app.view.style.left = "0";
   loadingLogo.appendChild(app.view);
   PIXI.loader
   .add('img/loading/logoLoad_1.json')
   .add('img/loading/logoLoad_2.json')
   .load(onAssetsLoaded);

   function onAssetsLoaded(){
     var frames = [];
     for (var i = 0; i < 63; i++) {
         frames.push(PIXI.Texture.fromFrame('logo_' + i + '.png'));
     }
     var anim = new PIXI.extras.AnimatedSprite(frames);
     anim.x = app.renderer.width / 2;
     anim.y = app.renderer.height / 2;
     anim.anchor.set(0.5);
     anim.animationSpeed = 0.3;
     anim.loop = false;
     anim.onComplete = function() {
       logoComplete = true;
       if(logoComplete && vinosLoaded){
         loadingWrap.style.opacity = 0;
         setTimeout(function(){ loadingWrap.style.display = "none"; });
       }
     };
     anim.play();
     app.stage.addChild(anim);
   }
}




window.onresize = function(){
  left = logotipoFijo.offsetLeft;
  logotipoFijo.style.top = left + "px";

  logoH = lHeader.offsetWidth;
  textH = tHeader.offsetWidth;
  logitpoHeader.style.height = logoH+"px";
  var newTopText = logoH + textH;
  var size = document.getElementById("size").innerHTML = "Width: " + window.innerWidth + "px , Height: " + window.innerHeight + "px";

}

var target = document.getElementsByClassName("target");
var bulletTexto = document.getElementsByClassName("bulletTexto");
var bullet = document.getElementsByClassName("bullet");
var guionElem = document.getElementsByClassName('guionElem');
var navBullet = document.getElementsByClassName('navBullet');
var st0 = document.getElementsByClassName('st0');
var menuIcon = document.getElementsByClassName('menuIcon');

function bulletBlanco (){
  for (var i = 0; i < menuIcon.length; i++) {
    menuIcon[i].style.fill = "#fff";
  }
  for (var i = 0; i < st0.length; i++) {
    st0[i].style.fill = "#fff";
  }
  for (var i = 0; i < bullet.length; i++) {
    bullet[i].style.background = "#fff";
    bulletTexto[i].style.color = "#fff";
    guionElem[i].style.background = "#fff";
  }
}

function bulletNegro (){
  for (var i = 0; i < bullet.length; i++) {
    bullet[i].style.background = "#000";
    bulletTexto[i].style.color = "#000";
    guionElem[i].style.background = "#000";
  }
  for (var i = 0; i < st0.length; i++) {
    st0[i].style.fill = "#000";
  }
  for (var i = 0; i < menuIcon.length; i++) {
    menuIcon[i].style.fill = "#000";
  }
}

var poster = _('poster');
var textElem = _('textElem');
var flecha = _("flecha");

window.onscroll = function(){
      var stateScroll = 70;
      var sTop = window.scrollY/2;
      var sTOpa = 0 + window.scrollY/200;
      var sTOpaN = 1 - window.scrollY/200;

      poster.style.backgroundPosition = "center "+ (stateScroll  + sTop) +"%";
      if(sTOpa > 0.50){
        textoHeader.style.opacity = sTOpa;
      } else{
        textoHeader.style.opacity = 0;
      }
      flecha.style.opacity = sTOpaN;



var   targetRect1 = target[0].getBoundingClientRect(),
      targetHeight1 = target[0].offsetHeight;
      targetRect2 = target[1].getBoundingClientRect(),
      targetHeight2 = target[1].offsetHeight;
      targetRect3 = target[2].getBoundingClientRect(),
      targetHeight3 = target[2].offsetHeight;
      targetRect4 = target[3].getBoundingClientRect(),
      targetHeight4 = target[3].offsetHeight;
      targetRect5 = target[4].getBoundingClientRect(),
      targetHeight5 = target[4].offsetHeight;
      targetRect6 = target[5].getBoundingClientRect(),
      targetHeight6 = target[5].offsetHeight;
      targetRect7 = target[6].getBoundingClientRect(),
      targetHeight7 = target[6].offsetHeight;
      targetRect8 = target[7].getBoundingClientRect(),
      targetHeight8 = target[7].offsetHeight;
      targetRect9 = target[8].getBoundingClientRect(),
      targetHeight9 = target[8].offsetHeight;


      var target1 = targetHeight1 - targetRect1.top;
      var target2 = Math.floor(targetHeight2 - targetRect2.top);
      var target3 = Math.floor(targetHeight3 - targetRect3.top);
      var target4 = Math.floor(targetHeight4 - targetRect4.top);
      var target5 = Math.floor(targetHeight5 - targetRect5.top);
      var target6 = Math.floor(targetHeight6 - targetRect6.top);
      var target7 = Math.floor(targetHeight7 - targetRect7.top);
      var target8 = Math.floor(targetHeight8 - targetRect8.top);
      var target9 = Math.floor(targetHeight9 - targetRect9.top);


      var targetTercio = targetRect1.height / 4;

      var targetTop1 = targetRect1.top,
          targetTop2 = targetRect2.top,
          targetTop3 = targetRect3.top,
          targetTop4 = targetRect4.top,
          targetTop5 = targetRect5.top,
          targetTop6 = targetRect6.top,
          targetTop7 = targetRect7.top,
          targetTop8 = targetRect8.top,
          targetTop9 = targetRect9.top;


      if(target1 > targetTercio && targetTop1 > 0){
        bulletNegro();
        setTimeout(function(){
          bulletTexto[0].style.opacity = "1";
          bulletTexto[1].style.opacity = "0";
          bulletTexto[2].style.opacity = "0";
          bulletTexto[3].style.opacity = "0";
          bulletTexto[4].style.opacity = "0";
          bulletTexto[5].style.opacity = "0";
          bulletTexto[6].style.opacity = "0";
          bulletTexto[7].style.opacity = "0";
          bulletTexto[8].style.opacity = "0";

          guionElem[0].style.opacity = "1";
          guionElem[1].style.opacity = "0";
          guionElem[2].style.opacity = "0";
          guionElem[3].style.opacity = "0";
          guionElem[4].style.opacity = "0";
          guionElem[5].style.opacity = "0";
          guionElem[6].style.opacity = "0";
          guionElem[7].style.opacity = "0";
          guionElem[8].style.opacity = "0";


          bullet[0].style.opacity = "1";
          bullet[1].style.opacity = "0.3";
          bullet[2].style.opacity = "0.3";
          bullet[3].style.opacity = "0.3";
          bullet[4].style.opacity = "0.3";
          bullet[5].style.opacity = "0.3";
          bullet[6].style.opacity = "0.3";
          bullet[7].style.opacity = "0.3";
          bullet[8].style.opacity = "0.3";
        },500);
      }
      if (target2 > targetTercio && targetTop2 > 0){
        bulletBlanco();
        setTimeout(function(){
          bulletTexto[0].style.opacity = "0";
          bulletTexto[1].style.opacity = "1";
          bulletTexto[2].style.opacity = "0";
          bulletTexto[3].style.opacity = "0";
          bulletTexto[4].style.opacity = "0";
          bulletTexto[5].style.opacity = "0";
          bulletTexto[6].style.opacity = "0";
          bulletTexto[7].style.opacity = "0";
          bulletTexto[8].style.opacity = "0";

          guionElem[0].style.opacity = "0";
          guionElem[1].style.opacity = "1";
          guionElem[2].style.opacity = "0";
          guionElem[3].style.opacity = "0";
          guionElem[4].style.opacity = "0";
          guionElem[5].style.opacity = "0";
          guionElem[6].style.opacity = "0";
          guionElem[7].style.opacity = "0";
          guionElem[8].style.opacity = "0";


          bullet[0].style.opacity = "0.3";
          bullet[1].style.opacity = "1";
          bullet[2].style.opacity = "0.3";
          bullet[3].style.opacity = "0.3";
          bullet[4].style.opacity = "0.3";
          bullet[5].style.opacity = "0.3";
          bullet[6].style.opacity = "0.3";
          bullet[7].style.opacity = "0.3";
          bullet[8].style.opacity = "0.3";
        },500);
      }
      if (target3 > targetTercio && targetTop3 > 0){
        bulletBlanco();
        setTimeout(function(){
          bulletTexto[0].style.opacity = "0";
          bulletTexto[1].style.opacity = "0";
          bulletTexto[2].style.opacity = "1";
          bulletTexto[3].style.opacity = "0";
          bulletTexto[4].style.opacity = "0";
          bulletTexto[5].style.opacity = "0";
          bulletTexto[6].style.opacity = "0";
          bulletTexto[7].style.opacity = "0";
          bulletTexto[8].style.opacity = "0";

          guionElem[0].style.opacity = "0";
          guionElem[1].style.opacity = "0";
          guionElem[2].style.opacity = "1";
          guionElem[3].style.opacity = "0";
          guionElem[4].style.opacity = "0";
          guionElem[5].style.opacity = "0";
          guionElem[6].style.opacity = "0";
          guionElem[7].style.opacity = "0";
          guionElem[8].style.opacity = "0";

          bullet[0].style.opacity = "0.3";
          bullet[1].style.opacity = "0.3";
          bullet[2].style.opacity = "1";
          bullet[3].style.opacity = "0.3";
          bullet[4].style.opacity = "0.3";
          bullet[5].style.opacity = "0.3";
          bullet[6].style.opacity = "0.3";
          bullet[7].style.opacity = "0.3";
          bullet[8].style.opacity = "0.3";
        },500);
      }
      if (target4 > targetTercio && targetTop4 > 0){
        bulletBlanco();
        setTimeout(function(){
          bulletTexto[0].style.opacity = "0";
          bulletTexto[1].style.opacity = "0";
          bulletTexto[2].style.opacity = "0";
          bulletTexto[3].style.opacity = "1";
          bulletTexto[4].style.opacity = "0";
          bulletTexto[5].style.opacity = "0";
          bulletTexto[6].style.opacity = "0";
          bulletTexto[7].style.opacity = "0";
          bulletTexto[8].style.opacity = "0";

          guionElem[0].style.opacity = "0";
          guionElem[1].style.opacity = "0";
          guionElem[2].style.opacity = "0";
          guionElem[3].style.opacity = "1";
          guionElem[4].style.opacity = "0";
          guionElem[5].style.opacity = "0";
          guionElem[6].style.opacity = "0";
          guionElem[7].style.opacity = "0";
          guionElem[8].style.opacity = "0";

          bullet[0].style.opacity = "0.3";
          bullet[1].style.opacity = "0.3";
          bullet[2].style.opacity = "0.3";
          bullet[3].style.opacity = "1";
          bullet[4].style.opacity = "0.3";
          bullet[5].style.opacity = "0.3";
          bullet[6].style.opacity = "0.3";
          bullet[7].style.opacity = "0.3";
          bullet[8].style.opacity = "0.3";
        },500);
      }
      if (target5 > targetTercio && targetTop5 > 0){
        bulletBlanco();
        setTimeout(function(){
          bulletTexto[0].style.opacity = "0";
          bulletTexto[1].style.opacity = "0";
          bulletTexto[2].style.opacity = "0";
          bulletTexto[3].style.opacity = "0";
          bulletTexto[4].style.opacity = "1";
          bulletTexto[5].style.opacity = "0";
          bulletTexto[6].style.opacity = "0";
          bulletTexto[7].style.opacity = "0";
          bulletTexto[8].style.opacity = "0";

          guionElem[0].style.opacity = "0";
          guionElem[1].style.opacity = "0";
          guionElem[2].style.opacity = "0";
          guionElem[3].style.opacity = "0";
          guionElem[4].style.opacity = "1";
          guionElem[5].style.opacity = "0";
          guionElem[6].style.opacity = "0";
          guionElem[7].style.opacity = "0";
          guionElem[8].style.opacity = "0";

          bullet[0].style.opacity = "0.3";
          bullet[1].style.opacity = "0.3";
          bullet[2].style.opacity = "0.3";
          bullet[3].style.opacity = "0.3";
          bullet[4].style.opacity = "1";
          bullet[5].style.opacity = "0.3";
          bullet[6].style.opacity = "0.3";
          bullet[7].style.opacity = "0.3";
          bullet[8].style.opacity = "0.3";
        },500);
      }
      if(target6 > targetTercio && targetTop6 > 0){
        bulletNegro();
        setTimeout(function(){
          bulletTexto[0].style.opacity = "0";
          bulletTexto[1].style.opacity = "0";
          bulletTexto[2].style.opacity = "0";
          bulletTexto[3].style.opacity = "0";
          bulletTexto[4].style.opacity = "0";
          bulletTexto[5].style.opacity = "1";
          bulletTexto[6].style.opacity = "0";
          bulletTexto[7].style.opacity = "0";
          bulletTexto[8].style.opacity = "0";

          guionElem[0].style.opacity = "0";
          guionElem[1].style.opacity = "0";
          guionElem[2].style.opacity = "0";
          guionElem[3].style.opacity = "0";
          guionElem[4].style.opacity = "0";
          guionElem[5].style.opacity = "1";
          guionElem[6].style.opacity = "0";
          guionElem[7].style.opacity = "0";
          guionElem[8].style.opacity = "0";

          bullet[0].style.opacity = "0.3";
          bullet[1].style.opacity = "0.3";
          bullet[2].style.opacity = "0.3";
          bullet[3].style.opacity = "0.3";
          bullet[4].style.opacity = "0.3";
          bullet[5].style.opacity = "1";
          bullet[6].style.opacity = "0.3";
          bullet[7].style.opacity = "0.3";
          bullet[8].style.opacity = "0.3";
        },500);
      }
      if(target7 > targetTercio && targetTop7 > 0){
        bulletBlanco();
        setTimeout(function(){
          bulletTexto[0].style.opacity = "0";
          bulletTexto[1].style.opacity = "0";
          bulletTexto[2].style.opacity = "0";
          bulletTexto[3].style.opacity = "0";
          bulletTexto[4].style.opacity = "0";
          bulletTexto[5].style.opacity = "0";
          bulletTexto[6].style.opacity = "1";
          bulletTexto[7].style.opacity = "0";
          bulletTexto[8].style.opacity = "0";

          guionElem[0].style.opacity = "0";
          guionElem[1].style.opacity = "0";
          guionElem[2].style.opacity = "0";
          guionElem[3].style.opacity = "0";
          guionElem[4].style.opacity = "0";
          guionElem[5].style.opacity = "0";
          guionElem[6].style.opacity = "1";
          guionElem[7].style.opacity = "0";
          guionElem[8].style.opacity = "0";

          bullet[0].style.opacity = "0.3";
          bullet[1].style.opacity = "0.3";
          bullet[2].style.opacity = "0.3";
          bullet[3].style.opacity = "0.3";
          bullet[4].style.opacity = "0.3";
          bullet[5].style.opacity = "0.3";
          bullet[6].style.opacity = "1";
          bullet[7].style.opacity = "0.3";
          bullet[8].style.opacity = "0.3";
        }, 500);
      }
      if(target8 > targetTercio && targetTop8 > 0){
        bulletBlanco();
        setTimeout(function(){
          bulletTexto[0].style.opacity = "0";
          bulletTexto[1].style.opacity = "0";
          bulletTexto[2].style.opacity = "0";
          bulletTexto[3].style.opacity = "0";
          bulletTexto[4].style.opacity = "0";
          bulletTexto[5].style.opacity = "0";
          bulletTexto[6].style.opacity = "0";
          bulletTexto[7].style.opacity = "1";
          bulletTexto[8].style.opacity = "0";

          guionElem[0].style.opacity = "0";
          guionElem[1].style.opacity = "0";
          guionElem[2].style.opacity = "0";
          guionElem[3].style.opacity = "0";
          guionElem[4].style.opacity = "0";
          guionElem[5].style.opacity = "0";
          guionElem[6].style.opacity = "0";
          guionElem[7].style.opacity = "1";
          guionElem[8].style.opacity = "0";

          bullet[0].style.opacity = "0.3";
          bullet[1].style.opacity = "0.3";
          bullet[2].style.opacity = "0.3";
          bullet[3].style.opacity = "0.3";
          bullet[4].style.opacity = "0.3";
          bullet[5].style.opacity = "0.3";
          bullet[6].style.opacity = "0.3";
          bullet[7].style.opacity = "1";
          bullet[8].style.opacity = "0.3";
        },500);
      }
      if(target9 > targetTercio && targetTop9 > 0){
        bulletBlanco();
        setTimeout(function(){
          bulletTexto[0].style.opacity = "0";
          bulletTexto[1].style.opacity = "0";
          bulletTexto[2].style.opacity = "0";
          bulletTexto[3].style.opacity = "0";
          bulletTexto[4].style.opacity = "0";
          bulletTexto[5].style.opacity = "0";
          bulletTexto[6].style.opacity = "0";
          bulletTexto[7].style.opacity = "0";
          bulletTexto[8].style.opacity = "1";

          guionElem[0].style.opacity = "0";
          guionElem[1].style.opacity = "0";
          guionElem[2].style.opacity = "0";
          guionElem[3].style.opacity = "0";
          guionElem[4].style.opacity = "0";
          guionElem[5].style.opacity = "0";
          guionElem[6].style.opacity = "0";
          guionElem[7].style.opacity = "0";
          guionElem[8].style.opacity = "1";

          bullet[0].style.opacity = "0.3";
          bullet[1].style.opacity = "0.3";
          bullet[2].style.opacity = "0.3";
          bullet[3].style.opacity = "0.3";
          bullet[4].style.opacity = "0.3";
          bullet[5].style.opacity = "0.3";
          bullet[6].style.opacity = "0.3";
          bullet[7].style.opacity = "0.3";
          bullet[8].style.opacity = "1";
        },500);
      }
};


//headerOFF
var btnsCompra = document.getElementsByClassName('bt'),
    btnCompra = _('btnCompra');
    heightCompra = btnCompra.offsetHeight;

    btnsCompra[0].style.lineHeight = heightCompra + "px";
    btnsCompra[1].style.lineHeight = heightCompra + "px";
    btnsCompra[2].style.lineHeight = heightCompra + "px";
    btnsCompra[3].style.lineHeight = heightCompra + "px";
    btnsCompra[4].style.lineHeight = heightCompra + "px";
    btnsCompra[5].style.lineHeight = heightCompra + "px";
    btnsCompra[6].style.lineHeight = heightCompra + "px";
    btnsCompra[7].style.lineHeight = heightCompra + "px";
    btnsCompra[8].style.lineHeight = heightCompra + "px";


var menuOpen = false;

btnMobile.addEventListener("click", function(){
  menuOpen = !menuOpen;
  if(menuOpen){
    menuMobile.style.left = "0";
    menutexto.style.right = "30%";
    menuIconId.style.display = "none";
    menuIconClose.style.display = "block";
  } else {
    menuMobile.style.left = "100%";
    menutexto.style.right = "10%";
    menuIconId.style.display = "block";
    menuIconClose.style.display = "none";
  }
});


function goToMobile(){
  menuOpen = !menuOpen;
  menuMobile.style.left = "100%";
  menutexto.style.right = "10%";
}

var openCata = false;

btnCata[0].addEventListener("click", function(){
  handlerCata(0);
});
btnCata[1].addEventListener("click", function(){
  handlerCata(1);
});
btnCata[2].addEventListener("click", function(){
  handlerCata(2);
});
btnCata[3].addEventListener("click", function(){
  handlerCata(3);
});
btnCata[4].addEventListener("click", function(){
  handlerCata(4);
});
btnCata[5].addEventListener("click", function(){
  handlerCata(5);
});
btnCata[6].addEventListener("click", function(){
  handlerCata(6);
});
btnCata[7].addEventListener("click", function(){
  handlerCata(7);
});
btnCata[8].addEventListener("click", function(){
  handlerCata(8);
});


function handlerCata (e){
  openCata = !openCata;
  if(openCata){
    textIntro[e].style.height = "0%";
    textCata[e].style.height = "auto";
    iconCata[e].innerHTML = "&#8593;";
    btnCata[e].style.marginTop = "-10px";


  } else {
    textIntro[e].style.height = "auto";
    textCata[e].style.height = "0%";
    iconCata[e].innerHTML = "&#8595;"
    btnCata[e].style.marginTop = "0";
  }
}


navBullet[0].addEventListener("mouseenter", function(){
  guionElem[0].style.opacity = "1";
  bulletTexto[0].style.opacity = "1";
});

navBullet[0].addEventListener("mouseout", function(){
  guionElem[0].style.opacity = "0";
  bulletTexto[0].style.opacity = "0";
});

navBullet[1].addEventListener("mouseenter", function(){
  guionElem[1].style.opacity = "1";
  bulletTexto[1].style.opacity = "1";
});

navBullet[1].addEventListener("mouseout", function(){
  guionElem[1].style.opacity = "0";
  bulletTexto[1].style.opacity = "0";
});

navBullet[2].addEventListener("mouseenter", function(){
  guionElem[2].style.opacity = "1";
  bulletTexto[2].style.opacity = "1";
});

navBullet[2].addEventListener("mouseout", function(){
  guionElem[2].style.opacity = "0";
  bulletTexto[2].style.opacity = "0";
});

navBullet[3].addEventListener("mouseenter", function(){
  guionElem[3].style.opacity = "1";
  bulletTexto[3].style.opacity = "1";
});

navBullet[3].addEventListener("mouseout", function(){
  guionElem[3].style.opacity = "0";
  bulletTexto[3].style.opacity = "0";
});

navBullet[4].addEventListener("mouseenter", function(){
  guionElem[4].style.opacity = "1";
  bulletTexto[4].style.opacity = "1";
});

navBullet[4].addEventListener("mouseout", function(){
  guionElem[4].style.opacity = "0";
  bulletTexto[4].style.opacity = "0";
});

navBullet[5].addEventListener("mouseenter", function(){
  guionElem[5].style.opacity = "1";
  bulletTexto[5].style.opacity = "1";
});

navBullet[5].addEventListener("mouseout", function(){
  guionElem[5].style.opacity = "0";
  bulletTexto[5].style.opacity = "0";
});

navBullet[6].addEventListener("mouseenter", function(){
  guionElem[6].style.opacity = "1";
  bulletTexto[6].style.opacity = "1";
});

navBullet[6].addEventListener("mouseout", function(){
  guionElem[6].style.opacity = "0";
  bulletTexto[6].style.opacity = "0";
});

navBullet[7].addEventListener("mouseenter", function(){
  guionElem[7].style.opacity = "1";
  bulletTexto[7].style.opacity = "1";
});

navBullet[7].addEventListener("mouseout", function(){
  guionElem[7].style.opacity = "0";
  bulletTexto[7].style.opacity = "0";
});

navBullet[8].addEventListener("mouseenter", function(){
  guionElem[8].style.opacity = "1";
  bulletTexto[8].style.opacity = "1";
});

navBullet[8].addEventListener("mouseout", function(){
  guionElem[8].style.opacity = "0";
  bulletTexto[8].style.opacity = "0";
});
