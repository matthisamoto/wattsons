(function($)
{
	$_Window = $(window);
	
	var resizeAll = function(e)
	{
		$('.slide').css('width', $_Window.width() + "px");
	}
	
	$_Window.smartresize( resizeAll );
	
	resizeAll(null);
	
}(jQuery));