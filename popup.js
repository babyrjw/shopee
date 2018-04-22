// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
var all_config_name = ["getAlibaba", 
						"autoFillSkuid", 
						"getPriceDelta", 
						"getExchangeRate", 
						"getExpress",
						"getConvertShoeSize", 
						"getTranslateFrom",
						"getTranslateTo",
						"getBlacklist"];
var el_get_alibaba = document.getElementById("get_alibaba");
var el_auto_fill_skuid = document.getElementById("get_auto_fill_skuid");
var el_price_delta = document.getElementById("price_delta");
var el_exchange_rate = document.getElementById("exchange_rate");
var el_express = document.getElementById("express");
var el_convert_shoe_size = document.getElementById("get_convert_size");
var el_translate_from = document.getElementById("get_translate_from");
var el_translate_to = document.getElementById("get_translate_to");
var el_blacklist = document.getElementById("blacklist");

el_get_alibaba.onclick=function(){
	chrome.storage.sync.set({getAlibaba:el_get_alibaba.checked});
}
el_auto_fill_skuid.onclick=function(){
	chrome.storage.sync.set({autoFillSkuid:el_auto_fill_skuid.checked});
}
el_price_delta.onblur = function(){
	chrome.storage.sync.set({getPriceDelta:el_price_delta.value});
}
el_exchange_rate.onblur = function(){
	chrome.storage.sync.set({getExchangeRate:el_exchange_rate.value});
}
el_express.onblur = function(){
	chrome.storage.sync.set({getExpress:el_express.value});
}

el_convert_shoe_size.onchange = function(){
	var index=el_convert_shoe_size.selectedIndex;
	chrome.storage.sync.set({getConvertShoeSize:el_convert_shoe_size.options[index].value});
}

el_translate_from.onchange = function(){
	var index=el_translate_from.selectedIndex;
	chrome.storage.sync.set({getTranslateFrom:el_translate_from.options[index].value});
}

el_translate_to.onchange = function(){
	var index=el_translate_to.selectedIndex;
	chrome.storage.sync.set({getTranslateTo:el_translate_to.options[index].value});
}

el_blacklist.onblur = function(){
	chrome.storage.sync.set({getBlacklist:el_blacklist.value});
}

chrome.storage.sync.get(all_config_name, function(result) {
	el_get_alibaba.checked = result.getAlibaba;
	el_auto_fill_skuid.checked = result.autoFillSkuid;
	el_price_delta.value = result.getPriceDelta;
	el_exchange_rate.value = result.getExchangeRate;
	el_express.value = result.getExpress;
	
	var options = el_convert_shoe_size.options;
	for(let index = 0; index < options.length; ++index){
		if(options[index].value == result.getConvertShoeSize){
			options[index].selected = true;
		}
	}
	
	options = el_translate_from.options;
	for(let index = 0; index < options.length; ++index){
		if(options[index].value == result.getTranslateFrom){
			options[index].selected = true;
		}
	}
	
	options = el_translate_to.options;
	for(let index = 0; index < options.length; ++index){
		if(options[index].value == result.getTranslateTo){
			options[index].selected = true;
		}
	}
	el_blacklist.value = result.getBlacklist;
});
