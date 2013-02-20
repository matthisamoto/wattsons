(function($)
{
	$_Window = $(window);
	$_Container = $('#container');
	$_Slide = $('#slide-1');
	$_AnimationDuration = 300;
	$_AnimationEasing = 'easeInOutSine';
	$_AnimationStatus = 'idle';
	$_CurrentSlide = 0;
	
	var slides = $_Container.children().length - 1;
	
	var resizeAll = function(e)
	{
		$('.slide').css({ 
			width: $_Window.width() + "px"
		});
		
		$('.slide .content').css({
			marginTop: $_Window.height() * 0.25
		});
		
		$_Container.css({
			left: -( $_Window.width() * $_CurrentSlide ) + 'px'
		});
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
		var currSlide = $_CurrentSlide;
		
		if(dir == 'fore')
		{
			value = currLeft - currWidth
			currSlide++;
		}
		else
		{
			value = currLeft + currWidth;
			currSlide--;
		}
		
		if(value > 0) value = 0;
		if(value < slides * -currWidth) value = slides * -currWidth;
		
		console.log('Current Position:',currLeft,'| New Position:',value);
		
		if( value !== currLeft && $_AnimationStatus == 'idle')
		{
			$_AnimationStatus = 'working';
			
			$_Container.animate({
				left: value + 'px'
			}, 
			$_AnimationDuration,
			$_AnimationEasing, 
			function(e) {
				$_AnimationStatus = 'idle';
				$_CurrentSlide = currSlide;
			});
		}
		
	}
	
	$_Window.smartresize( resizeAll ).keyup( advanceSlide );
	
	resizeAll(null);
	
}(jQuery));