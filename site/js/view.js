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