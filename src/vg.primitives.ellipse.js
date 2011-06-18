//= require "vg"
//= require "vg.primitives"

/**
 * class VG.primitives.Ellipse
**/

/**
 * new VG.primitives.Ellipse(x, y, a, b)
 * - x(Number) - x-coordinate of center
 * - y(Number) - y-coordinate of center
 * - a(Number) - horizontal semi-axis
 * - b(Number) - vertical semi-axis
**/

VG.primitives.Ellipse = function(x, y, a, b){
	this.x = x;
	this.y = y;
	this.a = a;
	this.b = b
	
	this.draw = function(cnv, x, y){
		try{
			var cont = cnv.getContext('2d');
			cont.beginPath();
			// thanks to
			// http://canvaspaint.org/blog/2006/12/ellipse/
			cont.save();
			cont.save();
			cont.translate(x, y);
			cont.scale(this.a, this.b);
			cont.arc(0, 0, 1, 0, 2*Math.PI, false);
			cont.restore();
			cont.stroke();
			cont.restore();
			cont.closePath();
			cont.stroke();
		}catch(e){
			//
		}
	}
	
	this.tick = function(){}
	this.notify = function(e){}
}