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
$('.js-player').each(function() {
	$(this)[0].preload="none";
});

reload_function=function(){
	alert('reloaded');
}

$( "#gotoStep3" ).click(function() {
  alert( "Handler for .click() called." );
});

$(document).on('click', '.player-btn', function() {
	var player = $(this).closest('.controls').find('.js-player')[0];

	if (player.paused) {
		// pause all other songs when play new
		$('.js-player').each(function() {
			$(this)[0].pause();
			$(this)[0].currentTime = 0;
		});
		$('.player-btn').removeClass('pause').addClass('play');

		// change button state at active btn
		$(this).removeClass('play').addClass('pause');

		// start loading audio
		player.addEventListener('loadstart', function() {

			$(this).next('.loader').addClass('is-visible');
			console.log('start loading song');
		});

		// finish loading audio
		player.addEventListener('canplaythrough', function() {
			
			$(this).next('loader').removeClass('is-visible');
			console.log('finished loading song');
		});

		// play audio
		player.play();
		
		console.log('play');
	}
	else {
		player.pause();
		$(this).removeClass('pause').addClass('play');
		console.log('pause');
	}
});