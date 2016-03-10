
;(function(){
	var citypage=function(){
		var getData=function(){
                  
       		 $.ajax({
		        type:'get',
		        url:'../hotCity.json',
		        //url:'http://114.215.85.17/demo.php?action=interfaces&callback=?',
		        dataType:'json',
		        //dataType:'jsonp',
		        async:false,
		        success:function(data){
		           hotCity(data);
                       console.log(data.result)                       
		        },
			  error:function(){
				alert('数据请求错误');
			  }
		    });
       	},
       	hotCity=function(data){
       		var str='';
       		$.each($(data),function(key,city){
       			$.each(city,function(n,obj){
       				str+='<a href="../index.html?city_id='+n+'&city_name='+encodeURI(obj)+'">'+obj+'</a>';
       			})
       		})
       		$(str).appendTo($('#hotCity'));
       	},
       	randerDom=function(){
       		var word=['A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','W','X','Y','Z'],
       			html='',dom="";
       			$.each(word,function(q,word){                              
                              html+='<a href="#'+word+'">'+word+'</a>';
       				dom+='<dl id="'+word+'"><dt>'+word+'</dt><dd><ul>';
       				$.each(CITIES,function(m,city){
       					if(city[1].slice(0,1)==word){
 						dom+='<li><a href="../index.html?city_id='+m+'&city_name='+encodeURI(city[0])+'">'+city[0]+'</a></li>';
       					}
       				})
       				dom+='</ul></dd></dl>';
       			})
       			$(dom).appendTo($('#citys'));
                        $(html).appendTo($('#cityList'));
       			
       	},
            bindEvent=function(){
                  var ls=window.localStorage;
                  $('#checkedCity').text(ls.getItem('cityName'));
                  $('#homePage').attr('href','../index.html?city_id='+ls.getItem('cityId')+'&city_name='+encodeURI(ls.getItem('cityName')));
            }

		return {
			cityJs:function(){								
                   	getData();
                        hotCity();
                   	randerDom();
                        bindEvent();
			}
		}
	}()
	window.citypage=citypage;
})(Zepto);