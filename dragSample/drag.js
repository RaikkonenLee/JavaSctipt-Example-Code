function drag(elementToDrag, event) {
	var scroll = getScrollOffsets();
	var startX = event.clientX + scroll.x;
	var startY = event.clientY + scroll.y;
	//
	var origX = elementToDrag.offsetLeft;
	var origY = elementToDrag.offsetTop;
	//
	var deltaX = startX - origX;
	var deltaY = startY - origY;
	//
	if (document.addEventListener) {
		document.addEventListener("mousemove", moveHandler, true);
		document.addEventListener("mouseup", upHandler, true);
	} else if (document.attachEvent) {
		elementToDrag.setCapture();
		elementToDrag.attachEvent("onmousemove", moveHandler);
		elementToDrag.attachEvent("mouseup", upHandler);
		elementToDrag.attachEvent("onlosecapture", upHandler);
	}
	//
	if (event.stopPropagation){
		event.stopPropagation();
	} else {
		event.cancelBubble = true;
	}
	//
	if (event.preventDefault) {
		event.preventDefault();
	} else {
		event.returnValue = false;
	}
	//
	function moveHandler(e){
		if (!e) { e = window.event;}
		//
		var scroll = getScrollOffsets();
		elementToDrag.style.left = (e.clientX + scroll.x - deltaX) + "px";
		elementToDrag.style.top = (e.clientY + scroll.y - deltaY) + "px";
		//
		if (e.stopPropagation){
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	}
	//
	function upHandler(e){
		if (!e) { e = window.event;}
		//
		if (document.removeEventListener) {
			document.removeEventListener("mouseup", upHandler, true);
			document.removeEventListener("mousemove", moveHandler, true);
		} else if (document.detachEvent) {
			elementToDrag.detachEvent("onlosecapture", upHandler);
			elementToDrag.detachEvent("onmouseup", upHandler);
			elementToDrag.detachEvent("onmousemove", moveHandler);
			elementToDrag.releaseCapture();
		}
		//
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	}	
}

function getScrollOffsets(w) {
	// Use the specified window or the current window if no argument
	w = w || window;
	// This works for all browsers except IE versions 8 and before
	if (w.pageXOffset != null) return {x: w.pageXOffset, y:w.pageYOffset};
	// For IE (or any browser) in Standards mode
	var d = w.document;
	if (document.compatMode == "CSS1Compat")
	return {x:d.documentElement.scrollLeft, y:d.documentElement.scrollTop};
	// For browsers in Quirks mode
	return { x: d.body.scrollLeft, y: d.body.scrollTop };
}






