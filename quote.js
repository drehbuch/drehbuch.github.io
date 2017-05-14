var contentBox, largeQuote, lines = [];

window.onload = function(){
  document.getElementById('instructions').classList.remove('hidden')
  contentBox = document.getElementById('content');
  largeQuote = document.getElementById('largeQuote');
  /* Signal to CSS that we have JS (for onclick hinting) */
  contentBox.classList.add('js')
  
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
  var speaker = this.parentElement.classList.contains("highlighted") ? undefined : this.innerText
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
}

function neutralise(string){
  return string.toLowerCase().replace('ä','a').replace('ö','o').replace('ü','u').replace('ß','s')
}

function findQuote() {
  var request = neutralise(document.getElementById('searchbar').value),
      firstFound = quoteHighlight( request.length > 1 ?
    ((line) => neutralise(line.quote).indexOf(request) !== -1 ) : undefined );
  if( firstFound ){ window.scrollTo(0, firstFound.tr.offsetTop); }
}

function quoteHighlight(selector) {
  switch( typeof selector ){
    case "string":
      condition = (line) => selector == line.speaker;
      break;
    case "boolean":
      condition = (line) => selector;
      break;
    case "function":
      condition = selector;
      break;
    default:
      condition = (line) => false;
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