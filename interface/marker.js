
Mark={
	list: function(TARGET){
		let POS_INDEX=null;
		let POS_FUNCT=null;
		let SOURCE=null;
		let RET_STR=null;
		let COLLECTION=gid(IOS.ST_Active).childNodes;
		for(var i=0; i<COLLECTION.length; i++){
			POS_INDEX=COLLECTION[i].getAttribute('markIndex');
			POS_FUNCT=COLLECTION[i].getAttribute('markType');
			if(POS_FUNCT=='countLeft' || POS_FUNCT=='countRight'){
				SOURCE=gid(IOS.CT_Active).textContent;
			}
			if(POS_FUNCT=='findLeft' || POS_FUNCT=='findRight'){ 
				SOURCE=gid(IOS.PT_Active).textContent;
			}
			RET_STR=rsa(gid(TARGET).value,i,SOURCE.charAt(POS_INDEX));
		}
		gid(TARGET).value = RET_STR;
	},

	make: function(LAYER_ID, INDEX, CHAR, TYPE, COLOR){
		if(!TYPE){return false}
		COLOR		?	COLOR		: 'rgba(255, 161, 53, 1)';
		LAYER_ID	?	LAYER_ID	: IOS.focused;
		INDEX		?	INDEX 		: 0;
		let ID		=	mid('pos');
		let HEIGHT	=	35;
		let LOC		= 	this.locate(LAYER_ID, INDEX);
		if(TYPE=='findLeft' || TYPE=='findRight' || TYPE=='search'){HEIGHT = 35}
		if(TYPE=='countLeft' || TYPE=='countRight'){HEIGHT = 15}
		if(!IOS.ST_Active){
			IOS.ST_Active=Layer.make('','STEG',IOS.CT_Active,'S');
		}
		gid(IOS.ST_Active).innerHTML+=`<div id='${ID}' markType='${TYPE}' markIndex='${INDEX}' style='position:absolute; top:${LOC.y-18}px; left:${LOC.x}px; height:${HEIGHT}px; width:13px; background-color:${COLOR}; z-index:0'>&nbsp</div>`;

	},
	caret:function(){
		let LOC		= 	this.locate(IOS.target, IOS.textIndex);
		let SPAN	=	IOS.textRange;
		let vOffset = 0;
		if(IOS.target == IOS.PT_Active){vOffset = 17}
		gid('caretIndicator').style.left = parseInt(22+LOC.x)+'px';
		gid('caretIndicator').style.top = parseInt(vOffset + LOC.y)+'px';
	},
	locate: function(LAYER_ID, INDEX){	
		let TEXT=gid(LAYER_ID).innerText;
console.log(TEXT.charCodeAt(INDEX));
		if(TEXT.charCodeAt(INDEX)==10){INDEX++}
		let RECT={x:0, y:0}
		let ID= mid('aNc');
		let BREAKOUT=TEXT.split("");
		BREAKOUT.splice(INDEX, 0, "<span id='"+ID+"' style='position relative; width:9px; height:10px'>");
		BREAKOUT.splice(INDEX+2, 0, "</span>");
		gid(LAYER_ID).innerHTML=BREAKOUT.join('');
		RECT.x = gid(ID).offsetLeft;
		RECT.y = gid(ID).offsetTop;
		RECT.w = gid(ID).offsetWidth;
		RECT.h = gid(ID).offsetHeight;
		gid(LAYER_ID).innerHTML=TEXT;
		return RECT;
	},

	break: function(x){
		rid(gid(x).lastElementChild.id);						// Remove last mark
	}
}
