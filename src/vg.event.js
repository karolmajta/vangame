//= require "vg"

/**
 * class VG.Event
 * Represents in-game event
**/

/**
 * new VG.Event(type[, data])
 * - type(String): supported event names are KEYUP, KEYDOWN, MOUSEBUTTONUP, MOUSEBUTTONDOWN, MOUSELEAVE, MOUSEENTER, USEREVENT
 * - data(Object): data object - {param1: value1, param2: value2, ...}
 * creates a VG.Event of given type. data
**/
VG.Event = function(name,d){
	var Self = this;
	this.name = name;
	this.data = d;
	this._data = d;
	this.vgevent = true;
/**
 * VG.Event#immediate -> Boolean
 * If set to true, it will cause the event to bypass the events' queue.
**/
	this.immediate = false;
}
VG.Event.prototype = new jQuery.Event('userevent');
VG.Event.prototype.constructor = VG.Event;