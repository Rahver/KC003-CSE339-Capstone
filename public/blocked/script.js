"use strict";

document.addEventListener("DOMContentLoaded", () => {
	const getMsg = (msg) => chrome.i18n.getMessage(msg).replace(/&quot;/g,"\"");
	const setText = (el, t) => el.innerText = t;
	document.querySelectorAll("[data-i18n]").forEach(element => setText(element, getMsg(element.dataset.i18n)));
});

const tabId = +location.hash.substr(1) || -1;

chrome.tabs.get(tabId, tab => {
	if(!tab){
		return;
	}
	
	document.querySelector(".js-url").innerText = tab.url;
});

document.querySelector(".js-open-once").addEventListener("click", () => {
	chrome.runtime.sendMessage({
		tabId,
		action: "addToTempWhitelist",
	});
});
