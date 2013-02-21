(function($)
{
	var $_Window,$_Container,$_Slide,$_AnimationDuration,
	$_AnimationEasing,$_AnimationStatus,$_CurrentSlide ,
	$_Tab,$_Toolbar,$_ArrowLeft,$_ArrowRight;
	
	
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
		
		$('#slide-1 .content').css({
			marginTop: ($_Window.height() - $('#slide-1 .content').height()) / 2
		});
		
		$('#slide-13 .content').css({
			marginTop: ($_Window.height() - $('#slide-13 .content').height()) / 2
		});
		
		$_Container.css({
			left: -( $_Window.width() * $_CurrentSlide ) + 'px'
		});
		
		if( $_Toolbar.hasClass('open') )
		{
			$_Toolbar.css({
				top: '0px'
			});
		}
		else
		{
			$_Toolbar.css({
				top: -$_Toolbar.height() + 'px'
			});
		}
	}
	
	/*
	 * Slide Movements
	 * ==================================
	 */
	
	var advanceSlideWithKey = function(e)
	{
		var c = e.keyCode;
	  if ( c == 37 || c == 38)
		{
			moveSlide('aft');
		}
		else if (c == 39 || c == 40)
		{
			moveSlide('fore');
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
			moveSlide('fore');
		}
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
				top: -$_Toolbar.height() + 'px'
			},
			200,
			$_AnimationEasing,
			function(e) {});
		}
		else
		{
			$_Toolbar.addClass('open').find('#tab .label').html('Less');
			$_Toolbar.animate({
				top: 0
			},
			200,
			$_AnimationEasing,
			function(e) {});
		}
	}
	
	/*
	 * Init
	 * ==================================
	 */
	
	$_ArrowLeft.bind({ click: advanceSlideWithMouse });
	$_ArrowRight.bind({ click: advanceSlideWithMouse });
	$_Window.smartresize( resizeAll ).keyup( advanceSlideWithKey );
	$('body').hammer({
       // options...
  })
  .bind("swipe", function(ev) {
		var d = ev.direction;
		if(d == 'right')
		{
			moveSlide('aft');
		}
		else if(d == 'left')
		{
			moveSlide('fore');
		}
  });;
	
	
	
	resizeAll(null);
	
	$_Tab.bind({ click: toggleToolbar });
	
	$('h1').fitText(1.8, { minFontSize: '18px', maxFontSize: '32px' });
	$('h2').fitText(1.8, { minFontSize: '16px', maxFontSize: '44px' });
	$('h3').fitText(2, { minFontSize: '16px', maxFontSize: '40px' });
	
	$('.giant-overlay h1').fitText(0.4);
	
	
}(jQuery));