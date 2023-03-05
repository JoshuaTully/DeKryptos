const	IOS={				// ------ create an object of all values to store in history for later recall/undo--------
		argument:		'',
		alphabet:		'',
		alphaPattern:		'',
		function:		'',
		indexCurrent:		'',			// these might be nothing
		indexApparent:		'',			// compinsate non UTF-8 chairs
        	plainText:		'',
        	PT_Active:		'',
        	cipherText:		'',
        	CT_Active:		'',
        	stegText:		'',
        	ST_Active:		'',
        	defineText:		'',
        	DT_Active:		'',
		stegSegment:		'',
		stegSegmentIndex:	'',
		vigeWord:		'',
		vigeCount:		'',
		textRotate:		'',
		textRows:		'',
		textIndex:		'',
		textRange:		'',
		target:			'',
		targetValue:		'',
		transNumber:		'',
		transWord:		'',
	};

const Load = {
	K: function(){
		let TEXT='eeVIRTUALLYeeeeeeeINVISIBLEDIGETALeeeINTERPRETATIeeSHADOWeeFORCESeeeeeLUCIDeeeMEMORYeTISYOURPOSITIONSOSRQ';
		let FORMAT ='b21,b43,b65,b87,b109';
		Layer.make(TEXT,'CT','new',FORMAT);
	},
	K1: function(AUTO){
		let TEXT="EMUFPHZLRFAXYUSDJKZLDKRNSHGNFIVJYQTQUXQBQVYUVLLTREVJYQTMKYRDMFD";
		let WORD='PALIMPSEST';
		let FORMAT='b21,b43,b65,b87,b109';
		Layer.make(TEXT,'CT','new',FORMAT);
		Menu.sideScroll('vigeMenu');
		if(AUTO){
			gid("rWord").value=WORD;
			gid("rLength").value=WORD.length;
			Vige.makeRotor(WORD);
			calc('Vigenere');
		}
	},
	K2: function(AUTO){
		let TEXT='VFPJUDEEHZWETZYVGWHKKQETGFQJNCEGGWHKK?DQMCPFQZDQMMIAGPFXHQRLGTIMVMZJANQLVKQEDAGDVFRPJUNGEUNAQZGZLECGYUXUEENJTBJLBQCRTBJDFHRRYIZETKZEMVDUFKSJHKFWHKUWQLSZFTIHHDDDUVH?DWKBFUFPWNTDFIYCUQZEREEVLDKFEZMOQQJLTTUGSYQPFEUNLAVIDXFLGGTEZ?FKZBSFDQVGOGIPUFXHHDRKFFHQNTGPUAECNUVPDJMQCLQUMUNEDFQELZZVRRGKFFVOEEXBDMVPNFQXEZLGREDNQFMPNZGLFLPMRJQYALMGNUVPDXVKPDQUMEBEDMHDAFMJGZNUPLGESWJLLAETG';
		let WORD='ABSCISSA';
		let FORMAT ='b42,b85,b128,b171,b214,b257,b300,b343';
		Layer.make(TEXT,'CT','new', FORMAT);
		Menu.sideScroll('vigeMenu');	
		if(AUTO){
			gid("rWord").value=WORD;
			gid("rLength").value=WORD.length;
			Vige.makeRotor(WORD);
			calc('Vigenere');
		}
	},
	K3: function(AUTO){
		let TEXT="ENDYAHROHNLSRHEOCPTEOIBIDYSHNAIACHTNREYULDSLLSLLNOHSNOSMRWXMNETPRNGATIHNRARPESLNNELEBLPIIACAEWMTWNDITEENRAHCTENEUDRETNHAEOETFOLSEDTIWENHAEIOYTEYQHEENCTAYCREIFTBRSPAMHHEWENATAMATEGYEERLBTEEFOASFIOTUETUAEOTOARMAEERTNRTIBSEDDNIAAHTTMSTEWPIEROAGRIEWFEBAECTDDHILCEIHSITEGOEAOSDDRYDLORITRKLMLEHAGTDHARDPNEOHMGFMFEUHEECDMRIPFEIMEHNLSSTTRTVDOHW";
		let WORD="SLOWLY";
		let FORMAT = 'b42,b85,b128,b171,b214,b257,b300,b343';
		Layer.make(TEXT,'CT','new',FORMAT);
		Menu.sideScroll('transMenu');
		if(AUTO){
			gid('transWord').value = WORD;
			calc('Transposition', 'exploit');
		}
	},
	K4: function(MAKE){
		let TEXT="OBKRUOXOGHULBSOLIFBBWFLRVQQPRNGKSSOTWTQSJQSSEKZZWATJKLUDIAWINFBNYPVTTMZFPKWGDKZXTJCDIGKUHUAUEKCAR";
		let MATRIX="14Xh,4Xc,4Xc,1Ac,3Ac,4Ar,3Dd,1Dd,4Xc,4Xb,4Xr,3Cd,1Cd,4Cc,4Xb,4Xr,3Bd,1Bd,4Bc,4Cb,4Cr,1Cb,3Cb,4Cb,4Cb,4Cr,3Xh,";
		gid('maps').innerHTML=makeMatrix(TEXT,MATRIX);
		if(MAKE){
			Layer.make(TEXT,'CT','new');
		}
	},
	define: function(AUTO){
		let FILL='';
		if(AUTO){
			let tmp=IOS.cipherText.length; 
			for(var i=0; i < tmp; i++ ){FILL +="*"}
		}
		Layer.make(FILL,'DT','new');
	},
	alphabet: function (INPUT_ID,KEY_ID){
		var a=gid(INPUT_ID).value.toUpperCase();
		var b=gid(KEY_ID).value.toUpperCase();
		var c='';
		var d='';
		var e=b.length-1;
		for(let i=e; i>=0; i--){
			d=b.charAt(i);
			c=rca(a,a.indexOf(d));
			a=b[i] + c;
		}
	return a;
	},
}

function delayLoader(){
	linker('mods/vige.js');
	linker('mods/steg.js');
	linker('mods/trans.js');
	linker('mods/mod.js');
	function linker(location){
		var newElement=document.createElement("script");
		newElement.src=location;
		document.getElementsByTagName("head")[0].appendChild(newElement);
	}
	customElements.define('x-project', xProject);
	customElements.define('x-layer',   xLayer);
}

function setUI(METHOD,VARS){
	if(METHOD=='type'){Menu.show(VARS)}
	if(METHOD=='focus'){IOS.target=VARS}
}



function calc(FUNC,ARGS,TARGET,SUBFUNC){	 								// X: Function Y: Variable Z: object to target  P: Sub Function
	let VALUE=null;
	if(IOS.target==IOS.ST_Active){IOS.target = IOS.CT_Active}
	IOS.argument		=	ARGS ? ARGS : '';
	IOS.function		=	SUBFUNC ? SUBFUNC : '';
	IOS.target		=	TARGET ? TARGET: IOS.target;
	IOS.targetValue 	=	'';
	IOS.textRotate		=	parseInt(gid('rotBy').value.toUpperCase());
	IOS.textRows		=	rnn(gid('textRows').value);
	IOS.textRange		=	rnn(gid('textRange').value);
	IOS.textIndex		=	rnn(gid('textIndex').value);
	IOS.textOffset		=	Display.textOffset(IOS.target, IOS.textIndex);
	IOS.alphabet		=	sft(gid('alphaCurrent').value);
	IOS.alphaPattern	=	sta(gid('abDist').value, ',', true);
        IOS.plainText		=	'';
        IOS.cipherText		=	'';
        IOS.stegText		=	'';
        IOS.defineText		=	'';
	IOS.stegSegment		=	sft(gid('stegSegment').value);
	IOS.stegSegmentIndex	=	0;
	IOS.vigeWord		=	sft(gid('rWord').value);
	IOS.vigeCount		=	gid('rLength').value;
	IOS.transNumber		=	gid('transNumber').value;
	IOS.transWord		=	gid('transWord').value.toUpperCase();

	if(!IOS.CT_Active){		IOS.target	=	Layer.make('','CT','new')}
	if(IOS.PT_Active){		IOS.plainText	=	gid(IOS.PT_Active).textContent}
	if(IOS.CT_Active){		IOS.cipherText	=	gid(IOS.CT_Active).textContent}
	if(IOS.ST_Active){		IOS.stegText	=	gid(IOS.ST_Active)}
	if(IOS.DT_Active){		IOS.defineText	=	gid(IOS.DT_Active).textContent}
	if(gid(IOS.target)?.tagName=='INPUT'){IOS.targetValue=gid(IOS.target).value}
	if(gid(IOS.target)?.tagName=='DIV'){IOS.targetValue=gid(IOS.target).textContent.replace(/\r?\n|\r/g,'')}
	let TRANSFORMDIMENSIONAL=Display.displayable(IOS.target);		// prevent some methods from operating in one dimentional input tag
	if(FUNC=='getHistory'){	return historyRestore(y)}
	if(FUNC=='getLayer'){	Layer.select( IOS.target); return}
	if(FUNC=='setType'){	Layer.setType(IOS.target, IOS.argument); return}
	if(FUNC=='setLink'){	Layer.setLink(IOS.target, IOS.argument); return}
	if(FUNC=='ridLink'){	Layer.ridLink(IOS.target); return}
	if(FUNC=='clone'){	Layer.clone(IOS.target); return}
	if(FUNC=='Vigenere'){	VALUE	=	Vige.run(IOS)}
	if(FUNC=='VigeDial'){	Display.update(PT_Target, Vige.setRotor(IOS)); return}
	if(FUNC=='Transposition'&&	TRANSFORMDIMENSIONAL){VALUE	=	Trans.run(IOS)}
	if(FUNC=='Steganography'&&	TRANSFORMDIMENSIONAL){VALUE	=	Steg.run(IOS)}
	if(FUNC=='inverse'	&&	TRANSFORMDIMENSIONAL){VALUE	=	Mod.inverse(IOS.target, IOS.argument)}
	if(FUNC=='flipTextV'	&&	TRANSFORMDIMENSIONAL){VALUE	=	Mod.flipV(gid(IOS.target).textContent)}
	if(FUNC=='flipTextH'	&&	TRANSFORMDIMENSIONAL){VALUE	=	Mod.flipH(gid(IOS.target).textContent)}
	if(FUNC=='interleave'	&&	TRANSFORMDIMENSIONAL){VALUE	=	Mod.interleave(IOS)}
	if(FUNC=='shift'){	VALUE	=	Mod.shift(IOS.targetValue, IOS.argument)}
	if(FUNC=='reverse'){	VALUE	=	Mod.reverse(IOS.targetValue)}
	if(FUNC=='rotate'){	VALUE	=	Mod.rotate(IOS.targetValue)}
	if(FUNC=='swapChar'){	VALUE	=	Mod.swap (IOS.targetValue)}
	if(FUNC=='euler'){	VALUE	=	rotBy    (IOS.targetValue)}
	if(FUNC=='prime'){	VALUE	=	rotPrime (IOS.targetValue)}
	if(FUNC=='phi'){	VALUE	=	rotPhi   (IOS.targetValue)}
	if(FUNC=='pi'){		VALUE	=	rotPi    (IOS.targetValue)}


	if(VALUE){Display.update(IOS.target, VALUE)};
	if(FUNC=='Vigenere' || FUNC=='Transposition' || FUNC=='Steganography'){Layer.select(IOS.CT_Active)}	// Prevents un-selection*************	
	if(IOS.targetValue==""){return}
	Scope.frequency(IOS.targetValue, IOS.alphabet, IOS.alphaPattern, 'scopeFrequency');
	Scope.period(IOS.cipherText, '','','scopeKasiski');
}


function changeTheme(x,y){				// x: new .css file name	y: index (option temporarly removed)
	if(!y){y=0} 					
	let a=document.getElementsByTagName("link").item(y);
	let b=document.createElement("link");
	b.setAttribute("rel", "stylesheet");
	b.setAttribute("type", "text/css");
	b.setAttribute("href", x);
	document.getElementsByTagName("head").item(0).replaceChild(b, a);
}

