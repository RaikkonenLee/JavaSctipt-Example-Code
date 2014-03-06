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

whenReady(function(){
	var clock = document.getElementById("clock");
	var icon = new Image();
	icon.src = "clock-icon.png";
	//
	function displayTime() {
		var now = new Date();
		var hrs = now.getHours(), mins = now.getMinutes();
		if (mins < 10) mins = "0" + mins;
		clock.innerHTML = hrs + ":" + mins;
		setTimeout(displayTime, 60000);
	}
	//
	displayTime();
	//
	clock.draggable = true;
	clock.ondragstart = function(event) {
		var event = event || window.event;
		var dt = event.dataTransfer;
		dt.setData("Text", Date() + "\n");
		if (dt.setDragImage) {
			dt.setDragImage(icon, 0, 0);
		}
	}
});

whenReady(function() {
	var lists = document.getElementById("ul");
	var regexp = /\bdnd\b/;
	//
	for (var i = 0; i < lists.length; i++) {
		if (regexp.test(lists[i].className)) {
			dnd(lists[i]);
		}
	};
	function dnd(list) {
		var original_class = list.className;
		var entered = 0;
		//
		list.ondragenter = function(e) {
			e = e || window.event;
			var from = e.relatedTarget;
			//
			entered++;
			if ((from && lischild(from, list)) || entered == 1) {
				var dt = e.dataTransfer;
				var types = dt.types;
				//
				if (!types ||
					(types.contains &&types.contains("text/plain")) ||
					(types.indexOf && types.indexOf("text/plain") != -1)) {
					list.className = original_class + "droppable";
					return false;
				}
				return;
			}
			return false;
		};
		list.ondragleave = function(e) {
			e = e || window.event;
			var to = e.relatedTarget;
			//
			entered--;
			if ((to && lischild(to, list)) || entered <= 0) {
				list.className = original_class;
				entered = 0;
			}
			return false;
		};
		list.ondrop = function(e) {
			e = e || window.event;
			var dt = e.dataTransfer;
			var text = dt.getData("Text");
			//
			if (text) {
				var item = document.createElement("li");
				item.draggable = true;
				item.appendChild(document.createTextNode(text));
				list.appendChild(item);
				list.className = original_class;
				entered = 0;
				//
				return false;
			}
		};
		//
		var items = list.getElementsByTagName("li");
		for (var i = 0; i < items.length; i++) {
			items[i].draggable = true;
		};
		//
		list.ondragstart = function(e) {
			var e = e || window.event;
			var target = e.target || e.srcElement;
			//
			if (target.tagName !== "LI") { return false; }
			var dt = e.dataTransfer;
			dt.setData("Text", target.innerText || target.textContent);
			dt.effectAllowed = "copyMove";
		};
		list.ondragend = function(e) {
			e = e || window.event;
			var target = e.target || e.srcElement;
			//
			if (e.dataTransfer.dropEffect === "move") {
				target.parentNode.removeChild(target);
			}
		}
		//
		function isChild(a, b) {
			for (; a; a = a.parentNode;) {
				if (a === b) {
					return true;
				}
			};
			return false;
		}
	}
});














