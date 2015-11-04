$(document).ready(function() {

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

});