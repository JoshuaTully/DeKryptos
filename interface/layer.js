var projectID=null;				// Global variables used to keep track of layers and storage locations
var listings=null;				// Convert theese global variables to interface object variables (Unify)

var Layer={
	make: function(DATA, LAYER_TYPE, LAYER_LINK, LAYER_FORMAT){
		LAYER_TYPE =		LAYER_TYPE || 'CT';
		LAYER_LINK =		LAYER_LINK=='new' ? LAYER_ID : LAYER_LINK;
		LAYER_FORMAT = 		LAYER_FORMAT || 'b42,b85,b128,b171,b214,b257,b300,b343';
		if(LAYER_LINK){		LAYER_FORMAT = gid(LAYER_LINK)?.getAttribute('textFormat')}
		var LAYER_ID =		"l"+mrn();
		var LAYER_STATE = 	'on';
		var LAYER_ICON =	'C';
		var LAYER_EDIT = 	true;
		var ICON_STYLE = 	'color: #000000'
		var LAYER_STYLE =	'position:absolute; right:20px; left:20px; height:30px; overflow:visible';
		if(LAYER_LINK==LAYER_ID){gid(LAYER_LINK)?.setAttribute('layerLink', LAYER_ID)}				// if layer is derrived from CT, register ID of new child 
		switch(LAYER_TYPE){
			case 'CT':
				LAYER_STYLE	+=	'; top:0px; color:#000000; z-index:10 ';
			break;
			case 'PT':
				LAYER_ICON	=	'P';
				ICON_STYLE	=	'color: #DD0000';
				LAYER_STYLE	+=	'; top:18px; color:#DD0000; z-index:10 ';
			break;
			case 'DT':
				LAYER_ICON	=	'*';
				ICON_STYLE	=	'color: #700070';
				LAYER_STYLE	+=	'; top:18px; color:#700070; z-index:2 ';
			break;
			case 'ST':
				LAYER_EDIT	=	false;
				LAYER_ICON	=	'S';
				ICON_STYLE	=	'color: #0061A7';
				LAYER_STYLE	+=	'; top:18px; color:#101010; z-index:0 ';
				LAYER_FORMAT	=	"";
			break;
		} 
		IOS[LAYER_TYPE+'_Active']=LAYER_ID;
		gid(projectID).innerHTML+=`<div id='${LAYER_ID}' onclick="Display.getCoord()" oncopy = "Display.copy()" onpaste="Display.paste()" onkeypress="Display.intercept('${LAYER_ID}')" onkeyup='Display.setFormat(${LAYER_ID})' state='${LAYER_STATE}' layerLink='${LAYER_LINK}' class="page" type='${LAYER_TYPE}' textFormat='${LAYER_FORMAT}' textShadow='${DATA}' contentEditable='${LAYER_EDIT}' style='${LAYER_STYLE}'></div>`;
		gid(listings).innerHTML+=`<div class='layerSlide' id='${LAYER_ID}h' >	
			<div id='${LAYER_ID}i' class='layerSlideIcon' onClick="Layer.select('${LAYER_ID}')" style='${ICON_STYLE}'>${LAYER_ICON}</div>
			<div id='${LAYER_ID}t' class='layerSlideText' onClick="Layer.select('${LAYER_ID}')">${DATA.substring(0,10)}</div>
			<input type='button'   class='layerSlideDelete' style='right:5px' value='x' onclick="Layer.remove('${LAYER_ID}')"/>
		</div>`;
		this.select(LAYER_ID);
		Display.disableEnglish(LAYER_ID);
		Display.disableEnglish(LAYER_ID+'t');
		Display.update(LAYER_ID, DATA);
		if(LAYER_TYPE=='ST'){this.setActive(LAYER_LINK, "CT")} // look into this
		return LAYER_ID;
	},
	select: function(ID){
		let TYPE	=	gid(ID).getAttribute('type');
		let STATE	=	gid(ID).getAttribute('state');
		if(TYPE=='ST'){		return false}
		IOS.target	=	ID;
		IOS[TYPE+'_Active'] =	ID;
					this.setTypeOff('type', TYPE);				// Only allow one instance of layer type
					this.setTypeOn('state','active');			// downgrade active layer to 'On'
		if(TYPE=='PT'){		this.setTypeOff('type','DEFINE')}
		if(TYPE=='DT'){		this.setTypeOff('type','PT')}
		if(STATE=='off'){	this.setActive(ID, TYPE);		return}
		if(STATE=='on'){	this.setActive(ID, TYPE);		return}
		if(STATE=='active'){	this.setOff(ID, TYPE);			return}
	},
	setOff: function(ID, TYPE){
		IOS[TYPE+'_Active']=null;
		gid(ID).setAttribute('state','off');
		gid(ID).designMode='off';
		gid(ID+'i').style.left='20px';
		gid(ID+'i').style.zIndex=5;
		gid(ID).style.visibility="hidden";
		gid(ID+'i').style.backgroundColor="rgba(0,0,0, 0)";
	},
	setOn: function(ID, TYPE){
		IOS.target=ID;
		OBJ = gid(ID) ?? null;
		ICN = gid(ID+'i') ?? null;
		if(!ICN){return}
		IOS[TYPE+'_Active']=ID;
		OBJ.setAttribute('state','on');
		ICN.style.left='0px';
		OBJ.style.zIndex=8;
		if(TYPE=="ST"){OBJ.style.zIndex=2}
		OBJ.designMode="off";
		OBJ.style.visibility="visible";
		ICN.style.backgroundColor="rgba(210, 256, 210, .3)";
	},
	setActive: function(ID, TYPE){
		let OBJ = gid(ID) ?? null;
		let ICN = gid(ID+'i') ?? null;
		if(!ICN){return}
		this.setOn(ID, TYPE);
		IOS.target=ID;
		OBJ.setAttribute('state','active');	
		OBJ.style.zIndex=10;
		if(TYPE=="ST"){OBJ.style.zIndex=2}
		OBJ.designMode="on";
		ICN.style.backgroundColor="rgba(150, 150, 255, 0.5)";
		calc('scope');
	},
	setTypeOff:function(ATTRIBUTE,VALUE){ 
		let list = gea(ATTRIBUTE,VALUE);
		for(var i=0;i<list.length;i++){		
			this.setOff(list[i].id);
		} 
		return list;
	},
	setTypeOn: function(ATTRIBUTE,VALUE){
		let list = gea(ATTRIBUTE,VALUE); 
		for(var i=0;i<list.length;i++){		
			this.setOn(list[i].id);
		} 
		return list;
	},
	remove: function(ID){
		if(!gid(ID)){return}
		let SIBLING = gid(ID).parentNode.childNodes;
		let TYPE = gid(ID).getAttribute('type') ?? null;
		rid(ID);	
		rid(ID+'h');
		IOS[TYPE+'_Active']=null;
		let list = gea('type', TYPE);
		if(list.length >=1){
			let cc = list[list.length-1].id;
			this.select(cc);
			this.setActive(cc, TYPE);
		}else{
			Layer.setActive(SIBLING[0],"CT");

		}
	},

	setType: function(TARGET, TYPE){
		let a=gid(TARGET);
		let b=gid(TARGET+'i');
		a.setAttribute('type', TYPE);
		a.setAttribute('layerLink', false);
		a.setAttribute('state', 'on');
		if(TYPE=='PT'){
			a.style.top='18px'; 
			a.style.color='rgb(221,0,0)';
			b.style.color='rgb(221,0,0)';
			b.textContent='P';
			Layer.select(TARGET,'PT','active');
		}
		if(TYPE=='CT'){
			a.style.top='0px'; 
			a.style.color='rgb(0,0,0)';
			b.style.color='rgb(0,0,0)';
			b.textContent='C';
			Layer.select(TARGET,'CT','active');
		}
	},
	clone:	function(TARGET){
		let aa= gid(TARGET).getAttribute('textShadow');
		let bb= gid(TARGET).getAttribute('type');
		let cc= gid(TARGET).innerHTML;
		IOS.target=Layer.make(aa,bb,'new');	
		gid(IOS.target).innerHTML = cc;
	},

	ridLink: function(x){
		if(gid(IOS.target).nodeName!='INPUT'){
			gid(IOS.target).setAttribute('layerLink',null);
		}
	},
	setLink: function(x){
		let a=gid(IOS.cipherTextActive);
		let b=gid(IOS.plainTextActive);
		if(a && b){
			a.setAttribute('layerLink', IOS.plainTextActive);
			b.setAttribute('layerLink', IOS.cipherTextActive);
		}
	},
}




// Arcadia, Hailey,