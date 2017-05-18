/* String and quote-based helper functions. */

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

/* Makes a string 'search equivalent' for German. */
neutralise = function(string){
  return string.toLowerCase()
         .replace(new RegExp('ä', 'g'), "a")
         .replace(new RegExp('ö', 'g'), "o")
         .replace(new RegExp('ü', 'g'), "u")
         .replace(new RegExp('ß', 'g'), "s");
}

scrollIntoView = function(element) {
  element.scrollIntoView({block: "end", behavior: "smooth"});
    /* Non-Gecko engines interpret these settings as 'true' == pin to top,
     * so we correct it by immediately scrolling down. */
  element.scrollIntoView(false);
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
  this.searchableQuote = neutralise(this.quote)
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
  for( i = 0; i < lineIndexes.length; i++ ){
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

/* Quote interaction functionality */

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

function showSpeaker(/* th */){
  if( this.parentElement.classList.contains("highlighted") ){
    quoteHighlight()
  } else {
    var speaker = this.innerText;
    quoteHighlight( function(line){
      return line.speaker == speaker
    })
  }
}

function findQuote() {
  var request = neutralise(document.getElementById('searchbar').value);
  
  /* likely too many results, so simply do nothing */
  if( request.length <= 2 ){ return; }
  
  var firstFound = quoteHighlight(function(line){
    return line.searchableQuote.indexOf(request) !== -1
  })
  
  if( firstFound ){
    scrollIntoView(firstFound.tr)
  }
  return false;
}