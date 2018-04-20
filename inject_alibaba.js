function task(){
	var gender = undefined;
  	var detail  = document.getElementsByClassName('mod-detail-attributes');
  	var features = detail[0].getElementsByClassName('de-feature');
  	var values = detail[0].getElementsByClassName('de-value');
  	for(index = 0 ; index < features.length ; ++index){
  		if(features[index].innerText == '适用性别'){
  			gender = values[index].innerText;
  			iDetailData.gender = gender;
  		}
  	}
  	
	console.log(iDetailData);
	console.log(iDetailConfig);
	var offlines = document.getElementsByClassName('mod-detail-offline');
	if(offlines.length > 0){
		iDetailData.sku.skuProps = [];
	}
	
	window.postMessage({ 
		type: "iDetailData", 
		data: {
			iDetailData:iDetailData, 
			iDetailConfig:iDetailConfig
		}
	}, "*");
	console.log("postMessage");	
}
function testData(){
	if("undefined" == typeof window.iDetailData || "undefined" == typeof window.iDetailConfig){
		console.log("变量未定义，1s重试");
		setTimeout(testData, 1000);
	}else{
		task();
	}
}
testData();
