document.onscroll = window.onresize = function() {
  var nav = document.getElementById('contents'),
      background = document.getElementById('background'),
      offset = document.getElementById('container').offsetTop - window.pageYOffset;
  
  offset < 0 ? nav.classList.add('fixed') : nav.classList.remove('fixed');
  /* Background appearance transition */
  
  var translucencyLimit = 150;
  
  if( offset > translucencyLimit ){
    background.style.opacity = 0;
  } else if( offset < 0 ){
    background.style.opacity = 1;
  } else {
    background.style.opacity = 1 - (offset / translucencyLimit);
  }
}

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function switchStyle() {
  var styler = document.getElementById('styler');
  if( styler.href.endsWith('bright.css') ){
    styler.href = 'dark.css';
  } else {
    styler.href = 'bright.css';
  }
}