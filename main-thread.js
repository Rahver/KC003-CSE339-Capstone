// Remove www in beginning and . in end
URL.prototype.normalizeHostname = function(){
	return this.hostname.replace(/\.+$/, "").replace(/^www\./, "");
};
// Host is local if zone is .local or empty
URL.prototype.isLocal = function(){
	let host = this.normalizeHostname();
	return (
		this.protocol == "file:" ||
		this.protocol == "about:" ||
		host == "localhost" || 
		host == "127.0.0.1" || 
		host == "[::1]" || 
		host.match(/\.local$/i) || 
		host.match(/\.localhost$/i) || 
		host.split(".").length == 1
	);
};

// Enabled
let enabled = true;
chrome.storage.sync.get({
	enabled: true,
}, (storage) => {
	enabled = !!storage.enabled;
});
chrome.storage.sync.onChanged.addListener((updates) => {
	if(updates.enabled){
		enabled = updates.enabled.newValue;
	}
});

// Whitelist - don't check this urls
const whitelist = {
	_set: new Set(),
	import: () => {
		chrome.storage.sync.get("whitelist", (storage) => {
			const list = storage.whitelist ? [...storage.whitelist] : [];
			whitelist._set = new Set(list);
		});
	},
	send: () => {
		chrome.storage.sync.set({
			whitelist: [...whitelist._set]
		});
	},
	has: key => whitelist._set.has(key),
	add: key => {
		whitelist._set.add(key);
		whitelist.send();
	},
};
whitelist.import();
const whitelisttmp = new Set();

const updateIcon = async () => {
	const tabs = await new Promise(resolve => chrome.tabs.query({
		active: true,
		currentWindow: true
	}, resolve));
	if (!tabs || tabs.length === 0) {
		return;
	}
	const url = new URL(tabs[0].url);
	const host = url.normalizeHostname();
	
	let state = "hz";
	if (url.protocol == "http:") {
		state = "suka";
	}
	if (url.protocol == "https:") {
		state = "zbs";
	}

	chrome.browserAction.setIcon({
		path: {
			128: "images/logo-" + state + ".png",
		},
	});
};

const requestErrors = {};
chrome.webRequest.onErrorOccurred.addListener((details) => {
	const url = new URL(details.url);
	const host = url.normalizeHostname();
	requestErrors[host] = false;
	if (
		details.error.indexOf("net::ERR_SSL_") == 0 ||
		details.error.indexOf("net::ERR_CERT_") == 0 ||
		details.error.indexOf("net::ERR_CONNECTION_") == 0 ||
		details.error.indexOf("net::ERR_ABORTED") == 0 ||
		details.error.indexOf("net::ERR_SSL_PROTOCOL_ERROR") == 0 ||
		details.error.indexOf("NS_ERROR_CONNECTION_REFUSED") == 0 ||
		details.error.indexOf("NS_ERROR_NET_TIMEOUT") == 0 ||
		details.error.indexOf("NS_ERROR_NET_ON_TLS_HANDSHAKE_ENDED") == 0 ||
		details.error.indexOf("SSL received a record that exceeded the maximum permissible length.") == 0 ||
		details.error.indexOf("Peer’s Certificate has expired.") == 0 ||
		details.error.indexOf("Unable to communicate securely with peer: requested domain name does not match the server’s certificate.") == 0 ||
		details.error.indexOf("Peer’s Certificate issuer is not recognized.") == 0 ||
		details.error.indexOf("Peer’s Certificate has been revoked.") == 0 ||
		details.error.indexOf("Peer reports it experienced an internal error.") == 0 ||
		details.error.indexOf("The server uses key pinning (HPKP) but no trusted certificate chain could be constructed that matches the pinset. Key pinning violations cannot be overridden.") == 0 ||
		details.error.indexOf("SSL received a weak ephemeral Diffie-Hellman key in Server Key Exchange handshake message.") == 0 ||
		details.error.indexOf("The certificate was signed using a signature algorithm that is disabled because it is not secure.") == 0 ||
		details.error.indexOf("Unable to communicate securely with peer: requested domain name does not match the server’s certificate.") == 0 ||
		details.error.indexOf("Cannot communicate securely with peer: no common encryption algorithm(s).") == 0 ||
		details.error.indexOf("SSL peer has no certificate for the requested DNS name.") == 0
	) {
		if(url.protocol == "https:"){
			requestErrors[host] = true;
		}
	}
}, {
	urls: [
	"*://*/*"
	]
});
const onHttp = async (info) => {
	const tabId = info.tabId;
	const frameId = info.frameId;
	const url = new URL(info.url);
	const host = url.normalizeHostname();
	
	if(!enabled){
		return;
	}
	if(url.isLocal()){
		// return;
	}
	if(url.protocol !== "http:" && url.protocol !== "ftp:"){
		return;
	}
	if(whitelist.has(host) || whitelisttmp.has(host)){
		return;
	}
	
	if(requestErrors[host] === false){
		return;
	}
	
	try{
		await fetch("https://" + host);
		url.protocol = "https:";
		chrome.tabs.update(tabId, {
			url: url.toString(),
		});
		return;
	}catch(e){
	}
	await new Promise(resolve => setTimeout(resolve, 10));
	
	if(typeof requestErrors[host] !== "boolean" || requestErrors[host] !== true){
		return;
	}
	
	const code = `;(() => {
		window["~$_${chrome.runtime.id}_tabId"] = +"${tabId}" || -1;
	})();`;
	chrome.tabs.executeScript(tabId, {
		code,
		frameId,
	});
	
	const file = "inject-alert.js";
	chrome.tabs.executeScript(tabId, {
		file,
		frameId,
	});
};

chrome.tabs.onActivated.addListener(updateIcon);
chrome.webNavigation.onCompleted.addListener(updateIcon);
chrome.webNavigation.onDOMContentLoaded.addListener(onHttp);
chrome.windows.onFocusChanged.addListener(updateIcon);

// Chear temp whitelist when browser closes
chrome.windows.onRemoved.addListener(() => {
	chrome.windows.getAll({}, (windows) => {
		if(windows.length == 0) {
			whitelisttmp.clear();
		}
	});
});

chrome.runtime.onMessage.addListener(msg => {
	const tabId = msg.tabId;
	switch(msg.action){
		case "addToWhitelist":
			chrome.tabs.get(tabId, (tab) => {
				if(!tab){
					return;
				}
				const host = (new URL(tab.url)).normalizeHostname();
				whitelist.add(host);
				chrome.tabs.reload(tabId);
			});
			break;
		case "addToTempWhitelist":
			chrome.tabs.get(tabId, (tab) => {
				if(!tab){
					return;
				}
				const host = (new URL(tab.url)).normalizeHostname();
				whitelisttmp.add(host);
				chrome.tabs.reload(tabId);
			});
			break;
	}
});
