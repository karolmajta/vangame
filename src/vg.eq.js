//= require "vg"

/**
 * class VG.EQ
 * VanGame's events queue.
 **/
 
/**
 * new VG.EQ()
 * Constructor
 **/
 
VG.EQ = function() {
	var Self = this;
	this.registered_canvas = [];
	this.events_list = [];
	this.subscribers = {};
	this.mousemoved = false;

/**
 * VG.EQ#registerCanvas(cnv) -> null
 * - cnv(VG.Canvas): canvas to be registered
 * Registers given canvas so that events related to it are received by the events queue
**/	
	this.registerCanvas = function(cnv) {
		Self.registered_canvas.push(cnv);
		// bind events related to this canvas
		// no need for this one
		// $(cnv.canvas).bind('click', this.processEvent);
		// didn't work (why?)
		// $(cnv.canvas).bind('dbclick', this.processEvent);
		// I think canvas' can't get focus.
		// $(cnv.canvas).bind('focusin', this.processEvent);
		// $(cnv.canvas).bind('focusout', this.processEvent);
		$(cnv.canvas).bind('mousedown', this.processEvent);
		$(cnv.canvas).bind('mouseenter', this.processEvent);
		$(cnv.canvas).bind('mouseleave', this.processEvent);
		$(cnv.canvas).bind('mousemove', function(e){
			VG.MOUSE_X = parseInt(e.pageX - VG.elementGetX(e.currentTarget));
			VG.MOUSE_Y = parseInt(e.pageY - VG.elementGetY(e.currentTarget));
		});
		// $(cnv.canvas).bind('mouseout', this.processEvent);
		// This didn't work either, I think it only works
		// for elements that can get focus
		// $(cnv.canvas).bind('mouseover', this.processEvent);
		$(cnv.canvas).bind('mouseup', this.processEvent);
		// disable context menu on right clicks
		$(cnv.canvas).bind('contextmenu',function(e){
			return false;
		});
	}
	
	/**
	 * VG.EQ#processEvent(e) -> null
	 * - e(VG.Event | jQuery.Event): event
	 * Processes VG.Event or jQuery.Event. Private.
	**/
	this.processEvent = function(e){
		var ne = Self.translateEvent(e);
		if(ne.name == "KEYDOWN"){
			for(var i = 0; i < Self.events_list.length; i++){
				if((Self.events_list[i].name == "KEYDOWN") && (Self.events_list[i].data['key'] == ne.data['key'])){
					Self.events_list.splice(i,1);
				}
			}
			Self.events_list.push(ne);
		}
		
		if(ne.name == "KEYUP"){
			for(var i = 0; i < Self.events_list.length; i++){
				if((Self.events_list[i].name == "KEYUP") && (Self.events_list[i].data['key'] == ne.data['key'])){
					Self.events_list.splice(i,1);
				}
			}
			Self.events_list.push(ne);
		}
		
		if(ne.name == "MOUSEBUTTONDOWN"){
			for(var i = 0; i < Self.events_list.length; i++){
				if((Self.events_list[i].name == "MOUSEBUTTONDOWN") && Self.events_list[i].data['button'] == ne.data['button']){
					Self.events_list.splice(i,1);
				}
			}
			Self.events_list.push(ne);
				
			Self.constructor.prototype.active_buttons[ne.data['button']] = true;
			Self.constructor.prototype.canvas_with_focus = ne.data['canvas'];
			VG.CANVAS_WITH_FOCUS = VG.EQ.prototype.canvas_with_focus;
		}
		
		if(ne.name == "MOUSEBUTTONUP"){
			for(var i = 0; i < Self.events_list.length; i++){
				if((Self.events_list[i].name == "MOUSEBUTTONUP") && Self.events_list[i].data['button'] == ne.data['button']){
					Self.events_list.splice(i,1);
				}
			}
			Self.events_list.push(ne);
				
			Self.constructor.prototype.active_buttons[ne.data['button']] = false;
			Self.constructor.prototype.canvas_with_focus = ne.data['canvas'];
			VG.CANVAS_WITH_FOCUS = VG.EQ.prototype.canvas_with_focus;
		}
		
		if(ne.name == "MOUSEENTER"){
			Self.constructor.prototype.active_canvas.push(ne.data["canvas"]);
			VG.ACTIVE_CANVAS = ne.data["canvas"];
			Self.events_list.push(ne);
			for(var i = 0; i < Self.events_list.length; i++){
				if((Self.events_list[i].name == "MOUSELEAVE") && (Self.events_list[i].data['canvas'] == ne.data['canvas'])){
					Self.events_list.splice(i,1);
				}
			}
		}
		
		if(ne.name == "MOUSELEAVE"){
			for(var i = 0; i < Self.constructor.prototype.active_canvas.length; i++){
				if(Self.constructor.prototype.active_canvas[i] == ne.data["canvas"]){
					Self.constructor.prototype.active_canvas.splice(i,1);
					if(Self.constructor.prototype.active_canvas.length == 0)
						VG.ACTIVE_CANVAS = null;
				}
			}
			Self.events_list.push(ne);
			for(var i = 0; i < Self.events_list.length; i++){
				if(Self.events_list[i].name == "MOUSEENTER" && Self.events_list[i].data['canvas'] == ne.data['canvas']){
					Self.events_list.splice(i,1);
				}
			}
		}
		
		if(ne.name == "USEREVENT"){
			ne.data = ne._data;
			if(!ne.immediate)
				Self.events_list.push(ne);
			else
				Self.notify(ne);
		}
	}
	
	/**
	 * VG.EQ#translateEvent(e) -> VG.Event
	 * - e(VG.Event | jQuery.Event): event
	 * Translates VG.Event or jQuery.Event into VG.Event. Private.
	**/
	this.translateEvent = function(e){
		if(typeof(e.vgevent) === 'undefined' || e.vgevent == false){
			if(e.type == "mouseup"){
				e.stopPropagation();
				e.preventDefault();
				var name = "MOUSEBUTTONUP";
				var data = {canvas: e.currentTarget,
						x: parseInt(e.pageX - VG.elementGetX(e.currentTarget)),
						y: parseInt(e.pageY - VG.elementGetY(e.currentTarget))};
				if(e.button == 0)
					data['button'] = "left";
				if(e.button == 1)
					data['button'] = "middle";
				if(e.button == 2)
					data['button'] = "right";
			}else if(e.type == "mousedown"){
				e.stopPropagation();
				e.preventDefault();
				var name = "MOUSEBUTTONDOWN";
				var data = {canvas: e.currentTarget,
						x: parseInt(e.pageX - VG.elementGetX(e.currentTarget)),
						y: parseInt(e.pageY - VG.elementGetY(e.currentTarget))};
				if(e.button == 0)
					data['button'] = "left";
				if(e.button == 1)
					data['button'] = "middle";
				if(e.button == 2)
					data['button'] = "right";
			}else if(e.type == "mouseenter"){
				var name = "MOUSEENTER";
				var data = {canvas: e.currentTarget};
			}else if(e.type == "mouseleave"){
				var name = "MOUSELEAVE";
				var data = {canvas: e.currentTarget};
			}else if(e.type == "keydown"){
				if(VG.CANVAS_WITH_FOCUS != null){
					var name = "KEYDOWN";
					var data = {key: e.keyCode,
							alt: e.altKey,
							ctrl: e.ctrlKey,
							shift: e.shiftKey}
					if(VG.keyboard_map[data['key']] !== 'undefined')
						data['letter'] =  VG.keyboard_map[data['key']];
					else
						data['letter'] = "UNKNOWN";
					if(VG.EQ.prototype.canvas_with_focus != null){
						e.preventDefault();
						e.stopPropagation();
					}	
				}
			}else if(e.type == "keyup"){
				if(VG.CANVAS_WITH_FOCUS != null){
					var name = "KEYUP";
					var data = {key: e.keyCode,
							alt: e.altKey,
							ctrl: e.ctrlKey,
							shift: e.shiftKey}
					if(VG.keyboard_map[data['key']] !== 'undefined')
						data['letter'] =  VG.keyboard_map[data['key']];
					else
						data['letter'] = "UNKNOWN";
					if(VG.EQ.prototype.canvas_with_focus != null){
						e.preventDefault();
						e.stopPropagation();
					}
				}
			}else{
				var name = "UNKNOWN";
				var data = {};
			}
			return new VG.Event(name,data);
		}else{
			return e;
		}
	}
/**
 * VG.EQ#subscribe(subscriber, events) -> null
 * - subscriber(Object): subscriber object - must provide notify() method
 * - events(String): event names separated with space - "event1 event2..."
 * Subscribes subscriber to be notified by events.
**/
	this.subscribe = function(s, events){
		events = events.split(" ");
		for(var i = 0; i < events.length; i++){
			if(Self.subscribers[events[i]] == null)
				Self.subscribers[events[i]] = [s];
			else
				Self.subscribers[events[i]].push(s);
			}
	}
	
/**
 * VG.EQ#unsubscribe(subscriber) -> null
 * - subscriber(Object)
 * Removes subscriber from the queue's subscribers list.
**/
	this.unsubscribe = function(s){
		for(var e in Self.subscribers){
			if(Self.subscribers[e] != null){
				for(var i = 0; i < Self.subscribers[e].length; i++){
					if(Self.subscribers[e][i] == s)
						Self.subscribers[e].splice(i,1);
				}
			if(Self.subscribers[e].length == 0)
				Self.subscribers[e] = null;
			}
		}
	}
	
/**
 * VG.EQ#tick() -> null
 * When called notifies all subscribers and clears the queue
**/
	this.tick = function(){
		this.mousemoved = false;
		for(var i = 0; i < Self.events_list.length; i++){
			Self.notify(Self.events_list[i]);
		}
		Self.events_list = [];
	}
	
	/**
	 * VG.EQ#notify(event) -> null
	 * - event(VG.Event)
	 * Notifies subscribers about given event.
	**/
	this.notify = function(e){
		if(Self.subscribers[e.name] != null){
			for(var i = 0; i < Self.subscribers[e.name].length; i++){
					Self.subscribers[e.name][i].notify(e);
			}
		}
	}
	
	// bind events related to the whole page
	$(document).bind('keydown', Self.processEvent);
	$(document).bind('keyup', Self.processEvent);
	// $(document).bind('keypress', Self.processEvent);
	$(document).bind('userevent', Self.processEvent);
}

VG.EQ.prototype.active_buttons = {left: false, middle: false, rigth: false};
VG.EQ.prototype.active_canvas = [];
VG.EQ.prototype.canvas_with_focus = null;