String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var nav, navTop;

function load() {
  nav = document.getElementById('contents');
  navTop = nav.offsetTop;
}

document.onscroll = function() {
  window.pageYOffset > navTop ?
    nav.classList.add('fixed') : nav.classList.remove('fixed')
}

function quoteHide() {
  document.getElementById('largequote').style.visibility = 'hidden';
}

function quoteShow(quoteid) {
  var selectSpeaker = document.getElementById(quoteid);
  var selectText = selectSpeaker.parentElement.getElementsByTagName("td")[0];
  
  var large = document.getElementById('largequote')
  var largeSpeaker = large.getElementsByTagName('h1')[0]
  var largeText = large.getElementsByTagName('p')[0]
  
  largeSpeaker.innerHTML = selectSpeaker.innerHTML;
  largeText.innerHTML = selectText.innerHTML;
  large.style.visibility = 'visible';
  
  /* Size text based on length */
  height = 150 / Math.log(selectText.innerHTML.length / 5);
  largeText.style.fontSize = height + "px";
}

function switchStyle() {
  var styler = document.getElementById('styler');
  if( styler.href.endsWith('bright.css') ){
    styler.href = 'dark.css';
  } else {
    styler.href = 'bright.css';
  }
}