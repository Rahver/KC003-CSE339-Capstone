(() => {

const id = (() => {
	let str = "";
	let len = Math.floor(4 + Math.random() * 32);
	let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890_-";
	
	for(let i=0; i<len; i++){
		str += alphabet[ Math.floor(Math.random() * alphabet.length) ];
	}
	str = str.replace(/^\d/, "-_");
	return str;
})();

let container = document.createElement("div");
container.id = id;
document.body.appendChild(container);

let style = document.createElement("style");
style.innerHTML = `
	body{
		overflow: hidden;
	}
	
	body > :not(#${id}),
	body > :not(#${id}) *
	{
		pointer-events: none !important;
	}
	
	#${id} {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 999999999999999;
		
		display: block;
		width: 100%;
		max-width: 600px;
		max-height: 90vh;
		height: 500px;
		
		background-color: #ffffff;
		box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.6), 0 0 16px rgba(0, 0, 0, 0.6);
		border-radius: 8px;
		box-sizing: border-box;
		overflow: hidden;
	}
	
	@media(max-width: 600px){
		#${id} {
			border-radius: 0;
		}
	}
	
	#${id} > iframe{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: none;
	}
`.replace(/[\r\n\t]/ig, "");
container.appendChild(style);

const tabId = window["~$_"+chrome.runtime.id+"_tabId"] || -1;
let content = document.createElement("iframe");
content.src = chrome.runtime.getURL("/public/blocked/index.html#" + tabId);
container.appendChild(content);

})();