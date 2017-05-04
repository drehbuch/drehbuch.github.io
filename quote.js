var currentSpeaker, currentQuote;

function largeQuoteHide() {
  document.getElementById('largeQuote').style.visibility = 'hidden';
}

function largeQuoteShow() {  
  var large = document.getElementById('largeQuote');
  var largeSpeaker = large.getElementsByTagName('h1')[0];
  var largeText = large.getElementsByTagName('p')[0];
  
  largeSpeaker.innerHTML = currentSpeaker.innerHTML;
  largeText.innerHTML = currentQuote.innerHTML;
  large.style.visibility = 'visible';
  
  /* Size text based on length */
  height = 150 / Math.log(currentQuote.innerHTML.length / 5);
  largeText.style.fontSize = height + "px";
}

function quoteClick(selectSpeaker) {
  currentSpeaker = selectSpeaker;
  currentQuote = currentSpeaker.parentElement.getElementsByTagName("td")[0];
  largeQuoteShow();
}