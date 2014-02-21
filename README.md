Runaway letters
=====

Created this fun little jquery plugin which lets you animate words or letters in an element within a radius of the cursor.

Usage

	//default
	$(element).runawayLetters();

	// with options
	$(element).runawayLetters({
		proximity: 200, // radius of circle around cursor that will be affected
		size: 10, // maximum displacement from current position
		//animate: true, //use jQuery.animate or jQuery.css
		elements : 'span',
		hoverClass: 'hover',
		scatter: .5, // falsy value or any number > 0 (the higher the more random, decimals < 1 will cause elements to stay in circle)
		type: 'words', //letters or words or undefined
		containment: 'html' // don't remember exactly what this does but I guess it limits the effect of the scatter(?)
	});



The example index.html file using runawayLetters to demoa small game. The page allows you to create hidden messages by adding a /path-to-project/index.html#message=putyourmessagehere hash on the end of the url. It will rewrite the url, encoding the message, so the user can find it. Pretty silly, and nothing happens when you find the message, but it's in there, I promise : )
