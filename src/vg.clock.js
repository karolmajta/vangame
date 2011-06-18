//= require "vg"

/**
 * class VG.Clock
**/

/**
 * new VG.Clock(milis)
 * - milis(Number): a period of time in milliseconds
 * Creates a clock ticking with a given period.
**/
VG.Clock = function(milis) {
	var Self = this;
	this.dt = milis;
	this.interval_id;
	this.subscribers = [];
/**
 * VG.Clock#start(milis) -> null
 * - milis(Number): a period of time in milliseconds
 * Starts the clock (if stopped) with a given period.
**/	
	this.start = function(milis){
		if(milis == null)
			milis = this.dt;
		window.clearInterval(Self.interval_id);
		this.interval_id = window.setInterval(this.tick, milis);
		this.dt = milis;
	}
/**
 * VG.Clock#stop() -> null
 * Stops the clock.
**/		
	this.stop = function(){
		window.clearInterval(Self.interval_id);
	}
/**
 * VG.Clock#subscribe(obj) -> null
 * - obj(Object): subscriber object must provide #obj.tick() method.
 * Adds a subscriber object.
**/			
	this.subscribe = function(o){
		var found = false;
		for(var i = 0; i < this.subscribers.length; i++){
			if(this.subscribers[i] == o)
				found = true;
		}
		if(!found)
			this.subscribers.push(o);
	}
/**
 * VG.Clock#unsubscribe(obj) -> null
 * - obj(Object)
 * Removes a subscriber object.
**/	
	this.unsubscribe = function(o){
		for(var i = 0; i < this.subscribers.length; i++){
			if(this.subscribers[i] == o)
				this.subscribers.splice(i,1);
		}
	}
	
	this.tick = function(){
		for(var i = 0; i < Self.subscribers.length; i++){
			Self.subscribers[i].tick();
		}
	}
	this.interval_id = window.setInterval(this.tick, milis);
}