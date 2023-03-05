let Mod={
	reverse: function(TEXT){						//X: String to flip
		return TEXT.split("").reverse().join("");
	},

	inverse: function(){
		let PT_TMP = IOS.PT_Active;
		if(gid(IOS.CT_Active)){
			Layer.setType(IOS.CT_Active,'PT');
		}
		if(gid(IOS.PT_Active)){
			Layer.setType(PT_TMP,'CT');
		}
	},

	flipH: function(TEXT){
		let ROWS	=	TEXT.split(/\r\n|\r|\n/);
		let FLIP	=	[];
		for(var i=0; i<ROWS.length; i++){
			FLIP[i]=Mod.reverse(ROWS[i]);	
		}
		return FLIP.join('\n');
	},

	flipV: function(TEXT){
		return TEXT.split(/\r\n|\r|\n/).reverse().join('\n');
	},

	interleave: function(){
		let PT=gid(IOS.PT_Active).textContent.split(/\r\n|\r|\n/);
		let CT=gid(IOS.CT_Active).textContent.split(/\r\n|\r|\n/);
		let ROWS=muxText(PT,CT);
		gid(PT_Target).setAttribute('shadow', ROWS[0]);		// updates display
		gid(PT_Target).textContent=ROWS[0];
		gid(CT_Target).setAttribute('shadow', ROWS[1]);
		gid(CT_Target).textContent=ROWS[1];
		function muxText(PT,CT){
			let b	=	'';
			let c	=	'';
			for(var i=0; i<PT.length; i++){
				if(i%2){
					b	+=	CT[i]+'\n';
					c	+=	PT[i]+'\n';
				}else{
					b	+=	PT[i]+'\n';
					c	+=	CT[i]+'\n';
				}
			}
			return [b,c];
		}

	},

	shift: function(TEXT, DIRECTION){
		if(DIRECTION=='L'){
			return TEXT.slice(1,(TEXT.length))+TEXT.charAt(0);
		}else{
			return TEXT.charAt((TEXT.length)-1)+TEXT.slice(0,(TEXT.length)-1);
		}
	},

	rotate: function(TEXT,ALPHABET,AMOUNT){
		let OUTPUT="";
		for(var i=0; i<TEXT.length; i++){
			OUTPUT	+=	rotChar(TEXT.charAt(i),ALPHABET,AMOUNT);
		}
		return OUTPUT;
	},

	rotChar: function(CHARACTURE,ALPHABET,AMOUNT){
		let INDEX	=	ALPHABET.indexOf(CHARACTURE);
		let SIZE	=	ALPHABET.length;
		let NEWINDEX	=	(INDEX+AMOUNT)%SIZE;
		if(NEWINDEX<0){
			return ALPHABET.charAt(SIZE+NEWINDEX);
		}
		return ALPHABET.charAt(NEWINDEX);
	},

	swap: function(TEXT,THESE,THOSE){
		for(var i=0; i< THESE.length; i++){
			let b	= 	new RegExp(THESE[i], 'g');
			let c	=	new RegExp(THOSE[i], 'g');
			TEXT	=	TEXT.replace(b,THOSE[i].toLowerCase());
			TEXT	=	TEXT.replace(c,THESE[i].toLowerCase());
		}
		return TEXT.toUpperCase();
	},

}

function rotBy(x,y,z){						// x: Text y:kryptobet  z:Number sequence
	var a ="";
	for(var i=0; i<x.length; i++){
		a	+=	rotChar(x.charAt(i),y,z[i]);
	}
	return a;
}


function rotPrime(x,y,z){					// X=Text; Y=Alphabet; Z=Number sequence
	var temp1="";
	var z = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173 ,179,181,191,193,197,199,211,223,227,229 ,233,239,241,251,257,263,269,271,277,281 ,283,293,307,311,313,317,331,337,347,349 ,353,359,367,373,379,383,389,397,401,409 ,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541];
	for(var i=0; i<x.length; i++){
		temp1+=rotChar(x.charAt(i),y,z[i]);
	}
	return temp1;
}
function getPhi(x,y,z){						// X=Text; Y=Alphabet; Z=Number sequence
	var p=[1,1];
	for (var i=2; i<100; i++){
		p[i]=((p[i-1])+(p[i-2]))%26;
	}
	return p;
}
function rotGold(x,y,z){					// X=Text; Y=Alphabet; Z=Number sequence
	var temp1="";
	var z = "1618033988749894848204586834365638117720309179805762862135448622705260462818902449707207204189391137";
	for(var i=0; i<x.length; i++){
		temp1+=rotChar(x.charAt(i),y,z.charAt(i));
	}
	return temp1;
}
function rotPi(x,y,z){						// X=Text; Y=Alphabet; Z=Number sequence
	var temp1="";
	var z = "3141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067";
	for(var i=0; i<x.length; i++){
		temp1+=rotChar(x.charAt(i),y,z.charAt(i));
	}
	return temp1;
}
