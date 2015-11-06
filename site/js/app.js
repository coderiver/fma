$(document).ready(function() {
	// models
	var Song = Backbone.Model.extend({
		defaults: {
			url: '',
			title: 'untitled'
		}
	});
	
	var Album = Backbone.Collection.extend({
		model: Song
	});
	// header view
	
	HeaderView = Backbone.View.extend({
		initialize: function() {
			this.render();
		},
		render: function() {
			// compile template via underscore
			var template = _.template( $('#header_template').html(), {} );
			// load HTML into "el"
			this.$el.html(template);
		}
	});
	
	var header_view = new HeaderView({
		el: $('#header')
	});
	
	// footer view
	
	FooterView = Backbone.View.extend({
		initialize: function() {
			this.render();
		},
		render: function() {
			// compile template via underscore
			var template = _.template( $('#footer_template').html(), {} );
			// load HTML into "el"
			this.$el.html(template);
		}
	});
	
	var footer_view = new FooterView({
		el: $('#footer')
	});
	
	// playlist view
	
	Playlist = Backbone.View.extend({
		el: '#playlist-wrap',
	
		initialize: function() {
			this.template = _.template($('#song').html());
			
			this.collection = new Album();
	
			this.listenTo(this.collection, 'all', this.render);
	
			this.collection.fetch({
				url: 'js/data/playlist.json'
			});
			
		},
		render: function() {
			
			var html = this.template( {songs: this.collection.toJSON()} );
			this.$el.html(html);
			return this;
		}
	});
	
	
	ChooseAudio = Backbone.View.extend({
		el: '#container',
		initialize: function() {
			this.render();
			playlist = new Playlist();
		},
		render: function(){
			var html = _.template( $('#playlist_template').html(), {} );
			this.$el.html(html);
	
			return this;
		}
	});
	
	chooseAudio = new ChooseAudio();
	
	// choose background view
	ChooseBg = Backbone.View.extend({
		el: '#container',
		render: function(){
			var html = _.template( $('#choose-bg').html(), {} );
			this.$el.html(html);
			return this;
		}
	});
	
	chooseBg = new ChooseBg();
	// router
	
	var AppRouter = Backbone.Router.extend({
		routes: {
			"": "start",
			"step/:number": "steps"
		},
		start: function() {
			console.log('you are at home page');
			chooseAudio.initialize();
	
		}
	});
	var app_router = new AppRouter;
	
	app_router.on('route:steps', function (number) {
	    console.log( "You are at step " + number );   
	    chooseBg.render();
	});
	
	Backbone.history.start();
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
});