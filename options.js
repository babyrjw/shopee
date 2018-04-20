// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.storage.sync.get(null, function(result) {
	var dataDiv = document.getElementById("dataDiv");
	for(var key in result){
		dataDiv.innerText += key;
		dataDiv.innerText += ":";
		dataDiv.innerText += JSON.stringify(result[key]);
		dataDiv.innerText += "\n";
	}
});