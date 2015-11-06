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