// [add, replace, remove, get, set, compare, filter, insert, transform][String, Array, Element][Format, Index, Array, Number,at]

// gea(attribute, value)			Get Elements by Attribute, returns an [array] of id's
// ges(id)					Get Element Siblings		returns all {object} containing elements within container 
// gid(id)					Get Element By Id
// gen(name)					Get Element by name
// get(tagname)					Get Element by Tag-name
// gev(id)					Get Element Visibility
// sef(id)					Set Element Focus
// sea(attrib, val)				Set Element Attribute
// sec(id, ClassName)				Set Element Class
// sev(id,%)					Set Element Visibility
// rid(id)					Remove(element) By Id
// rea(x)					Remove Element Attribute
// tes(attribute,[array values])		Toggle Element Attributes - Not yet implemented (enhancement to toggle element visibility)
// xev(id)					Exclusive element visibility [sdv object] 
// iia(x,array)					Is In Array 		Returns Bool true/false
// sal([array])					Shift Array Left 	Returns new Array
// sar([array])					Shift Array Right	Returns new Array
// gam([array])					Get Array Min;		Returns integer
// gsl(string, Pettern, Breakout(true/false))	get string location returns location of found string (or) an array of all found locations
// gss(string,start,stop)			Get String Slice
// rsq(string)					Remove String Quotes
// rnn(string)					Remove Not Numeric
// rsa(string, index, new value)		Replace String At position, string to insert
// git(string)					get input type - Returns 0: False  1: Number 2: Alpha  3: Combined
// grt(string)					get Reverse Text - returns reverse text
// sft(String)					String Format Tool - Removes unwanted text
// nft(string) 					Number format tool
// ats(array)					array to a string
// sta(string,separator, Number[Y/N])		String to Array
// gts(x)					Get Text type
// git(value)					Get  x: input Y: [0: Empty / 2: number / 3: string  4: combined 
// gsa(String)					Get string alpha - returns only letters
// rcs(string, index)				Remove char at
// isl(Text, Index, text incert)		Incert String @ Location
// ael(id,eventType,Function)			Add Event Listener
// rel(id,eventType,Function)			Remove Event Listener
// cos(object)					Convert Object to String ! needs to have y be the defined seperator
// cso(string)					Convert string to object
// coa(object)					Convert Object to Array ! needs to have y be the defined seperator
// cao(array)					Convert Array to Object
// can(array, number, [G]-than/[L]-than)		Compare array to Number - returns array of values greater than or less than the number
// mid(string)					Make Unique ID
// mrn()					Make Random Number
// gst()					Get System Time
// gms()					Get mouse selection
// ael(id,event, Function)			Add event listener, function connot contain values to pass on funct('x') = will throw a type mismatch
// rel(id, event, Function)			Rmove event listener
// fri(string array, match below)		Filter Range Array - find primary argument numbers below second argument

function fri(x, y){let xx = sta(x,',',true);let z=0;for(var i=0; i < xx.length; i++){if(xx[i] < y){z++}}return z}

function cao(x){let a={};for(var i=0; i<x.length; i++){var b=sta(x[i],':');if(!b[1]){b[1]=''}if(b[0]!=''){a[b[0]]=b[1];}}return(a)}
function coa(x){var a=[];for(b in x){if(x.hasOwnProperty(b)){a.push(b+":"+x[b])}}return a}



function cos(x,y){var a="";for(b in x){if(x.hasOwnProperty(b)){a+=(b+":"+x[b]+"|")}}return a}
function toc(x,z){if(z==true){gid(x).style.clip='rect(0px 0px 0px 0px)';}else{gid(x).style.clip='rect(0px '+gid(x).parentNode.style.width+' '+gid(x).parentNode.style.height+' 0px)';}return;}
function goc(x){var y=new Array();try{try{var z=(gid(x).childNodes.length)}catch(e){z=x.childNodes.length}}catch(e){return false};for(var i=0; i<=z; i++){try{if(gid(x).childNodes[i].nodeType==1){y[(y.length)]=gid(x).childNodes[i].id}}catch(e){}}return y}
function gba(x,y){let z=null;if(y){try{z = gid(document.body.getAttribute(x)).value}catch(e){return '';}}else{z = document.body.getAttribute(x);}return z;}
function sba(x,y){document.body.setAttribute(x,y)}
function mid(x){return sft(x.substring(0,5)+Math.floor(Math.random() * 3000))}
function mrn(){return Math.floor(Math.random() * 3000)}
function gst(){var d = new Date();return d.getHours() + ":"+d.getMinutes()+":"+d.getSeconds()}
function ael(x,y,z){var ax=y.toLowerCase(); if(a.substring(0,2)=='on'){a=y.substring(2,y.length); gid(x).addEventListener(a.toLowerCase(),z,false);}}
function rel(x,y,z){var a=y;if(y.substring(0,2)=='on'){a=y.substring(2,y.length)} try{gid(x).removeEventListener(a.toLowerCase(),z,false)}catch(e){gid(x).detachEvent(y,z)}}
function fsu(x){return x.replace(/[^A-Z]/g, "")}
function fsl(x){return x.replace(/[^a-z]/g, "")}
function ica(x){return x.matches("[a-zA-Z]+")}
function gsl(x,y,z){if(!z){return x.indexOf(y)}let b=[];for(let i=0; i<y.length;i++){b[i]='';let a=y.charAt(i);for(let o=0; o<x.length;o++){if(a==x.charAt(o)){b[i]+= o+','}}b[i]=nft(b[i]);}return b;}
function rsa(x,y,z){var a=x.split('');a[y]=z; return a.join('')}
function rca(x,y){let a=x.substring(0, y);let b=x.substring(y + 1, x.length);return (a+b)}
function gss(x,y,z){if((x==null)||(x==undefined)){return false}; return x.slice(y,z)}
function git(x){var y=x.replace(/[`!@#$%^&*()_+\-\[\]{};':"\\|.<>\/?~/]/g, "");if(y.length <1){return false};if(y.search(/[1-9]/g)==0){return 1;}if(y.search(/[A-Za-z]/g)==0){return 2;}if(y.search("=")==0){return 3;}}
function grt(x){if(!x){return} x.split("").reverse().join("")}
function nft(x){return x.replace(/\s/g, '')}

function sta(x,y,z){if(z){ARR=x.split(y);for(var i=0; i<ARR.length; i++){ARR[i]=parseInt(rnn(ARR[i]))};return ARR};return x.split(y)}

function rnn(x){return parseInt(x.replace(/[^0-9]/g, ""))}	
function sft(x){return x.toUpperCase().replace(/[^A-Z0-9]/g, "")}
function ats(x){return x.toString()}
function rsq(x){return x.replace(/['"]/g,'')}
function isl(x,y,z){if(!x){return}return x.substr(0, y) + z + x.substr(y)}
function iia(x,y){for(var i=0; i < y.length; i++)if(y[i]==x){return true};return false}
function aas(x, y){if (x === y){return true;}if (x.length != y.length){return false; }for(key in x){if (x[key] !== y[key]){return false;}}return true;}
function sal(x){if(!x){return false}else{return x.unshift()}}
function sar(x){if(!x){return false}else{return x.shift()}}
function gea(x,y,z){let a='';if(!x){return false}if(z){try{return document.gid(z).querySelectorAll("["+x+"='"+y+"']");}catch(e){}}if(!z){try{return document.querySelectorAll("["+x+"='"+y+"']");}catch(e){}}if(!y){try{return document.querySelectorAll("[x]");}catch(e){}}return a}
function ges(x){return gid(x).parentNode.children}
function get(x,y){try{return y.getElementsByTagName(x)}catch(e){return document.getElementsByTagName(x)}}
function gev(x){var y=gos(x);if(y.visibility=='hide' || y.visibility=='hidden'){ return 'hidden'}else{return 'visible'}}
function gid(x){if(typeof x=='undefined'){return false}if(typeof x=="string"){return document?.getElementById(x)}if(typeof x=="object"){return x}}
function rid(x){var y;try{y=gid(x)}catch(e){y=x};y.parentNode.removeChild(y)}
function rea(x,y){gid(x).removeAttribute(y)}
function sea(x,y,z){if(!y){return false}if(x){try{gid(x).setAttribute(y,z)}catch(e){return false}}return true;}
function sec(x,y){gid(x).className=y}
function sef(x){try{return gid(x).focus()}catch(e){return x.focus()}}
function tev(x,y){if(gev(x)=='visible'){ges(x).visibility='hidden'; return}else{ges(x).visibility='visible'}}
function xev(x){if(!x){return false};let MULTI=Array.isArray(x);let SIBINGS=null;if(MULTI){SIBLINGS=gid(x[0]).parentNode.children;}else{SIBLINGS=gid(x).parentNode.children;}for(var i=0; i < SIBLINGS.length; i++){gid(SIBLINGS[i]).style.visibility='hidden';}if(MULTI){for(var i=0; i <x.length; i++){gid(x[i]).style.visibility='visible'}return x[0];}else{gid(x).style.visibility='visible'}return x}
function ccf(x){var a=ges(x);if(!a){return false}for(var i=0; i <a.length; i++){}return gid(x)}


// In array bigger
function can(x,y){



}

// 38, 57, 6.5 77, 8, 44
//MDCCLXXVI





