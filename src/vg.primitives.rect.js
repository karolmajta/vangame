//= require "vg"
//= require "vg.primitives"

/**
 * class VG.primitives.Circle
**/

/**
 * new VG.primitives.Circle(x, y, w, h)
 * - x(Number) - x-coordinate of center
 * - y(Number) - y-coordinate of center
 * - w(Number) - width
 * - h(Number) - height
**/

VG.primitives.Rect = function(x, y, w, h){
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	
	this.draw = function(cnv, x, y){
		try{
			var cont = cnv.getContext('2d');
			cont.strokeRect(x, y, this.width, this.height);
		}catch(e){
			//
		}
	}
	
	this.tick = function(){}
	this.notify = function(){}
}