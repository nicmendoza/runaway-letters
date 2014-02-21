;
(function(window,document,$,undefined){

	var defaults = {
		proximity: 200, // radius of circle around cursor that will be affected
		size: 10, // maximum displacement from current position
		//animate: true, //use jQuery.animate or jQuery.css
		elements : 'span',
		hoverClass: 'hover',
		scatter: .5, // falsy value or any number > 0 (the higher the more random, decimals < 1 will cause elements to stay in circle)
		type: 'words', //letters or words or undefined
		containment: 'html'
	}

	$.fn.runawayLetters = function(options){
		var config = $.extend(defaults, options)
	
		var proximitySquared = Math.pow(config.proximity,2);
		
		$.fn.lettering.call( $(this), config.type || null);

		config.$elements = $(config.elements);

		setInitialPosition();
		
		var originalPosition = {
			top: 0,
			left: 0
		}
			
		$(config.containment).mousemove(function(event){

			var x = event.pageX,
				y = event.pageY;
			
			config.$elements.each(function(index,letter){
			
				var $letter = $(letter),
					runawayData = $letter.data('runaway-letters'),
					position = runawayData.originalPosition,
					scalingFactor = runawayData.scalingFactor,
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

					var gradedProximity = Math.round((distanceX + distanceY) / 2 / config.proximity * 10)

					$letter.css(targetPosition)
						.addClass(config.hoverClass)
						.attr('data-hover-proximity', gradedProximity);
					
				} else {
					$letter.css(originalPosition)
						.removeClass(config.hoverClass)
						.removeAttr('data-hover-proximity');
				}
			});
		
		});

		$(window).resize(setInitialPosition);

		function setInitialPosition(){
			//store original position (at center of object)
			config.$elements.each(function(index,letter){
			    var $letter = $(letter),
			    	halfHeight = $letter.outerHeight() / 2,
			    	halfWidth = $letter.outerWidth() / 2,
			    	position = $letter.position();
			   	    	
			    position.top = position.top + halfHeight;
			    position.left = position.left + halfWidth; 
			    var min = .2;
			    $letter.data('runaway-letters', {
			    	scalingFactor: config.scatter ? Math.max(min,Math.random() * (config.scatter - min + 1) + config.scatter) : 1,
			    	originalPosition: position
			    });
			});

			config.$elements.removeClass(config.hoverClass);
		}
		
		function calculateOffset(radius,offset){
			var ratio = Math.abs(offset) / radius,
				newOffset = ratio * config.size
		
			if(offset < 0){
					return -newOffset;
			} else {
				return newOffset;
			}
		};
	}

})(window,document,jQuery);