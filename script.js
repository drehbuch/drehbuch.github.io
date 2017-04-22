String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

HTMLElement.prototype.classCondition = function(classname, condition){
  condition ? this.classList.add(classname) : this.classList.remove(classname);
};

onScroll = function() {
  var nav = document.getElementById('contents'),
      background = document.getElementById('background'),
      offset = document.getElementById('container').offsetTop - window.pageYOffset;
  
  nav.classCondition('fixed', offset < 0);
  
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

document.onscroll = window.onresize = onScroll;

function quoteHide() {
  document.getElementById('largequote').style.visibility = 'hidden';
}

function quoteShow(selectSpeaker) {
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