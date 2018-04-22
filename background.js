// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({
  	getAlibaba:true,
  	autoFillSkuid:true, 
  	getPriceDelta:0, 
  	getExchangeRate:1,
  	getExpress:0,
  	getConvertShoeSize:'1',
  	getTranslateFrom:'zh-Hans',
  	getTranslateTo:'en',
  	getBlacklist:''
  }, function() {
    //console.log("getAlibaba is true");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {urlContains: 'www.dianxiaomi.com/shopeeProduct/edit.htm'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

var alibaba_dict = {};
var alibaba_tabs = {};
console.log("set onRemoved listener");
  chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  	//console.log("onRemoved "+tabId+" "+JSON.stringify(removeInfo));
  	var url = alibaba_tabs[tabId];
  	if(url){
  		delete alibaba_tabs[tabId];
  		var sendResponse = alibaba_dict[url];
  		if(sendResponse){
  			sendResponse(undefined);
  		}
  	}
  });
console.log("set onMessage listener");
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  	console.log(JSON.stringify(request));
	  if (request.from == 'api' && request.type == 'chrome.tabs.create') {
  	alibaba_dict[request.url] = sendResponse;
  	var url = request.url;
		chrome.tabs.create(
			{
				url:url
			}, 
			function(tab){
				//console.log(tab);
				alibaba_tabs[tab.id] = url;
		});
		return true;
  }else if(request.from == 'alibaba'){
  	var url = request.url;
  	var sendResponse = alibaba_dict[request.url];
  	var data = request.data;
  	//console.log("data:"+JSON.stringify(data));
  	if(sendResponse){
  		sendResponse(data);
  		delete alibaba_dict[url];
  	}
  }
});

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
  	console.log(details);
    
    return { requestHeaders: details.requestHeaders };
  },
  {urls: ["<all_urls>"]},
  [ 'blocking', 'requestHeaders']
);