//= require "vg"
//= require "vg.primitives"

/**
 * class VG.primitives.Circle
**/

/**
 * new VG.primitives.Circle(x, y, r)
 * - x(Number) - x-coordinate of center
 * - y(Number) - y-coordinate of center
 * - r(Number) - radius
**/
VG.primitives.Circle = function(x, y, r){
	this.x = x;
	this.y = y;
	this.r = r;
	
	this.draw = function(cnv, x, y){
		try{
			var cont = cnv.getContext('2d');
			cont.beginPath();
			cont.arc(x, y, this.r, 0, Math.PI*2, false);
			
			cont.stroke();
		}catch(e){
			//
		}
	}
	
	this.tick = function(){}
	this.notify = function(e){}
}