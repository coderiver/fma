$(document).ready(function() {

	var Song = Backbone.Model.extend({
		defaults: {
			url: '',
			title: 'untitled'
		}
	});

	var Album = Backbone.Collection.extend({
		model: Song
	});

	var song1 = new Song({
		url: 'http://test.soyer.com.ua/Bi-2_(feat._Yu_._Chicherina)_-_Moi_Rok-N-Roll_.mp3',
		title: 'Bi-2_(feat._Yu_._Chicherina)_-_Moi_Rok-N-Roll'
	});
	var song2 = new Song({
		url: 'http://test.soyer.com.ua/Korol_I_Shut_-_Kukla_Kolduna.mp3',
		title: 'Korol_I_Shut_-_Kukla_Kolduna'
	});
	var song3 = new Song({
		url: 'http://test.soyer.com.ua/Smyslovye_Gallyutsinatsii_-_Vechno_Molodoi.mp3',
		title: 'Smyslovye_Gallyutsinatsii_-_Vechno_Molodoi'
	});
	var song4 = new Song({
		url: 'http://test.soyer.com.ua/Tantsy_Minus_-_Gorod.mp3',
		title: 'Tantsy_Minus_-_Gorod'
	});

	var myAlbum = new Album();

	myAlbum.add([song1, song2, song3, song4]);

	console.log(myAlbum.toJSON());


	
});