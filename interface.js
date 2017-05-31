var contentBox, largeQuote, lineIndexes = [];

window.onload = function(){
  /* initialise variables and show interaction elements */
  contentBox = document.getElementById('content');
  largeQuote = document.getElementById('largeQuote');
  
  document.getElementById('instructions').classList.remove('hidden');
  document.getElementById('searchbox').classList.remove('hidden');
  
  /* Show theming if CSS variables work */
  if( window.CSS && window.CSS.supports && window.CSS.supports('--variable', 0) ){
    document.getElementById('themes').classList.remove('hidden');
  }
  /* Signal to CSS that we have JS (for onclick hinting) */
  contentBox.classList.add('js')
  
  /* Prevent searchbox reloading */
  document.getElementById('searchbox').onsubmit = function(event){event.preventDefault(); return false;}
  
  /* Gather index and assign onclicks */
  var rows = document.getElementsByTagName("tr")
  for( i = 0; i < rows.length; i++ ){
    var line = new Line(rows[i]);
    lineIndexes.push(line);
    if( line.isQuote ){
      line.th.onclick = showSpeaker;
      line.td.onclick = largeQuoteShow;
    } else {
      line.th.onclick = largeQuoteShow;
    }
  }
}

/* Basic style functionality */

function changeTheme(theme) {
  var styler = document.getElementById('styler');
  styler.href = 'themes/' + theme + '.css';
}

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

function quoteHighlight(selector) {
  switch( typeof selector ){
    case "function":
      condition = selector;
      break;
    case "boolean":
      condition = function(line){ return selector };
      break;
    default:
      condition = function(line){ return false };
      break;
  }
  
  var firstLine;
  for( i = 0; i < lines.length; i++ ){
    var line = lineIndexes[i], c = line.tr.classList;
    if( condition(line) ){
      c.add('highlighted')
      if( firstLine == undefined ){ firstLine = line; }
    } else {
      c.remove('highlighted')
    }
  }
  return firstLine;
}
