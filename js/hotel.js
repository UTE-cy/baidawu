var post_data=null,
	param=common.getParam(location.search),
	city_id=param.city_id,
	city_name=decodeURI(param.city_name),
	date_in=param.date_in,
	date_out=param.date_out,
	name=param.name,
	$dateIn=$('#date_in'),
    $dateOut=$('#date_out');
	post_data={
		cityId:city_id,
		city_name:city_name,
		dateIn:date_in,
		dateOut:date_out,
		name:name,
		pageNo:1,
		pageSize:6
	}
//设置日期
$dateIn.val(param.date_in);
$dateOut.val(param.date_out);
dateInList(date_in,date_out);
function httpFromHotel(reset){
	common.access_server('../server/hotel.php',post_data,function(datas){
		if(datas.errcode==1){
	          $('#hotel_list').empty();
	          $('#none').css('display','block');
	    }else{
	        $('#none').css('display','none');
	        renderToPage(datas.result,reset);
	    }
	});
}
function renderToPage(data,reset){
	var hotels=data.hotel_list,
		str='',
		total=data.total,
		pageNo=post_data.pageNo,
		pageSize=post_data.pageSize,
		$list=$('#hotel_list'),
		$more=$('#load_more');
		if(reset){
			$list.empty();
		}
	$.each(hotels,function(i,ele){	
		str+='<li><a href="hotelDetails.html?city_id='+city_id+'&date_in='+date_in+'&date_out='+date_out+'&id='+ele.hotel_id+'&city_name='+city_name+'">'
			    +'<h1><img src="../images/01.jpg" alt=""></h1>'
			    +'<dl>'
			    	+'<dt>'+ele.name+'</dt>'
			    	+'<dd class="price"><b>4.7分</b><i>礼</i><i>促</i><i>返</i><span><b class="hot">￥'+ele.low_price/100+'</b>起</span></dd>'
			    	+'<dd class="type"><b>'+ele.stars+'</b><i></i><i></i></dd>'
			    	+'<dd>'+ele.addr+' <span>'+ele.distance/1000+'km</span></dd>'
			    +'</dl>'
			+'</a></li>'
	})

	$(str).appendTo($list);
	$list.on('tap click','li',function(){
		var url=$(this).children('a').attr('href');
		location.href=url;
	})

	if(pageNo*pageSize<total){
		$more.css('display','block');
	}else{
		$more.css('display','none');
	}

	$more.on('tap click',function(){
		post_data.pageNo+=1;
		httpFromHotel();
	})
	var scroll= new IScroll("#city_hotel",{
		vScrollbar:false
	});
}

httpFromHotel();

function changeHotel(){
	var pos,offset;
	/*滑动时显示和隐藏底部导航*/
	$('#city_hotel').on('touchstart',function(e){
	   //e.preventDefault();
	   pos=e.touches[0].pageY;
	   offset=0;
	})

	$('#city_hotel').on('touchmove',function(e){
	   //e.preventDefault();
	   offset=e.touches[0].pageY-pos;
	})

	$('#city_hotel').on('touchend',function(){
	  var nav=$('#navbox');
	  if(offset<0){
	    nav.css({
	      '-webkit-transition':'height 0.5s ease-in-out',
	      'height':'4rem'
	    })
	  }else if(offset>0){
	    nav.css({
	      '-webkit-transition':'height 0.5s ease-in-out',
	      'height':'0'
	    })
	  }
	})
	$('#nav>li').on('tap click',function(){			
		var idx=$(this).index();	
		if($('#ui_mark').length==0){
			$('<div class="ui_mark" id="ui_mark"></div>').appendTo($('body'));
		}	
		$(this).addClass('on').siblings().removeClass('on');
		$('#con_list').css({
	      '-webkit-transition':'height 0.3s ease-in-out',
	      'height':'12rem'
	    }).children('.incon').eq(idx).addClass('on').siblings().removeClass('on');		
	})
	
}
changeHotel();

function renderSort(){
	var sort={
		'all':'不限',
		'hot':'人气最高',
		'priceMin':'价格最低',
		'priceMax':'价格最高',
		'distance':'距离最近'
		},
		html='';
	$.each(sort,function(i,obj){
		html+='<li>'+obj+'<input type="radio" id="'+i+'"name="check1" onclick="selectSort(\''+i+'\')"><label for="'+i+'"></label></li>';
	})
	$(html).appendTo($('#sort_box'));
	$('#all').prop('checked','checked');
}
renderSort();
function hidMark(){
	$('#con_list').css({
      '-webkit-transition':'height 0.3s ease-in-out',
      'height':'0'
    })
	$('#ui_mark').remove();
}

function selectSort(index){	
	index=index=='all'?-1:index;
	$('#sort').val(index);
	post_data.sortType=$('#sort').val();// =index
	httpFromHotel('reset');
	setTimeout(hidMark,400);// 缓冲动画执行时间
}

function renderStar(){	
	var stars={
		"0":"不限",
		"2":"二星以下/经济型",
		"3":"三星",
		"4":"四星",
		"5":"五星"
		},
		html='';
	$.each(stars,function(i,obj){
		html+='<li>'+obj+'<input type="radio" id="star'+i+'"name="star" onclick="selectStar('+i+')"><label for="'+i+'"></label></li>'
	})
	$(html).appendTo($('#star_box'));
	$('#star0').prop('checked','checked');
}
renderStar();
function selectStar(index){	
	index=index=='0'?-1:index;
	$('#star').val(index);
	post_data.stars=$('#star').val();// =index
	httpFromHotel('reset');
	setTimeout(hidMark,400);// 缓冲动画执行时间
}
function renderPrice(){	
	var price={
		'0':['不限'],
		'1':['0-100',0,100],
		'2':['101-200',101,200],
		'3':['201-300',201,300],
		'4':['301-400',301,400],
		'5':['401-500',401,500],
		'6':['500以上',501]
		},
		html='';
	$.each(price,function(i,obj){
		html+='<li>'+obj[0]+'<input type="radio" id="price'+i+'"name="price" onclick="selectPrice('+i+','+obj[1]+','+obj[2]+')"><label for="'+i+'"></label></li>'
	})
	$(html).appendTo($('#price_box'));
	$('#price0').prop('checked','checked');
}
renderPrice();
function selectPrice(index,min,max){
	if(index==0){
		min=-1;
		max=-1;
	}	
	if(index==6){
		max=-1;
	}
	$('#min').val(min*100);
	$('#max').val(max*100);
	post_data.minPrice=$('#min').val();// =index min max
	post_data.maxPrice=$('#max').val();
	httpFromHotel('reset');
	setTimeout(hidMark,400);// 缓冲动画执行时间
}

function renderBrand(){	
	var html='';
	$.each(hotelBrands,function(i,obj){
		html+='<li>'+obj+'<input type="radio" id="brand'+i+'" name="brand" onclick="selectBrand('+i+',\''+obj+'\')"><label for="'+i+'"></label></li>'
	})
	$(html).appendTo($('#brand_box'));
	$('#brand0').prop('checked','checked');
}
renderBrand();
function selectBrand(index,name){	
	index=index=='0'?name='-1':name;	
	$('#brand').val(name);
	post_data.brand=$('#brand').val();// =index
	httpFromHotel('reset');
	setTimeout(hidMark,400);// 缓冲动画执行时间
}
