var all_config_name = ["getAlibaba", 
						"autoFillSkuid", 
						"getPriceDelta", 
						"getExchangeRate", 
						"getExpress",
						"getConvertShoeSize", 
						"getTranslateFrom",
						"getTranslateTo",
						"getBlacklist"];
function finishPackAndTrans(express){
	let weightInput = document.getElementById("productWeight");
	weightInput.value = 1;
	let longth = document.getElementById("packageLength");
	longth.value = 10;
	let width = document.getElementById("packageWidth");
	width.value = 20;
	let height = document.getElementById("packageHeight");
	height.value = 30;
	
	
	console.log("express:"+express);
	express = parseInt(express);
	if(express == undefined || express == ''){
		express = 0;
	}
	let trans = document.getElementsByClassName("shippingType");
	let index = 0; 
	for(index = 0; index < trans.length; ++index){
		if(index == express){
			trans[index].checked = true;		
		}else{
			trans[index].checked = false;
		}
	}
}
function getSourceUrl(){
	let sourceUrl = document.getElementById("sourceUrl35");
	return sourceUrl.value;
}
function addSyncButton(){
	var btns = document.getElementsByClassName('btn-box');
	var btn=document.createElement("button");
	btn.className = "button btn-orange m-right10";
	btn.type = "button";
	btn.onclick = function(){
		chrome.runtime.sendMessage({ 
			from: 'api', 
			type: 'chrome.tabs.create',
			url:getSourceUrl()
		}, function(response){
			console.log(response);
			document.body.setAttribute("detail", JSON.stringify(response));
			if(response){
				chrome.storage.sync.get(all_config_name, function(result){
					document.body.setAttribute("config_app", JSON.stringify(result));
					loadScript(uri("inject_shopee.js"));
				})
			}else{
				alert("解析产品失败，请重新尝试");
			}
		});
	};
	btn.innerText = "同步产品";
	btns[0].insertBefore(btn, btns[0].children[0]);
}
//addSyncButton();

function autoOpenAnalysis(){
	chrome.runtime.sendMessage({ 
			from: 'api', 
			type: 'chrome.tabs.create',
			url:getSourceUrl()
		}, function(response){
			console.log(response);
			document.body.setAttribute("detail", JSON.stringify(response));
			if(response){
				chrome.storage.sync.get(all_config_name, function(result){
					console.log("result express:"+result);
					finishPackAndTrans(result.getExpress);
					document.body.setAttribute("config_app", JSON.stringify(result));
					loadScript(uri("inject_shopee.js"));
				})
			}else{
				alert("解析产品失败，请重新尝试");
			}
		});
}
autoOpenAnalysis();

window.addEventListener("message", function(event) {
  if (event.source != window)
    return;

	var type = event.data.type;
	var action = event.data.action;
	var key = event.data.key;
	var value = event.data.value;
	console.log("shopee script received: " + JSON.stringify(value));
	if(action == 'save'){
		var saveData = {};
		saveData[key] = value;
		chrome.storage.sync.set( saveData, function() {
	    	console.log("storage save "+key+' is '+value);
	  	});
	}else if(action == 'load'){
		chrome.storage.sync.get( [key], function(result) {
	    	console.log("storage get "+key+' is '+ JSON.stringify( result[key] ));
	    	window.postMessage({ type: "category",action:"setCategory", key:key, value: result[key]}, "*");
	  });
	}
  	
}, false);

function doCallback(){
			
}
function loadScript(url) {
    var elem = document.createElement('script');
    elem.type = 'text/javascript';
    elem.charset = 'utf-8';
    elem.addEventListener('load', doCallback, false);
    elem.src = url;
    console.log("url:"+url);
    document.getElementsByTagName('head')[0].appendChild(elem);
}

function uri(file) {
    return chrome.extension.getURL(file);
}