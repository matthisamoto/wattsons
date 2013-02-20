(function($)
{
	$_Window = $(window);
	$_Container = $('#container');
	$_Slide = $('#slide-1');
	
	var slides = $_Container.children().length - 1;
	
	var resizeAll = function(e)
	{
		$('.slide').css('width', $_Window.width() + "px");
	}
	
	var advanceSlide = function(e)
	{
		var c = e.keyCode;
	  if ( c == 37 || c == 38)
		{
			moveSlide('aft');
		}
		else if (c == 39 || c == 40)
		{
			moveSlide('fore')
		}
		
	  e.preventDefault();
	}
	
	var moveSlide = function(dir)
	{
		var currLeft = $_Container.position().left;
		var currWidth = $_Slide.width();
		var value = 0;
		
		if(dir == 'fore')
		{
			value = currLeft - currWidth
		}
		else
		{
			value = currLeft + currWidth;
		}
		
		if(value > 0) value = 0;
		if(value < slides * -currWidth) value = slides * -currWidth;
		
		console.log('Current Position:',currLeft,'| New Position:',value);
		
		if( value !== currLeft)
		{
			$_Container.animate({
				left: value + 'px'
			}, 500, function() { console.log('animation finished.') });
		}
		
	}
	
	$_Window.smartresize( resizeAll ).keyup( advanceSlide );
	
	resizeAll(null);
	
}(jQuery));