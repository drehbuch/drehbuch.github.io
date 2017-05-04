var currentSpeaker, currentQuote, contentBox, largeQuote;

function quoteClick(selectSpeaker) {
  currentSpeaker = selectSpeaker;
  currentQuote = currentSpeaker.parentElement.getElementsByTagName("td")[0];
  contentBox = document.getElementById('content');
  largeQuote = document.getElementById('largeQuote')
  
  largeQuoteShow();
}

function largeQuoteHide() {
  largeQuote.style.visibility = 'hidden';
  contentBox.classList.remove('blurred')
}

function largeQuoteShow() {
  contentBox.classList.add('blurred')
  var largeSpeaker = largeQuote.getElementsByTagName('h1')[0];
  var largeText = largeQuote.getElementsByTagName('p')[0];
  
  largeSpeaker.innerHTML = currentSpeaker.innerHTML;
  largeText.innerHTML = currentQuote.innerHTML;
  largeQuote.style.visibility = 'visible';
  
  /* Size text based on length */
  height = 150 / Math.log(currentQuote.innerHTML.length / 5);
  largeText.style.fontSize = height + "px";
}