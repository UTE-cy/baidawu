var post_data={},	
	param=common.getParam(location.search),
	city_id=param.city_id,
	city_name=decodeURI(param.city_name),
	date_in=param.date_in,
	date_out=param.date_out,
	id=param.id,
	name=decodeURI(param.name),
	$dateIn=$('#date_in'),
    $dateOut=$('#date_out');
	post_data={
		cityId:city_id,
		dateIn:date_in,
		dateOut:date_out,
		id:id
	} 
//设置日期
$dateIn.val(param.date_in);
$dateOut.val(param.date_out);
dateInList(date_in,date_out);

function httpFromDetail(reset){
	common.access_server('../data/hotelDetail.json',post_data,function(datas){
		var data=datas.result,
			stars=['','','二星以下/经济型','三星','四星','五星'];

		$('#hotel_name').text(data.name);
		lis=$('#hotel_intro').children('li');
		lis.eq(0).text('星级：'+stars[data.star]+'级酒店');
		lis.eq(1).text('电话：'+data.tel.replace(',',' / '));
		lis.eq(2).text('地址：'+data.addr);
		$('#intro').text(data.desc);
		$('#facility').text(data.facilities);
		if(datas.errcode==1){
	          $('#detail_container').empty();
	          $('#none').css('display','block');
	    }else{
	        $('#none').css('display','none');
	        renderToDetail(data,reset);
	    }
	})
}
function renderToDetail(data,reset){
	var datas=data.room_types;
	var html='';
	for(var i in datas){
		var objs=datas[i].goods;
		$.each(objs,function(i,v){
			var str='',price=0;			
			if(v.guarantee){
				price=v.guarantee/100;
			}else{
				price=v.price[0]/100;
			}
			if(v.room_state!=0){
				str='<span data-type="'+datas[i].type_id+'" data-room="'+v.room_id+'" data-bed="'+datas[i].name+'" data-price="'+price+'">预定</span>';
			}else{
				str='<span class="full">客满</span>';
			}
			html+='<div class="detail_rows">'
					+'<dl>'
					   +'<dt>'+data.name+'</dt>'
					   +'<dd>'+datas[i].bed_type+'</dd>'
					+'</dl>'
					+'<p>￥ '+price+'</p>'
					+str
				+'</div>'
		})
	}

	if(reset) {$('#detail_container').empty()}

	$(html).appendTo($('#detail_container'));

	var scroll= new IScroll("#detailscroll",{
		vScrollbar:false
	});	

	$('#detail_close').on('tap',function(){
		$('#ui_mark').remove();
		$('.detail_reserve').css({
			'-webkit-transition':'height 0.3s ease-in-out',
			'height':'0'
		})
	})
}

httpFromDetail();

function bindEvent () {
	$('#detail_nav').on('tap','a',function(){
		var idx=$(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$('#base').find('div').eq(idx).addClass('on').siblings().removeClass('on');
	})

	if($('#facility').text().length<50){
		$('#facility').next().css('display','none');
	}else{	
		$('#facility').next().css('display','block');
	}

	$('.detail_btn').on('tap click',function(){
		if($(this).text()=='展开更多'){
			$(this).prev().css('height','auto');
			$(this).text('收回');
		}else{
			$(this).prev().css('height','3.6rem');
			$(this).text('展开更多');
		}
	})

	//预定
	$('#detail_container').on('tap','span',function(){
		if($(this).hasClass('full')) return;
		var rooms=$(this).data('room'),
			type_id=$(this).data('type'),
			bedType=$(this).data('bed'),
			roomPrice=$(this).data('price');
			$('#rooms').val(rooms);
			$('#typeId').val(type_id);
			$('#bedType').val(bedType);
			$('#roomPrice').val(roomPrice);
		if($('#ui_mark').length==0){
			$('<div class="ui_mark" id="ui_mark"></div>').appendTo($('body'));
		}	
		$('.detail_reserve').css({
			'-webkit-transition':'height 0.3s ease-in-out',
			'height':'328px'
		})
	})

	$('#reserve_btn').on('click',function(){		
		ifLogined(getUrl());
	})
	//跳转订单页
	function getUrl(){
		var url='indent.html?city_id='+city_id+'&city_name='
				+city_name+'&date_in='+$('#date_in').val()+'&date_out='+$('#date_out').val()
				+'&hotel_id='+id+'&type_id='+$('#typeId').val()+'&room_id='+$('#rooms').val()
				+'&hotel_name='+$('#hotel_name').text()+'&img_src=../images/01.jpg'
				+'&bed='+$('#bedType').val()+'&roomPrice='+$('#roomPrice').val();
				
		return url;
	}

}
bindEvent();

//ls.clear();