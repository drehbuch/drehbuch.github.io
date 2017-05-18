var contentBox, largeQuote, lines = [];

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
  
  /* Gather rows and assign onclicks */
  var rows = document.getElementsByTagName("tr")
  for( i = 0; i < rows.length; i++ ){
    var line = new Line(rows[i]);
    if( line.isQuote ){
      lines.push(line);
      line.td.onclick = largeQuoteShow;
      line.th.onclick = thOnclick;
    }    
  }
}

thOnclick = function(/* th */){
  var speaker = this.parentElement.classList.contains("highlighted")
    ? undefined : this.innerText
  quoteHighlight(speaker);
}

function Line(tr) {
  this.tr = tr;
  this.td = tr.getElementsByTagName("td")[0];
  this.th = tr.getElementsByTagName("th")[0];
  this.isQuote = Boolean(this.td)
  if( this.td ){
    this.speaker = this.th.innerText;
    this.quote = this.td.innerText;
  } else {
    this.speaker = "[Direction]"
    this.quote = this.th.innerText;
  }
  this.quote = neutralise(this.quote)
}

function neutralise(string){
  return string.toLowerCase()
         .replace(new RegExp('ä', 'g'), "a")
         .replace(new RegExp('ö', 'g'), "o")
         .replace(new RegExp('ü', 'g'), "u")
         .replace(new RegExp('ß', 'g'), "s");
}

function findQuote() {
  var request = neutralise(document.getElementById('searchbar').value);
  
  if( request.length <= 1 ){
    /* too many returned values, most likely */
    quoteHighlight();
    return;
  }
  
  var firstFound = quoteHighlight(function(line){
    return line.quote.indexOf(request) !== -1
  })
  
  if( firstFound ){
    firstFound.tr.scrollIntoView({block: "end", behavior: "smooth"});
    /* Non-Gecko engines interpret these settings as 'true' == pin to top,
     * so we correct it by immediately scrolling down. */
    firstFound.tr.scrollIntoView(false);
    }
}

function quoteHighlight(selector) {
  switch( typeof selector ){
    case "string":
      condition = function(line){ return selector == line.speaker };
      break;
    case "boolean":
      condition = function(line){ return selector };
      break;
    case "function":
      condition = selector;
      break;
    default:
      condition = function(line){ return false };
      break;
  }
  
  var firstLine;
  for( i = 0; i < lines.length; i++ ){
    var line = lines[i], c = line.tr.classList;
    if( condition(line) ){
      c.add('highlighted')
      if( firstLine == undefined ){ firstLine = line; }
    } else {
      c.remove('highlighted')
    }
  }
  return firstLine;
}

function largeQuoteHide() {
  largeQuote.classList.add('hidden');
  contentBox.classList.remove('blurred');
}

function largeQuoteShow(/* td */) {
  var currentLine = new Line(this.parentElement);
  var largeSpeaker = largeQuote.getElementsByTagName('h1')[0];
  var largeText = largeQuote.getElementsByTagName('p')[0];
  
  largeSpeaker.innerHTML = currentLine.speaker;
  largeText.innerHTML = currentLine.td.innerHTML;
  largeQuote.classList.remove('hidden');
  contentBox.classList.add('blurred');
  
  /* Size text based on length */
  height = 150 / Math.log(largeText.innerHTML.length / 5);
  largeText.style.fontSize = height + "px";
}