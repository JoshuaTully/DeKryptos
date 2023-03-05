
const Vige={
	run: function(IOS){
		let TEXT = null;
		let CT_LINK = null;
		if(!IOS.CT_Active){return false}
		if(IOS.DT_Active==IOS.target){
			TEXT = this.calc(IOS.cipherText,IOS.alphabet,IOS.defineText,'true');
		}else{
			TEXT = this.calc(IOS.cipherText,IOS.alphabet,IOS.vigeWord);
		}
		if(IOS.PT_Active){CT_LINK = gid(IOS.PT_Active).getAttribute('layerlink')}
		if(CT_LINK==IOS.CT_Active){
			Display.update(IOS.PT_Active, TEXT);
		}else{
			focused=Layer.make(TEXT,'PT', IOS.CT_Active);
		}
		return TEXT;
	},
	calc: function(CT, ALPHABET, KEYWORD, DEFINEMODE){
		let PT='';
		let KEYARRAY=Vige.makeKeys(ALPHABET,KEYWORD);
		var POINTER=0;
		for(var o=0; o< CT.length; o++){
			switch(CT.charAt(o)){
				case '\n':
					PT+='\n';
				break;
				case ' ':
					PT+=' ';
				break;
				case '?':
					PT+='?';	// add to PT but do not increment the poiter
				break;
				case '*':
					PT+='*';
					POINTER++;
				break;
				default:
					PT += ALPHABET.charAt(KEYARRAY[POINTER % KEYWORD.length].indexOf(CT.charAt(o)));
					POINTER++;
				break;
			}
		}
	return PT;
	},
	makeRotor: function(KEYWORD, KEYLENGTH){
		let KEYFILLER=null;			// use keyword or keylendth; whichever is bigger
		let ROTORPOS=null;
		if(KEYLENGTH >11){KEYLENGTH=11; KEYFILLER=KEYWORD.substr(0,11)}
		if(KEYWORD.length >1){KEYFILLER=KEYWORD.substr(0,KEYLENGTH)}else{KEYFILLER="K"}
		for(var i=0; i< KEYLENGTH; i++){if(i > KEYWORD.length-1){KEYFILLER+="K"}}
		let OUTPUT="<div style='position: absolute; top:0px; left:0px; text-align:center;'>";
		for(var i=0; i<KEYFILLER.length; i++){
			ROTORPOS = i*26;
			OUTPUT+=`<input type='image' src='images/add.svg' onclick="calc('VigeDial','U', 'r${i}')"	style='position:absolute; left:${ROTORPOS+2}px; top:0px; width:20px; height:20px' />`;
			OUTPUT+=`<input type='text'   value ='${KEYFILLER.charAt(i)}' id='r${i}' data-is-rotor='true' 	style='position:absolute; left:${ROTORPOS}px; top:23px; width:20px; height:20px' />`;
			OUTPUT+=`<input type='image' src='images/subtract.svg'  onclick="calc('VigeDial','D', 'r${i}')"	style='position:absolute; left:${ROTORPOS+2}px; top:46px; width:20px; height:20px' />`;
		}
		OUTPUT+="</div>";
		gid('rLength').value=KEYFILLER.length;
		gid("rWord").value=KEYFILLER;
		gid('rTable').innerHTML=OUTPUT; 
		let TMPA = 0.5* parseInt(gid('rTable').parentNode.style.width);
		let TMPB = 0.5* KEYFILLER.length *26; 
		gid('rTable').style.left=(TMPA-TMPB)+'px';


	},
	setRotor: function(IOS){
		var a = IOS.alphabet.indexOf(gid(IOS.target).value);  				// get starting letter index
		var b = IOS.alphabet;
		if(IOS.argument=="U"){
			a++;
			if(a > b.length-1){a=0}
		}else{
			a--;
			if(a < 0){a=b.length-1}
		}
		gid(IOS.target).value=b.charAt(a);
		gid('rWord').value=this.getVal();
		IOS.vigeWord = gid('rWord').value;
		this.run(IOS);
	},
	setKeyLength: function(KEYLENGTH, ADJUST){
		let a=parseInt(gid(KEYLENGTH).value);
		if(ADJUST=='down'){a--; if(a < 0){a=0}}
		if(ADJUST=='up'){a++; if(a > 11){a=11}}
		gid(KEYLENGTH).value=a;
		Vige.makeRotor(gid('rWord').value, gid(KEYLENGTH).value);
	},
	getVal: function(){
		var a="";
		let b = gea('data-is-rotor','true');
		for(var i=0;i<b.length;i++){		
			a+=b[i].value;
		} 
		return a;
	},
	makeKeys: function(ALPHABET, KEYWORD){
		let KEYS=[];
		for(var i=0; i < KEYWORD.length; i++){
			let KEYCHUNK=ALPHABET.split(KEYWORD.charAt(i));		
			KEYS[i]=KEYWORD.charAt(i) + KEYCHUNK[1] + KEYCHUNK[0];		
		}
		return KEYS;
	},
}

// 38, 57, 6.5 77, 8, 44