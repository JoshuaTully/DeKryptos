let Scope ={

	frequency: function(TEXT, ALPHABET, SAMPLE, TARGET){
		let FREQUENCY	=	{A:8.2, B:1.5, C:2.8, D:4.3, E:10, F:2.2, G:2, H:6.1, I:7, J:0.15, K:0.77, L:4, M:2.4, N:6.7, O:7.5, P:1.9, Q:0.095, R:6, S:6.3, T:9.1, U:2.8, V:0.98, W:2.4, X:0.15, Y:2, Z:0.074};
		POINTER 	=	null;
		DATA 		=	[];
		gid(TARGET).textContent='';					// Clears the graph
		for(var i=0; i<ALPHABET.length; i++){
			DATA[i]=0; 
			SAMPLE[i]=FREQUENCY[ALPHABET.charAt(i)];		// Adjusts frequency count locations for modified alphabets
		}
		for(var i=0; i<TEXT.length; i++){
			POINTER=ALPHABET.indexOf(TEXT.charAt(i));		// adds instance to alphabet characture count
			DATA[POINTER]++;
		}
		Scope.display(DATA, ALPHABET, SAMPLE, TARGET, TEXT);
	},

	period: function(TEXT, ALPHABET, SAMPLE, TARGET){
		if(!TEXT){return false}
		let DATA=[];
		let TMP=null;
		TEXT+=grt(TEXT);
		for(var i=0; i < TEXT.length; i++){
			TMP=TEXT.slice(i+1);
			for(var o=0; o<TMP.length; o++){
				if(!DATA[o]){DATA[o]=0}
				if(TEXT.charAt(o)==TMP.charAt(o)){DATA[i]+=1}
			}
		}
		Scope.display(DATA,'','',TARGET);	 
	},

	display: function(DATA, ALPHABET, SAMPLE, TARGET, TEXT){		// change rect to d=""; 
		if(!TARGET){return false}
		let LENGTH	=	DATA.length; 
		let WIDTH	=	parseInt(gid(TARGET).parentNode.style.width);
		if(LENGTH > WIDTH){	LENGTH=WIDTH}
		let INTERVAL	=	WIDTH/LENGTH;
		let ID		= 	mid('A');
		if(SAMPLE){
			let FACTOR	=	TEXT.length/100;
			for(var i=0; i< LENGTH; i++){
				let SAM = Math.ceil(SAMPLE[i]*FACTOR);
				let DEV = Math.ceil(DATA[i]);
				gid(TARGET).innerHTML+=`<rect stroke-width='${INTERVAL}' id='${ID+i}b'  x='${(i*INTERVAL)}' y='${55-SAM}' width='${INTERVAL}' height='${SAM}' fill="url('#fire')" />`;
				gid(TARGET).innerHTML+=`<rect stroke-width='${INTERVAL}' id='${ID+i}'   x='${(i*INTERVAL)}' y='${55-DEV}' width='${INTERVAL}' height='${DEV}' fill="url('#ice')" onclick="Scope.detail('${ALPHABET.charAt(i)}',${DATA[i]})" />`;
				gid(TARGET).innerHTML+=`<text xml:space="preserve" text-anchor="start" font-family="sans-serif" font-size='12' id='${ID+i+'t'}' y='70' x='${i*INTERVAL}' opacity="undefined" stroke-width='1' stroke='#000' fill='#000000'>${ALPHABET.charAt(i)}</text>`;
			}
		}else{
			let TOP = Math.max(...DATA);
			let SHADE = 255/TOP;
			let CHILD = gid(TARGET).childNodes;
			let LIST = [];
			if(LENGTH > 100){LENGTH =100; INTERVAL = WIDTH/100}

			if(CHILD.length == LENGTH){
				for(var i=0; i< CHILD.length; i++){
					CHILD[i].setAttribute("stroke", "rgba("+ Math.floor(SHADE*DATA[i]) +","+ Math.floor(SHADE*DATA[i])+ ",255, 1)");
				}
			}else{
				for (var i=0; i< LENGTH; i++){
					LIST[i]=document.createElementNS("http://www.w3.org/2000/svg", "path");
					LIST[i].setAttribute("d", "M" + i*INTERVAL + " 0 L" + i*INTERVAL + " 25");
					LIST[i].setAttribute("id", 'b'+i);
					LIST[i].setAttribute("stroke", "rgba("+ Math.floor(SHADE*DATA[i]) +","+ Math.floor(SHADE*DATA[i])+ ",255, 1)");
					LIST[i].setAttribute("stroke-width", INTERVAL);
				}
			

				let a = gid(TARGET);
				a.innerHTML='';				// clear the screen
				for(var i=0; i<LIST.length; i++){
					a.appendChild(LIST[i]);
				}
			}
		}
	},

}
