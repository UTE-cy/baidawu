;(function($){
	var indexpage=function(){
		var geturl=function(){
			var ls=window.localStorage,
				param=common.getParam(location.search);
				if(!param){
					ls.setItem('cityName','北京');
					ls.setItem('cityId','28');
					$('#cityName').text('北京');
					$('#cityId').val('28');
				}else{
					$('#cityName').text(param.city_name);
					$('#cityId').val(param.city_id);
					ls.setItem('cityName',param.city_name);
					ls.setItem('cityId',param.city_id);
				}
		},
		calendar=function(){			
          // 显示入住和离店日期
          var $dateIn=$('#date_in'),
              $dateOut=$('#date_out'),
              today=new Date(),
              beginDate,maxDate;

			  $dateIn.val(gDate());
			  $dateOut.val(gDate(1)); 

		     $dateIn.on('focus',function(){
		     	beginDate=new Date(today.getFullYear(),today.getMonth(),today.getDate());
		     	maxDate=new Date(today.getFullYear(),today.getMonth(),today.getDate()+90);
		     	showCalendar($(this),beginDate,maxDate);
		     }) 
		     $dateOut.on('focus',function(){
		     	beginDate=new Date(today.getFullYear(),today.getMonth(),today.getDate()+1);
		     	maxDate=new Date(today.getFullYear(),today.getMonth(),today.getDate()+91);
		     	showCalendar($(this),beginDate,maxDate);
		     })  	
		},
		searchHotel=function(){
	         $('#search').on('click',function(){
	             // 获取所有的参数信息
	             var cityId=$('#cityId').val(),
	                 cityName=$('#cityName').text(),
	                 dateIn=$('#date_in').val(),
	                 dateOut=$('#date_out').val(),
	                 name=$.trim($('#name').val()),
	                 url="html/hotel.html?city_id="+cityId+'&city_name='+encodeURI(cityName)+'&date_in='+dateIn+'&date_out='+dateOut+'&name='+name;
	             $(this).attr('href',url);
	         })
      	}

		return {
			index:function(){
				geturl();
				calendar();
				searchHotel();
			}
		}
	}()
	window.indexpage=indexpage;
})(Zepto)