// slider
if ($('.js-slider').length) {
	$('.js-slider').slick({
		arrows: false,
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});
};

// player

$(document).on('click', '.player-btn', function() {
	var player = $(this).closest('.controls').find('.js-player')[0];

	if (player.paused) {
		// pause all other songs when play new
		$('.js-player').each(function() {
			$(this)[0].pause();
		});
		$('.player-btn').removeClass('pause').addClass('play');

		player.play();
		$(this).removeClass('play').addClass('pause');
		console.log('play');
	}
	else {
		player.pause();
		$(this).removeClass('pause').addClass('play');
		console.log('pause');
	}
});
	
