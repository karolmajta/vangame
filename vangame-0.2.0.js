var VG = VG || {};

VG.elementGetX = function(element){
	var return_value = 0;
	while( element != null ) {
		return_value += element.offsetLeft;
		element = element.offsetParent;
	}
	return return_value;
}

VG.elementGetY = function(element){
	var return_value = 0;
	while( element != null ) {
		return_value += element.offsetTop;
		element = element.offsetParent;
	}
	return return_value;
}

VG.deepCopy = function(original, copy) {
	var copy = copy || {};
	for (var i in original) {
		if (typeof original[i] === 'object'){
			copy[i] = (original[i].constructor === Array) ? [] : {};
			VG.deepCopy(original[i], copy[i]);
		}
		else{
			original[i] = copy[i];
		}
	}
	return copy;
};

VG.MOUSE_X = 0;

VG.MOUSE_Y = 0;

VG.ACTIVE_CANVAS = null;

VG.CANVAS_WITH_FOCUS = null;

VG.keyboard_map = [];
	VG.keyboard_map[8] = "BACKSPACE";
	VG.keyboard_map[9] = "TAB";
	VG.keyboard_map[13] = "ENTER";
	VG.keyboard_map[16] = "SHIFT";
	VG.keyboard_map[17] = "CTRL";
	VG.keyboard_map[18] = "ALT";
	VG.keyboard_map[19] = "PAUSE_BREAK";
	VG.keyboard_map[20] = "CAPSLOCK";
	VG.keyboard_map[27] = "ESCAPE";
	VG.keyboard_map[32] = "SPACEBAR";
	VG.keyboard_map[33] = "PAGE_UP";
	VG.keyboard_map[34] = "PAGE_DOWN";
	VG.keyboard_map[35] = "END";
	VG.keyboard_map[36] = "HOME";
	VG.keyboard_map[37] = "LEFT_ARROW";
	VG.keyboard_map[38] = "UP_ARROW";
	VG.keyboard_map[39] = "RIGHT_ARROW";
	VG.keyboard_map[40] = "DOWN_ARROW";
	VG.keyboard_map[45] = "INSERT";
	VG.keyboard_map[46] = "DELETE";
	VG.keyboard_map[48] = "0";
	VG.keyboard_map[49] = "1";
	VG.keyboard_map[50] = "2";
	VG.keyboard_map[51] = "3";
	VG.keyboard_map[52] = "4";
	VG.keyboard_map[53] = "5";
	VG.keyboard_map[54] = "6";
	VG.keyboard_map[55] = "7";
	VG.keyboard_map[56] = "8";
	VG.keyboard_map[57] = "9";
	VG.keyboard_map[59] = ";";
	VG.keyboard_map[65] = "a";
	VG.keyboard_map[66] = "b";
	VG.keyboard_map[67] = "c";
	VG.keyboard_map[68] = "d";
	VG.keyboard_map[69] = "e";
	VG.keyboard_map[70] = "f";
	VG.keyboard_map[71] = "g";
	VG.keyboard_map[72] = "h";
	VG.keyboard_map[73] = "i";
	VG.keyboard_map[74] = "j";
	VG.keyboard_map[75] = "k";
	VG.keyboard_map[76] = "l";
	VG.keyboard_map[77] = "m";
	VG.keyboard_map[78] = "n";
	VG.keyboard_map[79] = "o";
	VG.keyboard_map[80] = "p";
	VG.keyboard_map[81] = "q";
	VG.keyboard_map[82] = "r";
	VG.keyboard_map[83] = "s";
	VG.keyboard_map[84] = "t";
	VG.keyboard_map[85] = "u";
	VG.keyboard_map[86] = "v";
	VG.keyboard_map[87] = "w";
	VG.keyboard_map[88] = "x";
	VG.keyboard_map[89] = "y";
	VG.keyboard_map[90] = "z";
	VG.keyboard_map[91] = "LEFT_WINDOW";
	VG.keyboard_map[92] = "RIGHT_WINDOW";
	VG.keyboard_map[93] = "SELECT";
	VG.keyboard_map[96] = "NUMPAD_0";
	VG.keyboard_map[97] = "NUMPAD_1";
	VG.keyboard_map[98] = "NUMPAD_2";
	VG.keyboard_map[99] = "NUMPAD_3";
	VG.keyboard_map[100] = "NUMPAD_4";
	VG.keyboard_map[101] = "NUMPAD_5";
	VG.keyboard_map[102] = "NUMPAD_6";
	VG.keyboard_map[103] = "NUMPAD_7";
	VG.keyboard_map[104] = "NUMPAD_8";
	VG.keyboard_map[105] = "NUMPAD_9";
	VG.keyboard_map[106] = "*";
	VG.keyboard_map[107] = "=";
	VG.keyboard_map[109] = "-";
	VG.keyboard_map[110] = ".";
	VG.keyboard_map[111] = "/";
	VG.keyboard_map[112] = "F1";
	VG.keyboard_map[113] = "F2";
	VG.keyboard_map[114] = "F3";
	VG.keyboard_map[115] = "F4";
	VG.keyboard_map[116] = "F5";
	VG.keyboard_map[117] = "F6";
	VG.keyboard_map[118] = "F7";
	VG.keyboard_map[119] = "F8";
	VG.keyboard_map[120] = "F9";
	VG.keyboard_map[121] = "F10";
	VG.keyboard_map[122] = "F11";
	VG.keyboard_map[123] = "F12";
	VG.keyboard_map[144] = "NUM_LOCK";
	VG.keyboard_map[145] = "SCROLL_LOCK";
	VG.keyboard_map[186] = ".";
	VG.keyboard_map[186] = "=";
	VG.keyboard_map[188] = ",";
	VG.keyboard_map[190] = ".";
	VG.keyboard_map[191] = "/";
	VG.keyboard_map[219] = "[";
	VG.keyboard_map[220] = "\\";
	VG.keyboard_map[221] = "]";
	VG.keyboard_map[222] = "'";

VG.KBYTESLOADED = 0;

VG.addKbytesLoaded = function(e){
	VG.KBYTESLOADED += e.data.size;
}

VG.init = function(){
	$(document).bind('mouseup mousedown', function(e) {
		VG.EQ.prototype.canvas_with_focus = null;
		VG.CANVAS_WITH_FOCUS = VG.EQ.prototype.canvas_with_focus;
	});
}

VG.trigger = function(e){
	$(document).trigger(e);
}


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
	this.blit = function(obj){
		obj.draw(this.canvas, obj.x - this.x, obj.y - this.y);
	}
	this.setPosition = function(x,y){
		this.x = x;
		this.y = y;
	}
}


VG.Clock = function(milis) {
	var Self = this;
	this.dt = milis;
	this.interval_id;
	this.subscribers = [];
	this.start = function(milis){
		if(milis == null)
			milis = this.dt;
		window.clearInterval(Self.interval_id);
		this.interval_id = window.setInterval(this.tick, milis);
		this.dt = milis;
	}
	this.stop = function(){
		window.clearInterval(Self.interval_id);
	}
	this.subscribe = function(o){
		var found = false;
		for(var i = 0; i < this.subscribers.length; i++){
			if(this.subscribers[i] == o)
				found = true;
		}
		if(!found)
			this.subscribers.push(o);
	}
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



VG.EQ = function() {
	var Self = this;
	this.registered_canvas = [];
	this.events_list = [];
	this.subscribers = {};
	this.mousemoved = false;

	this.registerCanvas = function(cnv) {
		Self.registered_canvas.push(cnv);
		$(cnv.canvas).bind('mousedown', this.processEvent);
		$(cnv.canvas).bind('mouseenter', this.processEvent);
		$(cnv.canvas).bind('mouseleave', this.processEvent);
		$(cnv.canvas).bind('mousemove', function(e){
			VG.MOUSE_X = parseInt(e.pageX - VG.elementGetX(e.currentTarget));
			VG.MOUSE_Y = parseInt(e.pageY - VG.elementGetY(e.currentTarget));
		});
		$(cnv.canvas).bind('mouseup', this.processEvent);
		$(cnv.canvas).bind('contextmenu',function(e){
			return false;
		});
	}

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
	this.subscribe = function(s, events){
		events = events.split(" ");
		for(var i = 0; i < events.length; i++){
			if(Self.subscribers[events[i]] == null)
				Self.subscribers[events[i]] = [s];
			else
				Self.subscribers[events[i]].push(s);
			}
	}

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

	this.tick = function(){
		this.mousemoved = false;
		for(var i = 0; i < Self.events_list.length; i++){
			Self.notify(Self.events_list[i]);
		}
		Self.events_list = [];
	}

	this.notify = function(e){
		if(Self.subscribers[e.name] != null){
			for(var i = 0; i < Self.subscribers[e.name].length; i++){
					Self.subscribers[e.name][i].notify(e);
			}
		}
	}

	$(document).bind('keydown', Self.processEvent);
	$(document).bind('keyup', Self.processEvent);
	$(document).bind('userevent', Self.processEvent);
}

VG.EQ.prototype.active_buttons = {left: false, middle: false, rigth: false};
VG.EQ.prototype.active_canvas = [];
VG.EQ.prototype.canvas_with_focus = null;


VG.Event = function(name,d){
	var Self = this;
	this.name = name;
	this.data = d;
	this._data = d;
	this.vgevent = true;
	this.immediate = false;
}
VG.Event.prototype = new jQuery.Event('userevent');
VG.Event.prototype.constructor = VG.Event;
VG.primitives = VG.primitives || {}


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
		}
	}

	this.tick = function(){}
	this.notify = function(e){}
}



VG.primitives.Ellipse = function(x, y, a, b){
	this.x = x;
	this.y = y;
	this.a = a;
	this.b = b

	this.draw = function(cnv, x, y){
		try{
			var cont = cnv.getContext('2d');
			cont.beginPath();
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
		}
	}

	this.tick = function(){}
	this.notify = function(e){}
}



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
		}
	}

	this.tick = function(){}
	this.notify = function(){}
}


VG.Screen = function(){
	var Self = this;

	this.canvas = [];
	this.layers = [];
	this.last_layer = 0;
	this.last_mouse_x = null;
	this.last_mouse_y = null;
	this.addCanvas = function(cnv){
		Self.canvas.push(cnv);
	}
	this.removeCanvas = function(cnv){
		for(var i = 0; i < Self.canvas.length; i++){
			if(cnv == Self.canvas[i])
				Self.canvas.splice(i,1);
		}
	}
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
	this.putObject = function(obj){
		Self.layers.splice(0,0,[]);
		Self.addObject(obj,0);
	}
	this.pushObject = function(obj){
		Self.addObject(obj,Self.layers.length);
	}
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
		this.redraw();
	}

	this.redraw = function(){
		for(var h = 0; h < Self.canvas.length; h++){
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

VG.sprites = VG.sprites || {}


VG.primitives.Image = function(url, callback, data_url){
	var Self = this;

	if(data_url == null){
		data_url = url + ".json";
	}

	this._init = function(data){
		Self.data = data;
		Self.image = new Image(Self.data.width, Self.data.height);
		Self.image.src = url;
		$(Self.image).bind('load', {size: Self.data.size}, VG.addKbytesLoaded);
		if(callback != null){
			$(Self.image).bind('load', {img: Self}, callback);
		}
	}
	if(VG.Image.prototype.loaded_images[data_url] == null){
		$.getJSON(data_url, Self._init);
		VG.Image.prototype.loaded_images[data_url] = Self;
	}
	else{
		callback();
		return VG.Image.prototype.loaded_images[data_url];
	}
}
VG.Image.prototype.loaded_images = {};

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

	this.setMode = function(m){
		Self.mode = m;
	}

	this.setFrame = function(f){
		Self.pnt = f;
	}

	this.start = function(){
		Self.pnt = 0;
	}

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
