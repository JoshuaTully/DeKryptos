

const Display={
	update: function(ID, DATA, FORMAT){
		if(IOS.stegTextActive){
			if(gid(IOS.stegTextActive).getAttribute('state')=='active'){
				Mark.list(IOS.stegTargetActive, 'stegSegment', IOS.cipherText, IOS.plainText);
				return;
			}
		}
		if(gid(ID).nodeName == 'INPUT'){gid(ID).value = DATA}
		if(gid(ID).nodeName == 'DIV' && DATA != undefined){
			if(findAll(DATA,/\r?\n|\r/g).length){
				gid(ID).textContent=DATA;
			}else{
				if(!DATA){DATA=""}
				gid(ID).innerHTML = Display.getFormat(DATA, gid(ID).getAttribute('textFormat'));
			}
			gid(ID+'t').textContent = DATA.substring(0,15);
		}
	},

	apply: function(ID,DATA){
		gid(ID).setAttribute('textShadow', DATA);
	},
	getFormat: function(TEXT, FORMAT){
		let ELEMENT=FORMAT.split(',');
		for(i=0; i < ELEMENT.length; i++){
			let ALPHA	=	ELEMENT[i].replace(/[0-9]/g, '');		// alphabet only
			let COORDS 	=	ELEMENT[i].replace(/[A-Za-z]/g, '');		// numeric only
			if(ALPHA=='b' && TEXT !=undefined){TEXT=isl(TEXT, COORDS, '\n')}
		}
		return TEXT;
	},
	setFormat: function(ID){
		let TEXT=gid(ID).textContent;
		let RETURNS=findAll(TEXT,/\r?\n|\r/g);
		TEXT=TEXT.replace(/\r?\n|\r/g, '');			// prevents the space locator from seeing line feeds
		let SPACES= findAll(TEXT,/\s/g);
		gid(ID).setAttribute('textFormat', genFormat(RETURNS, SPACES));
		function genFormat(RETURNS, SPACES){
			let FORMAT=[];
			if(SPACES){
				for(var i=0; i<SPACES.length; i++){
					FORMAT.push('s' + SPACES[i]);
				}
			}
			if(RETURNS){
				for(var i=0; i<RETURNS.length; i++){
					FORMAT.push('b' + RETURNS[i]);
				}
			}
			return FORMAT.join(',');
		}
	},
	textOffset: function(ID, INDEX){
		return fri(gid(ID).getAttribute('textFormat'),INDEX);	
	},

	bootStrap: function(){________________________________________________________________
		if(!PT_Target && !CT_Target){Layer.make('','CT','new')}
	console.log('bootStrap');
	},
	intercept: function(LAYER){						// work on this copy and paste unformatted text only
		if(event.which==13){
			event.preventDefault();
			let TEXT= isl(gid(LAYER).textContent, gid('textRangeEnd').value,'\n');
			Display.update(LAYER,TEXT);
			return;
		}
	},
	paste:	function(){
		event.stopPropagation();
		event.preventDefault();
		let TEXT = (event.clipboardData || window.clipboardData).getData('text');
		console.log(TEXT);
		return false;
	},
	copy: function(x){
		let TMP = gid(x);
		TMP.select();
		TMP.setSelectionRange(0, 99999);
		navigator.clipboard.writeText(TMP.value);
	},
	getCoord: function(){								// attach to layer and not global
		let a=document.getSelection().getRangeAt(0).startOffset;
		let b=document.getSelection().getRangeAt(0).endOffset;
		let c=fri(gid(IOS.target).getAttribute('textFormat'), b);
		IOS.textRange=a;
		IOS.textIndex=b;
		if(a==b){
			gid('textIndex').value=a-c; 
			gid('textRange').value=0; 
			Mark.caret();
			return;
		}
		if(a>b){
			gid('textIndex').value=b-c;
			gid('textRange').value=a-b;
			Mark.caret();
		}else{
			gid('textIndex').value=a-c;
			gid('textRange').value=b-a;
			Mark.caret();
		}
	},
	disableEnglish:	function(x){
		gid(x).spellcheck = false;
		gid(x).style.wordWrap="break-word";
		gid(x).focus();
		gid(x).blur();
	},	
	displayable: function(TARGET){
		if(gid(TARGET).tagName=='DIV'){
			return true;
		}else{
			return false;
		}
	},
	zoom: function(obj,val){
		gid(obj).style.transform = 'scale('+val+')';
	},
}



