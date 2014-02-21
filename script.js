
(function(){
	var messagePattern = /message=([^&]*)/,
		encodedPattern = /encoded=([^&]*)/,
		message = document.location.hash.match(messagePattern) ? document.location.hash.match(messagePattern)[1] : undefined,
		encodedMessage = document.location.hash.match(encodedPattern) ? document.location.hash.match(encodedPattern)[1] : undefined;

	String.prototype.replaceAt=function(index, character) {
	  return this.substr(0, index) + character + this.substr(index+character.length);
	}

	$(function(){
		var $text = $('body p'), // derp
			text = $text.text(),
			replaceText;

		if(message){
			document.location.hash = 'encoded=' + encodeStr(message);
			replaceText = message;
		} else if(encodedMessage){
			replaceText = decodeStr(encodedMessage);
		}

		if(replaceText){
			var newText = text.replaceAt(Math.round(Math.random() * (text.length - replaceText.length) ), replaceText);
			$text.text(newText)
		}
		
		$text.runawayLetters();
	});
	
	var key = "SXGWLZPDOKFIVUHJYTQBNMACERxswgzldpkoifuvjhtybqmncare";

	// utility functions
	function encodeStr(uncoded) {
	  uncoded = uncoded.toUpperCase().replace(/^\s+|\s+$/g,"");
	  var coded = "";
	  var chr;
	  for (var i = uncoded.length - 1; i >= 0; i--) {
	    chr = uncoded.charCodeAt(i);
	    coded += (chr >= 65 && chr <= 90) ? 
	      key.charAt(chr - 65 + 26*Math.floor(Math.random()*2)) :
	      String.fromCharCode(chr); 
	    }
	  return encodeURIComponent(coded);  
	}

	function decodeStr(coded) {
	  coded = decodeURIComponent(coded);  
	  var uncoded = "";
	  var chr;
	  for (var i = coded.length - 1; i >= 0; i--) {
	    chr = coded.charAt(i);
	    uncoded += (chr >= "a" && chr <= "z" || chr >= "A" && chr <= "Z") ?
	      String.fromCharCode(65 + key.indexOf(chr) % 26) :
	      chr; 
	    }
	  return uncoded;   
	} 
})();
