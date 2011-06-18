/**
 * VG
 * The VanGame namespace.
**/
var VG = VG || {};

/**
 * VG.elementGetX(element) -> Number
 * - element(DOMElement): any DOM element
 * Returns horizontal offset of a DOM elemenrt
**/
VG.elementGetX = function(element){
	var return_value = 0;
	while( element != null ) {
		return_value += element.offsetLeft;
		element = element.offsetParent;
	}
	return return_value;
}

/**
 * VG.elementGetY(element) -> Number
 * - element(DOMElement): any DOM element
 * Returns vertical offset of a DOM elemenrt
**/
VG.elementGetY = function(element){
	var return_value = 0;
	while( element != null ) {
		return_value += element.offsetTop;
		element = element.offsetParent;
	}
	return return_value;
}

/**
 * VG.deepCopy(original[, copy]) -> Object
 * - original (Object): source object
 * - copy (Object): target object
 * Performs a recursive copy on original injecting all it's attributes into copy. If copy is not given returns a deep copy of original.
**/
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

/**
 * VG.MOUSE_X -> Number
 * The x-coordinate of the last registered mouse position, according to the VG.Screen.
**/
VG.MOUSE_X = 0;

/**
 * VG.MOUSE_Y -> Number
 * The y-coordinate of the last registered mouse position, according to the VG.Screen.
**/
VG.MOUSE_Y = 0;

/**
 * VG.ACTIVE_CANVAS -> VG.Canvas
 * The last canvas, that the mouse cursor entered.
**/
VG.ACTIVE_CANVAS = null;

/**
 * VG.CANVAS_WITH_FOCUS -> VG.Canvas
 * The last canvas that currently has focus (for keyboard events etc.).
**/
VG.CANVAS_WITH_FOCUS = null;

/**
 * VG.KEYBOARD_MAPPING -> Array
 * Keyboard mapping.
**/
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

/**
 * VG.KBYTESLOADED -> Number
 * Number of kilobytes, that were already loaded and registered using VG.AddKbytesLoaded
**/
VG.KBYTESLOADED = 0;

/**
 * VG.addKbytesLoaded(event) -> null
 * - event(jQuery.Event): A jQuery.Event with size property added to it's data.
 * Adds loaded kilobytes to counter
**/
VG.addKbytesLoaded = function(e){
	VG.KBYTESLOADED += e.data.size;
}
	
/**
 * VG.init() -> null
 * Does some simple event binding used for emulation of focus on HTML <canvas> elements.
**/
VG.init = function(){
	$(document).bind('mouseup mousedown', function(e) {
		VG.EQ.prototype.canvas_with_focus = null;
		VG.CANVAS_WITH_FOCUS = VG.EQ.prototype.canvas_with_focus;
	});
}

/**
 * VG.trigger(event) -> null
 * - event(jQuery.Event)
 * Shortcut to $(document).trigger(event)
**/
VG.trigger = function(e){
	$(document).trigger(e);
}