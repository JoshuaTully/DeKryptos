
var Menu ={
	sideScroll:function(TARGET,INDICATOR,HANDLE){
		HANDLE = gid(HANDLE) ?? event.target;
		if(INDICATOR){gid(INDICATOR).style.left = HANDLE.offsetLeft -3 + 'px'}
		gid(TARGET).parentNode.style.left=-parseInt(gid(TARGET).style.left)+'px';
	},

	show: function(TARGETS){
		let group=event.target.parentNode.children;
		for(var i=0; i<group.length; i++){
			group[i].style.backgroundColor='rgba(0, 0, 0, 0)';
			group[i].style.boxShadow='inset 0 0 8px rgba(00, 00, 00,0)'; 
		}
		event.target.style.backgroundColor='rgba(00, 97, 167,0.3)';
		event.target.style.boxShadow="inset 0 0 8px rgba(00, 00, 00,0.3)";
		xev(TARGETS);
	},


	results:function(DATA,TYPE,MESSAGE){
		if(!DATA){DATA=''}
		if(!TYPE){TYPE='PT'}
		if(!MESSAGE){MESSAGE='No Results'}
		let ID = mid(DATA);
		let RESULT=    `<div id='${ID}h'		class='layerSlide'>
					<div  id='${ID}i'	class='layerSlideIcon'		style='left:2px'>Σ</div>
					<div  id='${ID}t'	class='layerSlideText'		style='left:40px' >${MESSAGE}</div>
					<input type=button	class='layerSlideSelect'	style='right:40px' value='🗸' onclick="Layer.make('${DATA}','PT','new','Σ'); Menu.sideScroll('docPile','modeSelect','layerSelect')">
					<input type=button	class='layerSlideDelete'			   value='✗' onclick="rid('${ID}h')">
					<input type=hidden id='${ID}' type='hidden' value='${DATA}'>
				</div>`;
		gid('searchList').innerHTML= RESULT.trim() + gid('searchList').innerHTML;
	},
	
}



