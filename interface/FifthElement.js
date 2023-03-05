// This will eventually be all core components built into classes and be an extender of HTML elements
// Elements still in development and are not integrated yet.
var projectID=null;				// Global variables used to keep track of layers and storage locations
var listings=null;				// Convert theese global variables to interface object variables (Unify)


function parseObj(x){
	let out={};
	var b=[];
	var constraint=x.split(';');					// split string into key - value pairs
	for(var keyVal of constraint){
		b=keyVal.split(':');					// seperate keys and values
		if(b[1]!=undefined){
			out[formatKey(b[0])]=formatValue(b[1]);
		}
	}
	function formatKey(x){return x.replace(/['" ]/g,'')}		// Format array key (remove quotes and spaces)
	function formatValue(x){					// Format values
		let a=x.replace(/['"\[\] ]/g,'');			// Remove excess data
		let b=a.search(/[A-Za-z]/g);				// does value contain letters
		let c=a.search(/[0-9]/g);				// does value contain numbers
		let d=a.search(',');					// is value an array
		if(d!=-1){return a.split(',')}				// process Arrays
		if(b && !c && d==-1){return parseInt(a)}		// process Numbers
		return a;						// process Strings (letters and numbers)
	}
	return out;
}

function findAll(STRING,PATTERN){
	TEMP=[];
	while(MATCHES = PATTERN.exec(STRING)){
		TEMP.push(MATCHES.index);
	}
	return TEMP;
}


class xLayer extends HTMLElement{					// This is the stack container the menu 
	constructor() {
		super();
		this.ID=this.id+'l';
		listings		=	this.id;		// Register Layer for tracking purpose
		this.template();
	}
	template(){
		//this.innerHTML=`<div id="${this.ID}" style="position:absolute; top:0px; bottom:15px; left:0px; right:0px; overflow:hidden"></div>`;
	}
	begavior(){}
}

class xProject extends HTMLElement{					// This is your project workspace 
	constructor(x) {
		super();
		projectID		=	this.id;		// register project element with browser
		this.PER		= 	'';
	}
	template(OBJ){}
	behavior(OBJ){}
}
