const Steg={
	load:function(x){
		gid('stegSegment').value = gid(x).getAttribute('shadowVal');
		gid('stegSegment').setAttribute('callbackID',x);
		IOS.stegSegment = gid('stegSegment').value;
		IOS.stegSegmentIndex = gid('stegSegmentIndex').value=0;
		return;
	},
	findRight:function(){
		gid('textIndex').value=IOS.textIndex=IOS.cipherText.indexOf(IOS.stegSegment.charAt(IOS.stegSegmentIndex),IOS.textIndex+1);
		this.apply(IOS.PT_Active, IOS.textIndex,'findRight','rgba(240, 255, 0, .7)');
	},
	findLeft:function(){
		let TEMP=IOS.cipherText.substring(0,IOS.textIndex);
		IOS.textIndex=TEMP.lastIndexOf(IOS.stegSegment.charAt(IOS.stegSegmentIndex),IOS.textIndex-1);
		this.apply(IOS.PT_Active, IOS.textIndex,'findLeft','rgba(240, 255, 0, .7)');

	},
	countRight(){
		gid('textIndex').value=IOS.textIndex=IOS.textIndex+IOS.alphabet.indexOf(IOS.stegSegment.charAt(IOS.stegSegmentIndex));
		this.apply(IOS.CT_Active, IOS.textIndex,'countRight', 'rgba(255, 165, 0,0.7)');
	},
	countLeft(){
		gid('textIndex').value=IOS.textIndex=IOS.textIndex-IOS.alphabet.indexOf(IOS.stegSegment.charAt(IOS.stegSegmentIndex))-1;
		this.apply(IOS.CT_Active, IOS.textIndex,'countLeft', 'rgba(255, 165, 0,0.7)');
	},
	commit:function(){
		let TAR = gid('stegSegment').getAttribute('callbackID');
		gid(TAR).textContent=gid('stegSegment').value;
		gid('stegSegment').value='';
		gid('stegSegment').setAttribute('callbackID', '');
	},
	cls:function(){
		IOS.stegSegment ='';
		IOS.stegSegmentIndex=0;
		gid(IOS.ST_Active).innerHTML="";
		gid(IOS.ST_Active).setAttribute('shadowVal','');
		this.cleanup();
	},
	undo:function(){		
		Mark.break(IOS.ST_Active);
		try{
			IOS.textIndex=gid(IOS.ST_Active).lastElementChild.getAttribute('markIndex');	
		}catch(e){
			IOS.stegSegmentIndex	=	0;
			IOS.stegSegment		=	gid(gid('stegSegment').getAttribute('callbackID')).getAttribute('shadowVal');
			this.cleanup();
			return;
		}
		IOS.stegSegmentIndex = gid(IOS.ST_Active).childNodes.length;
		let TEMP=gid(gid('stegSegment').getAttribute('callbackID')).getAttribute('shadowVal').charAt(IOS.stegSegmentIndex);
		gid('stegSegment').value=rsa(IOS.stegSegment,IOS.stegSegmentIndex, TEMP);
		this.cleanup();
	},
	apply:function(LAYER_ID, INDEX, TYPE, MARKCOLOR){
		if(!IOS.ST_Active){IOS.ST_Active=Layer.make('','ST',IOS.CT_Active,'S')}
		let CHAR = gid(LAYER_ID).textContent.charAt(INDEX);
		if(IOS.stegSegmentIndex >= IOS.stegSegment.length){
			IOS.textIndex=0;
			IOS.textRange=0;
			IOS.stegSegmentIndex=0;
			this.cleanup();
			return;
		}	
		Mark.make(LAYER_ID, INDEX, CHAR, TYPE, MARKCOLOR);
		IOS.stegSegment=rsa(IOS.stegSegment,IOS.stegSegmentIndex, CHAR);
		IOS.stegSegmentIndex++; 
		this.cleanup();
	},
	cleanup: function(){
		gid('stegSegment').value = IOS.stegSegment;
		gid('stegSegmentIndex').value = IOS.stegSegmentIndex;
		gid('textIndex').value = IOS.textIndex;
		gid('textRange').value = IOS.textRange;
	},
	reverse:function(){
		IOS.stegSegment=gid('stegSegment').value=gid('stegSegment').value.split("").reverse().join("");
	},

	pathfinder:function(){},
}


function makeMatrix(x,y){		// x: CT	y:Matrix
	let b=sta(y,',');		// array of index points
	let c=0;			// index pointer
	let ax=`<div style='position:absolute; top:5px; left:12px; bottom:0px; right:0px; font-size:18px; font-weight: bold; overflow:hidden; text-align:center'>`;			// Formatted Text
	let bx='';			// Text
	let cx='';			// width
	let dx='';
	let ex='';
	let sTop=1;
	let sLeft=0;
	for(var i=0;i<b.length-1; i++){
		bx=x.substr(c,parseInt(b[i]));
		cx=(parseInt(b[i])*16)-4;		// get number (width of row parcle)
		dx=fsu(b[i]);				// get uppercase letter (color)
		ex=fsl(b[i]);				// get lowercase letter (function/Opacity)
		ax+=`<div id='ST${i}B' class='stegField' shadowVal='${bx}' spellcheck=false data-gramm=false style='top:${sTop}px ; border:2px; left:${sLeft}px; width:`;
		if(ex=='h'){
			ax+=`275px; padding:0px 4px; box-shadow: inset 0px 0px 4px rgba(`;
			sTop+=22; 
			sLeft=0;
		}else{							// K1:Blue	K2:Green	K3:Yellow	K4:Unknown	Unknown:Grey
			ax+= cx+`px; padding:0px 4px; box-shadow: inset 0px 0px 4px rgba(`;
			sLeft+=cx+10;
		}
		if(dx=='A'){ax+=`200, 0, 0, `}	
		if(dx=='B'){ax+=`255, 105, 0, `}	
		if(dx=='C'){ax+=`73, 182, 117, `}
		if(dx=='D'){ax+=`14, 75, 239, `}
		if(dx=='E'){ax+=`201, 71, 245, `}
		if(dx=='X'){ax+=`200, 200, 200, `}
		if(ex=='r'){ax+=`1`; sTop +=21; sLeft=0}	// reverse
		if(ex=='a'){ax+=`1`}				// Jump	
		if(ex=='b'){ax+=`1`}				// delete x's
		if(ex=='c'){ax+=`1`}				// delete q's
		if(ex=='d'){ax+=`1`}				// normal
		if(ex=='h'){ax+=`0.5`}				// headder
		ax+=`)' onclick="Steg.load('ST${i}B')">${bx}</div>`;
		c+=parseInt(b[i]);
	}
	ax+=`</div>`;
	return ax;
}

