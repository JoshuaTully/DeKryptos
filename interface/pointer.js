var Drag={
	ancorX:0,
	ancorY:0,
	offsetX:0,
	offsetY:0,
	activeX:0,
	activeY:0,
	mount:	function(obj, base, RULES, FUNC){
       			obj.onmousedown		= function(){event.preventDefault(); document.onmousemove = function(){Drag.capture(RULES, FUNC)}};
        		obj.onmouseup		= function(){Drag.release()}
       			obj.ontouchmove		= function(){event.preventDefault(); document.ontouchmove = function(){Drag.capture(RULES, FUNC)}};
        		obj.ontouchend		= function(){Drag.release()}
        		obj.ontouchcancel	= function(){Drag.release()}
		},

	capture: function(RULES, FUNC){
			offsetX = event?.touches[0].clientX - ancorX || event.clientX - ancorX;
			offsetY = event?.touches[0].clientY - ancorY || event.clientY - abcorY;
			Drag.move(RULES, FUNC);
		},

	release: function(){
			document.ontouchmove = null;
			document.onmousemove = null;
		},
	move:	function(RULES, FUNC){
			event.preventDefault();
			activeX = event?.touches[0].clientX - offsetX || event?.clientX - offsetX;
			activeY = event?.touches[0].clientY - offsetY || event?.clientY - offsetY;
			ancorX = activeX;
			ancorY = activeY;
    			event.target.style.transform = "translate3d(" + activeX + "px, " + activeY + "px, 0)";
		},
	setCaret: function() {
			let element = gid(IOS.target);
			let range = document.createRange();
			var selected = window.getSelection();
    
			range.setStart(element.childNodes[2], 5);
			range.collapse(true);
    
			selected.removeAllRanges();
			selected.addRange(range);
		},

}

				//if(pos.py < -25 || pos.py > (boundry.height+25)){Drag.release(obj, base, func)}
				//if(pos.px < -25 || pos.px > (boundry.width+25)){Drag.release(obj, base, func)}