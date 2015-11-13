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