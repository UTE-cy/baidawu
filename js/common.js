/*
	设置公共JS
 */
function Common(){
	var self=this;
	//获取地址栏信息
   this.getParam=function(url){
		if(url){
			url=url.substr(1);
			var arr=url.split('&'),obj={},param;
			for(var i=0,len=arr.length;i<len;i++){
				param=arr[i].split('=');
				obj[param[0]]=decodeURI(param[1]);
			}
			return obj;
		}else{
			return false;
		}
	}

	/*this.getParam=function(name){
      var url=location.search;
      if(url){
         url=url.substr(1);
         var reg=new RegExp('&?'+name+'='+'([^&]+)');     // 定界符 当正则中出现变量的时候，不能使用定界符，只能使用new RegExp 
         	//用()包裹匹配字符 在返回数组里 单独列出 便于读取  result[1] 开始
         var result=url.match(reg);
         if(result){
            return decodeURI(result[1]);
         }else{
         	return false;
         }
      }else{
      	 return false;
      }
   }*/
   // ajax请求函数
   

   // ajax的get请求
   this.access_server=function(url,option,successFn,errorFn){ 
   		self.loading();
  		/*
  			data:{'参数':值，'参数':值}
  		*/
  		async=typeof(async)==='undefined'?true:async;
        $.ajax({
	      	url:url,
	      	type:'get',
	      	dataType:'json',
	      	async:async,
	      	data:option,
	        success:function(e){
	        	self.removeLoading();
	          successFn && successFn(e);
	        },
		  	error:function(){
  				if(typeof(errorFn)=='function'){
  					errorFn();
  				}else{
  					self.warning('抱歉，网络繁忙，请<a href="javascript:void(0)" onclick="location.reload()">刷新</a>或返回');
  				}
		  	}
       })
   }
	this.warning=function(msg,callback){
    var tit='<h2></h2>';
    var content=msg;
    var btn='<a href="javascript:void(0)" id="done">确认</a>';
    self.dialog(tit,content,btn);
    if($('#done').length){
        $('#done').on('click',function(){
          self.removeLoading();
          callback && callback();
        })
    }

	}
  this.dialog=function(tit,con,btn){
    if($('#mark').length==0){
        $('<div class="mark" id="mark"></div>').appendTo($('body'));
    }
    if($('#mark_dialog').length==0){
      var dialog='<div class="mark_dialog" id="mark_dialog"></div>';
          html=tit+'<div class="dialog_con">'+con+'</div><p>'+btn+'</p>'
        $(dialog).html(html).appendTo($('body'));        
    }
    
  }
   this.loading=function(){
   		if($('#mark').length==0){
   			$('<div class="mark" id="mark"></div>').appendTo($('body'));
   		}
   		if($('#mark_loading').length==0){
   			$('<div class="mark_loading" id="mark_loading"><img></div>').appendTo($('body'));
   			$('#mark_loading').children('img').attr('src','../images/loading.gif');
   		}
   }
   this.removeLoading=function(){
   		$('#mark').remove();
   		$('#mark_loading') && ($('#mark_loading').remove());
      $('#mark_dialog') && ($('#mark_dialog').remove());
   }
   //  验证手机号码
  this.checkPhone=function(phone){
    var reg=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if(phone){
      return reg.test(phone);
    }
    return false;
  }
  // 密码
  this.checkPwd=function(pwd){
    var reg=/^\w{6,12}$/;
    if(pwd){
      return reg.test(pwd);
    }
    return false;
  }
  // 验证码
  this.checkCoded=function(code){
    var reg=/^\d{4}$/;
    if(code){
      return reg.test(code);
    }
    return false;
  }
  // 身份证 
  this.checkCard=function(val){
    var reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(val){
      return reg.test(val);
    }
    return false;
  }
  // 姓名
  this.checkName=function(name){
    var reg= /([\u4E00-\u9FA5]{2,7})|([a-zA-Z]{3,10})/;
    if(name){
       return reg.test(name);
    }
    return false;
  }
}

var common=new Common();
//common.getParam('city_name');
//common.access_server('url',data,success);


function gDate(i,option){ 
   //如果传递了日期 使用传递的日期 否则 使用当日时间  
   var now=option?new Date(option.y,option.m,option.d):new Date();
   //如果i接受到值了，则将这个值转换为毫秒数，否则设为0
   i=i?i*1000*86400:0;
   //选择的日期 当前日期（毫秒数） + 传递天数（转换为毫秒数
   var futureTime=now*1+i;    //得到选择的时间的毫秒数
   var futureDay=new Date(futureTime);  //选择的日期
  	   //futureDay.setTime(futureTime);  //设置选择后的日期
   var year=futureDay.getFullYear();	  
   var month=futureDay.getMonth()+1;
   var date=futureDay.getDate();		  

   if(month<10){
	    month='0'+month;
	}
   if(date<10){
	    date='0'+date;
    }

	return year+'-'+month+'-'+date;

}

function selectDate(pageType){
  // 将入住日和离店日取出来
  	var date_in=$('#date_in').val(),
        newOut=date_out=$('#date_out').val(),
        arr=toArr(date_in),//用选择时间设置为当前日期 ['2015','12','11']
        inNum=toNum(date_in),  //把入住时间 和 离开时间  转换成可比较的数字型
        outNum=toNum(date_out);
    var ls=window.localStorage;
    	ls.setItem('date_in',date_in);
    if(inNum>=outNum){
  	    newOut=gDate(1,{y:arr[0],m:arr[1]-1,d:arr[2]}); //传个对象便于取值
    	ls.setItem('date_out',newOut);
    }

    $('#date_out').val(newOut);
    // 判断为非index页 
    if(pageType){
      dateInList(date_in,newOut);
      //获取新的日期 改变地址栏的入住 和 离开日期 重新给AJAX请求赋值
      post_data.dateIn=date_in;
      post_data.dateOut=newOut;
      if(pageType=='hotel'){ // 判断是哪个页面 重新AJAX请求
        httpFromHotel('reset');
      }else if(pageType=='details'){
        renderToDetail('reset');
      }
    }
}

function toNum(str){
    // str=2015-12-11  转换成number字符  20151211 
    return str.replace(/-/g,"");
}
function toArr(val){
	// val=2015-12-11  装换成数组['2015','12','11']
	return val.split('-');
}
//调用日历组件 必须的三个参数 调用日历的对象 开始时间 最大时间 
function showCalendar(ele,start,end,action){
	ele.calendar({
       minDate:start,// 开始时间
       maxDate:end, // 最大时间
       swipeable:true, //是否滑动
       hide:function(){  //日历
          // 日历隐藏时执行的回调函数
          selectDate(action);
       }
   }).calendar("show");

   $('.shadow').remove();
   $('.ui-slideup-wrap').addClass('calenderbox');
   var shadow=$('<span class="shadow"></span>');
   $('.calenderbox').append(shadow);
   $('.ui-slideup').addClass('calender');
}
//去掉日期里的年 和01中的0
function removeYear(strY){
  var arr=strY.split('-'),
      mon=arr[1].charAt(0)=='0'?arr[1].charAt(1):arr[1],
      day=arr[2].charAt(0)=='0'?arr[2].charAt(1):arr[2];
  return mon+'月'+day+'日';
}
//给span添加选择的日期
function dateInList(dateIn,dateOut){
  var spanIn=$('#change_in'),
      spanOut=$('#change_out'),
      dIn=removeYear(dateIn),
      dOut=removeYear(dateOut);
  spanIn.text(dIn);
  spanOut.text(dOut);  
}
//点击修改 让入住日调用日历 
$('#change_date').on('tap',function(){
  var type=$(this).attr('type'),
      now=new Date(),
      beginIn=new Date(now.getFullYear(),now.getMonth(),now.getDate()),
      maxDay=new Date(now.getFullYear(),now.getMonth(),now.getDate()+90);
      showCalendar($('#date_in'),beginIn,maxDay,type);
})

//判断是否登陆
function ifLogined(url){
  var checkLogin=function(datas){
    if(datas.if_logined=='1'){
      location.href=url;
    }else{      
      sessionStorage.setItem('url',url);
      location.href='login.html';
    }
  }
  common.access_server('../server/check.php',{},checkLogin);
}
		
     

