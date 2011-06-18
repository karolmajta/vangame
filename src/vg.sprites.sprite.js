//= require "vg"
//= require "vg.sprites"

/**
 * class Sprite
 * Represents a sprite (collection of images).
**/

/**
 * new VG.sprites.Sprite(path[, callback][, data_url])
 * - path(String): path to the directory containing sprite
 * - callback(Function): called after the first time the sprite is loaded
 * - data_url(String): path to the JSON file containing sprite data. Defaults to "%path%/data.json".
**/
VG.sprites.Sprite = function(path, callback, data_url){
	var Self = this;
	this.x = 0;
	this.y = 0;
	this.pnt = -1;
	this.mode = "PAUSED"
	if(path[length-1] != '/'){
		path = path.concat('/');
	}
	if(callback == null){
		callback = function(){};
	}
	if(data_url == null){
		data_url = path + "data.json";
	}
	this.spritesheet = null;
	this.map = null;
/**
 * VG.sprites.Sprite.MODES -> Array
 * Arrya of modes. Each mode is a function defining what the next sprite frame should be.
**/
	this.MODES = {};
	
	this.MODES.PAUSED = function(){
		if(Self.pnt < 0 || Self.pnt >= Self.map.length){
			Self.pnt = 0;
		}
	}
	
	this.MODES.FORWARD = function(){
		if(Self.pnt < Self.map.length-1){
			Self.pnt += 1;
		}
		if(Self.pnt >= Self.map.length-1){
			Self.pnt = Self.map.length-1;
			Self.mode = "PAUSED";
		}
	}
	
	this.MODES.BACKWARD = function(){
		if(Self.pnt > 0){
			Self.pnt -= 1;
		}
		if(Self.pnt <= 0){
			Self.pnt = 0;
			Self.mode = "PAUSED";
		}
	}
	
	this.MODES.REPEAT_FORWARD = function(){
		Self.pnt += 1;
		if(Self.pnt >= Self.map.length){
			Self.pnt = 0;
		}
	}
	
	this.MODES.REPEAT_BACKWARD = function(){
		Self.pnt -= 1;
		if(Self.pnt < 0){
			Self.pnt = Self.map.length-1;
		}
	}

/**
 * VG.sprites.Sprite#setMode(m) -> null
 * - m(String): modes avalaible by default are: PAUSED, FORWARD, BACKWARD, REPEAT_FORWARD, REPEAT_BACKWARD
**/	
	this.setMode = function(m){
		Self.mode = m;
	}
/**
 * VG.sprites.Sprite#setFrame(f) -> null
 * - f(Number): Sets the internal frame pointer to f
**/		
	this.setFrame = function(f){
		Self.pnt = f;
	}
/**
 * VG.sprites.Sprite#start(f) -> null
 * - f(Number): Sets the internal frame pointer to 0
**/			
	this.start = function(){
		Self.pnt = 0;
	}
/**
 * VG.sprites.Sprite#start(f) -> null
 * - f(Number): Sets the internal frame pointer to last frame
**/				
	this.end = function(){
		Self.pnt = Self.map.length-1;
	}
	
	this._init = function(data){
		Self.spritesheet = new VG.Image(path + data.spritesheet, function(e){callback(Self)});
		Self.map = data.map;
		VG.Sprite.prototype.loaded_sprites[data_url] = Self;
	}
	
	this.draw = function(cnv, x, y){
			try{
				var cont = cnv.getContext('2d');
				//cont.drawImage(Self.spritesheet.image, x, y);
				cont.drawImage(
					Self.spritesheet.image,
					Self.map[Self.pnt].x,
					Self.map[Self.pnt].y,
					Self.map[Self.pnt].width,
					Self.map[Self.pnt].height, 
					x,
					y,
					Self.map[Self.pnt].width,
					Self.map[Self.pnt].height
				);
			}
			catch(e){
				//console.log("error drawing");
			}
		}
		
	this.tick = function(){
		Self.MODES[Self.mode]();
	}
	
	this.notify = function(){}
	
	if(VG.Sprite.prototype.loaded_sprites[data_url] == null){
		$.getJSON(data_url, Self._init);
	}
	else{
		Self.spritesheet = VG.Sprite.prototype.loaded_sprites[data_url].spritesheet;
		Self.map = VG.Sprite.prototype.loaded_sprites[data_url].map;
	}
}
VG.Sprite.prototype.loaded_sprites = {};
VG.Sprite.prototype.constructor = VG.Sprite;