// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var el_get_alibaba = document.getElementById("get_alibaba");
var el_auto_fill_skuid = document.getElementById("get_auto_fill_skuid");
var el_price_delta = document.getElementById("price_delta");
var el_exchange_rate = document.getElementById("exchange_rate");
var el_express = document.getElementById("express");
var el_convert_shoe_size = document.getElementById("get_convert_size");

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

chrome.storage.sync.get(null, function(result) {
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
});
