;(function($){
	var register=function(){
		var coded='';
		var check=function(){
			var phone=$.trim($('#phone').val()),
				pwd=$.trim($('#password').val()),
				code=$.trim($('#code').val()),
				read=$('#read').val(),
				newphone = phone.replace(/\D/,'');
			$('#phone').val(newphone);
				if(phone && pwd && code && read=='1'){
					$('#register').addClass('on');
				}else{
					$('#register').removeClass('on');
				}
		},
		timeDown=function(){
			var time=11,timer=null,codeBtn=$('#verify');
			 timer=setInterval(function(){
              	time--;
                  if(time<=0){
                    clearInterval(timer);
                    codeBtn.text('获取验证码');
                    times=11;
                    codeBtn.on('tap click',checkCode);
                  }else{
                    codeBtn.text(time+'秒后重试');
                  }
              },1000)
		},
		getSuccess=function(data){
			var codeBtn=$('#verify'),result=data.result;
            if(result.errcode==0){
              coded=result.risg;
              codeBtn.off('tap click',checkCode);
              common.warning('发送验证码成功！',timeDown);
            }else if(result.errcode=='1'){
              	common.warning(result.risg,function(){
              		location.href='login.html';
              	});
			}else if(result.errcode=='2'){
              	codeBtn.off('tap click',checkCode);
              	common.warning(result.risg,timeDown);
			}
		},
		checkCode=function(){
			var phone = $.trim($('#phone').val()),
                pwd = $.trim($('#password').val()),
                url = '../server/register.php';
            if(!common.checkPhone(phone)){
				common.warning('手机格式有误！',function(){
					$('#phone').val('');
					$('#password').val('');
					$('#code').val('');
				});
				return;
			}
			if(!common.checkPwd(pwd)){
				common.warning('密码为6-12位数字字母下划线！');
				return;
			}
			common.access_server(url,{'phone':phone},getSuccess);
		},
		checkRead=function(){
			var span=$(this).children('span'),input=$('#read');
			if(!span.hasClass('read_checked')){
				span.addClass('read_checked');
				input.val('1');
			}else{
				span.removeClass('read_checked');
				input.val('0');
			}
			check();
		},
		registerCheck=function(){
			if(!$(this).hasClass('on')) return;
			var phone = $.trim($('#phone').val()),
                pwd = $.trim($('#password').val());
            if(!common.checkPhone(phone)){
				common.warning('手机格式有误！',function(){
					$('#phone').val('');
					$('#password').val('');
					$('#code').val('');
				});
				return;
			}
			if(!common.checkPwd(pwd)){
				common.warning('密码为6-12位数字字母下划线！');
				return;
			}		
			
			var code=$.trim($('#code').val());
			if(!common.checkCoded(code)){
				common.warning('验证码为4为有效数字',function(){$('#code').val('');});
				return;
			}				
			if(code!=coded){
				common.warning('验证码错误',function(){
					$('#code').val('');
				});
				return;
			}
			common.access_server('../server/registersubmit.php',{'phone':phone,'password':pwd},function(data){
				var result=data.result;
				if(result=='1'){
					common.warning('该手机已注册！');
				}else if(result=='2'){
					common.warning('注册失败！');
				}else{
					common.warning('注册成功',function(){
						location.href='login.html';
					});
				}
			});
		},
		checkOnoff=function(){//密码开关
			if($(this).hasClass('pwd_on')){
				$(this).addClass('pwd_off').removeClass('pwd_on');
				$('#reg_password').prop('type','text');
				$('#icon').css({
					'-webkit-transition':'-webkit-transform 0.3s linear',
					'-webkit-transform':'translate3d(-4.5rem,0,0)'
				})
			}else if($(this).hasClass('pwd_off')){
				$(this).addClass('pwd_on').removeClass('pwd_off');
				$('#reg_password').prop('type','password');
				$('#icon').css({			
					'-webkit-transition':'-webkit-transform 0.3s linear',
					'-webkit-transform':'translate3d(0,0,0)'
				})
			}
		},
		bindEvent=function(){
			$('#pwd_onoff').on('tap click',checkOnoff)
			$('#phone').on('propertychange input',check);
			$('#reg_password').on('propertychange input',check);
			$('#code').on('propertychange input',check);
			$('#verify').on('tap click',checkCode);
			$('#input_read').on('tap click',checkRead);	
			$('#register').on('tap click',registerCheck);	
		}
		return {
			register:function(){
				bindEvent();
			}
		}
	}()
	window.register=register;
})(Zepto)




