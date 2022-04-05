$(function(){
	var Ww = document.body.clientWidth;
	var os = function(){  
		var ua = navigator.userAgent,  
		isWindowsPhone = /(?:Windows Phone)/.test(ua),  
		isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,   
		isAndroid = /(?:Android)/.test(ua),   
		isFireFox = /(?:Firefox)/.test(ua),   
		isChrome = /(?:Chrome|CriOS)/.test(ua),  
		isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),  
		isPhone = /(?:iPhone)/.test(ua) && !isTablet,  
		isPc = !isPhone && !isAndroid && !isSymbian;  
		return {  
			isTablet: isTablet,  
			isPhone: isPhone,  
			isAndroid : isAndroid,  
			isPc : isPc  
		};  
	}();
	
	var $listTable = $("#datalist table");
	var pageIndex = 1;
	var rows = 20;
	var listCount = $listTable.find("tr").length - 1;
	var pageCount = Math.ceil(listCount/rows);
	var dataList = [];
	var mobiles = false;
	
	for(var i=0;i <= pageCount;i++){
		dataList.push([]);
	}
	$listTable.find("tr").each(function(index,el){
		if(index !== 0)$(this).remove();
		var num = Math.ceil(index / rows);
		dataList[num].push($(this).html());
	});
	
	if(!mobiles){
		$listTable.after('<div class="news_pages"></div>');
		PageClick = function(pageclickednumber){
			$listTable.find(".news_pages").pager({ pagenumber: pageclickednumber, pagecount: pageCount, buttonClickCallback: PageClick });
			searchList(pageclickednumber,false);
		}
	}
    function searchList(pageIndex,mobiles){
		if(!mobiles){
			$listTable.find("tr").first().siblings().remove();
			$.each(dataList[pageIndex],function(index,el){
				$listTable.append('<tr>'+el+'</tr>');
				$listTable.next('.news_pages').pager({ pagenumber: pageIndex, pagecount: pageCount , buttonClickCallback: PageClick });
			});	
		}else{
			$.each(dataList[pageIndex],function(index,el){
				$listTable.append('<tr>'+el+'</tr>');
			});			
		}
	}

	if(os.isAndroid || os.isPhone || os.isTablet || Ww <= 999){
		$(".page-mode").show();
		$listTable.find("tr").first().siblings().remove();
	    searchList(pageIndex,true);
		$('.more').click(function(){
			pageIndex++;
			searchList(pageIndex,true);
			if(pageIndex >= pageCount){
				$('.more').hide();
			}
		});
	}else{
		searchList(pageIndex,false);
	}
	
});