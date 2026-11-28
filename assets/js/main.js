(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu').appendTo($body);
		var $trigger = $header.find('a[href="#menu"]');
		var $page = $('#page-wrapper');
		var $links = $menu.find('a[href]');

		function closeMenu() {
			$page.prop('inert', false);
			$trigger.attr('aria-expanded', 'false').trigger('focus');
			$menu.prop('hidden', true);
			$body.removeClass('is-menu-visible');
		}

		$trigger.on('click', function(event) {
			event.preventDefault();
			$body.addClass('is-menu-visible');
			$menu.prop('hidden', false);
			$trigger.attr('aria-expanded', 'true');
			$links.first().trigger('focus');
			$page.prop('inert', true);
		});

		$menu.on('click', function(event) {
			if (event.target === this)
				closeMenu();
		}).on('click', 'a[href]', function(event) {
			if ($(this).hasClass('close'))
				event.preventDefault();

			closeMenu();
		}).on('keydown', function(event) {
			if (event.key === 'Escape') {
				event.preventDefault();
				closeMenu();
			}

			if (event.key === 'Tab') {
				var first = $links[0];
				var last = $links[$links.length - 1];

				if (event.shiftKey && event.target === first) {
					event.preventDefault();
					last.focus();
				} else if (!event.shiftKey && event.target === last) {
					event.preventDefault();
					first.focus();
				}
			}
		});

})(jQuery);