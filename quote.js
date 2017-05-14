var contentBox, largeQuote, lines = [], currentLine;

window.onload = function(){
  contentBox = document.getElementById('content');
  largeQuote = document.getElementById('largeQuote');
  
  var rows = document.getElementsByTagName("tr")
  for( i = 0; i < rows.length; i++ ){
    var line = new Line(rows[i]);
    if( line.isQuote ){
      lines.push(line);
      line.th.onclick = largeQuoteShow;
      line.th.onmouseover = quoteOver;
    }    
  }
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


function quoteOver() {
  currentLine = new Line(this.parentElement);
}

function largeQuoteHide() {
  largeQuote.style.visibility = 'hidden';
  contentBox.classList.remove('blurred')
}

function largeQuoteShow() {
  contentBox.classList.add('blurred')
  var largeSpeaker = largeQuote.getElementsByTagName('h1')[0];
  var largeText = largeQuote.getElementsByTagName('p')[0];
  
  largeSpeaker.innerHTML = currentLine.speaker;
  largeText.innerHTML = currentLine.td.innerHTML;
  largeQuote.style.visibility = 'visible';
  
  /* Size text based on length */
  height = 150 / Math.log(largeText.innerHTML.length / 5);
  largeText.style.fontSize = height + "px";
}