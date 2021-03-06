var size_table = [
	[
		//厘米
		[8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5],
		//中国码
		[19,19.5,20,20.5,21,21.5,22,22.5,23,23.5,24,24.5,25,25.5,26,26.5,27,27.5,28,28.5,29.5,30,31,31.5,32,33,33.5,34],
		//欧洲码
		[17,18,18.5,19,19.5,20,20.5,21,21.5,22,22.5,23.5,24.5,25,25.5,26,26.5,27,27.5,28,28.5,29.5,30.5,31,32,33,34,35],
		//美国码
		[1,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5]
	],
	[
		//厘米
		[20.5,21,21.5,22,22.5,23,23.5,24,24.5,25,25.5,26,26.5,27,27.5,28,28.5,29,29.5,30,30.5,31],
		//中国码
		[35,35.5,36,36.5,37,37.5,38,38.5,39,40,40.5,41,42,42.5,43,44,45,45.5,46,46.5,47,47.5],
		//欧洲码
		[35,35.5,36,36.5,37,37.5,38,38.5,39,40,40.5,41,42,42.5,43,44,45,45.5,46,46.5,47,47.5],
		//美国码
		[2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13],
		//韩国码
		[205,210,215,220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,295,300,305,310]
	],
	[
		//厘米
		[22.5,23,23.5,24,24.5,25,25.5,26,26.5,27,27.5,28],
		//中国码
		[35,36,37,38,39,39.5,40,40.5,41,41.5,42,42.5],
		//欧洲码
		[35,36,37,38,39,39.5,40,40.5,41,41.5,42,42.5],
		//美国码
		[5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5],
		//韩国码
		[225,230,235,240,245,245,250,250,255,260,265,270]
	]
]
function convertSize(osize,type, to){
	var index = -1;
	to = parseInt(to);
	size = parseFloat(osize);
	if(isNaN(size)){
		return osize;
	}
	if(size < 20 || type == 0){
		//童鞋，厘米
		index =  size_table[0][0].indexOf(size);
		if(index < 0){
			return osize;
		}else{
			return size_table[0][to][index];
		}
	}
	if(size > 20){
		if(type == 1){
			//男鞋，中国码
			index =  size_table[1][1].indexOf(size);
			if(index < 0){
				return osize;
			}else{
				return size_table[1][to][index];
			}	
		}else if(type == 2){
			//女鞋，中国码
			index =  size_table[2][1].indexOf(size);
			if(index < 0){
				return osize;
			}else{
				return size_table[2][to][index];
			}	
		}
	}
	return osize;
}
var DXM_TRANSLATE_URL = "//translate.dianxiaomi.com/translate.json";
var BING_TRANSLATE_URL = "//api.microsofttranslator.com/V2/Ajax.svc/Translate?appid=";
function injectBingTranslate(str, callback, options, from, to){
	var s = "";
	if(str != undefined && str != ""){
		str = $.trim(str);
		if(str.length > 5000){
			$.fn.message({type:"error",msg:"超过了翻译的最大字数限制"});
			return callback(s, options);
		}
		// 包含中文的时候才进行翻译
		if(!isContainChinese(str)){
			return callback(s, options);
		}
		//str = encodeURIComponent(str);
		var url = BING_TRANSLATE_URL;
		if(from == undefined || from.trim() == ""){
			from = "zh-Hans";
		}
		if(to == undefined || to.trim() == ""){
			to = "en";
		}
		url += "&text="+str+"&from="+from+"&to="+to;
		$.ajax({
	        type : "get",
	        url : url,
	        dataType: "jsonp",
	        jsonp:"oncomplete",
	        success : function(data){
	        	if(data != null){
	        		// 如果属性，证明请求失败
	        		console.log("injectBingTranslate:"+str+" "+JSON.stringify(data));
	        		callback(data, options);
	        	}else{
	        		$.fn.message({type:"error",msg:"data is null"});
	        		callback(null);
	        	}
	        },
	        error:function(XMLHttpRequest, textStatus, errorThrown){
	        	console.log(XMLHttpRequest);
	        	console.log(textStatus);
	        	console.log(errorThrown);
	        	$.fn.message({type:"error",msg:"网络连接超时，请稍后再试！"+errorThrown.toString()});
	        	callback(null);
	        }
	    });
	}
}
function injectDxmTranslate(str, callback, options,from,to){
	var s = "";
	if(str != undefined && str != ""){
		str = $.trim(str);
		if(str.length > 5000){
			$.fn.message({type:"error",msg:"超过了翻译的最大字数限制"});
			return callback(s, options);
		}
		// 包含中文的时候才进行翻译
		if(!isContainChinese(str)){
			return callback(s, options);
		}
		//str = encodeURIComponent(str);
		var url = DXM_TRANSLATE_URL;
		
		$.ajax({
	        type : "post",
	        url : url,
	        dataType : "json",
	        data : {q:str,from:from,to:to},
	        success : function(data){
	        	if(data != null){
	        		data = eval(data);
	        		// 如果属性，证明请求失败
	        		console.log("injectDxmTranslate:"+str+" "+JSON.stringify(data));
	        		if(data){
	        			callback(data.data, options);
	        		}else{
	        			$.fn.message({type:"error",msg:data.msg});
	        			callback(null);
	        		}
	        	}else{
	        		$.fn.message({type:"error",msg:"data is null"});
	        		callback(null);
	        	}
	        },
	        error:function(err){
	        	$.fn.message({type:"error",msg:"网络连接超时，请稍后再试！"+err.toString()});
	        	callback(null);
	        }
	    });
	}
}
function translate(str, callback, options,from,to){
	//injectDxmTranslate(str, callback, options,from,to);
	//injectBingTranslate(str, callback, options, from, to);
	injectBingTranslate(str, callback, options, config_app.getTranslateFrom, config_app.getTranslateTo);
}

var keyTranslate_inject = function(){
    var site = $("#shopeeSite").val();
    var productName = $.trim($("#productName").val());
    var desc = $.trim($("#description").val());

    if(!site){
        $.fn.message({type:"error",msg:"请先选择店铺！"});
        return ;
    }

    if(productName == "" && desc == ""){
        $.fn.message({type:"error",msg:"请先填写产品标题或产品描述后，再翻译！"});
        return ;
    }

   //if(site == "MY" || site == "SG"){
   		var blacklist = config_app.getBlacklist;
   		if(blacklist != undefined){
   			var blacklists = blacklist.split(/[,，]/);
   			if(blacklists != undefined && blacklists.length > 0){
   				for(let index = 0 ; index < blacklists.length ; ++index){
   					productName = productName.replace(blacklists[index], "");
   					desc = desc.replace(blacklists[index], "");
   				}
   			}
   		}
   		function translateProductName(){
   			translate(productName, function(data){
	           if(data && data != ""){
	               $("#productName").val(data);
	               if("en" == config_app.getTranslateTo){
	               		deleteEngToMax("productName");
	               }else{
	               		deleteFtToMax("productName");
	               }
	               numberStatistics1();
	           }else{
	           		setTimeout(function(){
	           			translateProductName();
	           		}, 0);
	           }
	       });
   		};
   		translateProductName();
       
		function translateDesc(){
			translate(desc, function(data){
	           if(data && data != ""){
	               $("#description").val(data);
	               numberStatistics2();
	           }else{
	           		setTimeout(function(){
	           			translateDesc();
	           		}, 0);
	           }
	       });
		};
		translateDesc();
       
    //}

    //简译繁
//  if(site == 'TW'){
//  	function translateFtProductName(){
//  		translate(productName, function(data){
//	            if(data && data != ""){
//	                $("#productName").val(data);
//	                deleteFtToMax("productName");
//	                numberStatistics1();
//	            }else{
//	            	setTimeout(function(){
//	           			translateFtProductName();
//	           		}, 0);
//	            }
//	        },'','zh','ft');
//  	}
//      translateFtProductName();
//
//		function translateFtDesc(){
//			translate(desc, function(data){
//	            if(data && data != ""){
//	                $("#description").val(data);
//	                deleteFtToMax("description");
//	                numberStatistics2();
//	            }else{
//	            	setTimeout(function(){
//	           			translateFtDesc();
//	           		}, 0);
//	            }
//	        },'','zh','ft');
//		}
//      translateFtDesc();
//  }
};


function deleteEngToMax(id){
	var productName = document.getElementById(id);
	if(productName){
		var max = productName.getAttribute("maxlength");
		var value = productName.value;
		while(value.length > max){
			var pos = value.lastIndexOf(" ");
			value = value.substring(0, pos);
		}
		productName.value = value;
	}
}
function deleteFtToMax(id){
	var productName = document.getElementById(id);
	if(productName){
		var max = productName.getAttribute("maxlength");
		var value = productName.value;
		while(value.length > max){
			value = value.substring(0, value.length - 1);
		}
		productName.value = value;
	}
}
var detail = JSON.parse(document.body.getAttribute("detail"));
var product = detail.iDetailData;
var config_detail = detail.iDetailConfig;
var catid = config_detail.catid;
var config_app = JSON.parse(document.body.getAttribute("config_app"));
var category = config_detail.catid;
window.postMessage({ type: "category",action:"load", key:category, value:"load "+category}, "*");
console.log(product);
var index = 0;
var skuProps = undefined;
if(product.sku != undefined){
	skuProps = product.sku.skuProps;
}

function setParantSku(parentSkuId){
	var parantSku = document.getElementById("parentSku");
	parantSku.value = parentSkuId;
}
if(config_app.autoFillSkuid){
	setParantSku(config_detail.offerid);	
}else{
	setParantSku("");
}
function getCalculatePrice(price){
	return ((parseFloat(price) + parseFloat(config_app.getPriceDelta))/parseFloat(config_app.getExchangeRate)).toFixed(2);
}
var radiobox = document.getElementsByName('productType');
if(radiobox[0].checked){
	var product_price = document.getElementById("productPrice");
	if(product_price != undefined){
		product_price.value = getCalculatePrice(config_detail.refPrice);
	}
	var product_stock = document.getElementById("productStock");
	if(product_stock != undefined){
		product_stock.value = 999;
	}
}else{
	var count = 0;	//count color number that already translated;
	var skuCount = 0; //count sku number that already add to skuTable;
	
	var skuTable = document.getElementById("skuListTable");
	var skuBody = skuTable.getElementsByTagName("tbody");
	var skuArr = document.getElementById('skus');
	if(skuArr != undefined){
		skuArr.value = '[]';
	}
	console.log("skuBody size:"+skuBody.length);
	if(skuBody.length > 0){
		var childNodes = skuBody[0].childNodes;
		setTimeout(function(){
			while(childNodes.length > 1){
				console.log("childNodes length:"+childNodes.length);
				skuBody[0].removeChild(childNodes[1]);
			}
		}, 0);
	}
	
	function isAllAsc(str){
		if(str != undefined && 'string' == typeof(str)){
			for(let index = 0 ; index < str.length; ++index){
				if(str.charCodeAt(index) > 256){
					return false;
				}
			}
		}
		return true;
	}
	function translateItemColors(itemColor, callback){
		translate(itemColor.name, function(data){
			if(data && data != ''){
				//var data =  data.substring(pos+1, data.length).trim();
				data = data.trim();
				var words = data.split(" ");	
				data = "";
				var index = 0; 
				for(index = 0 ; index < words.length; ++index){
					data += words[index].firstUpperCase();
				}
				
				//var pos_end = data.indexOf(" ");
				//if(pos_end < 0){
				//	pos_end = data.length;
				//}
				//data = data.substring(0, pos_end).trim();
				//data = data.firstUpperCase();
				console.log("data:"+data);
				itemColor.tname = data;
				callback();
			}else{
				setTimeout(function(){
					translateItemColors(itemColor, callback);
				}, 1000);
			}
		});
	}
	
	function translateItemSize(itemSize, callback){
		console.log("translateItemSize:"+itemSize.name);
		if(isAllAsc(itemSize.name)){
			itemSize.tname = itemSize.name;	
			callback();
		}else{
			translate(itemSize.name, function(data){
				if(data && data != ''){
					var words = data.split(" ");	
					data = "";
					var index = 0; 
					for(index = 0 ; index < words.length; ++index){
						data += words[index].firstUpperCase();
					}
					itemSize.tname = data;
					callback();
				}else{
					setTimeout(function(){
						translateItemSize(itemSize, callback);
					}, 1000);
				}
			});
		}
	}
	
	var itemColors = skuProps[0];
	var itemSizes = skuProps[1];
	
	if(itemColors != undefined){
		itemColors = itemColors.value;
		
		var count = 0; 
		function translateColorCallback(){
			count += 1;
			if(count >= itemColors.length){
				stepItemSize();
			}
		}
		
		for(index = 0 ; index < itemColors.length; ++index){
			translateItemColors(itemColors[index], translateColorCallback);	
		}
	}else{
		itemColors = [{name:"", tname:""}];
		stepItemSize();
	}
	
	function stepItemSize(){
		console.log("on stepItemSize");
		if(itemSizes != undefined){
			itemSizes = itemSizes.value;
			var count = 0; 
			function translateSizeCallback(){
				console.log("translateSizeCallback "+count+" "+itemSizes.length);
				count += 1;
				if(count >= itemSizes.length){
					stepAddAllToSku();
				}
			}
			var index = 0;
			for(index = 0 ; index < itemSizes.length; ++index){
				console.log("for index:"+index+" length:"+itemSizes.length);
				translateItemSize(itemSizes[index], translateSizeCallback);
			}
		}else{
			itemSizes = [{name:"", tname:""}];
			stepAddAllToSku();
		}
	}
	
	function stepAddAllToSku(){
		console.log("on stepAddAllToSku");
		setTimeout(function(){
			addAllToSku();
		}, 0);
	}
	
	
	function setStocksTips(tips){
		var priceAndStocks = document.getElementsByClassName("sku-con");
		if(priceAndStocks.length > 0){
			priceAndStocks[0].textContent = tips;
		}
	}
	
	function addToSkuTable(itemName, skuName, refPrice, skuMap){
		console.log(itemName+" "+skuName+" "+refPrice);
		var skuId = skuMap.skuId;
		//var stock = skuMap.canBookCount;
		var stock = 999;
		var price = skuMap.price;
		if(price == undefined){
			price = refPrice;
		}
		if(price <= 0){
			return;
		}else{
			skuCount += 1;
		}
		
		var skuTable = document.getElementById("skuListTable");
		var skuBody = skuTable.getElementsByTagName("tbody");
		var tr = document.createElement("tr");
		
		var td = document.createElement("td");
		var input = document.createElement("input");
		input.className = "form-component";
		input.name = "variationName";
		input.type = "text";
		input.value = itemName;
		input.setAttribute("datatype","must");
		input.setAttribute("nullmsg","变种名称不能为空");
		input.setAttribute("errormsg", "请填写正确的变种名称");
		td.appendChild(input);
		tr.appendChild(td);
		
		td = document.createElement("td");
		input = document.createElement("input");
		input.className = "form-component";
		input.name = "variationSku";
		input.type = "text";
		if(config_app.autoFillSkuid){
			input.value = skuId;	
		}
		td.appendChild(input);
		tr.appendChild(td);
		
		td = document.createElement("td");
		input = document.createElement("input");
		input.className = "form-component";
		input.name = "price";
		input.type = "text";
		input.value = getCalculatePrice(price);
		input.onkeyup = function(){
			clearNoNum(this);
		};
		input.onblur = function(){
			checkPrice();
		}
		input.setAttribute("datatype","must");
		input.setAttribute("nullmsg","价格不能为空");
		input.setAttribute("errormsg", "请填写正确的价格");
		td.appendChild(input);
		tr.appendChild(td);
		
		td = document.createElement("td");
		input = document.createElement("input");
		input.className = "form-component";
		input.name = "stock";
		input.type = "text";
		input.value = stock;
		input.onkeyup = function(){
			clearMistakeNumber(this);
		};
		input.setAttribute("datatype","productStock");
		input.setAttribute("nullmsg","库存不能为空");
		input.setAttribute("errormsg", "请填写正确的库存");
		td.appendChild(input);
		tr.appendChild(td);
		
		td = document.createElement("td");
		var button = document.createElement("button");
		button.className = "button btn-gray skuListRemove";
		button.type = "button";
		button.innerText = "移除";
		td.appendChild(button);
		tr.appendChild(td);
		
		skuBody[0].appendChild(tr);
	}
	function addAllToSku(){
		var index1 = 0;
		var index2 = 0;
		
		var price = undefined;
		var priceRangeOriginal = product.sku.priceRangeOriginal;
		if(priceRangeOriginal != undefined){
			price = priceRangeOriginal[0][1];
		}
		if(price == undefined || price.toString().trim() == ""){
			var priceRange = product.sku.priceRange;
			if(priceRange != undefined){
				price = priceRange[0][1];
			}
		}
		if(price == undefined || price.toString().trim() == ""){
			price = parseFloat(product.sku.price);
		}
		if(price == undefined || price.toString().trim() == ""){
			price = parseFloat(product.sku.retailPrice);
		}
		
		
		
		console.log("addAllToSku");
		skuCount = 0;
		var skus = {};
		console.log(itemColors);
		console.log(itemSizes);
		for(index2 = 0 ; index2 < itemSizes.length; ++index2){
			
			if(product.gender != undefined){
				var gender = product.gender;
				var type = 1;
				if(gender.indexOf("中性")){
					type = 1;
				}else if(gender.indexOf("男女")){
					type = 1;
				}else if(gender.indexOf("童")){
					type = 0;
				}else if(gender.indexOf("女")){
					type = 2;
				}
				console.log("convert size type:"+type+" to:"+config_app.getConvertShoeSize);
				itemSizes[index2].tname = convertSize(itemSizes[index2].tname, 1, config_app.getConvertShoeSize);
				console.log(itemSizes[index2].tname);
			}
			for(index1 = 0 ; index1 < itemColors.length ; ++index1){
				if(skuCount < 20){
					var keyname = "";
					if("" == itemColors[index1].name.trim()){
						keyname = itemSizes[index2].name.trim();
					}else if("" == itemSizes[index2].name.trim()){
						keyname = itemColors[index1].name.trim();
					}else{
						keyname = itemColors[index1].name+"&gt;"+itemSizes[index2].name;
					}
					var skuMap = product.sku.skuMap[keyname];
					var skuId = skuMap.skuId;
					var stock = skuMap.canBookCount;
					var real_price = skuMap.price;
					if(real_price == undefined){
						real_price = price;
					}
					//stock == 0, skip;
					if(stock <= 0){
						continue;
					}
					//real_price <= 0, skip;
					if(real_price <= 0){
						continue;
				}else{
					skuCount += 1;
				}
				
				var sku_color = skus[itemColors[index1].tname];
				if(sku_color == undefined){
					sku_color = [];
					skus[itemColors[index1].tname] = sku_color;
				}
				sku_color.push([itemSizes[index2].tname, keyname]);
			}	
		}
	}
	for(let color in skus){
		for(index = 0; index < skus[color].length ; ++index){
			console.log("addToSkuTable "+color+skus[color][index][0]+" "+price+" "+skus[color][index][1]);
			addToSkuTable(
						color+skus[color][index][0],
						color+skus[color][index][0],
						price,
						product.sku.skuMap[skus[color][index][1]]
				);
		}
	}
	setStocksTips("变种已补全");
}
	
}


function injectSaveCategory(){
	var eles = document.getElementsByClassName('category-sel-group');
	var button = document.createElement("button");
	button.type = "button";
	button.className = "btn btn-primary mLeft5";
	button.innerText = "保存分类信息";
	button.onclick = function(){
		alert(config_detail.catid);
		saveCategory();
	}
	if(eles && eles.length > 0){
		eles[0].appendChild(button);
	}
}

function saveCategory(){
	var select = document.getElementById("categoryHistoryId");
	var options = select.selectedOptions;
	if(options == undefined || options.length <= 0){
		alert("请选择产品分类");
	}
	var data = {};
	var text = options[0].text;
	var value = options[0].value;
	data.text = text;
	data.value = value;
	var attrs = document.getElementById("shopeeProductAttrShow");
	var trs = attrs.getElementsByTagName("tr");
	if(trs != undefined && trs.length > 0){
		var index = 0;
		data['productAttr'] = {};
		for(index = 0; index < trs.length ; ++index){
			var tds = trs[index].getElementsByTagName("td");
			if(tds != undefined && tds.length >= 2){
				var name = tds[0].innerText;
				var inputs = tds[1].getElementsByTagName("input");
				var value = undefined;
				if(inputs.length > 0){
					value = inputs[0].value;
				}
				data['productAttr'][name] = value;
			}
		}
	}
	window.postMessage({ type: "category",action:"save", key:category, value: data}, "*");
}


window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

	var type = event.data.type;
	var action = event.data.action;
	var key = event.data.key;
	var value = event.data.value;
	console.log("inject_shopee script received: " + JSON.stringify(value));
  	if(action == 'setCategory'){
  		if(value != undefined){
	  		var text = value.text;
	  		var textValue = value.value;
	  		var productAttr = value.productAttr;
	  		var select = document.getElementById("categoryHistoryId");
	  		var option = document.createElement("option");
	  		option.value = textValue;
	  		option.innerText = text;
	  		select.appendChild(option);
	  		select.selectedIndex = select.options.length - 1;
	  		
	  		var ev = document.createEvent("HTMLEvents");  
			ev.initEvent("change", false, true);  
			select.dispatchEvent(ev);  
	  		
	  		console.log("productAttr:"+JSON.stringify(productAttr));
	  		
	  		setTimeout(function(){
	  			var attrs = document.getElementById("shopeeProductAttrShow");
				var trs = attrs.getElementsByTagName("tr");
				if(trs != undefined && trs.length > 0){
					var index = 0;
					for(index = 0; index < trs.length ; ++index){
						var tds = trs[index].getElementsByTagName("td");
						if(tds != undefined && tds.length >= 2){
							var name = tds[0].innerText;
							var inputs = tds[1].getElementsByTagName("input");
							if(inputs.length > 0){
								if(productAttr[name] != undefined){
									inputs[0].value = productAttr[name];		
								}
							}
						}
					}
				}
	  		}, 0);	
  		}else{
  			var route = document.getElementsByClassName('category-route');
  			route[0].getElementsByTagName('span')[0].innerText = '1688分类编号'+catid+"未找到，请先手工操作保存";
  		}
  	}
}, false);


keyTranslate_inject();
injectSaveCategory();
