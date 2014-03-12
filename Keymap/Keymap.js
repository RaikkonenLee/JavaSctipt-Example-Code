var whenReady = (function(){
	var funcs = [];
	var ready = false;
	//
	function handler(e){
		if (ready) { return; }
		if (e.type === "readystatechange" && document.readyState !== "complete") {
			return;
		}
		for (var i = 0; i < funcs.length; i++) {
			funcs[i].call(document);
		};
		ready = true;
		funcs = null;
	}
	//
	if (document.addEventListener) {
		document.addEventListener("DOMContentLoaded", handler, false);
		document.addEventListener("readystatechange", handler, false);
		window.addEventListener("load", handler);
	} else if (document.attachEvent) {
		document.attachEvent("onreadystatechange", handler);
		window.attachEvent("onload", handler);
	}
	//
	return function whenReady(f){
		if (ready) { 
			f.call(document); 
		} else {
			funcs.push(f);
		}

	}
}());

whenReady(function (){
	var inputelts = document.getElementsByTagName("input");
	for (var i = 0; i < inputelts.length; i++) {
		var elt = inputelts[i];
		if (elt.type != "text" || !elt.getAttribute("data-allowed-chars")) {
			continue;
		}
		if (elt.addEventListener) {
			elt.addEventListener("keypress", filter, false);
			elt.addEventListener("textInput", filter, false);
			elt.addEventListener("textinput", filter, false);
		} else {
			elt.attachEvent("onkeypress", filter);
		}
	}
	//
	function filter(event) {
		var e = event || window.event;
		var target = e.target || e.srcElement;
		var text = null;
		//
		if (e.type === "textinput" || e.type === "textInput") {
			text = e.data;
		} else {
			var code = e.charCode || e.keyCode;
			//
			if (code < 32 ||
				e.charCode == 0 ||
				e.ctrlKey || e.altKey) {
				return;
			}
			text = String.fromCharCode(code);
		}
		//
		var allowed = target.getAttribute("data-allowed-chars");
		var messageid = target.getAttribute("data-messageid");
		if (messageid) {
			var messageElement = document.getElementById(messageid);
		}
		for (var i = 0; i < text.length; i++) {
			var c = text.charAt(i);
			if (allowed.indexOf(c) == -1) {
				if (messageElement) {
					messageElement.style.visibility = "visible";
				}
				if (e.preventDefault) {
					e.preventDefault();
				}
				if (e.returnValue) {
					e.returnValue = false;
				}
				return false
			}
		}
		if (messageElement) {
			messageElement.style.visibility = "hidden";
		}
	}
});

whenReady(function(){
	var keymap = new Keymap({
		"alt_c" : function(event, keyid) {
			alert("Key pressed down! KeyId:" + keyid)
		}
	});
	keymap.install(document.body);
});


function Keymap(bindings) {
	this.map = {};
	if (bindings) {
		for (name in bindings) {
			this.bind(name, bindings[name]);
		}
	}
}
//
Keymap.prototype.bind = function(key, func) {
	this.map[Keymap.normalize(key)] = func;
};
//
Keymap.prototype.unbind = function(key) {
	delete this.map[Keymap.normalize(key)];
};
//
Keymap.prototype.install = function(element) {
	var keymap = this;
	//
	function handler(event) {
		return keymap.dispatch(event, element);
	}
	//
	if (element.addEventListener) {
		element.addEventListener("keydown", handler, false);
	} else if (element.attachEvent) {
		element.attachEvent("onkeydown", handler);
	}
};
//
Keymap.prototype.dispatch = function(event, element) {
	var modifiers = "";
	var keyname = "";
	//
	if (event.altKey) { modifiers += "alt_";}
	if (event.ctrlKey) { modifiers += "ctrl_";}
	if (event.metaKey) { modifiers += "meta_";}
	if (event.shiftKey) { modifiers += "shift_";}
	//
	if (event.keyIdentifier && event.keyIdentifier.substring(0, 2) !== "U+") {
		keyname = event.keyIdentifier;
	} else {
		keyname = Keymap.keyCodeToKeyName[event.keyCode];
	}
	//
	if (!keyname) { return; }
	var keyid = modifiers + keyname.toLowerCase();
	var handler = this.map[keyid];
	//
	if (handler) {
		var retval = handler.call(element, event, keyid);
		//
		if (retval === false) {
			if (event.stopPropagation) {
				event.stopPropagation();
			} else {
				event.cancelBubble = true;
			}
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
		}
		return retval;
	}
};
//
Keymap.normalize = function(keyid) {
	keyid = keyid.toLowerCase();
	var words = keyid.split(/\s+|[\-+_]/);
	var keyname = words.pop();
	keyname = Keymap.aliases[keyname] || keyname;
	words.sort();
	words.push(keyname);
	return words.join("_");
};
//
Keymap.aliases = {
	"escape" : "esc",
	"delete":"del", 
	"return":"enter", 
	"ctrl":"control",
	"space":"spacebar",
	"ins":"insert"
};
//
Keymap.keyCodeToKeyName = {
	8:"Backspace", 9:"Tab", 13:"Enter", 16:"Shift", 17:"Control", 18:"Alt",
	19:"Pause", 20:"CapsLock", 27:"Esc", 32:"Spacebar", 33:"PageUp",
	34:"PageDown", 35:"End", 36:"Home", 37:"Left", 38:"Up", 39:"Right",
	40:"Down", 45:"Insert", 46:"Del",
	
	48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",
	
	65:"A", 66:"B", 67:"C", 68:"D", 69:"E", 70:"F", 71:"G", 72:"H", 73:"I",
	74:"J", 75:"K", 76:"L", 77:"M", 78:"N", 79:"O", 80:"P", 81:"Q", 82:"R",
	83:"S", 84:"T", 85:"U", 86:"V", 87:"W", 88:"X", 89:"Y", 90:"Z",
	// Keypad numbers and punctuation keys. (Opera does not support these.)
	96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",
	106:"Multiply", 107:"Add", 109:"Subtract", 110:"Decimal", 111:"Divide",
	// Function keys
	112:"F1", 113:"F2", 114:"F3", 115:"F4", 116:"F5", 117:"F6",
	118:"F7", 119:"F8", 120:"F9", 121:"F10", 122:"F11", 123:"F12",
	124:"F13", 125:"F14", 126:"F15", 127:"F16", 128:"F17", 129:"F18",
	130:"F19", 131:"F20", 132:"F21", 133:"F22", 134:"F23", 135:"F24",
	// Punctuation keys that don't require holding down Shift
	// Hyphen is nonportable: FF returns same code as Subtract
	59:";", 61:"=", 186:";", 187:"=", // Firefox and Opera return 59,61
	188:",", 190:".", 191:"/", 192:"`", 219:"[", 220:"\\", 221:"]", 222:"'"
};













