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