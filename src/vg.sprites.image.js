//= require "vg"
//= require "vg.sprites"

/**
 * class Sprite
 * Represents image.
**/

/**
 * new VG.primitives.Image(url[,callback][,data_url])
 * - url(String): url to the file containing image
 * - callback(Function): called every time the image is loaded
 * - data_url(String): path to the JSON file containing sprite data. Defaults to "%url%.json".
**/
VG.primitives.Image = function(url, callback, data_url){
	var Self = this;
	
	if(data_url == null){
		data_url = url + ".json";
	}
	
	this._init = function(data){
		Self.data = data;
		//console.log("loading image in VG.Image");
		Self.image = new Image(Self.data.width, Self.data.height);
		Self.image.src = url;
		$(Self.image).bind('load', {size: Self.data.size}, VG.addKbytesLoaded);
		if(callback != null){
			$(Self.image).bind('load', {img: Self}, callback);
		}
	}
	if(VG.Image.prototype.loaded_images[data_url] == null){
		//console.log("loading JSON in VG.Image");
		$.getJSON(data_url, Self._init);
		VG.Image.prototype.loaded_images[data_url] = Self;
	}
	else{
		//console.log("returning preloaded image");
		callback();
		return VG.Image.prototype.loaded_images[data_url];
	}
}
VG.Image.prototype.loaded_images = {};