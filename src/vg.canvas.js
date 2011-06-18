//= require "vg"

/**
 * class VG.Canvas
**/

/**
 * new VG.Canvas(real_canvas[, x][, y])
 * - real_canvas(<canvas>): HTML canvas element
 * - x(Number): x-coordinate of VG.Canvas relative to the VG.Screen
 * - y(Number): y-coordinate of VG.Canvas relative to the VG.Screen
 * Creates VG.Canvas wrapping real_canvas - a DOM <canvas> element.
**/
VG.Canvas = function(real_canvas, x, y){
	this.canvas = real_canvas;
	if(x != undefined)
		this.x = x;
	else
		this.x = 0;
	if(x != undefined)
		this.y = y;
	else
		this.y = 0;
	this.width = real_canvas.width;
	this.height = real_canvas.height;
/**
 * VG.Canvas#blit(obj) -> null
 * - obj(Object): obj must have obj#x and obj#y properties and must provide obj#draw() method.
 * Blits object on canvas.
**/	
	this.blit = function(obj){
		obj.draw(this.canvas, obj.x - this.x, obj.y - this.y);
	}
/**
 * VG.Canvas.setPosition(x, y) -> null
 * - x(Number): x-coordinate of VG.Canvas relative to the VG.Screen
 * - y(Number): y-coordinate of VG.Canvas relative to the VG.Screen
 * Sets the VG.Canvas' position relative to VG.Screen.
**/	
	this.setPosition = function(x,y){
		this.x = x;
		this.y = y;
	}
}