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
	
	// choose photo view
	ChoosePhoto = Backbone.View.extend({
		el: '#container',
		render: function(){
			var html = _.template( $('#choose-photo').html(), {} );
			this.$el.html(html);
			return this;
		}
	});
	
	choosePhoto = new ChoosePhoto();
	
	// photo preview
	PhotoPreview = Backbone.View.extend({
		el: '#container',
		render: function(){
			var html = _.template( $('#preview-photo').html(), {} );
			this.$el.html(html);
			return this;
		}
	});
	
	photoPreview = new PhotoPreview();
	
	// loading
	Loading = Backbone.View.extend({
		el: '#container',
		render: function(){
			var html = _.template( $('#loading').html(), {} );
			this.$el.html(html);
			return this;
		}
	});
	
	loading = new Loading();
	
	// gift
	Gift = Backbone.View.extend({
		el: '#container',
		initialize: function(){
			this.render();
			$('.js-slider').slick({
				arrows: false,
				dots: true,
				slidesToShow: 1,
				slidesToScroll: 1
			});
	
		},
		render: function(){
			var html = _.template( $('#gift').html(), {} );
			this.$el.html(html);
			return this;
		}
	});
	
	gift = new Gift();
	
	// send gift to store page
	SendGift = Backbone.View.extend({
		el: '#container',
		initialize: function() {
			this.render();
		},
		render: function(){
			var html = _.template( $('#send-gift').html(), {} );
			this.$el.html(html);
			return this;
		}
	});
	
	sendGift = new SendGift();
	
	// thanks page view
	Thanks = Backbone.View.extend({
		el: '#container',
		initialize: function() {
			this.render();
		},
		render: function(){
			var html = _.template( $('#thanks').html(), {} );
			this.$el.html(html);
			return this;
		}
	});
	
	thanks = new Thanks();
	
	// greeting page
	Greeting = Backbone.View.extend({
		el: '#container',
		initialize: function() {
			this.render();
		},
		render: function(){
			var html = _.template( $('#greeting').html(), {} );
			this.$el.html(html);
			return this;
		}
	});
	
	greeting = new Greeting();
	
	// terms page
	Terms = Backbone.View.extend({
		el: '#container',
		initialize: function() {
			this.render();
		},
		render: function(){
			var html = _.template( $('#terms').html(), {} );
			this.$el.html(html);
			return this;
		}
	});
	
	terms = new Terms();
	
	// terms page
	Send = Backbone.View.extend({
		el: '#container',
		initialize: function() {
			this.render();
		},
		render: function(){
			var html = _.template( $('#send').html(), {} );
			this.$el.html(html);
			return this;
		}
	});
	
	send = new Send();
	// router
	
	var AppRouter = Backbone.Router.extend({
		routes: {
			"": "start",
			"step/:number": "steps",
			"loading": "loading",
			"gift": "gift",
			"send-gift": "send-gift",
			"thanks": "thanks",
			"greeting": "greeting",
			"send": "send",
			"terms": "terms"
		},
		start: function() {
			console.log('you are at home page');
			chooseAudio.initialize();
	
		}
	});
	var app_router = new AppRouter;
	
	app_router.on('route:steps', function (number) {
		if (number == 2) {
			chooseBg.render();
			$('.header__back').show();
		};
	    if (number == 3) {   
			choosePhoto.render();
		};
		if (number == 4) {   
			photoPreview.render();
		};
	
		console.log( "You are at step " + number ); 
	});
	app_router.on('route:loading', function () {
		loading.render();
	
		console.log( "Loading..." ); 
	});
	app_router.on('route:gift', function () {
		gift.initialize();
	
		console.log( "You are at gift page" ); 
	});
	app_router.on('route:send-gift', function () {
		sendGift.initialize();
	
		console.log( "You are at send-gift page" ); 
	});
	app_router.on('route:thanks', function () {
		thanks.initialize();
	
		console.log( "You are at thanks page" ); 
	});
	app_router.on('route:greeting', function () {
		greeting.initialize();
	
		console.log( "You are at greeting page" ); 
	});
	app_router.on('route:terms', function () {
		terms.initialize();
	
		console.log( "You are at terms page" ); 
	});
	app_router.on('route:send', function () {
		send.initialize();
	
		console.log( "You are at terms page" ); 
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
});