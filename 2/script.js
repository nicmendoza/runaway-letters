var config;
(function(window,document,$,undefined){

	config = {
		proximity: 400, // radius of circle around cursor that will be affected
		size: 20, // maximum displacement from current position
		//animate: true, //use jQuery.animate or jQuery.css
		container: 'body',
		elements : 'span',
		hoverClass: 'hover',
		scatter: .1, // falsy value or any number > 0 (the higher the more random, decimals < 1 will cause elements to stay in circle)
		type: 'words' //letters or words or undefined
	}
	
	var proximitySquared = Math.pow(config.proximity,2);

	config.$elements = $(config.elements);
	
	//store original position (at center of object)
	config.$elements.each(function(index,letter){
	    var $letter = $(letter),
	    	halfHeight = $letter.outerHeight() / 2,
	    	halfWidth = $letter.outerWidth() / 2,
	    	position = $letter.position();
	   	    	
	    position.top = position.top + halfHeight;
	    position.left = position.left + halfWidth; 
	    
	    $letter.data('originalPosition', position);
	    var min = .2;
	    $letter.data('scalingFactor', config.scatter ? Math.max(min,Math.random() * (config.scatter - min + 1) + config.scatter) : 1);
	});
	
	var originalPosition = {
		top: 0,
		left: 0
	}
		
	$('html').mousemove(function(event){
		var x = event.clientX,
			y = event.clientY;
		
		config.$elements.each(function(index,letter){
		
			var $letter = $(letter),
				position = $letter.data('originalPosition'),
				scalingFactor = $letter.data('scalingFactor'),
				letterY = position.top, // original Y
				letterX = position.left, // original X
				offsetY = letterY - y, // Y offset of element from cursor
				offsetX = letterX - x, // X offset of element from cursor
				distanceY = Math.abs(offsetY), // y distance of element from cursor
				distanceX = Math.abs(offsetX); // y distance of element from cursor
				
			if( distanceY < config.proximity && // is with y proximity of cursor
				distanceX < config.proximity && // is within x proximity of cursor
				Math.pow(distanceX,2) + Math.pow(distanceY,2) < proximitySquared ) // is within a circle around the cursor with radius of proximity
			{
				// radius in current direction - distance
				var targetPosition = {
					top: calculateOffset(config.proximity, offsetY) * scalingFactor,
					left: calculateOffset(config.proximity, offsetX) * scalingFactor
				}

				$letter.css(targetPosition)
					.addClass(config.hoverClass);
				
			} else {
				$letter.css(originalPosition)
					.removeClass(config.hoverClass);
			}
		});
	
	});
	
	function calculateOffset(radius,offset){
		var ratio = Math.abs(offset) / radius,
			newOffset = ratio * config.size
	
		if(offset < 0){
				return -newOffset;
		} else {
			return newOffset;
		}
	};
	// http://jsfromhell.com/math/closest-circle-point
	closestCirlePoint = function(px,py,x,y,r,ray){
		var tg = ( x += ray, y += ray, 0);
		return function( x,y,x0,y0){ return Math.sqrt( (x -= x0) * x + ( y -= y0 ) * y );}(px,py,x,y) > ray ? 
			{ x: Math.cos( th = Math.atan2(py - y, px - x) ) * ray + x, y: Math.sin( tg ) * ray + y }
			: { x : px, y : py }
		}

	
})(window,document,jQuery);