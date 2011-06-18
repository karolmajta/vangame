//= require "vg"

/**
 * class VG.Screen
 * Represents the game world.
**/

/**
 * new VG.Screen()
 * Constructor
**/
VG.Screen = function(){
	var Self = this;

	this.canvas = [];
	this.layers = [];
	this.last_layer = 0;
	this.last_mouse_x = null;
	this.last_mouse_y = null;
/**
 * VG.Screen#addCanvas(cnv) -> null
 * - cnv(VG.Canvas)
 * Adds cnv to VG.Screen
**/
	this.addCanvas = function(cnv){
		Self.canvas.push(cnv);
	}
/**
 * VG.Screen#removeCanvas(cnv) -> null
 * - cnv(VG.Canvas)
 * Adds cnv from VG.Screen
**/	
	this.removeCanvas = function(cnv){
		for(var i = 0; i < Self.canvas.length; i++){
			if(cnv == Self.canvas[i])
				Self.canvas.splice(i,1);
		}
	}
/**
 * VG.Screen#tanslateCoords(x, y) -> Object
 * - x(Number): x-coordinate of a point in canvas space
 * - y(Number): y-coordinate of a point in canvas space
 * Returnes a {"x": x, "y": y} object, where (x,y) represents a point in screen space. Always treats the input agruments as related to VG.ACTIVE_CANVAS
**/ 
	this.translateCoords = function(x, y){
		if(VG.EQ.prototype.active_canvas.length != 0){
			var can = null;
			for(n = 0; n < Self.canvas.length; n++){
				if(Self.canvas[n].canvas == VG.EQ.prototype.active_canvas[0])
					can = Self.canvas[n];
			}
			Self.last_mouse_x = x + can.x;
			Self.last_mouse_y = y + can.y;
			return {'x': x + can.x, 'y': y + can.y};
		}
		else{
			return {'x': Self.last_mouse_x, 'y': Self.last_mouse_y};
		}
	}
/**
 * VG.Screen#addObject(obj[, l]) -> null
 * obj(Object): obj must implement obj#tick() and obj#draw()
 * l(Number): layer
 * Adds a object to screen, placing it on a given layer. If no layer is given curren layer is used.
**/	
	this.addObject = function(obj, l){
		obj._scene = Self;
		if(l == null){
			l = Self.last_layer;
		}
		if(Self.layers[l] == null){
			Self.layers[l] = [];
		}
		Self.layers[l].push(obj);
		Self.last_layer = l;
	}
/**
 * VG.Screen#putObject(obj) -> null
 * obj(Object): obj must implement obj#tick() and obj#draw()
 * Adds a object to screen, placing it on 0 layer.
**/		
	this.putObject = function(obj){
		Self.layers.splice(0,0,[]);
		Self.addObject(obj,0);
	}
/**
 * VG.Screen#pushObject(obj) -> null
 * obj(Object): obj must implement obj#tick() and obj#draw()
 * Adds a object to screen, placing it on last layer.
**/			
	this.pushObject = function(obj){
		Self.addObject(obj,Self.layers.length);
	}
/**
 * VG.Screen#putObject(obj) -> null
 * obj(Object): obj must implement obj#tick() and obj#draw()
 * Adds a object to screen, placing it on 0 layer.
**/		
	this.removeObject = function(obj){
		for(var i = 0; i < Self.layers.length; i++){
			for(var j = 0; j < Self.layers[i].length; j++){
				if(obj == Self.layers[i][j]){
					Self.layers[i].splice(j,1);
				}
			}
		}
	}
	
	this.tick = function(){
		for(var i = 0; i < Self.layers.length; i++){
			for(var j = 0; j < Self.layers[i].length; j++){
				Self.layers[i][j].tick();
			}
		}
		// redraw the screen on all canvas
		this.redraw();
	}
	
	this.redraw = function(){
		for(var h = 0; h < Self.canvas.length; h++){
			//this.canvas[h].canvas.width = this.canvas[h].canvas.width; // this resets the canvas
			var cont = Self.canvas[h].canvas.getContext("2d");
			cont.clearRect(0,0,Self.canvas[h].width,Self.canvas[h].height);
			for(var i = 0; i < Self.layers.length; i++){
				for(var j = 0; j < Self.layers[i].length; j++){
					var dx = Self.layers[i][j].x - Self.canvas[h].x;
					var dy = Self.layers[i][j].y - Self.canvas[h].y;
					Self.canvas[h].blit(Self.layers[i][j]);
				}
			}
		}
	}
}