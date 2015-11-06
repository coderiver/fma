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

Backbone.history.start();