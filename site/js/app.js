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
	
	// playlist
	
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
	
	playlist = new Playlist();
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
});