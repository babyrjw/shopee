chrome.storage.sync.get(['getAlibaba'], function(result) {
  let enabled = result.getAlibaba;
  console.log('Value getAlibaba is ' + enabled);
  if(enabled == true){
  	let url = window.location.toString();
  	console.log("url:"+url);
  	let start = url.indexOf("offer/");
  	let end = url.indexOf(".html");
  	let id = url.substring(start + 6, end);
  	/*var leading = document.getElementsByClassName('obj-leading');
  	var leading_details = leading[0].getElementsByClassName('unit-detail-spec-operator');
  	let colors = [];
  	let index = 0; 
  	for(index = 0 ; index < leading_details.length ; ++index){
  		let config = leading_details[index].getAttribute("data-unit-config");
  		let json_config = JSON.parse(config);
  		let str_config = json_config.name;
  		colors.push(str_config);
  	}
  	console.log(colors);
  	let sizes = [];
  	var sku = document.getElementsByClassName("obj-sku");
  	var sku_details = sku[0].getElementsByTagName("tr");
  	for(index = 0 ; index < sku_details.length ; ++index){
  		let config = sku_details[index].getAttribute("data-sku-config");
  		let json_config = JSON.parse(config);
  		let str_config = json_config.skuName;
  		sizes.push(str_config);
  	}
  	console.log(sizes);
  	
  	var category = undefined;
  	var detail  = document.getElementsByClassName('mod-detail-attributes');
  	var features = detail[0].getElementsByClassName('de-feature');
  	var values = detail[0].getElementsByClassName('de-value');
  	for(index = 0 ; index < features.length ; ++index){
  		if(features[index].innerText == '产品类别'){
  			category = values[index].innerText;
  		}
  	}*/
  	
  	
  	window.addEventListener("message", function(event) {
		  // We only accept messages from ourselves
		  if (event.source != window)
		    return;
		
			var data = event.data.data;
	    console.log("alibaba script received: " + JSON.stringify(data));
		  data.id = id;
	  	chrome.runtime.sendMessage({
	  			from:"alibaba",
	  			url:window.location.href,
	  			data:data
			}, function(response){
				
			});
			window.close();
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
		loadScript(uri("inject_alibaba.js"));
  }
});