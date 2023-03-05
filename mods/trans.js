const Trans={
	run: function(IOS){
		let a=null;
		let b=null;
		if(IOS.argument=='exploit'){
			b = this.exploit(IOS.cipherText, IOS.transWord);
			if(!b){Menu.results(IOS.cipherText,"Trans_Exploit"," False: "+ IOS.transWord); return false}
			for(var i=0; i<b.length; i++){
				a=this.cipher(IOS.cipherText,b[i]);
				if(a){Menu.results(a,"Trans_Exploit", IOS.transWord + " @ " + b[i])}
			}
			if(a){
				b=Layer.make(a,'PT',IOS.target); 
				Display.update(b,a);
			return}
		}else{
			b=this.cipher(x,z); 
			Display.update(PT_Target,b);
		if(b){
			Menu.results(a,"Transposition"," Sequence: "+ IOS.transNumber); 
			b=Layer.make(a,'PT', IOS.target);  
			Display.update(b,a);}
		}	
	},
	cipher: function(x,y){
		x=sft(x);
		let rt='';
		let sp=-1;
		let jd=parseInt(y);
		let a=x.length+1;
		for(var i=0; i< x.length; i++){
			sp = ((sp+jd)% a);
			rt += x.charAt(sp);	
		}
		return rt;
	},
	exploit: function(x,y){
		x=sft(x);
		var a = "";
		var c = [];
		for(var i=0; i<x.length; i++){
			a=this.cipher(x,i);
			if(a.search(y) != -1){
				c.push(i);
			}
		}
		if(c==''){return false}
		return c;
	},				
}



