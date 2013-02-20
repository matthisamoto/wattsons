(function($)
{
	$_Window = $(window);
	$_Container = $('#container');
	$_Slide = $('#slide-1');
	$_AnimationDuration = 300;
	$_AnimationEasing = 'easeInOutSine';
	$_AnimationStatus = 'idle';
	$_CurrentSlide = 0;
	$_Tab = $('#tab');
	$_Toolbar = $('#toolbar');
	$_ArrowLeft = $('#left');
	$_ArrowRight = $('#right');
	
	var slides = $_Container.children().length - 1;
	
	/*
	 * Global Functionality
	 * ==================================
	 */
	
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
	
	/*
	 * Slide Movements
	 * ==================================
	 */
	
	var advanceSlideWithKey = function(e)
	{
		var c = e.keyCode;
		console.log(c)
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
	
	var advanceSlideWithMouse = function(e)
	{
	  if ( e.currentTarget.id == "left" )
		{
			moveSlide('aft');
		}
		else if ( e.currentTarget.id == "right" )
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
		
		if( $_Toolbar.hasClass('open') ) toggleToolbar(null);
	}
	
	
	/*
	 * Toolbar
	 * ==================================
	 */
	
	var toggleToolbar = function(e)
	{
		if( $_Toolbar.hasClass('open') )
		{
			$_Toolbar.removeClass('open').find('#tab .label').html('More');;
			$_Toolbar.animate({
				bottom: -$_Toolbar.height() + 'px'
			},
			200,
			$_AnimationEasing,
			function(e) {
				
			});
		}
		else
		{
			$_Toolbar.addClass('open').find('#tab .label').html('Less');
			$_Toolbar.animate({
				bottom: 0
			},
			200,
			$_AnimationEasing,
			function(e) {
			});
		}
	}
	
	
	
	/*
	 * Initials
	 * ==================================
	 */
	
	$_ArrowLeft.bind({ click: advanceSlideWithMouse });
	$_ArrowRight.bind({ click: advanceSlideWithMouse });
	$_Window.smartresize( resizeAll ).keyup( advanceSlideWithKey );
	resizeAll(null);
	
	$_Tab.bind({ click: toggleToolbar });
	
}(jQuery));